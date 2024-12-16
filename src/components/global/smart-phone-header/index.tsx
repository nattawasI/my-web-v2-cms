import { Logo } from '@/components/global/logo'
import { SmartPhoneMenu } from '@/components/global/smart-phone-menu'

const SmartPhoneHeader = () => {
  return (
    <div className="flex h-14 items-center justify-between gap-5 border-b px-4 lg:hidden">
      <Logo />
      <SmartPhoneMenu />
    </div>
  )
}

export { SmartPhoneHeader }
