// src/app/interfaces/comment.interface.ts
export interface Comment {
    id?: number;
    content: string;
    date: string;
    author: {
      id: number;
      username: string;
    };
    articleId: number;
  }
  