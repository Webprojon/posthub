import type { Metadata } from "next";
import "./globals.css";
import Header from "@/widgets/layout/Header";
import Footer from "@/widgets/layout/Footer";
import Providers from "./providers";
import { AuthGuard } from "./auth-guard";
import { Toaster } from "react-hot-toast";
import { ErrorBoundary } from "@/shared/ui/error-boundary";

export const metadata: Metadata = {
  title: "PostHub - Share Your Stories",
  description: "A modern Next.js app for creating and sharing posts",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-gray-900 text-gray-100 min-h-screen flex flex-col">
        <ErrorBoundary>
          <Providers>
            <AuthGuard>
              <Header />
              <main className="flex-1 w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                  {children}
                </div>
              </main>
              <Footer />
            </AuthGuard>
          </Providers>
        </ErrorBoundary>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
