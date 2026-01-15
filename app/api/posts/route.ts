import { POSTS, createPost } from "@/shared/lib/posts";
import { successResponse, errorResponse } from "@/shared/lib/api-response";

export async function GET() {
  return successResponse(POSTS);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, body: bodyText, author } = body;

    if (!title || !bodyText || !author) {
      return errorResponse(
        "Missing required fields: title, body, author",
        400
      );
    }

    if (title.trim().length === 0 || bodyText.trim().length === 0) {
      return errorResponse("Title and body cannot be empty", 400);
    }

    const newPost = createPost(title, bodyText, author);
    return successResponse(newPost, 201);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid request";
    return errorResponse(message, 400);
  }
}

