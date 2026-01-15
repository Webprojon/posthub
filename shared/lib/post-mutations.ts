import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deletePost as deletePostApi,
  updatePost as updatePostApi,
  createPost as createPostApi,
} from "./posts-api";
import { Post } from "./posts";
import toast from "react-hot-toast";

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => deletePostApi(postId),
    onMutate: async (postId: number) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      await queryClient.cancelQueries({ queryKey: ["post", postId] });

      // Snapshot the previous value
      const previousPosts = queryClient.getQueryData<Post[]>(["posts"]);

      // Optimistically update the cache
      if (previousPosts) {
        queryClient.setQueryData(
          ["posts"],
          previousPosts.filter((post) => post.id !== postId)
        );
      }

      return { previousPosts };
    },
    onError: (error, postId, context) => {
      // Rollback on error
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts"], context.previousPosts);
      }
      toast.error("Failed to delete post");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post deleted successfully!");
    },
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { title: string; body: string; author: string }) =>
      createPostApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post created successfully!");
    },
    onError: () => {
      toast.error("Failed to create post");
    },
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      data,
    }: {
      postId: number;
      data: { title?: string; body?: string };
    }) => updatePostApi(postId, data),
    onMutate: async ({ postId, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      await queryClient.cancelQueries({ queryKey: ["post", postId] });

      // Snapshot the previous values
      const previousPosts = queryClient.getQueryData<Post[]>(["posts"]);
      const previousPost = queryClient.getQueryData<Post>(["post", postId]);

      // Optimistically update posts list
      if (previousPosts) {
        queryClient.setQueryData(
          ["posts"],
          previousPosts.map((post) =>
            post.id === postId ? { ...post, ...data } : post
          )
        );
      }

      // Optimistically update post detail
      if (previousPost) {
        queryClient.setQueryData(["post", postId], {
          ...previousPost,
          ...data,
        });
      }

      return { previousPosts, previousPost };
    },
    onError: (error, { postId }, context) => {
      // Rollback on error
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts"], context.previousPosts);
      }
      if (context?.previousPost) {
        queryClient.setQueryData(["post", postId], context.previousPost);
      }
      toast.error("Failed to update post");
    },
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      toast.success("Post updated successfully!");
    },
  });
}
