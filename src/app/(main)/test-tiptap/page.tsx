import dynamic from 'next/dynamic'
import type { Metadata } from 'next'
const RichTextEditor = dynamic(() => import('@/components/common/rich-text-editor').then((mod) => mod.RichTextEditor), {
  ssr: false,
})

export const metadata: Metadata = {
  title: 'Test Tiptap',
  description: '',
}

export default function TestTiptapPage() {
  return (
    <div className="flex h-full flex-col gap-y-5 p-4 lg:p-6">
      <RichTextEditor />
    </div>
  )
}
