"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Eye, Download, Sparkles } from "lucide-react";
import { useParams } from "next/navigation";

interface Resume {
  title: string;
  summary: string;

  personalInfo: {
    fullname: string;
    email: string;
    mobile: string;
    location: string;
    github: string;
    portfolio: string;
  };

  education: {
    institute: string;
    degree: string;
    startDate: string;
    endDate: string;
  }[];

  skills: string[];

  projects: {
    title: string;
    description: string;
    techStack: string[];
    githubUrl: string;
    liveUrl: string;
  }[];

  workExperience: {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];

  certifications: string[];
}

export default function ResumePreviewPage() {
  const [resume, setResume] = useState<Resume | null>(null);

  const [loading, setLoading] = useState(true);

  const { resumeId } = useParams();

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const { data } = await axios.get(`/api/resume/${resumeId}`);


      setResume(data.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading Resume...
      </div>
    );
  }

  if (!resume) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Actions */}

          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 sticky top-6 shadow-lg">
              <h2 className="font-extrabold text-xl mb-6 text-slate-900 tracking-tight">Actions</h2>

              <div className="space-y-3.5">
                <button className="w-full flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-xl font-semibold shadow-sm hover:shadow transition-all cursor-pointer">
                  <Sparkles size={18} />
                  ATS Score
                </button>

                <button className="w-full flex items-center justify-center gap-3 border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-3 rounded-xl font-semibold transition-colors cursor-pointer">
                  <Download size={18} />
                  Download PDF
                </button>

                <button className="w-full flex items-center justify-center gap-3 border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-3 rounded-xl font-semibold transition-colors cursor-pointer">
                  <Eye size={18} />
                  Edit Resume
                </button>
              </div>
            </div>
          </div>

          {/* Resume */}

          {/* Resume Paper */}
          <div className="lg:col-span-3">
            <div
              id="resume-preview"
              className="bg-white shadow-xl rounded-2xl border border-slate-200/60 p-12 max-w-4xl mx-auto"
            >
              {/* Header */}
              <div className="border-b border-slate-200 pb-6">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                  {resume.personalInfo?.fullname}
                </h1>

                <div className="mt-3 text-slate-600 text-sm flex flex-wrap gap-4 font-medium">
                  <span>{resume.personalInfo?.email}</span>
                  <span>{resume.personalInfo?.mobile}</span>
                  <span>{resume.personalInfo?.location}</span>
                </div>

                <div className="mt-2.5 flex gap-4 text-sm font-semibold text-indigo-600">
                  {resume.personalInfo?.github && <span>{resume.personalInfo?.github}</span>}
                  {resume.personalInfo?.portfolio && <span>{resume.personalInfo?.portfolio}</span>}
                </div>
              </div>

              {/* Summary */}
              {resume.summary && (
                <section className="mt-8 border-b border-slate-100 pb-6">
                  <h2 className="font-bold text-lg text-slate-900 uppercase tracking-wider mb-3">
                    Professional Summary
                  </h2>

                  <p className="text-slate-700 leading-relaxed text-sm">{resume.summary}</p>
                </section>
              )}

              {/* Skills */}
              <section className="mt-8 border-b border-slate-100 pb-6">
                <h2 className="font-bold text-lg text-slate-900 uppercase tracking-wider mb-3">Skills</h2>

                <div className="flex flex-wrap gap-2">
                  {resume.skills?.map((skill) => (
                    <span
                      key={skill}
                      className="bg-slate-50 border border-slate-200 text-slate-700 px-3 py-1 rounded-lg text-xs font-semibold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              {/* Experience */}
              <section className="mt-8 border-b border-slate-100 pb-6">
                <h2 className="font-bold text-lg text-slate-900 uppercase tracking-wider mb-4">Work Experience</h2>

                {resume.workExperience?.map((exp, index) => (
                  <div key={index} className="mb-5 last:mb-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-slate-800">{exp.position}</h3>
                      <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>

                    <p className="text-indigo-600 font-semibold text-xs mt-0.5">{exp.company}</p>

                    <p className="mt-2 text-slate-700 text-sm leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </section>

              {/* Projects */}
              <section className="mt-8 border-b border-slate-100 pb-6">
                <h2 className="font-bold text-lg text-slate-900 uppercase tracking-wider mb-4">Projects</h2>

                {resume.projects?.map((project, index) => (
                  <div key={index} className="mb-5 last:mb-0">
                    <h3 className="font-bold text-slate-800">{project.title}</h3>

                    <p className="mt-1.5 text-slate-700 text-sm leading-relaxed">{project.description}</p>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {project.techStack?.map((tech) => (
                        <span
                          key={tech}
                          className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-xs font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </section>

              {/* Education */}
              <section className="mt-8 last:border-b-0 border-b border-slate-100 pb-6">
                <h2 className="font-bold text-lg text-slate-900 uppercase tracking-wider mb-4">Education</h2>

                {resume.education?.map((edu, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-slate-800">{edu.degree}</h3>
                      <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                        {edu.startDate} - {edu.endDate}
                      </span>
                    </div>

                    <p className="text-slate-600 text-sm mt-0.5">{edu.institute}</p>
                  </div>
                ))}
              </section>

              {/* Certifications */}

              {resume.certifications?.length > 0 && (
                <section className="mt-8">
                  <h2 className="font-bold text-xl mb-4">Certifications</h2>

                  <ul className="list-disc pl-5">
                    {resume.certifications.map((cert, index) => (
                      <li key={index}>{cert}</li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}