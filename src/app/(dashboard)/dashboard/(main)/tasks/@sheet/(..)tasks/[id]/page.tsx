/** libs */
import dynamic from 'next/dynamic'

/** components */
import TaskSheet from '@/components/dashboard/project-detail/task-sheet'
import TaskForm from '@/components/dashboard/project-detail/task-form'

/** data */
import { tasks } from '@/components/dashboard/tasks/table/data'

import type { Metadata } from 'next'

type Props = {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: 'Task Detail',
  description: '',
}

export default function TasksDetailSheet({ params }: Props) {
  const task = tasks.find((item) => item.id === params.id)

  return (
    <TaskSheet title={task ? task.title : 'Task not found'} description={task?.description ?? ''}>
      <TaskForm />
    </TaskSheet>
  )
}
