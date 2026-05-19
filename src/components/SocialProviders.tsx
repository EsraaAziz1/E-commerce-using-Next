"use client";
import { signIn } from "next-auth/react";
import { useAuthStore } from "@/store/authstore";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub, AiFillFacebook } from "react-icons/ai";

const socialProviders = [
  { id: "google",   label: "Google",   Icon: FcGoogle,       className: "" },
  { id: "github",   label: "Github",   Icon: AiFillGithub,   className: "" },
  { id: "facebook", label: "Facebook", Icon: AiFillFacebook, className: "text-blue-600" },
] as const;

export default function SocialProviders() {
  const { isLoading, setLoading, setError } = useAuthStore();

  const handleSocialSignIn = async (provider: string) => {
    try {
      setLoading(true);
      setError(null);
      await signIn(provider, { callbackUrl: "/" });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {socialProviders.map(({ id, label, Icon, className }) => (
        <button
          key={id}
          onClick={() => handleSocialSignIn(id)}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-3 px-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition disabled:opacity-50"
        >
          <Icon size={22} className={className} />
          <span className="text-gray-700 dark:text-white text-sm font-medium">
            Continue with {label}
          </span>
        </button>
      ))}
    </div>
  );
}