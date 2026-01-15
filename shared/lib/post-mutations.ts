import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost as deletePostApi } from "./posts-api";
import { Post } from "./posts";

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => deletePostApi(postId),
    onMutate: async (postId: number) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      await queryClient.cancelQueries({ queryKey: ["post", postId] });

      const previousPosts = queryClient.getQueryData<Post[]>(["posts"]);

      if (previousPosts) {
        queryClient.setQueryData(
          ["posts"],
          previousPosts.filter((post) => post.id !== postId)
        );
      }

      return { previousPosts };
    },
    onError: (error, postId, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts"], context.previousPosts);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { title: string; body: string; author: string }) =>
      import("./posts-api").then((m) => m.createPost(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
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
    }) => import("./posts-api").then((m) => m.updatePost(postId, data)),
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
  });
}
