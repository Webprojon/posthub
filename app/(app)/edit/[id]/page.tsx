"use client";

import { useRouter } from "next/navigation";
import QueryState from "@/shared/ui/query-state";
import { use } from "react";
import { usePost } from "@/entities/post/model/post.queries";
import { useUpdatePostFeature } from "@/features/post/update/model/useUpdatePost";
import PostForm from "@/features/post/form/ul/PostForm";
import { PostFormData } from "@/features/post/form/model/types";

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
  const { submit, isLoading } = useUpdatePostFeature(id);

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
            submit({
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
