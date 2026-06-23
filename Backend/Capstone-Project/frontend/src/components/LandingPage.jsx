import React, { useState } from 'react';

const LOADING_STATUSES = [
  'Requesting sandbox server allocation...',
  'Initializing Docker container workspace...',
  'Configuring secure preview proxy routes...',
  'Starting React Vite development server...',
  'Securing terminal shell listener socket...',
  'Almost ready! Syncing workspace state...',
];

export default function LandingPage({
  // Projects
  projects,
  isFetchingProjects,
  onRefreshProjects,
  error,
  // Create project
  newProjectTitle,
  setNewProjectTitle,
  isCreatingProject,
  createProjectError,
  onCreateProject,
  // Start sandbox
  startingSandboxId,
  onStartSandbox,
}) {
  const [statusIndex, setStatusIndex] = useState(0);
  const [loadingStatusInterval, setLoadingStatusInterval] = useState(null);

  // Cycle loading messages while a sandbox is starting
  React.useEffect(() => {
    if (startingSandboxId) {
      const iv = setInterval(() => {
        setStatusIndex((p) => (p + 1) % LOADING_STATUSES.length);
      }, 2500);
      setLoadingStatusInterval(iv);
      return () => clearInterval(iv);
    } else {
      setStatusIndex(0);
      if (loadingStatusInterval) clearInterval(loadingStatusInterval);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startingSandboxId]);

  return (
    <div className="min-h-screen w-full bg-[#0b0f19] flex flex-col justify-between overflow-y-auto relative select-none">
      {/* Background Tech Accent Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-[radial-gradient(circle_at_center,rgba(226,176,78,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[60%] rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.06)_0%,transparent_70%)] pointer-events-none" />

      {/* Header */}
      <header className="w-full max-w-6xl mx-auto px-6 h-16 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[#e2b04e]/10 border border-[#e2b04e]/30 flex items-center justify-center">
            <span className="material-symbols-outlined text-[#e2b04e] text-lg font-bold">auto_awesome</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Aether<span className="text-[#e2b04e]">IDE</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">code</span>
            Documentation
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center w-full max-w-5xl mx-auto px-6 py-10 z-10 gap-10">

        {/* Hero Text */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/60 border border-slate-700/50 text-[11px] font-semibold text-[#e2b04e] uppercase tracking-wider mb-5 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e2b04e]" />
            Next-Gen AI Sandbox Environment
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
            The Intelligent Workspace <br />
            For{' '}
            <span className="bg-gradient-to-r from-[#e2b04e] via-[#f2be5b] to-[#7bd0ff] bg-clip-text text-transparent">
              Instant Prototypes
            </span>
          </h1>
          <p className="text-base text-slate-400 max-w-2xl mb-2 leading-relaxed">
            Create an isolated React playground. Chat with our AI agent, write code directly, and interact with a fully integrated terminal.
          </p>
        </div>

        {/* Two-column layout: Create project + Project list */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ── Left: Create New Project ── */}
          <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl p-6 border border-white/5 shadow-2xl flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#e2b04e]">add_circle</span>
              <h2 className="text-base font-semibold text-white">New Project</h2>
            </div>

            <form onSubmit={onCreateProject} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
                  Project Title
                </label>
                <input
                  type="text"
                  value={newProjectTitle}
                  onChange={(e) => setNewProjectTitle(e.target.value)}
                  placeholder="e.g. My React Dashboard"
                  disabled={isCreatingProject}
                  className="bg-[#0f131d] border border-white/10 focus:border-[#e2b04e]/60 focus:outline-none text-white placeholder:text-slate-600 rounded-lg px-3 py-2.5 text-sm transition-colors disabled:opacity-50"
                />
                {createProjectError && (
                  <p className="text-red-400 text-xs mt-0.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">error</span>
                    {createProjectError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isCreatingProject || !newProjectTitle.trim()}
                className="w-full py-3 px-4 bg-gradient-to-r from-[#e2b04e] to-[#ffcc6b] text-[#412d00] hover:text-black font-bold rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer hover:brightness-110 duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2"
              >
                {isCreatingProject ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#412d00]/30 border-t-[#412d00] rounded-full animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-lg">bolt</span>
                    Create Project
                  </>
                )}
              </button>
            </form>
          </div>

          {/* ── Right: Your Projects ── */}
          <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl p-6 border border-white/5 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sky-400">folder_open</span>
                <h2 className="text-base font-semibold text-white">Your Projects</h2>
              </div>
              <button
                onClick={onRefreshProjects}
                disabled={isFetchingProjects}
                title="Refresh projects"
                className="p-1 text-slate-400 hover:text-white hover:bg-white/5 rounded transition-all cursor-pointer disabled:opacity-40"
              >
                <span className={`material-symbols-outlined text-[18px] ${isFetchingProjects ? 'animate-spin' : ''}`}>
                  refresh
                </span>
              </button>
            </div>

            {/* Global error */}
            {error && (
              <div className="text-red-400 text-xs bg-red-950/40 border border-red-900/30 rounded-lg px-3 py-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">error</span>
                {error}
              </div>
            )}

            {/* Project list / empty states */}
            <div className="flex-1 overflow-y-auto space-y-2 max-h-72 no-scrollbar">
              {isFetchingProjects && projects.length === 0 ? (
                <div className="flex flex-col items-center py-8 text-slate-500">
                  <div className="w-8 h-8 border-2 border-slate-700 border-t-[#e2b04e] rounded-full animate-spin mb-3" />
                  <span className="text-xs">Loading projects...</span>
                </div>
              ) : projects.length === 0 ? (
                <div className="flex flex-col items-center py-8 text-slate-500">
                  <span className="material-symbols-outlined text-3xl mb-2 opacity-40">inventory_2</span>
                  <p className="text-xs">No projects yet. Create one to get started.</p>
                </div>
              ) : (
                projects.map((project) => {
                  const isStarting = startingSandboxId === project._id;
                  return (
                    <div
                      key={project._id}
                      className="flex items-center justify-between gap-3 bg-[#171b26] border border-white/5 hover:border-slate-700/50 rounded-xl px-4 py-3 transition-all group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-7 h-7 rounded bg-[#e2b04e]/10 flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[#e2b04e] text-sm">code_blocks</span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-white text-sm font-medium truncate">{project.title}</p>
                          <p className="text-slate-500 text-[10px] font-mono truncate">{project._id}</p>
                        </div>
                      </div>

                      {isStarting ? (
                        <div className="flex flex-col items-end gap-0.5 shrink-0">
                          <div className="w-4 h-4 border-2 border-[#e2b04e]/20 border-t-[#e2b04e] rounded-full animate-spin" />
                          <span className="text-[9px] text-[#e2b04e] font-mono whitespace-nowrap">
                            {LOADING_STATUSES[statusIndex]}
                          </span>
                        </div>
                      ) : (
                        <button
                          onClick={() => onStartSandbox(project._id)}
                          disabled={!!startingSandboxId}
                          className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-[#e2b04e] text-[#412d00] hover:text-black hover:brightness-110 font-bold rounded-lg text-xs transition-all active:scale-95 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <span className="material-symbols-outlined text-sm">rocket_launch</span>
                          Launch
                        </button>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Loading overlay while a sandbox starts */}
            {startingSandboxId && (
              <div className="text-[10px] text-[#e2b04e] font-mono text-center py-1 animate-pulse">
                {LOADING_STATUSES[statusIndex]}
              </div>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
          <div className="bg-[#171b26] p-6 rounded-xl border border-white/5 hover:border-slate-700/50 transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-sky-400">smart_toy</span>
            </div>
            <h3 className="text-white font-semibold mb-2">AI Software Agent</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Tell the AI what you want to build. It automatically lists, reads, and updates files inside the sandbox.
            </p>
          </div>

          <div className="bg-[#171b26] p-6 rounded-xl border border-white/5 hover:border-slate-700/50 transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-[#e2b04e]/10 border border-[#e2b04e]/30 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[#e2b04e]">terminal</span>
            </div>
            <h3 className="text-white font-semibold mb-2">Interactive Terminal</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Run commands directly using our real-time xterm.js terminal connected via socket.io to the backend.
            </p>
          </div>

          <div className="bg-[#171b26] p-6 rounded-xl border border-white/5 hover:border-slate-700/50 transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-emerald-400">visibility</span>
            </div>
            <h3 className="text-white font-semibold mb-2">Hot Live Preview</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Watch your application update instantly in the embedded hot-reload preview iframe.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center border-t border-white/5 bg-[#0a0e18] z-10 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <span>&copy; {new Date().getFullYear()} Aether IDE Sandbox. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#terms" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
