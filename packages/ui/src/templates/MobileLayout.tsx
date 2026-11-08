import { useState, type ReactNode } from 'react'
import { Drawer } from '../molecules/Drawer'

type MobileLayoutProps = {
  title: string
  menu?: ReactNode
  children: ReactNode
}

export function MobileLayout({ title, menu, children }: MobileLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="flex min-h-svh flex-col">
      <header className="flex items-center gap-4 border-b border-border p-4 text-left font-medium text-text-strong">
        <button
          type="button"
          aria-label="Ouvrir le menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
          className="text-2xl leading-none"
        >
          ☰
        </button>
        {title}
      </header>
      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)}>
        <div className="flex items-center justify-between">
          <p className="font-medium text-text-strong">Menu</p>
          <button
            type="button"
            aria-label="Fermer le menu"
            onClick={() => setMenuOpen(false)}
            className="text-2xl leading-none"
          >
            ×
          </button>
        </div>
        {menu}
      </Drawer>
      <main className="flex-1">{children}</main>
    </div>
  )
}
