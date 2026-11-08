import { useEffect, type ReactNode } from 'react'
import { cn } from '../utils/cn'

type DrawerProps = {
  open: boolean
  onClose: () => void
  children: ReactNode
}

export function Drawer({ open, onClose, children }: DrawerProps) {
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  return (
    <div className={cn('fixed inset-0 z-40', !open && 'pointer-events-none')} inert={!open}>
      <div
        onClick={onClose}
        className={cn(
          'absolute inset-0 bg-black/40 transition-opacity',
          open ? 'opacity-100' : 'opacity-0',
        )}
      />
      <aside
        className={cn(
          'absolute inset-y-0 left-0 flex w-64 max-w-[80%] flex-col gap-4 bg-elevated p-4 shadow-card transition-transform',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {children}
      </aside>
    </div>
  )
}
