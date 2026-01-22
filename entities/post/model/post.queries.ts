import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postApi } from "../api/post.api";
import { postKeys } from "../api/post.keys";
import { CreatePostInput, UpdatePostDto, Post } from "./types";

export function usePosts() {
  return useQuery<Post[]>({
    queryKey: postKeys.list(),
    queryFn: async () => {
      const res = await postApi.getList();
      return res.data;
    },
  });
}

export function usePost(id: number | string) {
  return useQuery<Post>({
    queryKey: postKeys.detail(id),
    queryFn: async () => {
      const res = await postApi.getById(id);
      return res.data;
    },
    enabled: Boolean(id),
  });
}

export function useCreatePost() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePostInput) => postApi.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: postKeys.list() });
    },
  });
}

export function useUpdatePost(id: number | string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdatePostDto) => postApi.update(id, data),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: postKeys.list() });
      qc.invalidateQueries({ queryKey: postKeys.detail(id) });
    },
  });
}

export function useDeletePost() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number | string) => postApi.remove(id),
    onSuccess: (_, id) => {
      qc.invalidateQueries({ queryKey: postKeys.list() });
      qc.removeQueries({ queryKey: postKeys.detail(id) });
    },
  });
}
