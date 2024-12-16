import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description: '',
}

export default function HomePage() {
  return (
    <div className="flex h-full flex-col gap-y-5 p-4 lg:p-6">
      <h1 className="text-2xl font-semibold tracking-tight">Home</h1>
    </div>
  )
}
