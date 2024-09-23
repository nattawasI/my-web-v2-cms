'use client'

import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { gnavMenuItems, GnavMenuLink } from '@/components/dashboard/global/gnav-menu'

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
              <GnavMenuLink key={index} href={item.href} data-current={item.href === pathname}>
                {item.icon}
                {item.label}
              </GnavMenuLink>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export { SmartPhoneMenu }
