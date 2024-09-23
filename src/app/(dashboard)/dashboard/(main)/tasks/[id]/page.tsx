/** data */
import { tasks } from '@/components/dashboard/tasks/table/data'

/** types */
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Task Detail',
  description: '',
}

export default function TasksDetailPage({ params }: { params: { id: string } }) {
  const task = tasks.find((item) => item.id === params.id)
  return (
    <div className="h-full p-4 lg:p-6">
      <div className="max-auto container">
        {task ? (
          <>
            <h1 className="text-2xl font-semibold tracking-tight">{task.title}</h1>
            <p className="leading-7 [&:not(:first-child)]:mt-6">{task.description}</p>
          </>
        ) : (
          <p className="text-2xl font-semibold tracking-tight">Task not found</p>
        )}
      </div>
    </div>
  )
}
