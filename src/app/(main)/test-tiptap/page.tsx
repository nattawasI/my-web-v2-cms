import dynamic from 'next/dynamic'
import type { Metadata } from 'next'
const Tiptap = dynamic(() => import('@/components/common/tiptap').then((mod) => mod.Tiptap), { ssr: false })

export const metadata: Metadata = {
  title: 'Test Tiptap',
  description: '',
}

export default function TestTiptapPage() {
  return (
    <div className="flex h-full flex-col gap-y-5 p-4 lg:p-6">
      <Tiptap />
    </div>
  )
}
