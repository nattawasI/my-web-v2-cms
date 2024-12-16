'use client'

/** libs */
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { createClient } from '@/utils/supabase/client'
import { cn } from '@/lib/utils/cn'

/** components */
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button, buttonVariants } from '@/components/ui/button'
import { LoaderCircle, ChevronLeft } from 'lucide-react'
import { FormItem, FormItemLabel, FormItemMessage } from '@/components/ui/form-item'
import { CoverImage } from '@/components/project-detail/project-form/cover-image'
import { StatusSelect } from '@/components/project-detail/project-form/status-select'
import { toast } from 'sonner'

/** actions */
import { createProject } from '@/components/project-detail/project-form/actions'

/** types */
import type { ProjectFormType } from '@/types/project-detail'

const ProjectForm = () => {
  const supabase = createClient()

  const router = useRouter()

  const [isSaving, startSave] = useTransition()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormType>({
    defaultValues: {
      title: '',
      slug: '',
      description: '',
      coverImageFile: null,
      coverImage: null,
      status: 'draft',
    },
  })

  const handleBack = () => {
    router.push('/projects')
  }

  const handleCreate = async (dataSubmit: ProjectFormType) => {
    // startSave(async () => {
    //   if (dataSubmit.coverImageFile) {
    //     const path = `${dataSubmit.slug}/${dataSubmit.coverImageFile.name}`
    //     const { data: dataCoverImage, error: errorCoverImage } = await supabase.storage
    //       .from('projects')
    //       .upload(path, dataSubmit.coverImageFile)
    //     if (errorCoverImage) {
    //       console.error('Error upload Cover image: ', errorCoverImage)
    //       return
    //     }
    //     const { data: dataPublicUrl } = supabase.storage.from('projects').getPublicUrl(dataCoverImage.path)
    //     const { error: errorCreateProject } = await createProject({
    //       title: dataSubmit.title,
    //       slug: dataSubmit.slug,
    //       description: dataSubmit.description,
    //       coverImage: {
    //         path: dataCoverImage.path,
    //         publicUrl: dataPublicUrl.publicUrl,
    //       },
    //       status: dataSubmit.status,
    //     })
    //     if (errorCreateProject) {
    //       console.error('Error create project: ', errorCreateProject)
    //       return
    //     }
    //     toast.success('Project has been created')
    //     router.push('/projects')
    //   }
    // })
  }

  return (
    <div>
      <div
        className={cn(
          'mx-auto flex w-full max-w-[768px] flex-col gap-y-6 px-6 py-10',
          isSaving ? 'pointer-events-none' : undefined,
        )}
      >
        <div className="flex items-center gap-x-6">
          <Button variant="outline" size="icon" onClick={handleBack}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Create new project</h1>
        </div>

        <div className="flex flex-col gap-6">
          <FormItem>
            <FormItemLabel isRequired>Title</FormItemLabel>
            <Input {...register('title', { required: 'Please enter Title' })} />
            {errors.title && <FormItemMessage isError>{errors.title.message}</FormItemMessage>}
          </FormItem>
          <FormItem>
            <FormItemLabel isRequired>Slug</FormItemLabel>
            <Input {...register('slug', { required: 'Please enter Slug' })} />
            {errors.slug && <FormItemMessage isError>{errors.slug.message}</FormItemMessage>}
          </FormItem>
          <FormItem>
            <FormItemLabel>Description</FormItemLabel>
            <Textarea className="resize-none" {...register('description')} />
          </FormItem>
          <FormItem>
            <FormItemLabel>Cover Image</FormItemLabel>
            <Controller
              control={control}
              name="coverImageFile"
              rules={{ required: 'Please upload Cover Image' }}
              render={({ field: { onChange } }) => <CoverImage onValueChange={onChange} />}
            />
            {errors.coverImageFile && <FormItemMessage isError>{errors.coverImageFile.message}</FormItemMessage>}
          </FormItem>
          <FormItem>
            <FormItemLabel>Content</FormItemLabel>
            <div className="min-h-[300px] rounded-lg border border-border"></div>
          </FormItem>
        </div>
        <div className="flex justify-between gap-x-6">
          <Button variant="outline">Discard</Button>
          <div className="flex items-center gap-x-2">
            <Controller
              control={control}
              name="status"
              render={({ field: { value, onChange } }) => <StatusSelect value={value} onValueChange={onChange} />}
            />
            <Button onClick={handleSubmit(handleCreate)} disabled={isSaving}>
              {isSaving ? <LoaderCircle className="mr-1 h-5 w-5 animate-spin" /> : null}
              Create
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ProjectForm }
