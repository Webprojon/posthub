"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/shared/lib/auth-context";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { LINKS } from "../constants/navigation";

export default function Header() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-gray-900/80 backdrop-blur-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 sm:h-20">
        <Link
          href="/"
          className="font-bold text-lg sm:text-2xl bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent hover:from-blue-300 hover:to-blue-500 transition-all"
          aria-label="Home"
        >
          PostHub
        </Link>

        <ul className="hidden sm:flex gap-8 font-medium items-center">
          {LINKS.map(({ label, href }) => {
            const isActive = pathname === href;

            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`px-3 py-2 rounded-md transition-all 
                    ${
                      isActive
                        ? "bg-blue-600/20 text-blue-400"
                        : "text-gray-300 hover:text-white hover:bg-gray-800"
                    }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3 sm:gap-4">
          {user && (
            <div className="flex items-center gap-3">
              <Link
                href="/profile"
                className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 hover:bg-blue-700 transition-colors rounded-full font-medium text-white text-sm"
                title={`Logged in as ${user.name}`}
                aria-label={`Profile for ${user.name}`}
              >
                {user.name.charAt(0).toUpperCase()}
              </Link>
              <button
                onClick={logout}
                className="p-2 cursor-pointer text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors hidden sm:block"
                aria-label="Logout"
                title="Logout"
              >
                <RiLogoutBoxRLine className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </nav>

      {user && (
        <div className="sm:hidden border-t border-white/10 bg-gray-900/50">
          <div className="flex items-center justify-between px-4 py-3">
            <Link
              href="/create"
              className="flex-1 mr-2 px-3 py-2 text-center bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition-colors text-sm"
            >
              Create
            </Link>
            <button
              onClick={logout}
              className="p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
              aria-label="Logout"
            >
              <RiLogoutBoxRLine className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
