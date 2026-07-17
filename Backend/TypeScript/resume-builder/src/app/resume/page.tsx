"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Plus, FileText, Trash2, Briefcase } from "lucide-react";

import {
  createResumeApi,
  deleteResumeApi,
  getAllResumesApi,
} from "@/apis/resume.api";

interface Resume {
  _id: string;
  title: string;
  jobTitle: string;
  experienceLevel: string;
}

export default function ResumePage() {
  const router = useRouter();

  const [resumes, setResumes] = useState<Resume[]>([]);

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    jobTitle: "",
    experienceLevel: "Fresher",
  });

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const data = await getAllResumesApi();

      setResumes(data.resumes || []);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleCreateResume = async () => {
    try {
      const response = await createResumeApi({
        title: formData.title,
        jobTitle: formData.jobTitle,
        experienceLevel: formData.experienceLevel,
      });


      const resumeId = response.data._id;

      router.push(`/resume/${resumeId}`);
    } catch (error) {
    }
  };

  const handleDelete = async (resumeId: string) => {
    try {
      await deleteResumeApi(resumeId);

      fetchResumes();
    } catch (error) {
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}

        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">My Resumes</h1>

            <p className="text-slate-500 mt-2">
              Create ATS-friendly resumes using AI.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-sm hover:shadow-md transition-all font-medium"
          >
            <Plus size={18} />
            Create Resume
          </button>
        </div>

        {/* Empty State */}

        {!loading && resumes.length === 0 && (
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl border border-slate-200/60 p-16 text-center shadow-sm">
            <FileText size={70} className="mx-auto text-indigo-200" />

            <h2 className="text-2xl font-bold mt-6 text-slate-800">No Resume Yet</h2>

            <p className="text-slate-500 mt-2">
              Create your first AI powered resume.
            </p>

            <button
              onClick={() => setShowModal(true)}
              className="mt-8 bg-indigo-600 hover:bg-indigo-700 transition-colors text-white px-8 py-3 rounded-xl font-medium shadow-sm hover:shadow"
            >
              Create Resume
            </button>
          </div>
        )}

        {/* Resume Grid */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <div
              key={resume._id}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-indigo-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="font-bold text-xl">{resume.title}</h2>

                  <div className="flex items-center gap-2 text-slate-500 mt-2">
                    <Briefcase size={16} />
                    {resume.jobTitle}
                  </div>

                  <span className="inline-block mt-4 bg-indigo-50 text-indigo-700 border border-indigo-100 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
                    {resume.experienceLevel}
                  </span>
                </div>

                <button
                  onClick={() => handleDelete(resume._id)}
                  className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <button
                onClick={() => router.push(`/resume/${resume._id}`)}
                className="mt-auto pt-6 w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-medium transition-colors shadow-sm hover:shadow"
              >
                Continue Building
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center px-4 z-50">
          <div className="bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">Create Resume</h2>

            <div className="space-y-4">
                <input
                  placeholder="Resume Title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
                    })
                  }
                  className="w-full border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-xl p-3 transition-all outline-none"
                />

                <input
                  placeholder="Job Title"
                  value={formData.jobTitle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      jobTitle: e.target.value,
                    })
                  }
                  className="w-full border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-xl p-3 transition-all outline-none"
                />

                <select
                  value={formData.experienceLevel}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      experienceLevel: e.target.value,
                    })
                  }
                  className="w-full border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-xl p-3 transition-all outline-none bg-white"
                >
                <option>Fresher</option>

                <option>Junior</option>

                <option>Mid-Level</option>

                <option>Senior</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl font-medium transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={handleCreateResume}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium shadow-sm hover:shadow transition-all"
              >
                Create Resume
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}