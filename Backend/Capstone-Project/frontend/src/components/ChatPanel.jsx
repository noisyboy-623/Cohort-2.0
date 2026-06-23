import React, { useRef, useEffect } from 'react';

export default function ChatPanel({ chatMessages, chatPrompt, setChatPrompt, isAiInvoking, onSendPrompt, height, onResizeStart }) {
  const chatBottomRef = useRef(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  return (
    <div style={height ? { height } : {}} className={`flex flex-col min-h-0 bg-[#0f131d] relative ${height ? 'shrink-0' : 'flex-grow flex-1'}`}>
      {/* Top drag resize handle */}
      {onResizeStart && (
        <div
          onMouseDown={onResizeStart}
          className="absolute top-0 left-0 right-0 h-1 cursor-row-resize bg-white/5 hover:bg-[#e2b04e]/50 z-30 transition-colors"
        />
      )}
      <div className="flex-grow flex flex-col min-h-0 pt-1">
      {/* Header */}
      <div className="p-3 border-b border-white/5 bg-[#171b26] flex items-center justify-between select-none">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[#e2b04e] text-sm">auto_awesome</span>
          <span className="text-xs font-semibold text-slate-200">Aether AI Copilot</span>
        </div>
        <span className="px-1.5 py-0.5 bg-[#e2b04e]/10 text-[#e2b04e] text-[9px] rounded font-mono uppercase">
          Active
        </span>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-3 overflow-y-auto space-y-3 no-scrollbar">
        {chatMessages.map((msg, idx) => (
          <div key={idx} className="flex gap-2 text-xs">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'user' ? 'bg-[#7bd0ff]/20 text-[#7bd0ff]' : 'bg-[#e2b04e]/20 text-[#e2b04e]'
              }`}
            >
              <span className="material-symbols-outlined text-[12px]">
                {msg.role === 'user' ? 'person' : 'smart_toy'}
              </span>
            </div>
            <div
              className={`p-2 rounded-lg leading-normal break-words max-w-[85%] ${
                msg.role === 'user'
                  ? 'bg-slate-800 text-slate-100 rounded-tr-none'
                  : 'bg-[#1c1f2a] text-slate-300 border border-white/5 rounded-tl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatBottomRef} />
      </div>

      {/* Prompt input */}
      <form onSubmit={onSendPrompt} className="p-3 bg-[#171b26] border-t border-white/5 flex gap-2">
        <input
          type="text"
          disabled={isAiInvoking}
          value={chatPrompt}
          onChange={(e) => setChatPrompt(e.target.value)}
          placeholder={isAiInvoking ? 'AI is executing codes...' : 'Prompt AI to build...'}
          className="flex-1 bg-slate-900 border border-white/10 rounded-md py-1.5 px-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#e2b04e] transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isAiInvoking || !chatPrompt.trim()}
          className="px-3 bg-[#e2b04e] text-[#412d00] hover:text-black hover:brightness-110 font-bold rounded-md flex items-center justify-center transition-all disabled:opacity-40 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">send</span>
        </button>
      </form>
      </div>
    </div>
  );
}
