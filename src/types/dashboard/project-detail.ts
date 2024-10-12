export type ProjectFormType = {
  title: string
  slug: string
  description: string
  coverImage: {
    path: string
    publicUrl: string
  } | null
  status: 'draft' | 'published'
}
