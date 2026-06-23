import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';

export default function TerminalPanel({ sandboxId, isVisible }) {
  const terminalContainerRef = useRef(null);
  const socketRef = useRef(null);
  const xtermRef = useRef(null);
  const fitAddonRef = useRef(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!isVisible || !terminalContainerRef.current || initializedRef.current) {
      return;
    }

    initializedRef.current = true;

    // Initialize Terminal
    const term = new Terminal({
      cursorBlink: true,
      fontSize: 12,
      fontFamily: 'JetBrains Mono, monospace',
      theme: {
        background: '#0b0f19',
        foreground: '#dfe2f1',
        cursor: '#e2b04e',
        black: '#000000',
        red: '#ffb4ab',
        green: '#5eecaf',
        yellow: '#ffcc6b',
        blue: '#7bd0ff',
        magenta: '#b8a6e0',
        cyan: '#7be0ff',
        white: '#dfe2f1'
      }
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalContainerRef.current);
    fitAddon.fit();

    xtermRef.current = term;
    fitAddonRef.current = fitAddon;

    term.writeln('\x1b[33mConnecting to secure container shell...\x1b[0m');

    // Connect to Socket server
    const socket = io(`http://${sandboxId}.agent.localhost`, {
      transports: ['websocket', 'polling']
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      term.writeln('\x1b[32mSuccessfully connected socket session!\x1b[0m\r\n');
    });

    socket.on('connect_error', (err) => {
      term.writeln(`\r\n\x1b[31mSocket connection error: ${err.message}\x1b[0m`);
    });

    // Handle incoming terminal output from backend
    socket.on('terminal-output', (data) => {
      term.write(data);
    });

    // Emit user keyboard input back to shell process
    term.onData((data) => {
      socket.emit('terminal-input', data);
    });

    // Handle resize
    const handleResize = () => {
      fitAddon.fit();
    };
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      socket.disconnect();
      term.dispose();
      xtermRef.current = null;
      socketRef.current = null;
      initializedRef.current = false;
    };
  }, [isVisible, sandboxId]);

  // Re-fit when becoming visible again (tab switch back)
  useEffect(() => {
    if (isVisible && fitAddonRef.current) {
      // Small delay to let the DOM layout settle before fitting
      const timer = setTimeout(() => {
        fitAddonRef.current?.fit();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div className="flex-1 flex flex-col bg-[#0b0f19]">
      <div ref={terminalContainerRef} className="flex-1 h-full w-full font-mono text-sm overflow-hidden" />
    </div>
  );
}
