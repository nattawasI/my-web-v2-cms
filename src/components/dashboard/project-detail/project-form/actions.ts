'use server'

/** libs */
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

/** types */
import type { ProjectFormType } from '@/types/dashboard/project-detail'
import type { PostgrestSingleResponse } from '@supabase/supabase-js'

export const createProject = async (
  dataSubmit: Omit<ProjectFormType, 'coverImageFile'>,
): Promise<PostgrestSingleResponse<null>> => {
  const supabase = createClient()

  const response = await supabase.from('projects').insert({
    title: dataSubmit.title,
    slug: dataSubmit.slug,
    description: dataSubmit.description,
    cover_image: dataSubmit.coverImage,
    status: dataSubmit.status,
  })

  if (!response.error) {
    revalidatePath('/dashboard/projects')
  }

  return response
}
