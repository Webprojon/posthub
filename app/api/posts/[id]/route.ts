import { errorResponse, successResponse } from "@/shared/lib/api-response";
import { findPostById } from "@/shared/lib/posts";

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
