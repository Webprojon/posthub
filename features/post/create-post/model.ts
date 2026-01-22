import { useCreatePost } from "@/entities/post/model/post.queries";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/shared/lib/auth-context";
import { CreatePostInput } from "@/entities/post/model/types";

export const useCreatePostFeature = () => {
  const router = useRouter();
  const { user } = useAuth();

  const mutation = useCreatePost();

  const createPost = (values: Omit<CreatePostInput, "author">) => {
    mutation.mutate(
      {
        ...values,
        author: user!.name,
      },
      {
        onSuccess: () => {
          toast.success("Post created successfully!");
          router.push("/posts");
        },
        onError: (error) => {
          toast.error((error as Error).message);
        },
      },
    );
  };

  return {
    createPost,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
