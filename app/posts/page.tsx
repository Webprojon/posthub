"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/shared/lib/posts-api";
import QueryState from "@/shared/ui/query-state";

export default function PostsPage() {
  const {
    data: posts,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  return (
    <div className="mt-4 space-y-4">
      <QueryState
        isLoading={isLoading}
        isError={Boolean(error)}
        onRetry={() => refetch()}
        loadingLabel="Loading posts..."
        errorLabel="Failed to load posts"
      />

      {posts && posts.length > 0 && (
        <>
          <h1 className="text-2xl font-semibold">Posts</h1>
          <ul className="space-y-4">
            {posts.map((post) => (
              <li
                key={post.id}
                className="rounded-md border border-gray-500 p-4"
              >
                <Link
                  href={`/posts/${post.id}`}
                  className="text-lg font-medium text-blue-500"
                >
                  {post.title}
                </Link>
                <p className="text-sm text-gray-300">
                  by {post.author} •{" "}
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <p className="mt-2 text-sm text-gray-400">{post.body}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
