export type ProjectFormType = {
  title: string
  slug: string
  description: string
  coverImage: {
    path: string
    publicUrl: string
  } | null
  coverImageFile: File | null
  status: 'draft' | 'published'
}
