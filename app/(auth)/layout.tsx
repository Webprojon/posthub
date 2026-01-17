import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Posthub",
  description: "Sign in to your account",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full h-screen m-0 p-0 bg-slate-900">{children}</div>;
}
