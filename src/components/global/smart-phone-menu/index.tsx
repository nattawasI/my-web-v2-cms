'use client'

/** libs */
import { useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

/** components */
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { gnavMenuItems, gnavMenuIconClassName, gnavMenuLinkClassName } from '@/components/global/gnav-menu'
import { LogOut as LogOutIcon } from 'lucide-react'
import { SignOut } from '@/components/common/signout'

const SmartPhoneMenu = () => {
  const pathname = usePathname()
  const navItemsRef = useRef<HTMLAnchorElement[]>([])

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        onOpenAutoFocus={(e) => {
          e.preventDefault()
          navItemsRef.current[0].focus()
        }}
      >
        <VisuallyHidden.Root>
          <SheetHeader>
            <SheetTitle>Global Menu</SheetTitle>
            <SheetDescription />
          </SheetHeader>
        </VisuallyHidden.Root>
        <div className="-mx-2 mt-6">
          <nav className="flex flex-col gap-y-2">
            {gnavMenuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={gnavMenuLinkClassName()}
                data-current={item.href === pathname}
                ref={(el) => {
                  if (el) {
                    navItemsRef.current[index] = el
                  }
                }}
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
      </SheetContent>
    </Sheet>
  )
}

export { SmartPhoneMenu }
