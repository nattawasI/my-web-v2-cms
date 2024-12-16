/** components */
import { SignIn } from '@/components/signin'

/** types */
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default function SignInPage() {
  return <SignIn />
}
