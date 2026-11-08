import type { ReactNode } from 'react'

type DesktopLayoutProps = {
  menu?: ReactNode
  children: ReactNode
}

export function DesktopLayout({ menu, children }: DesktopLayoutProps) {
  return (
    <div className="flex min-h-svh">
      <aside className="flex w-56 shrink-0 flex-col gap-4 border-r border-border p-4 text-left">
        <p className="font-medium text-text-strong">Menu</p>
        {menu}
      </aside>
      <main className="flex-1 p-4">{children}</main>
    </div>
  )
}
