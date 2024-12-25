'use client'

import { cn } from '@/lib/utils/cn'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import { Menu } from './menu'

const RichTextEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Image,
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
        class: cn('prose max-w-full focus:outline-none'),
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
