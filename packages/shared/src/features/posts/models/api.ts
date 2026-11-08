import { createEntityAdapter, createSelector, type EntityState } from '@reduxjs/toolkit';
import { jsonPlaceholderApi } from '../../../core';
import type { PostDto } from './post.dto';
import type { PostEntity } from './post.entity';
import { toPostEntity } from './post.mapper';

export const postsAdapter = createEntityAdapter<PostEntity>();
const initialState = postsAdapter.getInitialState();

export type PostsState = EntityState<PostEntity, number>;

export const postsApi = jsonPlaceholderApi
  .injectEndpoints({
    endpoints: (build) => ({
      getPosts: build.query<PostsState, void>({
        query: () => 'posts',
        transformResponse: (response: PostDto[]) =>
          postsAdapter.setAll(initialState, response.map(toPostEntity)),
        providesTags: (result) => [
          { type: 'Post', id: 'LIST' },
          ...(result?.ids.map((id) => ({ type: 'Post' as const, id })) ?? []),
        ],
      }),

      getPostById: build.query<PostEntity, number>({
        query: (id) => `posts/${id}`,
        transformResponse: (response: PostDto) => toPostEntity(response),
        providesTags: (_result, _error, id) => [{ type: 'Post', id }],
      }),
    }),
  });

export const { useGetPostsQuery, useGetPostByIdQuery } = postsApi;

const selectPostsResult = postsApi.endpoints.getPosts.select();

const selectPostsData = createSelector(
  selectPostsResult,
  (result) => result.data ?? initialState,
);

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors(selectPostsData);
