import { POSTS } from "@/shared/lib/posts";
import { successResponse } from "@/shared/lib/api-response";

export async function GET() {
  return successResponse(POSTS);
}

