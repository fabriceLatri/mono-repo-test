import { useSelector } from 'react-redux'
import { selectAllPosts, useGetPostsQuery } from '../models/api'

export function usePostsViewModel() {
  const { isError, isLoading } = useGetPostsQuery()
  const posts = useSelector(selectAllPosts)

  return { posts, isError, isLoading }
}
