"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchPost } from "@/shared/lib/posts-api";
import QueryState from "@/shared/ui/query-state";
import { use } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";

type PostDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = use(params);
  const postId = id;

  const {
    data: post,
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ["posts", postId],
    queryFn: () => fetchPost(postId),
    enabled: Boolean(postId),
  });

  return (
    <article className="mt-4 space-y-6 px-4 sm:px-0 max-w-2xl mx-auto">
      <QueryState
        isLoading={isPending}
        isError={Boolean(error)}
        onRetry={() => refetch()}
        loadingLabel="Loading post..."
        errorLabel="Failed to load post. Please try again."
      />

      {post && (
        <>
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium text-sm"
            aria-label="Go back to posts list"
          >
            <MdKeyboardArrowLeft className="w-5 h-5" />
            Back to posts
          </Link>

          <header className="space-y-3 border-b border-white/10 pb-6">
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
              {post.title}
            </h1>
            <p className="text-sm text-gray-400">
              <span className="font-medium text-white">By {post.author}</span> •
              {new Date(post.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
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
