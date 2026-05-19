// src/app/signout/page.tsx
"use client";
import { signOut } from "next-auth/react";
import { useAuthStore } from "@/store/authstore";
import { useRouter } from "next/navigation";

export default function SignOutPage() {
  const router = useRouter();
  const { isLoading, error, setLoading, setError, reset } = useAuthStore();

  const handleSignOut = async () => {
    try {
      setLoading(true);
      setError(null);
      reset();
      await signOut({ callbackUrl: "/" });
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Sign Out
        </h1>
        <p className="text-gray-500 mb-8">Are you sure you want to sign out?</p>

        {error && (
          <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="flex gap-4 justify-center">
          <button
            onClick={handleSignOut}
            disabled={isLoading}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-8 rounded-xl transition disabled:opacity-50"
          >
            {isLoading ? "Signing out..." : "Yes, Sign Out"}
          </button>
          <button
            onClick={() => router.back()}
            className="border border-gray-300 text-gray-700 dark:text-white font-medium py-3 px-8 rounded-xl hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}