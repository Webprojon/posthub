"use client";

import { useAuth } from "@/shared/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "@/shared/ui/button";
import Input from "@/shared/ui/input";
import { RiAlertLine } from "react-icons/ri";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { user, login, isLoading } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>();

  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/");
    }
  }, [user, isLoading, router]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
    } catch (err) {
      setError("root", {
        message: err instanceof Error ? err.message : "Login failed",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
        <p className="text-xl text-gray-200">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold">Welcome Back</h1>
          <p className="text-gray-400">Sign in to access your posts</p>
        </div>

        <div className="border border-white/10 rounded-xl p-6 sm:p-8 bg-gray-800/30 backdrop-blur-sm">
          {errors.root && (
            <div
              className="mb-6 p-4 rounded-lg bg-red-900/20 border border-red-800/50 flex gap-3"
              role="alert"
              aria-live="polite"
            >
              <RiAlertLine className="flex-shrink-0 w-5 h-5 text-red-500 mt-0.5" />
              <p className="text-red-400 text-sm">{errors.root.message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                disabled={isSubmitting}
                aria-describedby={errors.email ? "email-error" : undefined}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p
                  id="email-error"
                  className="text-red-400 text-sm mt-2 flex items-center gap-1"
                >
                  <RiAlertLine className="w-4 h-4" />
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                disabled={isSubmitting}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 3,
                    message: "Password must be at least 3 characters",
                  },
                })}
              />
              {errors.password && (
                <p
                  id="password-error"
                  className="text-red-400 text-sm mt-2 flex items-center gap-1"
                >
                  <RiAlertLine className="w-4 h-4" />
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              size="lg"
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 text-base font-semibold"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
