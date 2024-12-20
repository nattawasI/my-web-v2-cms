import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils/cn'

const ErrorFetchText = ({ className, children, ...props }: HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p className={cn('py-10 text-center text-destructive', className)} {...props}>
      {children ?? 'There is something error'}
    </p>
  )
}

export { ErrorFetchText }
