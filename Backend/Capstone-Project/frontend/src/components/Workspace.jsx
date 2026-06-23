import { useState, useEffect } from 'react';
import FileExplorer from './FileExplorer';
import ChatPanel from './ChatPanel';
import ActivityLogs from './ActivityLogs';
import PreviewPanel from './PreviewPanel';
import TerminalPanel from './TerminalPanel';
import CodeEditor from './CodeEditor';

export default function Workspace({ sandboxId, previewUrl, onReset }) {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [editorContent, setEditorContent] = useState('');
  
  // Tabs & Views
  const [activeTab, setActiveTab] = useState('preview'); // 'preview', 'terminal', 'editor'

  // Loading States
  const [isSyncingFiles, setIsSyncingFiles] = useState(false);
  const [isReadingFile, setIsReadingFile] = useState(false);
  const [isSavingFile, setIsSavingFile] = useState(false);

  // AI Chat & Logs
  const [chatPrompt, setChatPrompt] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'assistant',
      text: "Hello! I am Aether AI, your development partner. Type below what modifications or features you want, and I'll code it directly in the sandbox."
    }
  ]);
  const [logs, setLogs] = useState([]);
  const [isAiInvoking, setIsAiInvoking] = useState(false);

  // Notification State
  const [notification, setNotification] = useState(null);

  // Preview Iframe key (used to force-reload)
  const [iframeKey, setIframeKey] = useState(0);

  // Sidebar navigation and deployment simulated states
  const [activeSidebarTab, setActiveSidebarTab] = useState('explorer');
  const [isDeploying, setIsDeploying] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Resizable layout states
  const [sidebarWidth, setSidebarWidth] = useState(320);
  const [isResizingSidebar, setIsResizingSidebar] = useState(false);
  const [logsHeight, setLogsHeight] = useState(176);
  const [isResizingLogs, setIsResizingLogs] = useState(false);

  // Resize effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isResizingSidebar) {
        // Main left SideNavBar is fixed at 260px (or 0px if collapsed), so we subtract it from the clientX to find the width of the middle pane
        const sidebarOffset = isSidebarCollapsed ? 0 : 260;
        const newWidth = Math.max(200, Math.min(600, e.clientX - sidebarOffset));
        setSidebarWidth(newWidth);
      }
      if (isResizingLogs) {
        const windowHeight = window.innerHeight;
        const newHeight = Math.max(80, Math.min(windowHeight - 120, windowHeight - e.clientY));
        setLogsHeight(newHeight);
      }
    };

    const handleMouseUp = () => {
      setIsResizingSidebar(false);
      setIsResizingLogs(false);
    };

    if (isResizingSidebar || isResizingLogs) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizingSidebar, isResizingLogs, isSidebarCollapsed]);

  // Helper to show temporary toasts
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Simulated project deployment logic
  const handleDeploy = () => {
    if (isDeploying) return;
    setIsDeploying(true);

    setLogs((prev) => [...prev, `[DEPLOY] Initiating deployment for project sandbox ID: ${sandboxId.substring(0, 8)}...`]);

    setTimeout(() => {
      setLogs((prev) => [...prev, '[DEPLOY] Compiling React static production build files...']);
    }, 1000);

    setTimeout(() => {
      setLogs((prev) => [...prev, '[DEPLOY] Optimization phase: compressing bundles and creating assets static map...']);
    }, 2500);

    setTimeout(() => {
      setLogs((prev) => [...prev, '[DEPLOY] Connecting to secure remote staging server edge-router-1...']);
    }, 4000);

    setTimeout(() => {
      setLogs((prev) => [...prev, '[DEPLOY] Upload completed. CDN cache invalidation triggered.']);
      setLogs((prev) => [...prev, `[SYSTEM] Production deployment successful! App live at: https://${sandboxId.substring(0, 8)}.aether-stage.app`]);
      setIsDeploying(false);
      showNotification('App successfully deployed to production staging!');
    }, 5500);
  };

  // 1. Fetch File List
  const fetchFileList = async (quiet = false) => {
    if (!quiet) setIsSyncingFiles(true);
    try {
      const res = await fetch(`/agent-proxy/${sandboxId}/list-files`);
      if (!res.ok) throw new Error('Failed to fetch workspace file tree');
      const data = await res.json();
      setFiles(data.files || []);
    } catch (err) {
      showNotification(err.message, 'error');
    } finally {
      setIsSyncingFiles(false);
    }
  };

  // Initialize workspace files
  useEffect(() => {
    if (sandboxId) {
      fetchFileList();
    }
  }, [sandboxId]);

  // 2. Fetch File Content
  const handleFileSelect = async (filePath) => {
    setSelectedFile(filePath);
    setIsReadingFile(true);
    setActiveTab('editor'); // Switch tab to show the editor

    try {
      const res = await fetch(`/agent-proxy/${sandboxId}/read-files?files=${filePath}`);
      if (!res.ok) throw new Error(`Failed to read file ${filePath}`);
      const data = await res.json();
      
      // Match absolute path returned (e.g. "/src/App.jsx" vs "src/App.jsx")
      const fileKey = filePath.startsWith('/') ? filePath : `/${filePath}`;
      const alternateKey = filePath;
      const fileData = data.files.find(
        (f) => Object.keys(f)[0] === fileKey || Object.keys(f)[0] === alternateKey
      );

      if (fileData) {
        const content = Object.values(fileData)[0];
        setFileContent(content);
        setEditorContent(content);
      } else {
        throw new Error('File content could not be located in response');
      }
    } catch (err) {
      showNotification(err.message, 'error');
    } finally {
      setIsReadingFile(false);
    }
  };

  // 3. Save File Edits
  const handleSaveFile = async () => {
    if (!selectedFile) return;
    setIsSavingFile(true);

    try {
      const res = await fetch(`/agent-proxy/${sandboxId}/update-files`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          updates: [
            {
              file: selectedFile,
              content: editorContent
            }
          ]
        })
      });

      if (!res.ok) throw new Error('Failed to apply workspace changes');
      
      setFileContent(editorContent);
      showNotification(`Successfully saved ${selectedFile}!`);
      
      // Reload iframe preview to show changes
      setIframeKey((prev) => prev + 1);
    } catch (err) {
      showNotification(err.message, 'error');
    } finally {
      setIsSavingFile(false);
    }
  };

  // 4. Send Message to AI (POST SSE invocation stream)
  const handleSendPrompt = async (e) => {
    e.preventDefault();
    if (!chatPrompt.trim() || isAiInvoking) return;

    const promptText = chatPrompt;
    setChatPrompt('');
    setChatMessages((prev) => [...prev, { role: 'user', text: promptText }]);
    setIsAiInvoking(true);
    setLogs((prev) => [...prev, `[USER PROMPT] Sent request: "${promptText}"`]);

    try {
      const response = await fetch('/api/ai/invoke', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: promptText,
          projectId: sandboxId
        })
      });

      if (!response.ok) throw new Error('AI service failed to connect');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // Hold partial line in buffer

        for (const line of lines) {
          const cleanLine = line.trim();
          if (!cleanLine) continue;

          // Trim EventSource protocol prefixes if present (e.g., data: ...)
          let rawData = cleanLine;
          if (cleanLine.startsWith('data:')) {
            rawData = cleanLine.substring(5).trim();
          }

          // Parse string or JSON log
          let formattedLog = rawData;
          try {
            // Clean quoted JSON lines
            if ((rawData.startsWith('"') && rawData.endsWith('"')) || (rawData.startsWith('{') && rawData.endsWith('}'))) {
              formattedLog = JSON.parse(rawData);
            }
          } catch (err) {
            // Ignore parse errors, fallback to raw text
            console.warn('Error parsing log line: ', err);
          }

          if (formattedLog && formattedLog.trim()) {
            setLogs((prev) => [...prev, formattedLog.trim()]);
          }
        }
      }

      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'Changes applied! AI has finished editing the workspace. Syncing files...'
        }
      ]);
      setLogs((prev) => [...prev, '[SYSTEM] AI code edits successfully processed.']);
      
      // Auto refresh files and preview
      fetchFileList(true);
      setIframeKey((prev) => prev + 1);
    } catch (err) {
      showNotification(err.message, 'error');
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `An error occurred while compiling changes: ${err.message}`
        }
      ]);
    } finally {
      setIsAiInvoking(false);
    }
  };

  return (
    <div className="h-screen w-full bg-[#0b0f19] flex flex-col overflow-hidden text-slate-300 font-sans">
      {/* Top Navigation */}
      <header className="flex justify-between items-center w-full px-6 h-12 bg-[#1c1f2a] border-b border-white/10 shrink-0 select-none">
        <div className="flex items-center gap-6">
          <div className="text-sm font-bold text-[#e2b04e] tracking-wider flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            Aether IDE
          </div>
          <div className="hidden md:flex gap-1.5 items-center">
            <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 font-mono">
              ID: {sandboxId.substring(0, 8)}...
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[11px] text-emerald-400 font-semibold uppercase">Active</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setIframeKey((prev) => prev + 1);
              showNotification('Reloaded app preview');
            }}
            className="flex items-center gap-1 py-1 px-2.5 rounded bg-slate-800 text-xs text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px]">refresh</span>
            Refresh
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-1 py-1 px-2.5 rounded bg-red-950/40 border border-red-900/30 text-xs text-red-400 hover:text-white hover:bg-red-900 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px]">close</span>
            Destroy Sandbox
          </button>
        </div>
      </header>

      {/* Main Panel splitting container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Column 1: SideNavBar (Far Left Navigation, collapsible) */}
        <aside
          className="bg-[#1c1f2a] border-r border-white/10 flex flex-col shrink-0 select-none overflow-hidden transition-all duration-200"
          style={{ width: isSidebarCollapsed ? '52px' : '230px' }}
        >
          {/* Collapse Toggle Button */}
          <div className="flex items-center justify-end px-3 py-2 border-b border-white/5 shrink-0">
            <button
              onClick={() => setIsSidebarCollapsed((prev) => !prev)}
              className="p-1 text-slate-400 hover:text-[#e2b04e] hover:bg-white/5 rounded transition-all cursor-pointer"
              title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isSidebarCollapsed ? 'chevron_right' : 'chevron_left'}
              </span>
            </button>
          </div>

          {/* Navigation Tabs and Content */}
          <div className="flex-grow flex flex-col min-h-0 overflow-y-auto no-scrollbar">
            {/* Sidebar Navigation Tabs */}
            <div className="space-y-0.5 py-2 border-b border-white/5 shrink-0">
              {[
                { id: 'explorer', icon: 'folder_open', label: 'Explorer', filled: true },
                { id: 'search', icon: 'search', label: 'Search', filled: false },
                { id: 'git', icon: 'account_tree', label: 'Source Control', filled: false },
                { id: 'extensions', icon: 'extension', label: 'Extensions', filled: false },
                { id: 'ai_debugger', icon: 'smart_toy', label: 'AI Debugger', filled: false },
              ].map(({ id, icon, label, filled }) => (
                <button
                  key={id}
                  onClick={() => {
                    setActiveSidebarTab(id);
                    if (isSidebarCollapsed) setIsSidebarCollapsed(false);
                  }}
                  title={isSidebarCollapsed ? label : ''}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-xs transition-all cursor-pointer ${
                    activeSidebarTab === id
                      ? 'text-[#e2b04e] border-l-2 border-[#e2b04e] bg-[#e2b04e]/5'
                      : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-sm shrink-0"
                    style={activeSidebarTab === id && filled ? { fontVariationSettings: "'FILL' 1" } : {}}
                  >
                    {icon}
                  </span>
                  {!isSidebarCollapsed && (
                    <span className="font-mono uppercase tracking-wider text-[10px] font-semibold whitespace-nowrap">
                      {label}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Sidebar Active Tab Panel Content — only show when expanded */}
            {!isSidebarCollapsed && (
              <div className="flex-grow flex flex-col min-h-0">
                {activeSidebarTab === 'explorer' && (
                  <FileExplorer
                    files={files}
                    selectedFile={selectedFile}
                    onFileSelect={handleFileSelect}
                    isSyncing={isSyncingFiles}
                    onRefresh={() => fetchFileList()}
                  />
                )}
                {activeSidebarTab === 'search' && (
                  <div className="p-4 space-y-3 flex-grow overflow-y-auto">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Search Workspace</div>
                    <div className="flex items-center bg-slate-900 border border-white/10 rounded-md px-2.5 py-1.5 gap-2">
                      <span className="material-symbols-outlined text-slate-500 text-xs">search</span>
                      <input
                        type="text"
                        placeholder="Search files..."
                        className="bg-transparent border-none p-0 focus:ring-0 text-xs w-full text-white placeholder:text-slate-600 focus:outline-none"
                      />
                    </div>
                    <div className="text-slate-600 text-xs italic">Enter search query above.</div>
                  </div>
                )}
                {activeSidebarTab === 'git' && (
                  <div className="p-4 space-y-3 flex-grow overflow-y-auto">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Source Control</div>
                    <div className="bg-[#0f131d] border border-white/5 rounded-md p-3 text-xs text-slate-400 space-y-2 select-none">
                      <div className="flex justify-between text-[10px] font-mono text-slate-500">
                        <span>STATUS</span>
                        <span className="text-[#e2b04e]">UP TO DATE</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-slate-500 text-sm">commit</span>
                        <span className="truncate">No uncommitted edits</span>
                      </div>
                    </div>
                  </div>
                )}
                {activeSidebarTab === 'extensions' && (
                  <div className="p-4 space-y-3 flex-grow overflow-y-auto">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Extensions</div>
                    <div className="text-slate-600 text-xs italic">All required IDE extensions are pre-configured.</div>
                  </div>
                )}
                {activeSidebarTab === 'ai_debugger' && (
                  <div className="p-4 space-y-3 flex-grow overflow-y-auto">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">AI Debugger</div>
                    <div className="bg-[#0f131d] border border-white/5 rounded-md p-3 text-xs text-slate-400 space-y-2 select-none">
                      <div className="flex items-center gap-2 text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                        <span className="font-semibold uppercase text-[10px] font-mono">Listening...</span>
                      </div>
                      <p className="text-[11px] text-slate-500">AI debugger is monitoring server runtime exceptions. Ready to auto-fix code.</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Settings, Profile, Deploy Footer */}
          {!isSidebarCollapsed ? (
            <div className="p-4 border-t border-white/10 bg-[#171b26]/50 shrink-0">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3 px-3 py-1.5 text-slate-400 hover:bg-white/5 hover:text-white transition-all cursor-pointer rounded-lg">
                  <span className="material-symbols-outlined text-[18px]">settings</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider font-mono">Settings</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-1.5 text-slate-400 hover:bg-white/5 hover:text-white transition-all cursor-pointer rounded-lg">
                  <span className="material-symbols-outlined text-[18px]">account_circle</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider font-mono">Account</span>
                </div>
              </div>
              <button
                onClick={handleDeploy}
                disabled={isDeploying}
                className="w-full mt-3 bg-[#e2b04e] hover:brightness-110 disabled:opacity-50 text-[#412d00] hover:text-black font-bold py-2 rounded-lg active:scale-[0.98] transition-all cursor-pointer text-xs uppercase tracking-wider font-mono"
              >
                {isDeploying ? 'Deploying...' : 'Deploy'}
              </button>
            </div>
          ) : (
            <div className="p-2 border-t border-white/10 bg-[#171b26]/50 shrink-0 flex flex-col items-center gap-2">
              <button title="Settings" className="p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded transition-all cursor-pointer">
                <span className="material-symbols-outlined text-[18px]">settings</span>
              </button>
              <button title="Account" className="p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded transition-all cursor-pointer">
                <span className="material-symbols-outlined text-[18px]">account_circle</span>
              </button>
              <button
                onClick={handleDeploy}
                disabled={isDeploying}
                title="Deploy"
                className="p-1.5 bg-[#e2b04e] hover:brightness-110 disabled:opacity-50 text-[#412d00] rounded transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
              </button>
            </div>
          )}
        </aside>

        {/* Column 2: Chat & Logs Column (Middle Column, resizable width sidebarWidth) */}
        <aside style={{ width: sidebarWidth }} className="border-r border-white/10 flex flex-col bg-[#171b26] shrink-0 h-full">
          {/* AI Assistant Console Section */}
          <ChatPanel
            chatMessages={chatMessages}
            chatPrompt={chatPrompt}
            setChatPrompt={setChatPrompt}
            isAiInvoking={isAiInvoking}
            onSendPrompt={handleSendPrompt}
          />

          {/* Activity Logs Section */}
          <ActivityLogs
            logs={logs}
            height={logsHeight}
            onResizeStart={() => setIsResizingLogs(true)}
            embedded={true}
          />
        </aside>

        {/* Sidebar Resize Handle */}
        <div
          onMouseDown={() => setIsResizingSidebar(true)}
          className="w-1 bg-white/5 hover:bg-[#e2b04e]/50 cursor-col-resize z-30 transition-colors shrink-0"
        />

        {/* Column 3: Right Pane (Workspace Area, Iframe, Code, Terminal tabs) */}
        <main className="flex-1 flex flex-col min-w-0 bg-[#0a0e18]">
          {/* Tab Selection */}
          <div className="flex bg-[#1c1f2a] border-b border-white/10 h-10 select-none shrink-0">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-5 h-full flex items-center gap-2 text-xs font-medium border-r border-white/5 transition-all cursor-pointer ${
                activeTab === 'preview'
                  ? 'bg-[#0a0e18] border-t-2 border-[#e2b04e] text-[#e2b04e]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">visibility</span>
              Live Preview
            </button>
            <button
              onClick={() => setActiveTab('terminal')}
              className={`px-5 h-full flex items-center gap-2 text-xs font-medium border-r border-white/5 transition-all cursor-pointer ${
                activeTab === 'terminal'
                  ? 'bg-[#0a0e18] border-t-2 border-[#e2b04e] text-[#e2b04e]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">terminal</span>
              Interactive Terminal
            </button>
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-5 h-full flex items-center gap-2 text-xs font-medium border-r border-white/5 transition-all cursor-pointer ${
                activeTab === 'editor'
                  ? 'bg-[#0a0e18] border-t-2 border-[#e2b04e] text-[#e2b04e]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">code</span>
              {selectedFile ? selectedFile.split('/').pop() : 'Editor'}
            </button>
            <div className="flex-grow"></div>
          </div>

          {/* Active Tab Screen */}
          <div className="flex-grow flex-1 flex flex-col min-h-0 relative">
            {/* Tab: Preview */}
            <div className={`flex-grow flex-1 flex flex-col bg-[#05080f] ${activeTab === 'preview' ? '' : 'hidden'}`}>
              <PreviewPanel
                previewUrl={previewUrl}
                iframeKey={iframeKey}
                onRefresh={() => setIframeKey((prev) => prev + 1)}
              />
            </div>

            {/* Tab: Terminal */}
            <div className={`flex-grow flex-1 flex flex-col bg-[#0b0f19] ${activeTab === 'terminal' ? '' : 'hidden'}`}>
              <TerminalPanel
                sandboxId={sandboxId}
                isVisible={activeTab === 'terminal'}
              />
            </div>

            {/* Tab: Code Editor */}
            <div className={`flex-grow flex-1 flex flex-col bg-[#0b0f19] ${activeTab === 'editor' ? '' : 'hidden'}`}>
              <CodeEditor
                selectedFile={selectedFile}
                editorContent={editorContent}
                setEditorContent={setEditorContent}
                isReadingFile={isReadingFile}
                isSavingFile={isSavingFile}
                fileContent={fileContent}
                onSave={handleSaveFile}
              />
            </div>
          </div>

          {/* Alert Notification Toast */}
          {notification && (
            <div className={`absolute top-4 right-4 z-50 px-4 py-2.5 rounded-lg border text-xs shadow-lg flex items-center gap-2 animate-bounce ${
              notification.type === 'error'
                ? 'bg-red-950/90 border-red-900/50 text-red-300'
                : 'bg-slate-900/90 border-white/10 text-emerald-400'
            }`}>
              <span className="material-symbols-outlined text-[16px]">
                {notification.type === 'error' ? 'error' : 'check_circle'}
              </span>
              <span>{notification.message}</span>
            </div>
          )}

          {/* Bottom Status bar */}
          <footer className="h-6 bg-[#171b26] border-t border-white/5 flex items-center justify-between px-4 text-[10px] font-mono select-none text-slate-500 shrink-0">
            <div className="flex items-center gap-4">
              <span>SANDBOX HOST: localhost</span>
              <span>PORT: 80</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e2b04e]"></span>
              <span>Vite React environment</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
