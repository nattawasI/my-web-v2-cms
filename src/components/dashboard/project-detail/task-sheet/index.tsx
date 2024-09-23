'use client'

/** libs */
import { useRouter } from 'next/navigation'

/** components */
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'

const TaskSheet = ({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) => {
  const router = useRouter()

  return (
    <Sheet defaultOpen>
      <SheetContent onCloseAutoFocus={() => router.back()} {...(!description && { 'aria-describedby': undefined })}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description ? <SheetDescription>{description}</SheetDescription> : null}
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  )
}

export default TaskSheet
