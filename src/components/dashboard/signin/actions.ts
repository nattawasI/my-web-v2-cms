'use server'

/** libs */
import { createClient } from '@/utils/supabase/server'

/** types */
import type { SignInFormType } from '@/types/dashboard/authentication'

export const signIn = async (formData: SignInFormType): Promise<{ error: string | null }> => {
  const supabase = createClient()
  const { error } = await supabase.auth.signInWithPassword(formData)
  if (error) {
    console.error(error)
    return { error: error.message }
  }

  return { error: null }
}
