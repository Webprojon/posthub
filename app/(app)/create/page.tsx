"use client";

import { useRouter } from "next/navigation";
import { useCreatePostFeature } from "@/features/post/create/model/useCreatePost";
import { PostFormData } from "@/features/post/form/model/types";
import PostForm from "@/features/post/form/ul/PostForm";

export default function CreatePage() {
  const router = useRouter();
  const { submit, isLoading, error } = useCreatePostFeature();

  return (
    <PostForm
      mode="create"
      isSubmitting={isLoading}
      error={error}
      onSubmit={(data: PostFormData) =>
        submit({
          title: data.title,
          body: data.body,
        })
      }
      onCancel={() => router.push("/posts")}
    />
  );
}
