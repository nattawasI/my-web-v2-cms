'use server'

/** libs */
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export const signOut = async (): Promise<void> => {
  const supabase = createClient()

  // Check if a user's logged in
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error('Error logging out:', error)
    } else {
      redirect('/signin')
    }
  }
}
