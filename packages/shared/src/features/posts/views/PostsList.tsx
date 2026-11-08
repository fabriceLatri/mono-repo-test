import type { ReactNode } from 'react'
import { Button, PostCard, VirtualizedList } from '@repo/ui'
import type { PostEntity } from '../models/post.entity'
import { usePostsViewModel } from '../viewmodels/usePostsViewModel'
import './posts.css'

type PostsListProps = {
  orientation?: 'vertical' | 'horizontal'
  className?: string
  renderItem?: (post: PostEntity) => ReactNode
}

const renderFullPost = ({ title, description }: PostEntity) => (
  <PostCard title={title} description={description}>
    <Button>Voir</Button>
  </PostCard>
)

export function PostsList({ orientation, className, renderItem = renderFullPost }: PostsListProps) {
  const { posts, isError, isLoading } = usePostsViewModel()

  if (isError) return <p>Something went wrong!!</p>

  if (isLoading) return <p>Loading...</p>

  return (
    <div className="posts-list">
      <VirtualizedList
        items={posts}
        orientation={orientation}
        className={className}
        renderItem={renderItem}
      />
    </div>
  )
}
