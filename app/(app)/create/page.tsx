"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/shared/lib/auth-context";
import { useCreatePost } from "@/shared/lib/post-mutations";
import PostForm, { PostFormData } from "@/shared/ui/post-form";
import toast from "react-hot-toast";

export default function CreatePage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const createPost = useCreatePost();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [user, isLoading, router]);

  const handleSubmit = async (data: PostFormData) => {
    if (!user) return;

    try {
      await createPost.mutateAsync({
        title: data.title,
        body: data.body,
        author: user.name,
      });
      router.push("/posts");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create post",
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
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
