"use client";

import { useAuth } from "@/shared/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "@/shared/ui/button";
import Input from "@/shared/ui/input";
import { RiAlertLine, RiLockLine, RiMailLine } from "react-icons/ri";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { isAuthenticated, login, isLoading } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push("/");
    }
  }, [isAuthenticated, isLoading, router]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      router.push("/");
    } catch (err) {
      setError("root", {
        message: err instanceof Error ? err.message : "Login failed",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-lg text-gray-400">Loading...</p>
        </div>
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
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2"
              >
                <RiMailLine className="w-4 h-4 text-blue-400" />
                Email Address
              </label>
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
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2"
              >
                <RiLockLine className="w-4 h-4 text-blue-400" />
                Password
              </label>
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
              type="submit"
              className="w-full py-3 text-base font-semibold"
              disabled={isSubmitting}
              size="lg"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 p-4 rounded-lg bg-blue-600/10 border border-blue-600/30">
            <p className="text-sm text-blue-400 font-medium mb-2">
              Demo Credentials
            </p>
            <p className="text-xs text-gray-400">
              Use any email and password to login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
