export type CoverImageType = {
  path: string
  publicUrl: string
}

export type StatusType = 'draft' | 'published'

export type ProjectFormType = {
  title: string
  slug: string
  description: string
  coverImage: CoverImageType | null
  status: StatusType
}
