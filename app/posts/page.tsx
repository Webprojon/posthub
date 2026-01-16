"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/shared/lib/posts-api";
import { useDeletePost } from "@/shared/lib/post-mutations";
import QueryState from "@/shared/ui/query-state";
import { useAuth } from "@/shared/lib/auth-context";
import { RiDeleteBin5Line, RiEdit2Line, RiFileAddLine } from "react-icons/ri";

export default function PostsPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const {
    data: posts,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const deletePost = useDeletePost();

  const handleDelete = async (postId: number) => {
    try {
      await deletePost.mutateAsync(postId);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to delete post");
    }
  };

  return (
    <div className="mt-4 space-y-4 px-4 sm:px-0">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Posts</h1>
        {isAuthenticated && (
          <Link
            href="/create"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-colors rounded-md font-medium text-white text-sm sm:text-base"
            aria-label="Create new post"
          >
            <RiFileAddLine className="w-4 h-4" />
            <span className="hidden sm:inline">New Post</span>
          </Link>
        )}
      </div>

      <QueryState
        isLoading={isLoading}
        isError={Boolean(error)}
        onRetry={() => refetch()}
        loadingLabel="Loading posts..."
        errorLabel="Failed to load posts. Please try again."
      />

      {posts && posts.length > 0 && (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li
              key={post.id}
              className="rounded-md border border-white/20 p-4 sm:p-6 hover:border-white/40 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/posts/${post.id}`}
                    className="text-lg font-semibold text-blue-400 hover:text-blue-300 transition-colors line-clamp-2"
                  >
                    {post.title}
                  </Link>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">
                    by <span className="font-medium">{post.author}</span> •{" "}
                    {new Date(post.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <p className="mt-2 text-sm text-gray-300 line-clamp-2">
                    {post.body}
                  </p>
                </div>

                {isAuthenticated && (
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => router.push(`/edit/${post.id}`)}
                      disabled={deletePost.isPending}
                      className="p-2 border border-white/20 rounded-md hover:border-blue-500 hover:text-blue-500 hover:bg-blue-600/10 transition-colors disabled:opacity-50"
                      aria-label={`Edit post: ${post.title}`}
                      title="Edit post"
                    >
                      <RiEdit2Line className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      disabled={deletePost.isPending}
                      className="p-2 border border-white/20 rounded-md hover:border-red-500 hover:text-red-500 hover:bg-red-600/10 transition-colors disabled:opacity-50"
                      aria-label={`Delete post: ${post.title}`}
                      title="Delete post"
                    >
                      <RiDeleteBin5Line className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {posts && posts.length === 0 && !isLoading && (
        <div className="text-center py-12 px-4">
          <RiFileAddLine className="w-16 h-16 mx-auto mb-4 text-gray-500/50" />
          <p className="text-gray-400 mb-4 text-lg font-medium">No posts yet</p>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">
            Get started by creating your first post to share your thoughts with
            the world.
          </p>
          {isAuthenticated && (
            <Link
              href="/create"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-colors rounded-md font-medium text-white"
            >
              <RiFileAddLine className="w-4 h-4" />
              Create First Post
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
