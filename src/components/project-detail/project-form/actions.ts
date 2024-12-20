'use server'

/** libs */
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

/** types */
import type { ProjectFieldType } from '@/types/project-detail'
import type { PostgrestSingleResponse } from '@supabase/supabase-js'

export const createProject = async (dataSubmit: ProjectFieldType): Promise<PostgrestSingleResponse<null>> => {
  const supabase = createClient()

  const response = await supabase.from('projects').insert(dataSubmit)

  if (!response.error) {
    revalidatePath('/projects')
  }

  return response
}
