import { useDeletePost } from "@/entities/post/model/post.queries";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useDeletePostFeature = () => {
  const router = useRouter();
  const mutation = useDeletePost();

  const submit = (id: number) => {
    mutation.mutate(id, {
      onSuccess: () => {
        toast.success("Post deleted");
        router.push("/posts");
      },
      onError: (error) => {
        toast.error((error as Error).message);
      },
    });
  };

  return {
    submit,
    isLoading: mutation.isPending,
  };
};
