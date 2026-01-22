import {
  deletePost,
  findPostById,
  updatePost,
} from "@/entities/post/model/repository";
import { errorResponse, successResponse } from "@/shared/lib/api-response";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_req: Request, { params }: RouteContext) {
  const { id } = await params;
  const postId = Number(id);

  if (Number.isNaN(postId)) {
    return errorResponse("Invalid post id", 400);
  }

  const post = findPostById(postId);
  return post ? successResponse(post) : errorResponse("Post not found", 404);
}

export async function PUT(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const postId = Number(id);
    const post = findPostById(postId);

    if (!post) {
      return errorResponse("Post not found", 404);
    }

    const { title, body } = await request.json();

    if (!title || !body) {
      return errorResponse("title and body are required", 400);
    }

    const updated = updatePost(postId, title.trim(), body.trim());

    return updated
      ? successResponse(updated)
      : errorResponse("Failed to update post", 500);
  } catch {
    return errorResponse("Invalid JSON body", 400);
  }
}

export async function DELETE(_req: Request, { params }: RouteContext) {
  const { id } = await params;
  const postId = Number(id);

  if (Number.isNaN(postId)) {
    return errorResponse("Invalid post id", 400);
  }

  const post = findPostById(postId);
  if (!post) {
    return errorResponse("Post not found", 404);
  }

  return deletePost(postId)
    ? successResponse({ id: postId, deleted: true })
    : errorResponse("Failed to delete post", 500);
}
