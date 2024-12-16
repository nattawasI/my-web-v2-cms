'use client'

/** libs */
import { ComponentPropsWithoutRef } from 'react'

/** components */
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'

const StatusSelect = ({ ...props }: Pick<ComponentPropsWithoutRef<typeof Select>, 'value' | 'onValueChange'>) => {
  return (
    <Select {...props}>
      <SelectTrigger className="w-32">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="draft">Draft</SelectItem>
        <SelectItem value="published">Published</SelectItem>
      </SelectContent>
    </Select>
  )
}

export { StatusSelect }
