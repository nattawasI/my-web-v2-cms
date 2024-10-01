export type ProjectStatusType = 'draft' | 'published'

export type ProjectItemType = {
  id: string
  title: string
  description: string
  thumbnailImage: string
  createDate: string
  status: ProjectStatusType
}
