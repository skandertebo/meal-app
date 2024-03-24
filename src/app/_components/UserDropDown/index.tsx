"use client";
import { User } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";

export interface UserDropdownProps {
  user: User;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      <button
        className="flex items-center space-x-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          className="h-8 w-8 rounded-full
        "
          src={user.image ?? "/default-avatar.png"}
          alt={user.name ?? ""}
          height={32}
          width={32}
        />
      </button>
      {isOpen && (
        <div
          className="absolute right-2 top-14 rounded-lg bg-slate-100 p-4 px-8 shadow-lg"
          onBlur={() => setIsOpen(false)}
        >
          <div className="flex flex-col gap-4">
            <Link href="/mymeals">My Meals</Link>
            <Link href="/create-meal">Create Meal</Link>
            <Link href="/api/auth/signout">Sign out</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
