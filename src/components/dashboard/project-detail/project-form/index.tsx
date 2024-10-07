'use client'

/** libs */
import { useForm, Controller } from 'react-hook-form'

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
  const {
    register,
    control,
    formState: { errors },
  } = useForm<ProjectFormType>({
    defaultValues: {
      title: '',
      slug: '',
      description: '',
      coverImage: {
        path: '',
        publicUrl: '',
      },
      status: 'draft',
    },
  })

  return (
    <div className="mx-auto w-full max-w-[768px] px-6 py-10">
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
          <FormItemLabel isRequired>Cover Image</FormItemLabel>
          <Controller
            control={control}
            name="coverImage"
            rules={{ required: 'Please upload Cover Image' }}
            render={({ field: { value, onChange } }) => <CoverImage value={value} onValueChange={onChange} />}
          />
          {errors.coverImage && <FormItemMessage isError>{errors.coverImage.message}</FormItemMessage>}
        </FormItem>
        <div className="flex justify-end gap-2">
          <Button variant="outline">
            <LoaderCircle className="mr-1 h-5 w-5 animate-spin" />
            Save
          </Button>
          <Button>
            <LoaderCircle className="mr-1 h-5 w-5 animate-spin" />
            Publish
          </Button>
        </div>
      </div>
    </div>
  )
}

export { ProjectForm }
