import { ReactElement, ComponentPropsWithoutRef } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const MenuPopover = ({
  triggerSlot,
  contentSlot,
  ...props
}: { triggerSlot: ReactElement; contentSlot: ReactElement } & ComponentPropsWithoutRef<typeof PopoverContent>) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{triggerSlot}</PopoverTrigger>
      <PopoverContent {...props}>{contentSlot}</PopoverContent>
    </Popover>
  )
}
export { MenuPopover }
