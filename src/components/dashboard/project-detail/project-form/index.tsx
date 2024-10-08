'use client'

/** libs */
import { useTransition } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { createClient } from '@/utils/supabase/client'

/** components */
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button, buttonVariants } from '@/components/ui/button'
import { LoaderCircle, ChevronLeft } from 'lucide-react'
import { FormItem, FormItemLabel, FormItemMessage } from '@/components/ui/form-item'
import { CoverImage } from '@/components/dashboard/project-detail/project-form/cover-image'

/** types */
import type { ProjectFormType } from '@/types/dashboard/project-detail'

const ProjectForm = () => {
  const supabase = createClient()

  const [isSaving, startSave] = useTransition()
  const [isPublishing, startPublish] = useTransition()

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
      coverImage: null,
    },
  })

  const handleCreateProject = async ({
    dataSubmit,
    isPublished = false,
  }: {
    dataSubmit: ProjectFormType
    isPublished?: boolean
  }) => {
    const { error } = await supabase.from('projects').insert({
      title: dataSubmit.title,
      slug: dataSubmit.slug,
      description: dataSubmit.description,
      cover_image: dataSubmit.coverImage,
      status: isPublished ? 'published' : 'draft',
    })

    if (error) {
      console.error('Error insert project: ', error)
      return
    }

    console.log('Insert project success')
  }

  const handleSave = async (dataSubmit: ProjectFormType) => {
    startSave(async () => {
      await handleCreateProject({ dataSubmit })
    })
  }

  const handlePublish = async (dataSubmit: ProjectFormType) => {
    startPublish(async () => {
      await handleCreateProject({ dataSubmit, isPublished: true })
    })
  }

  return (
    <div className="mx-auto w-full max-w-[768px] px-6 py-10">
      <div className={isSaving || isPublishing ? 'pointer-events-none' : undefined}>
        <div className="mb-10">
          <Link href="/dashboard/projects" className={buttonVariants({ variant: 'outline', size: 'icon' })}>
            <ChevronLeft className="h-5 w-5" />
          </Link>
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
              name="coverImage"
              render={({ field: { value, onChange } }) => <CoverImage value={value} onValueChange={onChange} />}
            />
          </FormItem>
          <FormItem>
            <FormItemLabel>Content</FormItemLabel>
            <div className="min-h-[300px] rounded-lg border border-border"></div>
          </FormItem>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-2">
        <Button variant="outline" onClick={handleSubmit(handleSave)} disabled={isSaving}>
          {isSaving ? <LoaderCircle className="mr-1 h-5 w-5 animate-spin" /> : null}
          Save
        </Button>
        <Button onClick={handleSubmit(handlePublish)} disabled={isPublishing}>
          {isPublishing ? <LoaderCircle className="mr-1 h-5 w-5 animate-spin" /> : null}
          Publish
        </Button>
      </div>
    </div>
  )
}

export { ProjectForm }
