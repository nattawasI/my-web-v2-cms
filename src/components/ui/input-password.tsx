'use client'

/** libs */
import { useState, InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

/** components */
import { Input } from '@/components/ui/input'
import { Eye, EyeOff } from 'lucide-react'

const InputPassword = ({ className, ...props }: Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>) => {
  const [openEye, setOpenEye] = useState<boolean>(false)

  const handleToggle = () => {
    setOpenEye((prev) => !prev)
  }

  return (
    <div className={cn('relative w-full', className)}>
      <Input type={openEye ? 'text' : 'password'} className="pr-10" {...props} />
      <button
        type="button"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        onClick={handleToggle}
      >
        {openEye ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
      </button>
    </div>
  )
}

export { InputPassword }
