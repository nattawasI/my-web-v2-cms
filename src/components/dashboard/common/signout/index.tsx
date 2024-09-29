'use client'

/** libs */
import { Slot, SlotProps } from '@radix-ui/react-slot'

/** actions */
import { signOut } from './actions'

const SignOut = ({ ...props }: SlotProps) => {
  const handleClick = async () => {
    await signOut()
  }

  return <Slot onClick={handleClick} {...props} />
}

export { SignOut }
