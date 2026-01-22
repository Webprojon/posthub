"use client";

import { useForm } from "react-hook-form";
import Button from "@/shared/ui/button";
import Input from "@/shared/ui/input";
import type { PostFormData, PostFormMode } from "../model/types";
import { postTitleValidation, postBodyValidation } from "../model/validation";
import { getSubmitLabel } from "../model/getSubmitLabel";
import { FormField } from "./FormField";

type PostFormProps = {
  mode: PostFormMode;
  isSubmitting: boolean;
  error?: Error | null;
  initialValues?: PostFormData;
  onSubmit: (data: PostFormData) => void;
  onCancel: () => void;
};

export default function PostForm({
  mode,
  isSubmitting,
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
      title: initialValues?.title,
      body: initialValues?.body,
    },
  });

  return (
    <div className="min-h-[calc(100vh-131px)]">
      <h1 className="text-2xl font-bold mb-6">
        {mode === "create" ? "Create a New Post" : "Edit Post"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField label="Post Title" error={errors.title}>
          <Input
            placeholder="Enter post title..."
            disabled={isSubmitting}
            error={!!errors.title}
            {...register("title", postTitleValidation)}
          />
        </FormField>

        <FormField label="Content" error={errors.body}>
          <textarea
            rows={8}
            disabled={isSubmitting}
            className={`w-full px-4 py-3 border rounded-lg bg-gray-800 ${
              errors.body ? "border-red-500" : "border-white/20"
            }`}
            {...register("body", postBodyValidation)}
          />
        </FormField>

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
            {getSubmitLabel(mode, isSubmitting)}
          </Button>
        </div>
      </form>
    </div>
  );
}
