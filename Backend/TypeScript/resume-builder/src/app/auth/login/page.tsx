"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { loginApi } from "@/apis/auth.api";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginFormData>();

  const onSubmit = async (
    data: LoginFormData
  ) => {
    try {
      await loginApi(data);

      router.push("/resume");
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
          "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Section - Clean Dark Professional Panel */}
      <div className="hidden lg:flex flex-1 bg-slate-900 p-16 text-slate-100 flex-col justify-between relative overflow-hidden">
        {/* Subtle decorative background glows */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="h-10 w-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20 mb-8">
            R
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            AI Resume Builder
          </h1>

          <p className="mt-4 text-slate-400 leading-relaxed font-medium max-w-md">
            Build recruiter-approved, ATS-optimized resumes powered by AI.
          </p>
        </div>

        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white">
            Welcome Back
          </h2>

          <p className="mt-3 text-slate-400 leading-relaxed max-w-md">
            Sign in to continue customizing and improving your career credentials.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/80 shadow-2xl p-10">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Login 👋
          </h2>

          <p className="text-slate-500 mt-2 text-sm">
            Access your resume builder dashboard.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 space-y-5"
          >
            <div>
              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  {...register("email", {
                    required: "Email is required",
                  })}
                  placeholder="john@example.com"
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm bg-white"
                />
              </div>

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  placeholder="********"
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm bg-white"
                />
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              disabled={isSubmitting}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              {isSubmitting
                ? "Logging In..."
                : "Login"}

              <ArrowRight size={18} />
            </button>
          </form>

          <p className="mt-8 text-center text-slate-500 text-sm">
            Don&apos;t have an account?
            <Link
              href="/auth/register"
              className="ml-1.5 text-indigo-600 hover:text-indigo-700 font-bold transition-colors"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}