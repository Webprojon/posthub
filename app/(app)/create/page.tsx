"use client";

import { useRouter } from "next/navigation";
import PostForm, { PostFormData } from "@/shared/ui/post-form";
import { useCreatePostFeature } from "@/features/post/create-post/model";

export default function CreatePage() {
  const router = useRouter();
  const { createPost, isLoading, error } = useCreatePostFeature();

  return (
    <PostForm
      mode="create"
      isSubmitting={isLoading}
      error={error}
      onSubmit={(data: PostFormData) =>
        createPost({
          title: data.title,
          body: data.body,
        })
      }
      onCancel={() => router.push("/posts")}
    />
  );
}
