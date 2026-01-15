"use client";

import { useAuth } from "@/shared/lib/auth-context";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const publicRoutes = ["/login"];
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated && !isPublicRoute) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router, isPublicRoute]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (isPublicRoute) {
    return children;
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
}
