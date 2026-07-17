"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { ArrowLeft, ArrowRight, Plus, Trash2, Sparkles } from "lucide-react";

interface Props {
  resumeId: any;
  onNext: () => void;
  onBack: () => void;
}

interface Project {
  title: string;
  techStack: string;
  description: string;
  githubUrl: string;
  liveUrl: string;
}

interface FormValues {
  projects: Project[];
}

export default function ProjectsStep({ resumeId, onNext, onBack }: Props) {
  const {
    register,
    control,
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      projects: [
        {
          title: "",
          techStack: "",
          description: "",
          githubUrl: "",
          liveUrl: "",
        },
      ],
    },
  });
  const [aiLoading, setAiLoading] = useState(false);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const { data } = await axios.get(`/api/resume/${resumeId}`);

      if (data.resume.projects?.length) {
        reset({
          projects: data.resume.projects.map((project: any) => ({
            ...project,
            techStack: Array.isArray(project.techStack)
              ? project.techStack.join(", ")
              : "",
          })),
        });
      }
    } catch (error) {
    }
  };

  const generateDescription = async (index: number) => {
    try {
      const project = watch(`projects.${index}`);

      const { data: resumeData } = await axios.get(`/api/resume/${resumeId}`);

      const resume = resumeData.resume;

      const { data } = await axios.post(
        "/api/ai/generate-project-description",
        {
          jobTitle: "web developer",
          experienceLevel: "mid-level",
          techStack: ["html", "css", "react", "nodejs"],
        }
      );

      setValue(`projects.${index}.description`, data.data.projectDescription);
    } catch (error) {
    }
  };

  const onSubmit = async (values: FormValues) => {
    try {
      const formattedProjects = values.projects.map((project) => ({
        ...project,
        techStack: project.techStack.split(",").map((tech) => tech.trim()),
      }));

      await axios.patch(`/api/resume/${resumeId}`, {
        projects: formattedProjects,
      });

      onNext();
    } catch (error) {
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-2.5">
            <span className="text-sm font-semibold text-slate-700">Step 4 of 8</span>

            <span className="text-sm font-bold text-indigo-600">50%</span>
          </div>

          <div className="h-2 bg-slate-200/80 rounded-full overflow-hidden">
            <div className="h-full w-[50%] bg-indigo-600 rounded-full transition-all duration-500 ease-out shadow-sm shadow-indigo-200" />
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-10 shadow-lg">
          <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-6">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Projects</h1>

              <p className="text-slate-500 mt-2">Showcase your best work.</p>
            </div>

            <button
              type="button"
              onClick={() =>
                append({
                  title: "",
                  techStack: "",
                  description: "",
                  githubUrl: "",
                  liveUrl: "",
                })
              }
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-semibold transition-all shadow-sm hover:shadow"
            >
              <Plus size={18} />
              Add Project
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {fields.map((field, index) => (
              <div key={field.id} className="border border-slate-200/80 rounded-2xl p-6 relative bg-slate-50/30 hover:bg-slate-50/50 transition-colors">
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors animate-fade-in"
                  >
                    <Trash2 size={18} />
                  </button>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Project Title</label>
                    <input
                      {...register(`projects.${index}.title`)}
                      placeholder="e.g. Portfolio Website"
                      className="border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Tech Stack</label>
                    <input
                      {...register(`projects.${index}.techStack`)}
                      placeholder="React, Next.js, MongoDB"
                      className="border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">GitHub Link</label>
                    <input
                      {...register(`projects.${index}.githubUrl`)}
                      placeholder="https://github.com/..."
                      className="border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Live Demo Link</label>
                    <input
                      {...register(`projects.${index}.liveUrl`)}
                      placeholder="https://myproject.com"
                      className="border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Description</label>
                    <button
                      type="button"
                      onClick={() => generateDescription(index)}
                      disabled={aiLoading}
                      className="flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-100 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all shadow-sm"
                    >
                      <Sparkles size={14} />
                      {aiLoading ? "Generating..." : "Generate with AI"}
                    </button>
                  </div>

                  <textarea
                    rows={4}
                    {...register(`projects.${index}.description`)}
                    placeholder="Briefly describe what you built, key challenges, and results..."
                    className="w-full border border-slate-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white"
                  />
                </div>
              </div>
            ))}

            {/* Footer */}

            <div className="flex justify-between border-t border-slate-100 pt-8 mt-8">
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