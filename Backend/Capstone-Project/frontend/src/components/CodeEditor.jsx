import React from 'react';

export default function CodeEditor({
  selectedFile,
  editorContent,
  setEditorContent,
  isReadingFile,
  isSavingFile,
  fileContent,
  onSave
}) {
  if (!selectedFile) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-500">
        <span className="material-symbols-outlined text-4xl text-slate-700 mb-2">code</span>
        <p className="text-xs">No active file loaded. Select a file from the explorer list to view or edit code contents.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Editor Bar */}
      <div className="px-4 py-2 bg-[#171b26] border-b border-white/5 flex justify-between items-center text-xs shrink-0 select-none">
        <span className="font-mono text-slate-400">{selectedFile}</span>
        <button
          onClick={onSave}
          disabled={isSavingFile || isReadingFile || fileContent === editorContent}
          className="px-3 py-1 bg-[#e2b04e] text-[#412d00] hover:text-black disabled:opacity-40 hover:brightness-110 font-bold rounded flex items-center gap-1 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">save</span>
          {isSavingFile ? 'Saving...' : 'Save File'}
        </button>
      </div>

      {/* Code Area */}
      <div className="flex-1 flex relative min-h-0 bg-[#0f131d]">
        {isReadingFile && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#0b0f19]/70 z-10">
            <div className="w-8 h-8 rounded-full border-2 border-[#e2b04e]/20 border-t-[#e2b04e] animate-spin"></div>
          </div>
        )}

        <textarea
          value={editorContent}
          onChange={(e) => setEditorContent(e.target.value)}
          className="flex-1 h-full p-4 font-mono text-xs text-slate-300 bg-transparent resize-none border-none focus:ring-0 focus:outline-none leading-relaxed overflow-y-auto selection:bg-[#e2b04e]/30"
          spellCheck={false}
        />
      </div>
    </div>
  );
}
