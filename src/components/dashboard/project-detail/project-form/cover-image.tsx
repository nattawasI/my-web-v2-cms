'use client'

/** libs */
import { useTransition } from 'react'
import { useDropzone } from 'react-dropzone'
import { X, LoaderCircle } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

/** components */
import Image from 'next/image'

/** types */
import type { CoverImageType } from '@/types/dashboard/project-detail'

type Props = {
  value?: CoverImageType | null
  onValueChange?: (data: CoverImageType | null) => void
}

const BUCKET_NAME = 'projects'

const CoverImage = ({ value, onValueChange }: Props) => {
  const supabase = createClient()

  const [isUploading, startUploading] = useTransition()

  const generateUniqueFileName = (file: File) => {
    const timestamp = Date.now() // Use the current timestamp
    const originalName = file.name.replace(/\.[^/.]+$/, '') // Remove the file extension from the name
    const fileExtension = file.name.split('.').pop() // Get the file extension (e.g., 'jpg')

    return `${originalName}-${timestamp}.${fileExtension}` // Append timestamp to the original name and keep the extension
  }

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      startUploading(async () => {
        const uniqueFileName = generateUniqueFileName(file) // Generate the unique file name

        const { data, error } = await supabase.storage.from(BUCKET_NAME).upload(uniqueFileName, file)

        if (error) {
          console.error('Error upload image: ', error)
          return
        }

        console.log('Uploaded data: ', data)
        // Generate the public URL for the uploaded image
        const { data: publicUrlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(data.path)

        console.log('publicUrl: ', publicUrlData)
        // Update state with the public URL
        onValueChange?.({ path: data.path, publicUrl: publicUrlData.publicUrl })
      })
    }
  }

  const onRemove = async () => {
    if (value?.path) {
      const { data, error } = await supabase.storage.from(BUCKET_NAME).remove([value.path])

      if (error) {
        console.error('Error remove image: ', error)
        return
      }

      console.log('Remove image success: ', data)
      onValueChange?.(null)
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
    },
    maxFiles: 1,
    noDrag: true, // Disable drag functionality
  })

  return (
    <div className="relative aspect-video w-full rounded-md border">
      {isUploading ? (
        <div className="flex h-full w-full items-center justify-center">
          <LoaderCircle className="animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
          {value?.publicUrl ? (
            <div className="relative h-full w-full overflow-hidden rounded-md">
              <Image src={value.publicUrl} alt="Preview Cover Image" fill className="object-cover object-center" />
              <button
                onClick={onRemove}
                className="absolute right-3 top-3 z-[1] flex h-8 w-8 items-center justify-center rounded-full border border-accent bg-white shadow"
              >
                <span className="sr-only">Remove Image</span>
                <X />
              </button>
            </div>
          ) : (
            <div
              {...getRootProps({
                className:
                  'relative flex items-center justify-center w-full rounded-md h-full cursor-pointer hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              })}
            >
              <input {...getInputProps({ className: 'absolute top-0 left-0 w-0 h-0' })} />
              <p>Click to select a JPEG image</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export { CoverImage }
