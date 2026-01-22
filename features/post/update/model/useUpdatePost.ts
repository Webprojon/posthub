import { useUpdatePost } from "@/entities/post/model/post.queries";
import { UpdatePostDto } from "@/entities/post/model/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useUpdatePostFeature = (id: string) => {
  const router = useRouter();
  const mutation = useUpdatePost(id);

  const submit = (values: UpdatePostDto) => {
    mutation.mutate(values, {
      onSuccess: () => {
        toast.success("Post updated!");
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
    error: mutation.error,
  };
};
