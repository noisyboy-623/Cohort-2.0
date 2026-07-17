"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ArrowRight, Lock, Mail, User } from "lucide-react";
import { registerApi } from "@/apis/auth.api";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<RegisterFormData>();

  const onSubmit = async (
    data: RegisterFormData
  ) => {
    try {
      await registerApi(data);

      router.push("/auth/login");
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
          "Registration failed"
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
            Create recruiter-approved, ATS-optimized resumes with AI.
          </p>
        </div>

        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white">
            Build Your Professional Resume
          </h2>

          <p className="mt-3 text-slate-400 leading-relaxed max-w-md">
            Generate summaries, skills, experiences, and ATS reports instantly.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-slate-50">
        <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-xl p-10">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Create Account 🚀
          </h2>

          <p className="text-slate-500 mt-2 text-sm">
            Start building your resume.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 space-y-5"
          >
            <div>
              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Full Name
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  {...register("name", {
                    required: "Name is required",
                  })}
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm bg-white"
                />
              </div>

              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

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
                    minLength: {
                      value: 6,
                      message:
                        "Minimum 6 characters required",
                    },
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
                ? "Creating Account..."
                : "Create Account"}

              <ArrowRight size={18} />
            </button>
          </form>

          <p className="mt-8 text-center text-slate-500 text-sm">
            Already have an account?
            <Link
              href="/auth/login"
              className="ml-1.5 text-indigo-600 hover:text-indigo-700 font-bold transition-colors"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}