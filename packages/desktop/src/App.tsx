import { Provider } from 'react-redux'
import { store } from '@repo/shared/core'
import { PostsList, ThemeRoot, ThemeSwitch } from '@repo/shared/features'
import { DesktopLayout } from '@repo/ui'

export default function App() {
  return (
    <Provider store={store}>
      <ThemeRoot>
        <DesktopLayout menu={<ThemeSwitch />}>
          <PostsList />
        </DesktopLayout>
      </ThemeRoot>
    </Provider>
  )
}
