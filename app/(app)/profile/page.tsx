"use client";

import { useAuth } from "@/shared/lib/auth-context";
import Button from "@/shared/ui/button";
import Input from "@/shared/ui/input";
import React from "react";
import { FaUser } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [userName, setUserName] = React.useState(user?.name || "");
  const [userEmail, setUserEmail] = React.useState(user?.email || "");

  return (
    <div className="min-h-[calc(100vh-131px)] mt-4 space-y-3">
      <h2 className="text-xl font-bold">Profile</h2>

      <div className="flex justify-center items-center flex-col gap-6">
        <div className="text-gray-500 flex items-center justify-center w-40 h-40 rounded-full border border-white/20">
          <FaUser className="size-20" />
        </div>

        <form className="flex gap-4">
          <Input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <Button onClick={logout} className="flex items-center gap-2">
            <RiLogoutBoxRLine className="w-4 h-4" />
            Logout
          </Button>
        </form>
      </div>
    </div>
  );
}
