import { signOut, auth } from "@/services/auth";
import NavLinks from './NavLinks';
import CartIcon from "./cartIcons";
import Link from "next/link";
import { LogOut, User } from "lucide-react";

export default async function Navigation() {
  const session = await auth();
  return (
    <div className="max-lg:collapse bg-white border-b border-amber-100 shadow-sm w-full rounded-md">
      <input id="navbar-1-toggle" className="peer hidden" type="checkbox" />
      <label htmlFor="navbar-1-toggle" className="fixed inset-0 hidden max-lg:peer-checked:block"></label>
      <div className="collapse-title navbar px-6">
        <div className="navbar-start">
          <label htmlFor="navbar-1-toggle" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <Link href="/" className="text-xl font-bold text-amber-500 px-2">
            E-Commerce
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <NavLinks />
        </div>

        <div className="navbar-end gap-3">
          <CartIcon />
          {session?.user ? (
            <div className="flex items-center gap-3">
              <Link href="/profile">
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt="avatar"
                    className="w-9 h-9 rounded-full cursor-pointer hover:ring-2 hover:ring-amber-400 transition"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-bold cursor-pointer hover:bg-amber-600 transition">
                    {session.user.name?.[0]?.toUpperCase()}
                  </div>
                )}
              </Link>
              <span className="text-sm font-medium text-gray-700 hidden lg:block">
                {session.user.name}
              </span>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-500 font-medium text-sm px-3 py-2 rounded-xl transition"
                >
                  <LogOut size={15} />
                  <span className="hidden lg:block">Sign Out</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                href="/signin"
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-amber-500 font-medium px-3 py-2 rounded-xl transition"
              >
                <User size={15} />
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium px-4 py-2 rounded-xl transition"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="collapse-content lg:hidden z-1">
        <NavLinks />
      </div>
    </div>
  )
}