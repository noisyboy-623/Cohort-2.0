"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Sparkles, X } from "lucide-react";

interface Props {
  resumeId: string;
  onNext: () => void;
  onBack: () => void;
}

export default function SkillsStep({ resumeId, onNext, onBack }: Props) {
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  const [loading, setLoading] = useState(false);

  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const { data } = await axios.get(`/api/resume/${resumeId}/`);

      setSkills(data.resume.skills || []);
    } catch (error) {
    }
  };

  const addSkill = () => {
    if (!skillInput.trim()) return;

    setSkills((prev) => [...prev, skillInput.trim()]);

    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((item) => item !== skill));
  };

  const generateSkills = async () => {
    try {
      setAiLoading(true);

      const { data: resumeData } = await axios.get(`/api/resume/${resumeId}`);


      const resume = resumeData.resume;

      const { data } = await axios.post("/api/ai/generate-skills", {
        jobTitle: "web developer",
        experienceLevel: "mid-level",
      });


      setSkills(data.data.skills);
    } catch (error) {
    } finally {
      setAiLoading(false);
    }
  };

  const saveSkills = async () => {
    try {
      setLoading(true);

      await axios.patch(`/api/resume/${resumeId}`, {
        skills,
      });

      onNext();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-2.5">
            <span className="text-sm font-semibold text-slate-700">Step 3 of 8</span>

            <span className="text-sm font-bold text-indigo-600">37%</span>
          </div>

          <div className="h-2 bg-slate-200/80 rounded-full overflow-hidden">
            <div className="h-full w-[37%] bg-indigo-600 rounded-full transition-all duration-500 ease-out shadow-sm shadow-indigo-200" />
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-10 shadow-lg">
          <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Skills</h1>

              <p className="text-slate-500 mt-2">
                Add skills relevant to your role.
              </p>
            </div>

            <button
              onClick={generateSkills}
              disabled={aiLoading}
              className="flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-all shadow-sm hover:shadow-md disabled:opacity-50"
            >
              <Sparkles size={18} />

              {aiLoading ? "Generating..." : "Generate with AI"}
            </button>
          </div>

          {/* Input */}

          <div className="flex gap-3">
            <input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="Enter skill (e.g. React, Python)"
              className="flex-1 border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm outline-none bg-white"
            />

            <button
              onClick={addSkill}
              type="button"
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-colors shadow-sm"
            >
              Add
            </button>
          </div>

          {/* Skills */}

          <div className="flex flex-wrap gap-2.5 mt-8">
            {skills?.map((skill) => (
              <div
                key={skill}
                className="flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-100 px-4 py-2 rounded-full text-sm font-medium transition-all"
              >
                {skill}

                <button 
                  onClick={() => removeSkill(skill)}
                  className="text-indigo-400 hover:text-indigo-600 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Footer */}

          <div className="flex justify-between mt-12 border-t border-slate-100 pt-8">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-5 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 font-medium transition-colors"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <button
              onClick={saveSkills}
              disabled={loading}
              className="flex items-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
            >
              {loading ? "Saving..." : "Continue"}

              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}