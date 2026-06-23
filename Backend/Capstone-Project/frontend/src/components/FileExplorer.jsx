import React, { useState } from 'react';

// Helper to build recursive folder tree from flat list of file paths
const buildTree = (filePaths) => {
  const root = { name: 'Root', isFolder: true, children: {} };
  filePaths.forEach((filePath) => {
    const cleanPath = filePath.replace(/^\/+|\/+$/g, '');
    const parts = cleanPath.split('/');
    let current = root;
    let accumulatedPath = '';
    parts.forEach((part, index) => {
      accumulatedPath = accumulatedPath ? `${accumulatedPath}/${part}` : part;
      const isLast = index === parts.length - 1;
      if (!current.children[part]) {
        current.children[part] = {
          name: part,
          isFolder: !isLast,
          path: accumulatedPath,
          children: isLast ? null : {}
        };
      }
      current = current.children[part];
    });
  });
  return root;
};

// Tree node component
function FileNode({ node, selectedFile, onFileSelect, expandedFolders, toggleFolder }) {
  if (!node.isFolder) {
    const isSelected = selectedFile === node.path;
    let fileIcon = 'draft';
    let iconColor = 'text-slate-400';

    if (node.name.endsWith('.jsx') || node.name.endsWith('.js')) {
      fileIcon = 'javascript';
      iconColor = 'text-amber-400';
    } else if (node.name.endsWith('.css')) {
      fileIcon = 'css';
      iconColor = 'text-[#7bd0ff]';
    } else if (node.name.endsWith('.json')) {
      fileIcon = 'data_object';
      iconColor = 'text-[#5eecaf]';
    } else if (node.name.endsWith('.html')) {
      fileIcon = 'html';
      iconColor = 'text-orange-400';
    } else if (node.name.toLowerCase().includes('docker')) {
      fileIcon = 'settings_suggest';
      iconColor = 'text-sky-400';
    }

    return (
      <div
        onClick={() => onFileSelect(node.path)}
        className={`flex items-center gap-2 py-1.5 px-3 rounded-md cursor-pointer transition-colors duration-150 select-none ${
          isSelected
            ? 'bg-[#e2b04e]/10 text-[#e2b04e] border-l-2 border-[#e2b04e]'
            : 'text-slate-300 hover:bg-slate-800/40 hover:text-white'
        }`}
      >
        <span className={`material-symbols-outlined text-[16px] shrink-0 ${iconColor}`}>
          {fileIcon}
        </span>
        <span className="font-mono text-xs truncate">{node.name}</span>
      </div>
    );
  }

  const isExpanded = !!expandedFolders[node.path];

  return (
    <div className="flex flex-col">
      <div
        onClick={() => toggleFolder(node.path)}
        className="flex items-center gap-1.5 py-1.5 px-2 rounded-md cursor-pointer hover:bg-slate-800/30 text-slate-400 hover:text-white transition-colors duration-150 select-none"
      >
        <span className="material-symbols-outlined text-[16px] shrink-0 text-slate-500">
          {isExpanded ? 'expand_more' : 'chevron_right'}
        </span>
        <span className="material-symbols-outlined text-[16px] shrink-0 text-amber-500/80">
          folder
        </span>
        <span className="font-medium text-xs truncate">{node.name}</span>
      </div>
      {isExpanded && (
        <div className="pl-4 border-l border-white/5 ml-3 mt-0.5 space-y-0.5">
          {Object.values(node.children)
            .sort((a, b) => {
              if (a.isFolder && !b.isFolder) return -1;
              if (!a.isFolder && b.isFolder) return 1;
              return a.name.localeCompare(b.name);
            })
            .map((child) => (
              <FileNode
                key={child.path}
                node={child}
                selectedFile={selectedFile}
                onFileSelect={onFileSelect}
                expandedFolders={expandedFolders}
                toggleFolder={toggleFolder}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export default function FileExplorer({ files, selectedFile, onFileSelect, isSyncing, onRefresh }) {
  const [expandedFolders, setExpandedFolders] = useState({});

  const toggleFolder = (folderPath) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderPath]: !prev[folderPath]
    }));
  };

  const fileTree = buildTree(files);

  return (
    <div className="flex-grow min-h-0 flex flex-col p-4 border-b border-white/5">
      <div className="flex items-center justify-between mb-3 text-slate-400">
        <span className="text-[10px] font-bold uppercase tracking-wider">WORKSPACE FILES</span>
        <button
          disabled={isSyncing}
          onClick={onRefresh}
          className="hover:text-white p-1 hover:bg-slate-800 rounded transition-colors disabled:opacity-40 cursor-pointer"
          title="Sync Files"
        >
          <span className={`material-symbols-outlined text-[16px] ${isSyncing ? 'animate-spin' : ''}`}>
            sync
          </span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar space-y-1">
        {files.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-500">
            {isSyncing ? 'Syncing files tree...' : 'No files found.'}
          </div>
        ) : (
          Object.values(fileTree.children).map((child) => (
            <FileNode
              key={child.path}
              node={child}
              selectedFile={selectedFile}
              onFileSelect={onFileSelect}
              expandedFolders={expandedFolders}
              toggleFolder={toggleFolder}
            />
          ))
        )}
      </div>
    </div>
  );
}
