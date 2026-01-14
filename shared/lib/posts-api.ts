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
    const message = payload.success === false ? payload.error.message : "Request failed";
    const status = payload.success === false ? payload.error.status : response.status;
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

