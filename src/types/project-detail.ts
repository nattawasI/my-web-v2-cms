import type { Tables } from '@/types/database.types'

export type ProjectFieldType = Omit<Tables<'projects'>, 'id' | 'created_at' | 'updated_at'>

export type ProjectFormType = ProjectFieldType & {
  cover_image_file: File | null
}
