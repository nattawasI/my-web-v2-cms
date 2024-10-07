/** libs */
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function AuthenticationLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return <div className="flex h-screen items-center justify-center">{children}</div>
}
