"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/shared/lib/auth-context";

const LINKS = [
  { link: "Home", href: "/" },
  { link: "Posts", href: "/posts" },
  { link: "Create", href: "/create" },
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
                      ? "text-blue-600"
                      : "hover:text-slate-300 transition-all"
                  }
                >
                  {link}
                </Link>
              </li>
            );
          })}

          {isAuthenticated && (
            <Link
              href="/profile"
              className="capitalize border border-white/50 rounded-full text-sm overflow-hidden w-8 h-8 flex items-center justify-center"
            >
              {user?.name.slice(0, 1)}
            </Link>
          )}
        </ul>
      </nav>
    </header>
  );
}
