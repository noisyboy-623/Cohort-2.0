/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import axios from "axios";
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";

import { ArrowLeft, ArrowRight, Plus, Trash2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  resumeId: string;
  onNext: () => void;
  onBack: () => void;
}

interface ExperienceItem {
  company: string;
  role: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: string;
}

interface FormValues {
  experience: ExperienceItem[];
}

export default function ExperienceStep({ resumeId, onBack }: Props) {
  const router = useRouter();

  const {
    register,
    control,
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      experience: [
        {
          company: "",
          role: "",
          employmentType: "",
          startDate: "",
          endDate: "",
          currentlyWorking: false,
          description: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const { data } = await axios.get(`/api/resume/${resumeId}`);

      if (data.resume.experience?.length) {
        reset({
          experience: data.resume.experience,
        });
      }
    } catch (error) {
    }
  };

  const generateDescription = async (index: number) => {
    try {
      const exp = watch(`experience.${index}`);

      const { data: resumeData } = await axios.get(`/api/resume/${resumeId}`);

      const resume = resumeData.resume;

      const { data } = await axios.post("/api/ai/generate-experience", {
        jobRole: exp.role,
        experienceLevel: resume.experienceLevel,
      });

      setValue(`experience.${index}.description`, data.description);
    } catch (error) {
    }
  };

  const onSubmit = async (values: FormValues) => {
    try {
      await axios.patch(`/api/resume/${resumeId}`, {
        experience: values.experience,
      });

      router.push(`/resume/${resumeId}/preview`);
    } catch (error) {
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-2.5">
            <span className="text-sm font-semibold text-slate-700">Step 5 of 8</span>

            <span className="text-sm font-bold text-indigo-600">62%</span>
          </div>

          <div className="h-2 bg-slate-200/80 rounded-full overflow-hidden">
            <div className="h-full w-[62%] bg-indigo-600 rounded-full transition-all duration-500 ease-out shadow-sm shadow-indigo-200" />
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 p-10 shadow-lg">
          <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Work Experience</h1>

              <p className="text-slate-500 mt-2">
                Showcase your professional experience.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                append({
                  company: "",
                  role: "",
                  employmentType: "",
                  startDate: "",
                  endDate: "",
                  currentlyWorking: false,
                  description: "",
                })
              }
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 font-semibold transition-all shadow-sm hover:shadow"
            >
              <Plus size={18} />
              Add Experience
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {fields.map((field, index) => (
              <div key={field.id} className="border border-slate-200/80 rounded-2xl p-6 relative bg-slate-50/30 hover:bg-slate-50/50 transition-colors">
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Company Name</label>
                    <input
                      {...register(`experience.${index}.company`)}
                      placeholder="e.g. Google"
                      className="border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Job Title</label>
                    <input
                      {...register(`experience.${index}.role`)}
                      placeholder="e.g. Frontend Engineer"
                      className="border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Employment Type</label>
                    <select
                      {...register(`experience.${index}.employmentType`)}
                      className="border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white"
                    >
                      <option value="">Select Type</option>
                      <option>Full Time</option>
                      <option>Internship</option>
                      <option>Contract</option>
                      <option>Freelance</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Start Date</label>
                    <input
                      type="date"
                      {...register(`experience.${index}.startDate`)}
                      className="border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">End Date</label>
                    <input
                      type="date"
                      {...register(`experience.${index}.endDate`)}
                      disabled={watch(`experience.${index}.currentlyWorking`)}
                      className="border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white disabled:bg-slate-100 disabled:text-slate-400"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="flex items-center gap-2.5 text-sm font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                      {...register(`experience.${index}.currentlyWorking`)}
                    />
                    Currently Working Here
                  </label>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Job Description</label>
                    <button
                      type="button"
                      onClick={() => generateDescription(index)}
                      className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-100 px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-semibold tracking-wide transition-all shadow-sm"
                    >
                      <Sparkles size={14} />
                      Generate with AI
                    </button>
                  </div>

                  <textarea
                    rows={5}
                    {...register(`experience.${index}.description`)}
                    placeholder="Describe your responsibilities, key achievements, and metrics (e.g. Improved app load speed by 25%)..."
                    className="w-full border border-slate-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white"
                  />
                </div>
              </div>
            ))}

            <div className="flex justify-between border-t border-slate-100 pt-8 mt-8">
              <button
                type="button"
                onClick={onBack}
                className="border border-slate-300 text-slate-700 px-5 py-3 rounded-xl flex items-center gap-2 font-medium hover:bg-slate-50 transition-colors"
              >
                <ArrowLeft size={18} />
                Back
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl flex items-center gap-2 font-semibold shadow-md hover:shadow-lg transition-all"
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