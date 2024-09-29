'use client'

/** libs */
import Link from 'next/link'
import { usePathname } from 'next/navigation'

/** components */
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { gnavMenuItems, gnavMenuIconClassName, gnavMenuLinkClassName } from '@/components/dashboard/global/gnav-menu'
import { LogOut as LogOutIcon } from 'lucide-react'
import { SignOut } from '@/components/dashboard/common/signout'

const SmartPhoneMenu = () => {
  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
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
