import { configureStore } from '@reduxjs/toolkit';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { jsonPlaceholderApi } from '../../../core';
import { postsApi, selectAllPosts, selectPostById, selectPostIds } from './api';
import type { PostDto } from './post.dto';

const postDtos: PostDto[] = [
  { userId: 1, id: 1, title: 'First', body: 'First body' },
  { userId: 2, id: 2, title: 'Second', body: 'Second body' },
];

const makeStore = () =>
  configureStore({
    reducer: { [jsonPlaceholderApi.reducerPath]: jsonPlaceholderApi.reducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(jsonPlaceholderApi.middleware),
  });

const mockFetchResponse = (body: unknown, status = 200) =>
  vi.mocked(fetch).mockResolvedValueOnce(
    new Response(JSON.stringify(body), {
      status,
      headers: { 'Content-Type': 'application/json' },
    }),
  );

const requestedUrl = () => {
  const request = vi.mocked(fetch).mock.calls[0][0] as Request;
  return request.url;
};

describe('postsApi', () => {
  let store: ReturnType<typeof makeStore>;

  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
    store = makeStore();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('getPosts', () => {
    it('fetches /posts and normalizes the mapped entities', async () => {
      mockFetchResponse(postDtos);

      const result = await store.dispatch(postsApi.endpoints.getPosts.initiate());

      expect(requestedUrl()).toBe('https://jsonplaceholder.typicode.com/posts');
      expect(result.data?.ids).toEqual([1, 2]);
      expect(result.data?.entities[1]).toEqual({
        userId: 1,
        id: 1,
        title: 'First',
        description: 'First body',
      });
    });

    it('exposes the cached posts through the selectors', async () => {
      mockFetchResponse(postDtos);

      await store.dispatch(postsApi.endpoints.getPosts.initiate());
      const state = store.getState();

      expect(selectPostIds(state)).toEqual([1, 2]);
      expect(selectAllPosts(state).map((post) => post.description)).toEqual([
        'First body',
        'Second body',
      ]);
      expect(selectPostById(state, 2)?.title).toBe('Second');
    });

    it('returns an error when the request fails', async () => {
      mockFetchResponse({ message: 'Server error' }, 500);

      const result = await store.dispatch(postsApi.endpoints.getPosts.initiate());

      expect(result.isError).toBe(true);
      expect(result.error).toMatchObject({ status: 500 });
    });
  });

  describe('getPostById', () => {
    it('fetches /posts/:id and maps the dto to an entity', async () => {
      mockFetchResponse(postDtos[1]);

      const result = await store.dispatch(postsApi.endpoints.getPostById.initiate(2));

      expect(requestedUrl()).toBe('https://jsonplaceholder.typicode.com/posts/2');
      expect(result.data).toEqual({
        userId: 2,
        id: 2,
        title: 'Second',
        description: 'Second body',
      });
    });
  });

  describe('selectors without cached data', () => {
    it('return an empty state', () => {
      const state = store.getState();

      expect(selectAllPosts(state)).toEqual([]);
      expect(selectPostById(state, 1)).toBeUndefined();
    });
  });
});
