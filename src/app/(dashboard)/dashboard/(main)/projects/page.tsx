import { Table } from '@/components/dashboard/projects/table'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
  description: '',
}

export default function ProjectsPage() {
  return (
    <div className="flex h-full flex-col gap-y-5 p-4 lg:p-6">
      <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
      <Table />
    </div>
  )
}
