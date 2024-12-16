'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

/** components */
import { Logo } from '@/components/global/logo'
import { gnavMenuItems, gnavMenuIconClassName, gnavMenuLinkClassName } from '@/components/global/gnav-menu'
import { LogOut as LogOutIcon } from 'lucide-react'
import { SignOut } from '@/components/common/signout'

const Sidebar = () => {
  const pathname = usePathname()

  return (
    <div className="hidden h-full border-r lg:block">
      <div className="mb-2 flex h-14 items-center px-6">
        <Logo />
      </div>
      <nav className="flex flex-col gap-1 px-4">
        {gnavMenuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={gnavMenuLinkClassName()}
            data-current={item.href === '/' ? item.href === pathname : pathname.includes(item.href)}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
        <SignOut>
          <button type="button" className={gnavMenuLinkClassName()}>
            <LogOutIcon className={gnavMenuIconClassName()} />
            Sign out
          </button>
        </SignOut>
      </nav>
    </div>
  )
}

export { Sidebar }
