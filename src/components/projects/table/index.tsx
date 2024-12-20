/** libs */
import { createClient } from '@/utils/supabase/server'

/** components */
import { ErrorFetchText } from '@/components/common/error-fetch-text'
import { DataTable } from '@/components/projects/table/data-table'

const Table = async () => {
  const supabase = createClient()
  const { data, error } = await supabase.from('projects').select()

  if (error) {
    console.error('Error fetching projects: ', error)
    return <ErrorFetchText />
  }

  return <DataTable data={data} />
}

export { Table }
