import { describe, expect, it } from 'vitest';
import type { PostDto } from './post.dto';
import { toPostEntity } from './post.mapper';

describe('toPostEntity', () => {
  it('maps a PostDto to a PostEntity', () => {
    const dto: PostDto = { userId: 1, id: 42, title: 'Title', body: 'Body content' };

    expect(toPostEntity(dto)).toEqual({
      userId: 1,
      id: 42,
      title: 'Title',
      description: 'Body content',
    });
  });

  it('does not keep the body property', () => {
    const dto: PostDto = { userId: 1, id: 1, title: 't', body: 'b' };

    expect(toPostEntity(dto)).not.toHaveProperty('body');
  });
});
