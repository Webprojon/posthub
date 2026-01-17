"use client";

import Header from "@/widgets/layout/Header";
import Footer from "@/widgets/layout/Footer";
import { AuthGuard } from "@/app/auth-guard";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col bg-gray-900">
        <Header />

        <main className="flex-1 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            {children}
          </div>
        </main>

        <Footer />
      </div>
    </AuthGuard>
  );
}
