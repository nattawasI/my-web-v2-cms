'use client'

import { AnchorHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import Link, { type LinkProps } from 'next/link'
import { Home, List } from 'lucide-react'

type MenuItemType = {
  icon: JSX.Element
  label: string
  href: string
}

const iconClassName = cva(['h-5 w-5 md:h-4 md:w-4'])

const gnavMenuItems: MenuItemType[] = [
  {
    icon: <Home className={iconClassName()} />,
    label: 'Home',
    href: '/dashboard',
  },
  {
    icon: <List className={iconClassName()} />,
    label: 'Projects',
    href: '/dashboard/projects',
  },
]

const GnavMenuLink = ({
  href,
  children,
  ...props
}: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & LinkProps) => {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 rounded-md px-3 py-2 text-lg font-medium text-muted-foreground ring-offset-background transition-colors md:text-sm',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        'disabled:pointer-events-none disabled:opacity-50',
        'hover:text-primary',
        'data-[current=true]:bg-accent data-[current=true]:text-primary',
      )}
      {...props}
    >
      {children}
    </Link>
  )
}

export { GnavMenuLink, gnavMenuItems, type MenuItemType }
