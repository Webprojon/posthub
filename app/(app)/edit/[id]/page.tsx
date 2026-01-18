"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/shared/lib/auth-context";
import { useUpdatePost } from "@/shared/lib/post-mutations";
import { fetchPost } from "@/shared/lib/posts-api";
import PostForm, { PostFormData } from "@/shared/ui/post-form";
import QueryState from "@/shared/ui/query-state";
import { use } from "react";
import toast from "react-hot-toast";

type EditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function EditPage({ params }: EditPageProps) {
  const { id } = use(params);
  const postId = Number(id);
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const updatePost = useUpdatePost();

  const {
    data: post,
    isPending: isLoadingPost,
    error: postError,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPost(id),
    enabled: Boolean(id),
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (data: PostFormData) => {
    try {
      await updatePost.mutateAsync({
        postId,
        data: {
          title: data.title,
          body: data.body,
        },
      });
      router.push(`/posts/${postId}`);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to update post";
      toast.error(message);
    }
  };

  return (
    <div className="mt-4">
      <QueryState
        isLoading={isLoadingPost}
        isError={Boolean(postError)}
        onRetry={() => {}}
        loadingLabel="Loading post..."
        errorLabel="Failed to load post"
      />

      {post && (
        <PostForm
          mode="edit"
          isSubmitting={updatePost.isPending}
          error={updatePost.error}
          initialValues={{
            title: post.title,
            body: post.body,
          }}
          onSubmit={handleSubmit}
          onCancel={() => router.push(`/posts/${postId}`)}
        />
      )}
    </div>
  );
}
