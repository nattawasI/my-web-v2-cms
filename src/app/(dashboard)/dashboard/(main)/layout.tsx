import { cn } from '@/lib/utils'
import { Sidebar } from '@/components/dashboard/global/sidebar'
import { SmartPhoneHeader } from '@/components/dashboard/global/smart-phone-header'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
