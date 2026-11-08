import type { ReactNode } from 'react'
import { Switch as AriaSwitch } from 'react-aria-components'
import { cn } from '../utils/cn'

type SwitchProps = {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  children?: ReactNode
  classNames?: {
    container?: string,
    border?: string;
  }
}

export function Switch({ checked, onCheckedChange, children, classNames }: SwitchProps) {
  return (
    <AriaSwitch
      isSelected={checked}
      onChange={onCheckedChange}
      className={cn('group flex cursor-pointer items-center justify-between gap-4', classNames?.container)}
    >
      {children && <span className="text-text-strong">{children}</span>}
      <span className={cn("relative inline-flex h-6 w-11 shrink-0 items-center rounded-control bg-border transition-colors group-data-selected:bg-accent group-data-focus-visible:outline-2 group-data-focus-visible:outline-offset-2 group-data-focus-visible:outline-accent", classNames?.border)}>
        <span className="inline-block h-5 w-5 translate-x-0.5 rounded-full bg-bg shadow transition-transform group-data-selected:translate-x-5" />
      </span>
    </AriaSwitch>
  )
}
