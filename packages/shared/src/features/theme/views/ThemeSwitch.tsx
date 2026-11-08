import { useTranslation } from 'react-i18next'
import { Switch } from '@repo/ui'
import { useTheme } from '../viewmodels/useTheme'

export function ThemeSwitch() {
  const { t } = useTranslation()
  const { theme, changeTheme } = useTheme()

  return (
    <Switch
      checked={theme.mode === 'dark'}
      onCheckedChange={(checked) => changeTheme(checked ? 'dark' : 'light')}
      classNames={{ border: "rounded-full" }}
    >
      {t('theme.darkMode')}
    </Switch>
  )
}
