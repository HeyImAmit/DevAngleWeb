// src/types/Post.ts
export interface Post {
  id: number;
  title: string;
  content: string;
  author: string; // This is the author's name from backend
  authorEmail: string;
  authorAvatar?: string;
  createdAt: string;
  tags: string[];
  likesCount: number;
  commentsCount: number;
}
