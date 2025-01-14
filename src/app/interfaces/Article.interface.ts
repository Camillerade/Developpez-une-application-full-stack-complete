// src/app/interfaces/article.interface.ts
export interface Article {
  id: number;
  title: string;
  description: string;
  author: {
    id: number;
    username: string;
    email: string;
    // Autres propriétés de l'auteur si nécessaire
  };
  date: string;
  theme: {
    id: number;
    title: string;
    description: string;
    // Autres propriétés du thème si nécessaire
  };
  comments?: Comment
}
