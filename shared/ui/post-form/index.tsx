"use client";

import { useForm } from "react-hook-form";
import Button from "@/shared/ui/button";
import Input from "@/shared/ui/input";
import { RiAlertLine } from "react-icons/ri";

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
    <>
      <h1 className="text-2xl font-bold mb-6">{title}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-gray-300 mb-2"
          >
            Post Title
          </label>
          <Input
            id="title"
            placeholder="Enter post title..."
            disabled={isSubmitting}
            error={!!errors.title}
            aria-describedby={errors.title ? "title-error" : undefined}
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 3,
                message: "Title must be at least 3 characters",
              },
              maxLength: {
                value: 200,
                message: "Title must not exceed 200 characters",
              },
            })}
          />
          {errors.title && (
            <p
              id="title-error"
              className="text-red-400 text-sm mt-2 flex items-center gap-1"
            >
              <RiAlertLine className="w-4 h-4" />
              {errors.title.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="body"
            className="block text-sm font-semibold text-gray-300 mb-2"
          >
            Content
          </label>
          <textarea
            rows={8}
            id="body"
            disabled={isSubmitting}
            placeholder="Write your post content here..."
            className={`w-full px-4 py-3 border rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors ${
              errors.body
                ? "border-red-500"
                : "border-white/20 hover:border-white/30"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            aria-describedby={errors.body ? "body-error" : undefined}
            {...register("body", {
              required: "Content is required",
              minLength: {
                value: 10,
                message: "Content must be at least 10 characters",
              },
              maxLength: {
                value: 5000,
                message: "Content must not exceed 5000 characters",
              },
            })}
          />
          {errors.body && (
            <p
              id="body-error"
              className="text-red-400 text-sm mt-2 flex items-center gap-1"
            >
              <RiAlertLine className="w-4 h-4" />
              {errors.body.message}
            </p>
          )}
        </div>

        {error && (
          <div
            className="p-4 rounded-lg bg-red-900/20 border border-red-800/50 flex gap-3"
            role="alert"
            aria-live="polite"
          >
            <RiAlertLine className="flex-shrink-0 w-5 h-5 text-red-500 mt-0.5" />
            <div>
              <p className="text-red-400 font-medium">Error</p>
              <p className="text-red-400 text-sm">
                {error instanceof Error
                  ? error.message
                  : "An error occurred. Please try again."}
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4">
          <Button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-6 py-3 bg-transparent hover:bg-transparent border border-white/20 hover:border-white/40"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="order-1 sm:order-2"
          >
            {submitLabel}
          </Button>
        </div>
      </form>
    </>
  );
}
