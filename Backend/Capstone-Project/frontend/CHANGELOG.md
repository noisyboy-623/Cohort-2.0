# Changelog - Aether IDE Sandbox Frontend

All notable changes, refactoring milestones, and configurations applied to this project are documented here.

---

## [1.2.0] - 2026-06-16
### Added
- **Fullscreen Preview**: Added a fullscreen preview toggle button to [PreviewPanel.jsx](file:///c:/Users/ASUS/OneDrive/Desktop/Cohort2/Backend/Capstone-Project/frontend/src/components/PreviewPanel.jsx) using a fixed layout overlay, as well as an "Open in New Tab" anchor to view the sandbox output in a full browser tab.
- **Resizable Layout Panels**: Implemented mouse-drag handles for real-time resizing of the workspace components:
  - Sidebar width (File Explorer + Chat width).
  - AI Chat panel height (inside [ChatPanel.jsx](file:///c:/Users/ASUS/OneDrive/Desktop/Cohort2/Backend/Capstone-Project/frontend/src/components/ChatPanel.jsx)).
  - Activity logs console height (inside [ActivityLogs.jsx](file:///c:/Users/ASUS/OneDrive/Desktop/Cohort2/Backend/Capstone-Project/frontend/src/components/ActivityLogs.jsx)).

### Fixed
- **Windows Node.js DNS Loopback Limitation**: Resolved the proxy 404 errors by targeting the reverse proxy IP directly (`http://127.0.0.1:80`) and setting the `Host` header to `${sandboxId}.agent.localhost` on proxy requests. This bypasses Node's inability to resolve wildcard loopback subdomains (like `*.localhost`) on Windows.
- **CORS Blockage on AI Invoke**: Fixed preflight pre-CORS check blockage on `http://localhost/api/ai/invoke` by rewriting it to the relative `/api/ai/invoke` route, channeling it directly through the Vite server proxy.
- **Websocket Upgrade Failure**: Resolved 404 upgrade errors by bypassing Vite websocket proxying and allowing [TerminalPanel.jsx](file:///c:/Users/ASUS/OneDrive/Desktop/Cohort2/Backend/Capstone-Project/frontend/src/components/TerminalPanel.jsx) to connect directly to the container subdomain URL (which is unaffected by browser CORS policies).

### Changed
- **Proxy Configuration**: Added `/agent-proxy/:sandboxId` mapping inside [vite.config.js](file:///c:/Users/ASUS/OneDrive/Desktop/Cohort2/Backend/Capstone-Project/frontend/vite.config.js) to route same-origin client HTTP requests directly to `http://127.0.0.1:80` while injecting the correct `Host` header dynamically.
- **API URL Updates**: Modified [Workspace.jsx](file:///c:/Users/ASUS/OneDrive/Desktop/Cohort2/Backend/Capstone-Project/frontend/src/components/Workspace.jsx) to direct HTTP fetches through `/agent-proxy/${sandboxId}` and `/api/ai/invoke` instead of absolute localhost subdomains.

---

## [1.1.0] - 2026-06-15
### Added
- **Modular Components Refactoring**: Extracted monolithic layouts from `Workspace.jsx` into six individual, self-contained, and reusable React components to simplify future debugging:
  - [FileExplorer.jsx](file:///c:/Users/ASUS/OneDrive/Desktop/Cohort2/Backend/Capstone-Project/frontend/src/components/FileExplorer.jsx): Handles recursive workspace file and folder trees.
  - [ChatPanel.jsx](file:///c:/Users/ASUS/OneDrive/Desktop/Cohort2/Backend/Capstone-Project/frontend/src/components/ChatPanel.jsx): Contains AI assistant copilot timeline and scroll behaviors.
  - [ActivityLogs.jsx](file:///c:/Users/ASUS/OneDrive/Desktop/Cohort2/Backend/Capstone-Project/frontend/src/components/ActivityLogs.jsx): Captures streaming SSE server action outputs.
  - [PreviewPanel.jsx](file:///c:/Users/ASUS/OneDrive/Desktop/Cohort2/Backend/Capstone-Project/frontend/src/components/PreviewPanel.jsx): Mounts the live site iframe preview sandbox.
  - [TerminalPanel.jsx](file:///c:/Users/ASUS/OneDrive/Desktop/Cohort2/Backend/Capstone-Project/frontend/src/components/TerminalPanel.jsx): Coordinates xterm.js UI bounds and socket connections.
  - [CodeEditor.jsx](file:///c:/Users/ASUS/OneDrive/Desktop/Cohort2/Backend/Capstone-Project/frontend/src/components/CodeEditor.jsx): Textarea code workspace with save triggers.

---

## [1.0.0] - 2026-06-12
### Added
- **Container Spawner**: Created [LandingPage.jsx](file:///c:/Users/ASUS/OneDrive/Desktop/Cohort2/Backend/Capstone-Project/frontend/src/components/LandingPage.jsx) featuring status loading animations representing container initialization phases (creating sandbox, fetching workspace configs, launching IDE).
- **Core Workspace Features**: Built original workspace including file selectors, file reader and patch update APIs, SSE prompt streaming reader (to parse POST responses without EventSource limitations), and full terminal styling.
- **Design Tokens**: Configured TailwindCSS v4 rules in [index.css](file:///c:/Users/ASUS/OneDrive/Desktop/Cohort2/Backend/Capstone-Project/frontend/src/index.css) to support dark mode scrollbars, gold gradients, and border designs.
- **Navigation & Persistence**: Configured [App.jsx](file:///c:/Users/ASUS/OneDrive/Desktop/Cohort2/Backend/Capstone-Project/frontend/src/App.jsx) to persist active sandbox information inside localStorage, ensuring browser refreshes do not disrupt user sessions.
