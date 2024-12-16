'use client'

import { cva } from 'class-variance-authority'
import { Home, List } from 'lucide-react'

type MenuItemType = {
  icon: JSX.Element
  label: string
  href: string
}

const gnavMenuIconClassName = cva(['h-5 w-5 md:h-4 md:w-4'])
const gnavMenuLinkClassName = cva([
  'flex items-center gap-3 rounded-md px-3 py-2 text-lg font-medium text-muted-foreground ring-offset-background transition-colors md:text-sm',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
  'hover:text-primary',
  'data-[current=true]:bg-accent data-[current=true]:text-primary',
])

const gnavMenuItems: MenuItemType[] = [
  {
    icon: <Home className={gnavMenuIconClassName()} />,
    label: 'Home',
    href: '/',
  },
  {
    icon: <List className={gnavMenuIconClassName()} />,
    label: 'Projects',
    href: '/projects',
  },
]

export { gnavMenuItems, gnavMenuIconClassName, gnavMenuLinkClassName, type MenuItemType }
