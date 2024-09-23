/** components */
import { Input } from '@/components/ui/input'
import { InputPassword } from '@/components/ui/input-password'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'

/** types */
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default function SignInPage() {
  return (
    <div className="mx-auto flex w-[24.375rem] flex-col items-center gap-y-5 px-5">
      <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
      <p className="mt-2 text-sm text-destructive">Email or password is wrong.</p>
      <Input placeholder="Email" />
      <InputPassword placeholder="Password" />
      <Button className="w-full">
        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
        Sign In
      </Button>
    </div>
  )
}
