import { errorResponse, successResponse } from "@/shared/lib/api-response";
import { findPostById, updatePost, deletePost } from "@/shared/lib/posts";

type RouteContext = {
  params: {
    id: string;
  };
};

export async function GET(_request: Request, { params }: RouteContext) {
  const postId = Number(params.id);
  const post = findPostById(postId);

  if (!post) {
    return errorResponse("Post not found", 404);
  }

  return successResponse(post);
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const postId = Number(params.id);
    const post = findPostById(postId);

    if (!post) {
      return errorResponse("Post not found", 404);
    }

    const body = await request.json();
    const { title, body: bodyText } = body;

    if (title !== undefined && title.trim().length === 0) {
      return errorResponse("Title cannot be empty", 400);
    }

    if (bodyText !== undefined && bodyText.trim().length === 0) {
      return errorResponse("Body cannot be empty", 400);
    }

    const updated = updatePost(
      postId,
      title !== undefined ? title : post.title,
      bodyText !== undefined ? bodyText : post.body
    );

    if (!updated) {
      return errorResponse("Failed to update post", 500);
    }

    return successResponse(updated);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid request";
    return errorResponse(message, 400);
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const postId = Number(params.id);
    const post = findPostById(postId);

    if (!post) {
      return errorResponse("Post not found", 404);
    }

    const success = deletePost(postId);

    if (!success) {
      return errorResponse("Failed to delete post", 500);
    }

    return successResponse({ id: postId, deleted: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid request";
    return errorResponse(message, 400);
  }
}
