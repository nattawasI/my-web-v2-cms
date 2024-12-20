'use client'

/** libs */
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { createClient } from '@/utils/supabase/client'
import { cn } from '@/lib/utils/cn'

/** components */
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
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
      cover_image_path: '',
      cover_image_publicUrl: '',
      cover_image_file: null,
      status: 'draft',
    },
  })

  const handleBack = () => {
    router.push('/projects')
  }

  const handleCreate = async (dataSubmit: ProjectFormType) => {
    startSave(async () => {
      if (dataSubmit.cover_image_file) {
        const path = `${dataSubmit.slug}/${dataSubmit.cover_image_file.name}`
        const { data: dataCoverImage, error: errorCoverImage } = await supabase.storage
          .from('projects')
          .upload(path, dataSubmit.cover_image_file)
        if (errorCoverImage) {
          console.error('Error upload Cover image: ', errorCoverImage)
          return
        }
        const { data: dataPublicUrl } = supabase.storage.from('projects').getPublicUrl(dataCoverImage.path)
        const { error: errorCreateProject } = await createProject({
          title: dataSubmit.title,
          slug: dataSubmit.slug,
          description: dataSubmit.description,
          cover_image_path: dataCoverImage.path,
          cover_image_publicUrl: dataPublicUrl.publicUrl,
          status: dataSubmit.status,
        })
        if (errorCreateProject) {
          console.error('Error create project: ', errorCreateProject)
          return
        }
        toast.success('Project has been created')
        router.push('/projects')
      }
    })
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
              name="cover_image_file"
              rules={{ required: 'Please upload Cover Image' }}
              render={({ field: { onChange } }) => <CoverImage onValueChange={onChange} />}
            />
            {errors.cover_image_file && <FormItemMessage isError>{errors.cover_image_file.message}</FormItemMessage>}
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
