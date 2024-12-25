/** libs */
import { ReactElement, Fragment } from 'react'

/** components */
import { Separator } from '@/components/ui/separator'
import {
  LetterText,
  Heading2,
  Heading3,
  Heading4,
  List,
  ListOrdered,
  Image as ImageIcon,
  Bold,
  Italic,
  Underline,
  Link,
} from 'lucide-react'
import { TooltipProvider } from '@/components/ui/tooltip'
import { MenuButtonWithTooltip } from './menu-button-with-tooltip'
import { MenuPopover } from './menu-popover'
import { LinkPopover } from './link-popover'

/** types */
import type { Editor } from '@tiptap/react'

export type MenuItemType = {
  type: string
  level?: number
  icon: ReactElement
  label: string
  action?: (editor: Editor) => boolean
}

const Menu = ({ editor }: { editor: Editor }) => {
  const elementItems: MenuItemType[] = [
    {
      type: 'paragraph',
      icon: <LetterText className="h-4 w-4" />,
      label: 'Paragraph',
      action: () => editor.chain().focus().setParagraph().run(),
    },
    {
      type: 'heading',
      level: 2,
      icon: <Heading2 className="h-4 w-4" />,
      label: 'Heading 2',
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      type: 'heading',
      level: 3,
      icon: <Heading3 className="h-4 w-4" />,
      label: 'Heading 3',
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      type: 'heading',
      level: 4,
      icon: <Heading4 className="h-4 w-4" />,
      label: 'Heading 4',
      action: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
    },
    {
      type: 'bulletList',
      icon: <List className="h-4 w-4" />,
      label: 'Bulleted list',
      action: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      type: 'orderedList',
      icon: <ListOrdered className="h-4 w-4" />,
      label: 'Ordered list',
      action: () => editor.chain().focus().toggleOrderedList().run(),
    },
    {
      type: 'image',
      icon: <ImageIcon className="h-4 w-4" />,
      label: 'Image',
    },
    {
      type: 'bold',
      icon: <Bold className="h-4 w-4" />,
      label: 'Bold',
      action: () => editor.chain().focus().toggleBold().run(),
    },
    {
      type: 'italic',
      icon: <Italic className="h-4 w-4" />,
      label: 'Italic',
      action: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      type: 'underline',
      icon: <Underline className="h-4 w-4" />,
      label: 'Underline',
      action: () => editor.chain().focus().toggleUnderline().run(),
    },
    {
      type: 'link',
      icon: <Link className="h-4 w-4" />,
      label: 'Link',
    },
  ]

  return (
    <TooltipProvider delayDuration={400}>
      <div className="flex gap-2">
        {elementItems.map((item) => {
          return (
            <Fragment key={item.type + (item.level ? `-${item.level}` : '')}>
              {item.type === 'bold' ? <Separator orientation="vertical" className="h-6" /> : null}
              {item.type !== 'image' && item.type !== 'link' ? (
                <MenuButtonWithTooltip editor={editor} data={item}>
                  {item.icon}
                </MenuButtonWithTooltip>
              ) : null}
              {item.type === 'image' ? (
                <MenuPopover
                  triggerSlot={
                    <MenuButtonWithTooltip editor={editor} data={item}>
                      {item.icon}
                    </MenuButtonWithTooltip>
                  }
                  contentSlot={<div>Content</div>}
                />
              ) : null}
              {item.type === 'link' ? (
                <LinkPopover
                  editor={editor}
                  trigger={
                    <MenuButtonWithTooltip editor={editor} data={item}>
                      {item.icon}
                    </MenuButtonWithTooltip>
                  }
                />
              ) : null}
            </Fragment>
          )
        })}
      </div>
    </TooltipProvider>
  )
}

export { Menu }
