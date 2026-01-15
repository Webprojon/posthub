"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/shared/lib/auth-context";

const LINKS = [
  { link: "Home", href: "/" },
  { link: "Posts", href: "/posts" },
];

const AUTH_LINKS = [
  { link: "Create", href: "/create" },
  { link: "Settings", href: "/settings" },
];

export default function Header() {
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuth();

  return (
    <header>
      <nav className="flex justify-between items-center h-14 tracking-wider">
        <Link href="/" className="font-bold text-lg">
          Next App
        </Link>

        <ul className="flex gap-10 font-medium">
          {LINKS.map(({ link, href }) => {
            const isActive = pathname === href;

            return (
              <li key={href}>
                <Link
                  href={href}
                  className={
                    isActive
                      ? "text-red-600"
                      : "hover:text-slate-300 transition-all"
                  }
                >
                  {link}
                </Link>
              </li>
            );
          })}

          {isAuthenticated && AUTH_LINKS.map(({ link, href }) => {
            const isActive = pathname === href;

            return (
              <li key={href}>
                <Link
                  href={href}
                  className={
                    isActive
                      ? "text-red-600"
                      : "hover:text-slate-300 transition-all"
                  }
                >
                  {link}
                </Link>
              </li>
            );
          })}

          <li>
            <Link
              href="/settings"
              className={
                pathname === "/settings"
                  ? "text-red-600"
                  : "hover:text-slate-300 transition-all"
              }
            >
              {isAuthenticated ? `${user?.name}` : "Login"}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

