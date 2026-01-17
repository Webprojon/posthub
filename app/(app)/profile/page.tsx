"use client";

import { useAuth } from "@/shared/lib/auth-context";
import { useRouter } from "next/navigation";
import Button from "@/shared/ui/button";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="mt-4 space-y-3">
      <h2 className="text-xl font-bold">Profile</h2>

      <div className="border border-white/50 p-4 rounded-md">
        <p>
          <strong>ID:</strong> {user?.id}
        </p>
        <p>
          <strong>Name:</strong> {user?.name}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
      </div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}
