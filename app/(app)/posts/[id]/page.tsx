"use client";

import QueryState from "@/shared/ui/query-state";
import { use } from "react";
import { formatDate } from "@/shared/lib/format-date";
import { usePost } from "@/entities/post/model/post.queries";

type PostDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = use(params);
  const { data: post, isPending, error, refetch } = usePost(id);

  return (
    <article className="mt-2 space-y-6 min-h-[calc(100vh-131px)]">
      <QueryState
        isLoading={isPending}
        isError={Boolean(error)}
        onRetry={() => refetch()}
        loadingLabel="Loading post..."
        errorLabel="Failed to load post. Please try again."
      />

      {post && (
        <>
          <header className="space-y-3 border-b border-white/10 pb-6">
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
              {post.title}
            </h1>
            <p className="text-sm text-gray-400">
              <span className="font-medium text-white">By {post.author}</span> •{" "}
              {formatDate(post.createdAt)}
            </p>
          </header>

          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 leading-relaxed text-base sm:text-lg whitespace-pre-wrap">
              {post.body}
            </p>
          </div>
        </>
      )}
    </article>
  );
}
