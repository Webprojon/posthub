import { createResourceApi } from "@/shared/api/createResourceApi";
import { CreatePostInput, Post, UpdatePostDto } from "../model/types";

export const postApi = createResourceApi<Post, CreatePostInput, UpdatePostDto>(
  "/posts",
);
