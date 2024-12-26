import { FormEvent, useState, ComponentPropsWithoutRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { MenuButtonWithTooltip, type MenuButtonWithTooltipProps } from './menu-button-with-tooltip'

type Props = Pick<MenuButtonWithTooltipProps, 'editor' | 'data'>

const LinkPopover = ({ editor, data }: Props) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <MenuButtonWithTooltip editor={editor} data={data}>
          {data.icon}
        </MenuButtonWithTooltip>
      </PopoverTrigger>
      <PopoverContent>
        <FormContent editor={editor} onClose={() => setOpen(false)} />
      </PopoverContent>
    </Popover>
  )
}

const FormContent = ({ editor, onClose }: { onClose: () => void } & Pick<Props, 'editor'>) => {
  const { href } = editor.getAttributes('link')

  const [value, setValue] = useState<string>(href ?? '')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    onClose()

    if (value) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: value }).run()
    } else {
      editor.chain().focus().unsetLink().run()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input name="url" placeholder="Add URL" value={value} onChange={(e) => setValue(e.target.value)} />
      <Button type="submit" className="mt-4 w-full">
        Add
      </Button>
    </form>
  )
}

export { LinkPopover }
