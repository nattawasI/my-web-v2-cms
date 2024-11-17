/** components */
import { ProjectForm } from '@/components/dashboard/project-detail/project-form'

/** types */
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create new project',
}

export default function NewProjectPage() {
  return <ProjectForm />
}
