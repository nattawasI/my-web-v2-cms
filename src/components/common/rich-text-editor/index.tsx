'use client'

import { cn } from '@/lib/utils/cn'
import { useEditor, EditorContent } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'
import ListItem from '@tiptap/extension-list-item'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import { Dropcursor } from '@tiptap/extension-dropcursor'
import { Menu } from './menu'

const RichTextEditor = () => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Heading,
      ListItem,
      BulletList,
      OrderedList,
      Image,
      Dropcursor,
      Bold,
      Italic,
      Underline,
      Link,
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return `Heading ${node.attrs.level}`
          } else {
            return 'Start typing...'
          }
        },
      }),
    ],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: cn('prose focus:outline-none'),
      },
    },
  })

  return (
    <div className="flex min-h-60 flex-col rounded-md border border-border">
      <EditorContent editor={editor} className="flex-1 overflow-y-auto p-4" />
      <div className="border-t border-border p-2">{editor ? <Menu editor={editor} /> : null}</div>
    </div>
  )
}

export { RichTextEditor }
