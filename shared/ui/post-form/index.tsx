"use client";

import { useForm } from "react-hook-form";
import Button from "@/shared/ui/button";
import Input from "@/shared/ui/input";

export type PostFormData = {
  title: string;
  body: string;
};

type PostFormProps = {
  mode: "create" | "edit";
  isSubmitting: boolean;
  error?: Error | null;
  initialValues?: PostFormData;
  onSubmit: (data: PostFormData) => Promise<void>;
  onCancel: () => void;
};

export default function PostForm({
  mode,
  isSubmitting,
  error,
  initialValues,
  onSubmit,
  onCancel,
}: PostFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormData>({
    defaultValues: {
      title: initialValues?.title || "",
      body: initialValues?.body || "",
    },
  });

  const isCreate = mode === "create";
  const title = isCreate ? "Create a New Post" : "Edit Post";
  const submitLabel = isCreate
    ? isSubmitting
      ? "Creating..."
      : "Create Post"
    : isSubmitting
    ? "Updating..."
    : "Update Post";

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold">{title}</h2>
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
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-4 py-2 cursor-pointer text-white/50 border border-white/50 rounded-md disabled:opacity-50 hover:border-white/70 transition"
          >
            Cancel
          </button>
          <Button type="submit" disabled={isSubmitting}>
            {submitLabel}
          </Button>
        </div>

        {error && (
          <div className="bg-red-900 border border-red-700 text-red-100 p-3 rounded-md">
            {error instanceof Error ? error.message : "An error occurred"}
          </div>
        )}
      </form>
    </div>
  );
}
