/** types */
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Project Detail',
  description: '',
}

export default function TasksDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div className="h-full p-4 lg:p-6">
      <div className="max-auto container">
        <h1 className="text-2xl font-semibold tracking-tight">Title</h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">Description</p>
        <p className="text-2xl font-semibold tracking-tight">Task not found</p>
      </div>
    </div>
  )
}
