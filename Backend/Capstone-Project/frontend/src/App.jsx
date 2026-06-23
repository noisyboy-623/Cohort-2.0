import React, { useState, useEffect, useCallback } from 'react';
import LandingPage from './components/LandingPage';
import Workspace from './components/Workspace';

export default function App() {
  // Active sandbox session (persisted across page refreshes)
  const [sandboxId, setSandboxId] = useState(() => localStorage.getItem('aether_sandbox_id') || null);
  const [previewUrl, setPreviewUrl] = useState(() => localStorage.getItem('aether_preview_url') || null);

  // Projects list
  const [projects, setProjects] = useState([]);
  const [isFetchingProjects, setIsFetchingProjects] = useState(false);

  // Create project modal / flow
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [createProjectError, setCreateProjectError] = useState('');

  // Start sandbox state
  const [startingSandboxId, setStartingSandboxId] = useState(null); // which project is being started

  // Generic error banner
  const [error, setError] = useState('');

  // -------------------------------------------------------------------
  // Fetch existing projects on mount
  // -------------------------------------------------------------------
  const fetchProjects = useCallback(async () => {
    setIsFetchingProjects(true);
    setError('');
    try {
      const res = await fetch('/api/sandbox/projects', {
        credentials: 'include',
      });
      if (!res.ok) throw new Error(`Failed to load projects (${res.status})`);
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsFetchingProjects(false);
    }
  }, []);

  useEffect(() => {
    // Only fetch projects when there is no active sandbox session
    if (!sandboxId) {
      fetchProjects();
    }
  }, [sandboxId, fetchProjects]);

  // -------------------------------------------------------------------
  // Create a new project
  // -------------------------------------------------------------------
  const handleCreateProject = async (e) => {
    e.preventDefault();
    const title = newProjectTitle.trim();
    if (!title) {
      setCreateProjectError('Project title is required.');
      return;
    }
    setCreateProjectError('');
    setIsCreatingProject(true);
    try {
      const res = await fetch('/api/sandbox/project', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || `Request failed (${res.status})`);
      }
      const data = await res.json();
      // Add the new project to the list
      setProjects((prev) => [data.project, ...prev]);
      setNewProjectTitle('');
    } catch (err) {
      setCreateProjectError(err.message);
    } finally {
      setIsCreatingProject(false);
    }
  };

  // -------------------------------------------------------------------
  // Start a sandbox for a given project
  // -------------------------------------------------------------------
  const handleStartSandbox = async (projectId) => {
    setStartingSandboxId(projectId);
    setError('');
    try {
      const res = await fetch('/api/sandbox/start', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || `Sandbox start failed (${res.status})`);
      }
      const data = await res.json();
      if (data.sandboxId && data.previewUrl) {
        localStorage.setItem('aether_sandbox_id', data.sandboxId);
        localStorage.setItem('aether_preview_url', data.previewUrl);
        setSandboxId(data.sandboxId);
        setPreviewUrl(data.previewUrl);
      } else {
        throw new Error('Response is missing sandbox details.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setStartingSandboxId(null);
    }
  };

  // -------------------------------------------------------------------
  // Reset / destroy sandbox (back to project list)
  // -------------------------------------------------------------------
  const handleResetSandbox = () => {
    setSandboxId(null);
    setPreviewUrl(null);
    localStorage.removeItem('aether_sandbox_id');
    localStorage.removeItem('aether_preview_url');
  };

  // -------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------
  if (sandboxId && previewUrl) {
    return (
      <Workspace
        sandboxId={sandboxId}
        previewUrl={previewUrl}
        onReset={handleResetSandbox}
      />
    );
  }

  return (
    <LandingPage
      // Projects
      projects={projects}
      isFetchingProjects={isFetchingProjects}
      onRefreshProjects={fetchProjects}
      error={error}
      // Create project
      newProjectTitle={newProjectTitle}
      setNewProjectTitle={setNewProjectTitle}
      isCreatingProject={isCreatingProject}
      createProjectError={createProjectError}
      onCreateProject={handleCreateProject}
      // Start sandbox
      startingSandboxId={startingSandboxId}
      onStartSandbox={handleStartSandbox}
    />
  );
}
