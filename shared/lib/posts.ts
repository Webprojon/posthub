export type Post = {
  id: number;
  title: string;
  body: string;
  author: string;
  createdAt: string;
};

export const POSTS: Post[] = [
  {
    id: 1,
    title: "Understanding Next.js Route Handlers",
    body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt illo ipsa ut facilis numquam quos soluta veritatis maxime error sed.",
    author: "John Doe",
    createdAt: "2025-12-05T10:00:00.000Z",
  },
  {
    id: 2,
    title: "React Query in Client Components",
    body: "React Query works great in Next.js client components. Wrap your app with QueryClientProvider and use useQuery to handle caching, loading, and error states.",
    author: "Smith Johnson",
    createdAt: "2025-12-08T09:30:00.000Z",
  },
  {
    id: 3,
    title: "Hybrid Data Fetching Strategies",
    body: "Mixing server and client fetching lets you balance performance with interactivity. Server components can fetch initial data, while React Query keeps it fresh on the client side.",
    author: "George Smith",
    createdAt: "2025-12-10T14:15:00.000Z",
  },
];

export function findPostById(id: number) {
  return POSTS.find((post) => post.id === id);
}

export function createPost(title: string, body: string, author: string): Post {
  const newPost: Post = {
    id: Math.max(...POSTS.map((p) => p.id), 0) + 1,
    title,
    body,
    author,
    createdAt: new Date().toISOString(),
  };
  POSTS.push(newPost);
  return newPost;
}

export function updatePost(
  id: number,
  title: string,
  body: string,
): Post | null {
  const post = findPostById(id);
  if (!post) return null;
  post.title = title;
  post.body = body;
  return post;
}

export function deletePost(id: number): boolean {
  const index = POSTS.findIndex((post) => post.id === id);
  if (index === -1) return false;
  POSTS.splice(index, 1);
  return true;
}
