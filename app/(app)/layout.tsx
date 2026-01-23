"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Header from "@/widgets/layout/Header";
import Footer from "@/widgets/layout/Footer";
import { useAuth } from "@/shared/lib/auth-context";
import Loader from "@/shared/ui/loader";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) return <Loader className="min-h-screen" />;

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />
      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
