"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/shared/lib/auth-context";
import { useCreatePost } from "@/shared/lib/post-mutations";
import Button from "@/shared/ui/button";
import Input from "@/shared/ui/input";

type FormData = {
  title: string;
  body: string;
  author: string;
};

export default function CreatePage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const createPost = useCreatePost();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      body: "",
      author: user?.name || "",
    },
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/posts");
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (data: FormData) => {
    try {
      await createPost.mutateAsync(data);
      reset();
      router.push("/posts");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to create post";
      setError("title", { message });
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold">Create a New Post</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
        <div>
          <Input
            id="title"
            placeholder="Enter post title"
            disabled={isSubmitting}
            error={!!errors.title}
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 3,
                message: "Title must be at least 3 characters",
              },
            })}
          />
          {errors.title && (
            <p id="title-error" className="text-red-500 text-sm mt-1">
              {errors.title.message}
            </p>
          )}
        </div>

        <div>
          <textarea
            rows={6}
            id="body"
            disabled={isSubmitting}
            placeholder="Enter post content"
            className={`w-full px-3 py-2 border rounded-md bg-transparent text-white/50 placeholder-white/50 outline-none ${
              errors.body ? "border-red-500" : "border-white/50"
            }`}
            {...register("body", {
              required: "Body is required",
              minLength: {
                value: 10,
                message: "Body must be at least 10 characters",
              },
            })}
          />
          {errors.body && (
            <p id="body-error" className="text-red-500 text-sm mt-1">
              {errors.body.message}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            disabled={isSubmitting}
            className="px-4 py-2 cursor-pointer text-white/50 border border-white/50 rounded-md disabled:opacity-50"
          >
            Cancel
          </button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Post"}
          </Button>
        </div>

        {createPost.error && (
          <div className="bg-red-900 border border-red-700 text-red-100 p-3 rounded-md">
            {createPost.error instanceof Error
              ? createPost.error.message
              : "An error occurred"}
          </div>
        )}
      </form>
    </div>
  );
}
