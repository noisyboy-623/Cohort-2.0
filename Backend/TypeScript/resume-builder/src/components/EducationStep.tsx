"use client";

import axios from "axios";
import { useEffect } from "react";
import {
  useForm,
  useFieldArray,
} from "react-hook-form";

import {
  GraduationCap,
  Plus,
  Trash2,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

interface Props {
  resumeId: string;
  onNext: () => void;
  onBack: () => void;
}

interface EducationForm {
  education: {
    institute: string;
    degree: string;
    startDate: string;
    endDate: string;
  }[];
}

export default function EducationStep({
  resumeId,
  onNext,
  onBack,
}: Props) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<EducationForm>({
    defaultValues: {
      education: [
        {
          institute: "",
          degree: "",
          startDate: "",
          endDate: "",
        },
      ],
    },
  });

  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "education",
  });

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const { data } = await axios.get(
        `/api/resume/${resumeId}`
      );

      if (
        data.resume?.education &&
        data.resume.education.length > 0
      ) {
        reset({
          education:
            data.resume.education,
        });
      }
    } catch (error) {
    }
  };

  const onSubmit = async (
    values: EducationForm
  ) => {
    try {
      await axios.patch(
        `/api/resume/${resumeId}`,
        {
          education:
            values.education,
        }
      );

      onNext();
    } catch (error) {
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-2.5">
            <span className="text-sm font-semibold text-slate-700">
              Step 2 of 8
            </span>

            <span className="text-sm font-bold text-indigo-600">
              25%
            </span>
          </div>

          <div className="h-2 bg-slate-200/80 rounded-full overflow-hidden">
            <div className="h-full w-[25%] bg-indigo-600 rounded-full transition-all duration-500 ease-out shadow-sm shadow-indigo-200" />
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-lg p-10">
          <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
            <div className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center shadow-inner">
              <GraduationCap className="text-indigo-600" />
            </div>

            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Education
              </h1>

              <p className="text-slate-500">
                Add your educational background.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(
              onSubmit
            )}
            className="space-y-6"
          >
            {fields.map(
              (field, index) => (
                <div
                  key={field.id}
                  className="border border-slate-200/80 rounded-2xl p-6 relative bg-slate-50/50 hover:bg-slate-50/80 transition-colors"
                >
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}

                  <div className="grid md:grid-cols-2 gap-5">

                    {/* Institute */}

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Institute
                      </label>

                      <input
                        {...register(`education.${index}.institute`)}
                        placeholder="Lakshmi Narain College of Technology"
                        className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm outline-none bg-white"
                      />
                    </div>

                    {/* Degree */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Degree
                      </label>

                      <input
                        {...register(`education.${index}.degree`)}
                        placeholder="B.Tech Computer Science"
                        className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm outline-none bg-white"
                      />
                    </div>

                    {/* Start Date */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Start Date
                      </label>

                      <input
                        type="date"
                        {...register(`education.${index}.startDate`)}
                        className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm outline-none bg-white"
                      />
                    </div>

                    {/* End Date */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        End Date
                      </label>

                      <input
                        type="date"
                        {...register(`education.${index}.endDate`)}
                        className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm outline-none bg-white"
                      />
                    </div>

                  </div>
                </div>
              )
            )}

            {/* Add Education */}
            <button
              type="button"
              onClick={() =>
                append({
                  institute: "",
                  degree: "",
                  startDate: "",
                  endDate: "",
                })
              }
              className="flex items-center gap-2 border border-indigo-200 text-indigo-600 px-5 py-3 rounded-xl hover:bg-indigo-50/50 hover:border-indigo-300 transition-all font-semibold"
            >
              <Plus size={18} />
              Add Education
            </button>

            {/* Footer */}

            <div className="flex justify-between pt-8 border-t border-slate-100 mt-8">
              <button
                type="button"
                onClick={onBack}
                className="flex items-center gap-2 px-5 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 font-medium transition-colors"
              >
                <ArrowLeft size={18} />
                Back
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
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