import { cn } from '@/lib/utils/cn'
import { forwardRef, ButtonHTMLAttributes } from 'react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { Editor } from '@tiptap/react'
import type { MenuItemType } from './menu'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { data: MenuItemType } & { editor: Editor }

const MenuButtonWithTooltip = forwardRef<HTMLButtonElement, Props>(
  ({ editor, data, className, children, onClick, ...props }, ref) => {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'h-6 w-6 p-0',
              'data-[active]:border-ring data-[active]:bg-accent data-[active]:ring-1 data-[active]:ring-ring',
              'data-[state=open]:border-ring data-[state=open]:bg-accent data-[state=open]:ring-1 data-[state=open]:ring-ring',
            )}
            data-active={editor.isActive(data.type, data.level ? { level: data.level } : undefined) ? true : undefined}
            onClick={(e) => {
              data.action?.(editor)
              onClick?.(e)
            }}
            ref={ref}
            {...props}
          >
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{data.label}</TooltipContent>
      </Tooltip>
    )
  },
)

MenuButtonWithTooltip.displayName = 'MenuButtonWithTooltip'

export { MenuButtonWithTooltip }
