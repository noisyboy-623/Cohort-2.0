"use client";

import { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { User, Mail, Phone, MapPin, Globe, ArrowRight } from "lucide-react";

interface Props {
  resumeId: string | null;
  onNext: () => void;
}

interface PersonalInfoForm {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
}

export default function PersonalInfoStep({ resumeId, onNext }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<PersonalInfoForm>();

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const { data } = await axios.get(`/api/resume/${resumeId}`);

      reset(data.resume.personalInfo || {});
    } catch (error) {
    }
  };

  const onSubmit = async (values: PersonalInfoForm) => {
    try {
      await axios.patch(`/api/resume/${resumeId}`, {
        personalInfo: values,
      });

      onNext();
    } catch (error) {
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-2.5">
            <span className="text-sm font-semibold text-slate-700">Step 1 of 8</span>

            <span className="text-sm font-bold text-indigo-600">12%</span>
          </div>

          <div className="h-2 bg-slate-200/80 rounded-full overflow-hidden">
            <div className="h-full w-[12%] bg-indigo-600 rounded-full transition-all duration-500 ease-out shadow-sm shadow-indigo-200" />
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-lg p-10">
          <div className="mb-8 border-b border-slate-100 pb-6">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Personal Information
            </h1>

            <p className="text-slate-500 mt-2">
              Tell recruiters how they can reach you.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name */}
            <InputField
              icon={<User size={18} />}
              placeholder="John Doe"
              label="Full Name"
              register={register("fullName")}
            />

            {/* Email */}
            <InputField
              icon={<Mail size={18} />}
              placeholder="john@example.com"
              label="Email"
              register={register("email")}
            />

            {/* Phone */}
            <InputField
              icon={<Phone size={18} />}
              placeholder="+91 9876543210"
              label="Phone Number"
              register={register("phone")}
            />

            {/* Location */}
            <InputField
              icon={<MapPin size={18} />}
              placeholder="Bhopal, India"
              label="Location"
              register={register("location")}
            />

            {/* LinkedIn */}
            <InputField
              //   icon={<Linkedin size={18} />}
              placeholder="https://linkedin.com/in/..."
              label="LinkedIn"
              register={register("linkedin")}
            />

            {/* Github */}
            <InputField
              //   icon={<Github size={18} />}
              placeholder="https://github.com/..."
              label="GitHub"
              register={register("github")}
            />

            {/* Portfolio */}
            <InputField
              icon={<Globe size={18} />}
              placeholder="https://portfolio.com"
              label="Portfolio"
              register={register("portfolio")}
            />

            <div className="flex justify-end pt-8">
              <button
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl font-medium shadow-md hover:shadow-lg transition-all"
              >
                {isSubmitting ? "Saving..." : "Continue"}

                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, placeholder, icon, register }: any) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label}
      </label>

      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </div>

        <input
          {...register}
          placeholder={placeholder}
          className="w-full border border-slate-300 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm"
        />
      </div>
    </div>
  );
}