import React, { useState } from 'react';

export default function PreviewPanel({ previewUrl, iframeKey, onRefresh }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className={`flex-1 flex flex-col bg-[#05080f] ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      <div className="flex items-center gap-2 px-4 py-1.5 bg-[#171b26] border-b border-white/5 text-[11px] text-slate-400 select-none">
        <div className="flex gap-1 mr-2 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60"></div>
        </div>
        <div className="flex-1 bg-slate-900 border border-white/5 rounded px-2.5 py-0.5 text-xs text-slate-400 font-mono flex items-center gap-1.5 truncate">
          <span className="material-symbols-outlined text-[12px] text-slate-500">lock</span>
          {previewUrl}
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={onRefresh}
            className="p-1 hover:text-white transition-colors cursor-pointer flex items-center"
            title="Reload Preview Frame"
          >
            <span className="material-symbols-outlined text-[16px]">refresh</span>
          </button>
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 hover:text-white transition-colors cursor-pointer flex items-center text-slate-400"
            title="Open in New Tab"
          >
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
          </a>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className={`p-1 transition-colors cursor-pointer flex items-center ${isFullscreen ? 'text-[#e2b04e] hover:text-white' : 'hover:text-white'}`}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Preview"}
          >
            <span className="material-symbols-outlined text-[16px]">
              {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
            </span>
          </button>
        </div>
      </div>
      <div className="flex-1 bg-slate-950 p-1">
        <iframe
          key={iframeKey}
          src={previewUrl}
          title="App Live Preview"
          className="w-full h-full bg-[#111] border-none rounded-md"
          sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts"
        />
      </div>
    </div>
  );
}
