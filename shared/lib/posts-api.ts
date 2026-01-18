import { ApiError, ApiSuccess } from "./api-response";
import { Post } from "./posts";

export class ApiClientError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
  }
}

async function parseResponse<T>(response: Response): Promise<T> {
  const payload = (await response.json()) as ApiSuccess<T> | ApiError;

  if (!response.ok || payload.success === false) {
    const message =
      payload.success === false ? payload.error.message : "Request failed";
    const status =
      payload.success === false ? payload.error.status : response.status;
    throw new ApiClientError(message, status);
  }

  return payload.data;
}

export async function fetchPosts() {
  const res = await fetch("/api/posts");
  return parseResponse<Post[]>(res);
}

export async function fetchPost(postId: string) {
  const res = await fetch(`/api/posts/${postId}`);
  return parseResponse<Post>(res);
}

export async function createPost(data: {
  title: string;
  body: string;
  author: string;
}) {
  const res = await fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return parseResponse<Post>(res);
}

export async function updatePost(
  postId: number,
  data: { title?: string; body?: string },
) {
  const res = await fetch(`/api/posts/${postId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return parseResponse<Post>(res);
}

export async function deletePost(postId: number) {
  const res = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
  });
  return parseResponse<{ id: number; deleted: boolean }>(res);
}
