/** libs */
import { createClient as createClientForServerComp } from '@/utils/supabase/server'

/** types */
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Project Detail',
  description: '',
}

export default async function TasksDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClientForServerComp()
  const { data, error } = await supabase.from('projects').select('*').eq('id', params.id).single()

  if (error) {
    throw error
  }

  return (
    <div className="h-full p-4 lg:p-6">
      <div className="max-auto container">
        <h1 className="text-2xl font-semibold tracking-tight">{data.title}</h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">{data.description}</p>
        <p className="text-2xl font-semibold tracking-tight">{data.status}</p>
      </div>
    </div>
  )
}
