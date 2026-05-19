import SignUpForm from "../../components/signupform";
import SocialProviders from "../../components/SocialProviders";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-10">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-2">
          Create Account 🎉
        </h1>
        <p className="text-center text-gray-500 mb-6">Sign up to get started</p>

        {/* Client: Form */}
        <SignUpForm />

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <hr className="flex-1 border-gray-200" />
          <span className="text-gray-400 text-sm">or sign up with</span>
          <hr className="flex-1 border-gray-200" />
        </div>

        {/* Client: Social */}
        <SocialProviders />

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-600 hover:underline font-medium">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}