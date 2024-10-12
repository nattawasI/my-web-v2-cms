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
import { CoverImage } from '@/components/dashboard/project-detail/project-form/cover-image'
import { StatusSelect } from '@/components/dashboard/project-detail/project-form/status-select'
import { toast } from 'sonner'

/** types */
import type { ProjectFormType } from '@/types/dashboard/project-detail'

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
      coverImage: null,
      status: 'draft',
    },
  })

  const handleCreate = async (dataSubmit: ProjectFormType) => {
    startSave(async () => {
      const { error } = await supabase.from('projects').insert({
        title: dataSubmit.title,
        slug: dataSubmit.slug,
        description: dataSubmit.description,
        cover_image: dataSubmit.coverImage,
        status: dataSubmit.status,
      })

      if (error) {
        console.error('Error insert project: ', error)
        return
      }

      toast.success('Project has been created')
    })
  }

  return (
    <div className="">
      <div className={cn('mx-auto w-full max-w-[768px] px-6 py-10', isSaving ? 'pointer-events-none' : undefined)}>
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
      <div className="sticky bottom-0 z-10 border-t border-border bg-background py-2">
        <div className="mx-auto flex w-full max-w-[768px] justify-between px-6">
          <Link href="/dashboard/projects" className={buttonVariants({ variant: 'outline', size: 'icon' })}>
            <ChevronLeft className="h-5 w-5" />
          </Link>
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
