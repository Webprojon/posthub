import type { Metadata } from "next";
import "./globals.css";
import Header from "@/widgets/layout/Header";
import Providers from "./providers";
import { AuthGuard } from "./auth-guard";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Next.js 5 Days Challenge",
  description: "Learning Next.js app directory structure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="max-w-7xl mx-auto">
        <Providers>
          <AuthGuard>
            <Header />
            <main className="min-h-screen">{children}</main>
          </AuthGuard>
        </Providers>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
