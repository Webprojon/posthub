"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/shared/lib/auth-context";
import { queryClient } from "@/shared/api/queryClient";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
}
