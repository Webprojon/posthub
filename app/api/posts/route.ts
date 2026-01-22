import { createPost, posts } from "@/entities/post/model/repository";
import { successResponse, errorResponse } from "@/shared/lib/api-response";

export async function GET() {
  return successResponse(posts);
}

export async function POST(request: Request) {
  try {
    const { title, body, author } = await request.json();

    if (!title || !body || !author) {
      return errorResponse("title, body and author are required", 400);
    }

    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();

    if (!trimmedTitle || !trimmedBody) {
      return errorResponse("title and body cannot be empty", 400);
    }

    const post = createPost(trimmedTitle, trimmedBody, author);
    return successResponse(post, 201);
  } catch {
    return errorResponse("Invalid JSON body", 400);
  }
}
