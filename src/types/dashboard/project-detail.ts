export type StatusType = 'draft' | 'published'

export type CoverImageType = {
  path: string
  publicUrl: string
}

export type ProjectFormType = {
  title: string
  slug: string
  description: string
  coverImage: CoverImageType | null
  status: StatusType
}
