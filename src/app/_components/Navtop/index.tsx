import { api } from "@/trpc/server";
import Link from "next/link";
import UserDropdown from "../UserDropDown";

export default async function Navtop() {
  const user = await api.user.whoami();

  return (
    <nav className="flex w-screen items-center justify-between bg-orange-400 py-4">
      <div className="h-2 w-[67px]"></div>
      <Link href="/">
        <h1 className="text-center text-2xl font-semibold text-white">
          Recipe App
        </h1>
      </Link>
      <div className="pe-4">
        {user ? (
          <UserDropdown user={user} />
        ) : (
          <a href="/api/auth/signin">Sign in</a>
        )}
      </div>
    </nav>
  );
}
