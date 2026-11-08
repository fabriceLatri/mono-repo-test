import { Provider } from 'react-redux'
import { store } from '@repo/shared/core'
import { PostsList, ThemeRoot, ThemeSwitch } from '@repo/shared/features'
import { MobileLayout } from '@repo/ui'

export default function App() {
  return (
    <Provider store={store}>
      <ThemeRoot>
        <MobileLayout title="Posts" menu={<ThemeSwitch />}>
          <PostsList
            orientation="horizontal"
            className="h-48"
            renderItem={({ title }) => (
              <div className="card h-full w-56">
                <h2 className="line-clamp-2">{title}</h2>
              </div>
            )}
          />
        </MobileLayout>
      </ThemeRoot>
    </Provider>
  )
}
