"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/shared/lib/posts-api";
import { useDeletePost } from "@/shared/lib/post-mutations";
import QueryState from "@/shared/ui/query-state";
import { useAuth } from "@/shared/lib/auth-context";
import { RiDeleteBin5Line, RiEdit2Line } from "react-icons/ri";

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
                className="rounded-md border border-white/50 p-4"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <Link
                      href={`/posts/${post.id}`}
                      className="text-lg font-medium text-blue-500 hover:underline"
                    >
                      {post.title}
                    </Link>
                    <p className="text-sm text-gray-300">
                      by {post.author} •{" "}
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                    <p className="mt-2 text-sm text-gray-400">{post.body}</p>
                  </div>

                  {isAuthenticated && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(post.id)}
                        disabled={deletePost.isPending}
                        className="p-2 cursor-pointer border border-white/50 rounded hover:border-red-500 hover:text-red-500 transition"
                      >
                        <RiDeleteBin5Line />
                      </button>
                      <button
                        onClick={() => router.push(`/edit/${post.id}`)}
                        disabled={deletePost.isPending}
                        className="p-2 cursor-pointer border border-white/50 rounded hover:border-blue-500 hover:text-blue-500 transition"
                      >
                        <RiEdit2Line />
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {posts && posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">No posts yet.</p>
          {isAuthenticated && (
            <Link
              href="/create"
              className="text-blue-500 hover:underline font-medium"
            >
              Create the first post
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
