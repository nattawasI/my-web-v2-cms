/** libs */
import { cn } from '@/lib/utils/cn'

/** components */
import * as RadioGroup from '@radix-ui/react-radio-group'

type FilterTabsProps = {
  options: { label: string; value: string }[]
  value: string
  onValueChange: (value: string) => void
  disabled?: boolean
}

const FilterTabs = ({ options, value, onValueChange, disabled }: FilterTabsProps) => {
  return (
    <RadioGroup.Root
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground"
    >
      {options.map((item) => (
        <RadioGroup.Item
          key={item.value}
          value={item.value}
          className={cn(
            'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
            'data-[state=checked]:bg-background data-[state=checked]:text-foreground data-[state=checked]:shadow-sm',
          )}
        >
          {item.label}
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  )
}

export { FilterTabs }
