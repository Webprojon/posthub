"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { link: "Home", href: "/" },
  { link: "Posts", href: "/posts" },
  { link: "Create", href: "/create" },
  { link: "Settings", href: "/settings" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header>
      <nav className="flex justify-between items-center h-14 tracking-wider">
        <Link href="/">Next App</Link>

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
        </ul>
      </nav>
    </header>
  );
}
