import type { ComponentProps } from 'react'
import { cn } from '../utils/cn'

type ButtonProps = ComponentProps<'button'> & {
  variant?: 'primary'
}

export function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  return <button className={cn('btn', `btn-${variant}`, className)} {...props} />
}
