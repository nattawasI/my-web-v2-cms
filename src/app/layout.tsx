import '@/styles/globals.css'
import { cn } from '@/lib/utils'
import { Inter as FontSans } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import type { Metadata } from 'next'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('bg-background font-sans antialiased', fontSans.variable)}>
        {children}
        <Toaster theme="light" richColors closeButton />
      </body>
    </html>
  )
}
