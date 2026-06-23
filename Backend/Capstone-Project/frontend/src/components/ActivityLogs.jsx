import React, { useRef, useEffect } from 'react';

export default function ActivityLogs({ logs, height, onResizeStart, embedded }) {
  const logsBottomRef = useRef(null);

  useEffect(() => {
    logsBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const getLogClass = (log) => {
    if (log.includes('[USER PROMPT]')) return 'text-sky-400 font-semibold';
    if (log.includes('[SYSTEM]')) return 'text-emerald-400 font-semibold';
    if (log.includes('Invoking')) return 'text-[#e2b04e]';
    if (log.includes('Received response')) return 'text-purple-400';
    if (log.includes('Connection closed')) return 'text-red-400';
    return 'text-slate-400';
  };

  return (
    <div 
      style={{ height }} 
      className={embedded 
        ? "relative bg-[#0a0e18] border-t border-white/10 flex flex-col shrink-0 overflow-hidden" 
        : "absolute bottom-0 right-0 left-0 bg-[#0a0e18]/95 backdrop-blur-sm border-t border-white/10 flex flex-col z-20"
      }
    >
      {/* Top drag resize handle */}
      <div
        onMouseDown={onResizeStart}
        className="absolute top-0 left-0 right-0 h-1 cursor-row-resize bg-white/5 hover:bg-[#e2b04e]/50 z-30 transition-colors"
      />
      <div className="px-4 py-1.5 border-b border-white/5 bg-[#171b26] flex items-center gap-1.5 text-[10px] font-bold text-slate-400 select-none uppercase tracking-wider shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-[#e2b04e]"></span>
        Agent Stream Activity logs
      </div>
      <div className="flex-1 overflow-y-auto p-3 font-mono text-[11px] text-slate-400 space-y-1.5">
        {logs.length === 0 ? (
          <p className="text-slate-600 italic">No agent log streams generated yet. Interact with Copilot to trigger updates.</p>
        ) : (
          logs.map((log, index) => (
            <div key={index} className={`leading-relaxed break-all ${getLogClass(log)}`}>
              &gt; {log}
            </div>
          ))
        )}
        <div ref={logsBottomRef} />
      </div>
    </div>
  );
}
