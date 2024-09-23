'use client'

import { usePathname } from 'next/navigation'
import { Logo } from '@/components/dashboard/global/logo'
import { gnavMenuItems, GnavMenuLink } from '@/components/dashboard/global/gnav-menu'

const Sidebar = () => {
  const pathname = usePathname()

  return (
    <div className="hidden h-full border-r lg:block">
      <div className="mb-2 flex h-14 items-center px-6">
        <Logo />
      </div>
      <nav className="flex flex-col gap-1 px-4">
        {gnavMenuItems.map((item, index) => (
          <GnavMenuLink
            key={index}
            href={item.href}
            data-current={item.href === '/dashboard' ? item.href === pathname : pathname.includes(item.href)}
          >
            {item.icon}
            {item.label}
          </GnavMenuLink>
        ))}
      </nav>
    </div>
  )
}

export { Sidebar }
