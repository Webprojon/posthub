export type Post = {
  id: number;
  title: string;
  body: string;
  author: string;
  createdAt: string;
};

export type CreatePostInput = {
  title: string;
  body: string;
  author: string;
};

export type UpdatePostDto = Partial<CreatePostInput>;
