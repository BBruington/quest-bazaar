export interface Post {
  id: string;
  userId: string;
  title: string;
  description: string;
  author: string;
  mainImage: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Posts {
  post: Post[]
}