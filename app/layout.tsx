import type { Metadata } from "next";
import "./globals.css";
import Header from "@/widgets/layout/Header";

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
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
