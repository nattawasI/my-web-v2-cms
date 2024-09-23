import { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

type SearchInputProps = InputHTMLAttributes<HTMLInputElement>

const SearchInput = ({ type = 'search', className, placeholder = 'Search', ...props }: SearchInputProps) => {
  return (
    <div className={cn('relative', className)}>
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type={type}
        placeholder={placeholder}
        className="w-full appearance-none bg-background pl-8 shadow-none"
        {...props}
      />
    </div>
  )
}

export { SearchInput }
