import { Post } from "./types";

export let posts: Post[] = [
  {
    id: 1,
    title: "Understanding Next.js Route Handlers",
    body: "Lorem ipsum dolor sit amet...",
    author: "John Doe",
    createdAt: "2025-12-05T10:00:00.000Z",
  },
  {
    id: 2,
    title: "React Query in Client Components",
    body: "React Query works great in Next.js client components...",
    author: "Smith Johnson",
    createdAt: "2025-12-08T09:30:00.000Z",
  },
  {
    id: 3,
    title: "Hybrid Data Fetching Strategies",
    body: "Mixing server and client fetching...",
    author: "George Smith",
    createdAt: "2025-12-10T14:15:00.000Z",
  },
];

let lastId = Math.max(0, ...posts.map((p) => p.id));

export function findPostById(id: number): Post | null {
  return posts.find((post) => post.id === id) ?? null;
}

export function createPost(title: string, body: string, author: string): Post {
  const post: Post = {
    id: ++lastId,
    title,
    body,
    author,
    createdAt: new Date().toISOString(),
  };

  posts.push(post);
  return post;
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
  const initialLength = posts.length;
  posts = posts.filter((post) => post.id !== id);
  return posts.length < initialLength;
}
