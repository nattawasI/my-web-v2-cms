import { FormEvent, useState, ReactElement, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import type { Editor } from '@tiptap/react'

const ImagePopover = ({ editor, trigger }: { editor: Editor; trigger: ReactElement }) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent>
        <FormContent editor={editor} onClose={() => setOpen(false)} />
      </PopoverContent>
    </Popover>
  )
}

const FormContent = ({ editor, onClose }: { editor: Editor; onClose: () => void }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div>
      <input type="file" className="absolute left-0 top-0 h-px w-px" tabIndex={-1} ref={inputRef} />
      <Button className="w-full" onClick={() => inputRef.current?.click()}>
        Upload Image
      </Button>
      <Input placeholder="Caption text" className="mt-4" />
    </div>
  )
}

export { ImagePopover }
