import * as React from 'react'
import { cn } from '@/lib/utils/cn'

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn('flex flex-col gap-y-2', className)} {...props} />
  },
)

FormItem.displayName = 'FormItem'

const FormItemLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement> & {
    isRequired?: boolean
  }
>(({ isRequired, className, children, ...props }, ref) => {
  return (
    <label ref={ref} className={cn('text-xs font-medium', className)} {...props}>
      {children}
      {isRequired ? <span className="relative top-[-2px] ml-1 inline-block text-destructive">*</span> : null}
    </label>
  )
})

FormItemLabel.displayName = 'FormItemLabel'

const FormItemMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & { isError?: boolean }
>(({ isError, className, ...props }, ref) => {
  return <p ref={ref} className={cn('text-xs', isError ? 'text-destructive' : '', className)} {...props} />
})

FormItemMessage.displayName = 'FormItemMessage'

export { FormItem, FormItemLabel, FormItemMessage }
