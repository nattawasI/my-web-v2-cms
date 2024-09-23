import { SearchInput } from '@/components/dashboard/common/search-input'
import { Table } from '@/components/dashboard/tasks/table'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tasks',
  description: '',
}

export default function TasksPage() {
  return (
    <div className="flex h-full flex-col gap-y-5 p-4 lg:p-6">
      <h1 className="text-2xl font-semibold tracking-tight">Tasks</h1>
      <SearchInput className="max-w-xs" />
      <div className="flex-1 overflow-hidden">
        <Table />
      </div>
    </div>
  )
}
