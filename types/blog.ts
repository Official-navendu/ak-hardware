export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  category: string;
  tags: string[];
  readTime: string;
  published: boolean;
  publishedAt: string;
}
