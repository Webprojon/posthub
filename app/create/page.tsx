"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/shared/lib/auth-context";
import { useCreatePost } from "@/shared/lib/post-mutations";
import Button from "@/shared/ui/button";
import Input from "@/shared/ui/input";

type FormData = {
  title: string;
  body: string;
  author: string;
};

type FormErrors = Partial<FormData>;

export default function CreatePage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const createPost = useCreatePost();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    body: "",
    author: user?.name || "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/posts");
    }
  }, [isAuthenticated, router]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!formData.body.trim()) {
      newErrors.body = "Body is required";
    } else if (formData.body.trim().length < 10) {
      newErrors.body = "Body must be at least 10 characters";
    }

    if (!formData.author.trim()) {
      newErrors.author = "Author name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await createPost.mutateAsync(formData);
      router.push("/posts");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to create post";
      setErrors({ title: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="mt-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create a New Post</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title
          </label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter post title"
            disabled={isSubmitting}
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? "title-error" : undefined}
          />
          {errors.title && (
            <p id="title-error" className="text-red-500 text-sm mt-1">
              {errors.title}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="body" className="block text-sm font-medium mb-1">
            Body
          </label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleInputChange}
            placeholder="Enter post content"
            disabled={isSubmitting}
            rows={6}
            className="w-full px-3 py-2 border border-gray-500 rounded-md bg-transparent text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            aria-invalid={!!errors.body}
            aria-describedby={errors.body ? "body-error" : undefined}
          />
          {errors.body && (
            <p id="body-error" className="text-red-500 text-sm mt-1">
              {errors.body}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium mb-1">
            Author
          </label>
          <Input
            id="author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            placeholder="Your name"
            disabled={isSubmitting}
            aria-invalid={!!errors.author}
            aria-describedby={errors.author ? "author-error" : undefined}
          />
          {errors.author && (
            <p id="author-error" className="text-red-500 text-sm mt-1">
              {errors.author}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Post"}
          </Button>
          <button
            type="button"
            onClick={() => router.back()}
            disabled={isSubmitting}
            className="px-4 py-2 border border-gray-500 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
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

