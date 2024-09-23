import { DataTable } from '@/components/dashboard/common/data-table'
import { columns } from '@/components/dashboard/projects/table/columns'
import { projects } from '@/components/dashboard/projects/table/data'

const Table = () => {
  return <DataTable columns={columns} data={projects} />
}

export { Table }
