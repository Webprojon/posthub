"use client";

import { useRouter } from "next/navigation";
import PostForm, { PostFormData } from "@/shared/ui/post-form";
import QueryState from "@/shared/ui/query-state";
import { use } from "react";
import { usePost } from "@/entities/post/model/post.queries";
import { useUpdatePostFeature } from "@/features/post/update-post/model";

type EditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function EditPage({ params }: EditPageProps) {
  const { id } = use(params);
  const router = useRouter();

  const {
    data: post,
    isPending: isLoadingPost,
    error: postError,
  } = usePost(id);
  const { updatePost, isLoading } = useUpdatePostFeature(id);

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
          isSubmitting={isLoading}
          initialValues={{
            title: post.title,
            body: post.body,
          }}
          onSubmit={(data: PostFormData) =>
            updatePost({
              title: data.title,
              body: data.body,
            })
          }
          onCancel={() => router.push("/posts")}
        />
      )}
    </div>
  );
}
