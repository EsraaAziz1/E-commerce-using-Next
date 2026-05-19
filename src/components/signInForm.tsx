"use client";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, SignInFormData } from "@/schema/authschema";
import { useAuthStore } from "@/store/authstore";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";

export default function SignInForm() {
  const router = useRouter();
  const { isLoading, error, setLoading, setError } = useAuthStore();

  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      setLoading(true);
      setError(null);
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (result?.error) { setError("Invalid email or password"); return; }
      router.push("/");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && (
        <div className="bg-red-50 text-red-500 text-sm p-3 rounded-xl mb-4 text-center">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium text-gray-600 flex items-center gap-1 mb-1">
            <Mail size={14} className="text-amber-400" /> Email
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="you@example.com"
            className={`w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-400 transition ${
              errors.email ? "border-red-400" : "border-amber-100"
            }`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600 flex items-center gap-1 mb-1">
            <Lock size={14} className="text-amber-400" /> Password
          </label>
          <input
            {...register("password")}
            type="password"
            placeholder="••••••••"
            className={`w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-400 transition ${
              errors.password ? "border-red-400" : "border-amber-100"
            }`}
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}