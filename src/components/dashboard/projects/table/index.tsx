/** libs */
import { createClient } from '@/utils/supabase/server'
import { format } from 'date-fns'

/** components */
import { DataTable } from '@/components/dashboard/projects/table/data-table'
import { columns } from '@/components/dashboard/projects/table/columns'

/** types */
import type { ProjectItemType } from '@/types/projects'

const Table = async () => {
  const supabase = createClient()

  const { data, error } = await supabase.from('projects').select()

  console.log('data: ', data)

  if (error) {
    console.error('Error fetching projects: ', error)
    return <p className="py-10 text-center text-destructive">There is something error</p>
  }

  const projects: ProjectItemType[] = data
    ? data.map((item) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        description: item.description,
        coverImage: item.cover_image.publicUrl,
        createDate: format(item.created_at, 'dd/MM/yyyy'),
        status: item.status,
      }))
    : []

  return <DataTable columns={columns} data={projects} />
}

export { Table }
