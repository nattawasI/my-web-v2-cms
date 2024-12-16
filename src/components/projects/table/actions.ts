'use server'

/** libs */
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

/** types */
import type { PostgrestSingleResponse } from '@supabase/supabase-js'

export const deleteProject = async (id: string): Promise<PostgrestSingleResponse<null>> => {
  const supabase = createClient()
  const response = await supabase.from('projects').delete().eq('id', id)

  if (response.status === 204) {
    revalidatePath('/projects')
  }

  return response
}
