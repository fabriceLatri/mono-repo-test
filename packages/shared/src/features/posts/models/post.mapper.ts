import type { PostDto } from './post.dto';
import type { PostEntity } from './post.entity';

export const toPostEntity = (dto: PostDto): PostEntity => ({
  userId: dto.userId,
  id: dto.id,
  title: dto.title,
  description: dto.body,
});
