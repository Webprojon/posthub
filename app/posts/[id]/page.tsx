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
    <article className="mt-4 space-y-3">
      <QueryState
        isLoading={isPending}
        isError={Boolean(error)}
        onRetry={() => refetch()}
        loadingLabel="Loading post..."
        errorLabel="Failed to load post"
      />

      {post && (
        <>
          <Link href="/posts" className="flex items-center gap-2">
            <MdKeyboardArrowLeft className="size-6" />
            Back to posts
          </Link>

          <header className="space-y-2 mt-6">
            <h1 className="text-2xl font-semibold">{post.title}</h1>
            <p className="text-sm text-gray-300">
              by {post.author} • {new Date(post.createdAt).toLocaleString()}
            </p>
          </header>

          <p className="text-gray-400 leading-relaxed">{post.body}</p>
        </>
      )}
    </article>
  );
}
