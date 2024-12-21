'use client'

import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Button } from '@/components/ui/button'
import { Bold, Italic, Strikethrough } from 'lucide-react'

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World! 🌎️</p>',
    immediatelyRender: false,
  })

  return (
    <div>
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="flex gap-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive('bold') ? 'is-active' : ''}
            >
              <Bold />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive('italic') ? 'is-active' : ''}
            >
              <Italic />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={editor.isActive('strike') ? 'is-active' : ''}
            >
              <Strikethrough />
            </Button>
          </div>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} className="outline-none" />
    </div>
  )
}

export { Tiptap }
