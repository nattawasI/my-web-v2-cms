import { useRef } from 'react'
import { MenuButtonWithTooltip, type MenuButtonWithTooltipProps } from './menu-button-with-tooltip'

const ImageButton = ({ editor, data }: MenuButtonWithTooltipProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = () => {
    const file = inputRef.current?.files?.[0]

    if (file) {
      editor
        .chain()
        .focus()
        .setImage({ src: URL.createObjectURL(file), alt: 'test alt', title: 'test' })
        .run()

      inputRef.current.value = ''
    }
  }

  return (
    <div className="relative">
      <input
        type="file"
        className="absolute left-0 top-0 h-px w-px"
        tabIndex={-1}
        ref={inputRef}
        onChange={handleChange}
      />
      <MenuButtonWithTooltip editor={editor} data={data} onClick={() => inputRef.current?.click()}>
        {data.icon}
      </MenuButtonWithTooltip>
    </div>
  )
}

export { ImageButton }
