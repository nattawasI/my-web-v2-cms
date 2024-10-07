export type ProjectStatusType = 'draft' | 'published'

export type ProjectItemType = {
  id: string
  title: string
  description: string
  coverImage: string
  createDate: string
  status: ProjectStatusType
}
