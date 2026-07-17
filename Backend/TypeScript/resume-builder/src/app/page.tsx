import React from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles, FileText, CheckCircle2, ShieldCheck, Zap } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-200">
              R
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              CV.AI
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/auth/login" 
              className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="/auth/register" 
              className="text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl transition-all shadow-sm hover:shadow"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-20 flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase mb-6 animate-pulse">
          <Sparkles size={14} />
          Powered by Gemini AI
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-950 max-w-4xl leading-tight">
          Create standard, <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">ATS-optimized</span> resumes in minutes
        </h1>
        
        <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
          Craft standout professional resumes with AI-generated bullet points, custom tailored skill recommendations, and instant ATS score reports.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link 
            href="/auth/register" 
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-100 hover:shadow-xl hover:-translate-y-0.5"
          >
            Create My Resume Now
            <ArrowRight size={20} />
          </Link>
          <Link 
            href="/auth/login" 
            className="inline-flex items-center justify-center border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-2xl font-bold transition-all shadow-sm hover:shadow"
          >
            Dashboard
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-24 w-full">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200/80 p-8 text-left shadow-sm hover:shadow-md transition-all duration-300">
            <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">AI-Driven Optimization</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Automatically draft summaries and generate professional job descriptions that match top recruiter standards.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200/80 p-8 text-left shadow-sm hover:shadow-md transition-all duration-300">
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">ATS Score Checker</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Instantly analyze and scan your resume against common Applicant Tracking Systems to maximize call-backs.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200/80 p-8 text-left shadow-sm hover:shadow-md transition-all duration-300">
            <div className="h-12 w-12 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-600 mb-6">
              <FileText size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Clean PDF Templates</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Export simple, standard formats that hiring managers love. Minimal design to emphasize content and credentials.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white/40 py-8 text-center text-sm text-slate-500">
        &copy; {new Date().getFullYear()} CV.AI Resume Builder. All rights reserved.
      </footer>
    </div>
  )
}