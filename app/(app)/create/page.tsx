"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/shared/lib/auth-context";
import { useCreatePost } from "@/shared/lib/post-mutations";
import PostForm, { PostFormData } from "@/shared/ui/post-form";
import toast from "react-hot-toast";

export default function CreatePage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const createPost = useCreatePost();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (data: PostFormData) => {
    try {
      await createPost.mutateAsync({
        title: data.title,
        body: data.body,
        author: user?.name || "Anonymous",
      });
      router.push("/posts");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to create post";
      toast.error(message);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <PostForm
      mode="create"
      isSubmitting={createPost.isPending}
      error={createPost.error}
      initialValues={{
        title: "",
        body: "",
      }}
      onSubmit={handleSubmit}
      onCancel={() => router.push("/posts")}
    />
  );
}
