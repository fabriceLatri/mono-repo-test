import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { useTheme } from '../viewmodels/useTheme'

export function ThemeRoot({ children }: { children: ReactNode }) {
  const { theme } = useTheme()

  useEffect(() => {
    document.documentElement.dataset.theme = theme.mode
  }, [theme.mode])

  return <>{children}</>
}
