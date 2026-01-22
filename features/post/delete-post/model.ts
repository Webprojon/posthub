import { useDeletePost } from "@/entities/post/model/post.queries";
import toast from "react-hot-toast";

export const useDeletePostFeature = () => {
  const mutation = useDeletePost();

  const deletePost = (id: number) => {
    mutation.mutate(id, {
      onSuccess: () => {
        toast.success("Post deleted successfully");
      },
      onError: (error) => {
        toast.error((error as Error).message);
      },
    });
  };

  return {
    deletePost,
    isDeleting: mutation.isPending,
  };
};
