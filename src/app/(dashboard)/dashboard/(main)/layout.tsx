/** libs */
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

/** components */
import { Sidebar } from '@/components/dashboard/global/sidebar'
import { SmartPhoneHeader } from '@/components/dashboard/global/smart-phone-header'

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/dashboard/signin')
  }

  return (
    <div className="grid h-screen overflow-hidden lg:grid-cols-[250px_1fr]">
      <Sidebar />
      <div className="overflow-hidden">
        <SmartPhoneHeader />
        {children}
      </div>
    </div>
  )
}
