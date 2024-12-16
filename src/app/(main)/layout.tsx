/** libs */
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

/** components */
import { Sidebar } from '@/components/global/sidebar'
import { SmartPhoneHeader } from '@/components/global/smart-phone-header'

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
    redirect('/signin')
  }

  return (
    <div className="grid h-screen overflow-hidden lg:grid-cols-[250px_1fr]">
      <Sidebar />
      <div className="overflow-hidden">
        <SmartPhoneHeader />
        <div className="h-[calc(100%-3.5rem)] overflow-y-auto lg:h-full">{children}</div>
      </div>
    </div>
  )
}
