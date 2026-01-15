"use client";

import { useAuth } from "@/shared/lib/auth-context";
import { useRouter } from "next/navigation";
import Button from "@/shared/ui/button";

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="mt-4 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="space-y-4">
        <div className="bg-blue-900 border border-blue-700 p-4 rounded-md">
          <p className="text-sm text-gray-300">Logged in as:</p>
          <p className="text-lg font-semibold">{user?.email}</p>
        </div>

        <Button onClick={handleLogout} className="w-full">
          Logout
        </Button>
      </div>
    </div>
  );
}
