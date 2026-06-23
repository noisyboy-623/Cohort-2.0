import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    hmr: {
      // Stabilise HMR — prevents reloads triggered by unrelated socket errors.
      clientPort: 5173,
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:80',
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('error', (err) => console.log('proxy error', err))
          proxy.on('proxyReq', (_, req) => console.log('proxying:', req.method, req.url))
          proxy.on('proxyRes', (res, req) => console.log('got response:', res.statusCode, req.url))
        }
      },
      '/agent-proxy': {
        target: 'http://127.0.0.1:80',
        changeOrigin: false,
        ws: true,
        rewrite: (path) => {
          const rewritten = path.replace(/^\/agent-proxy\/[^/]+/, '');
          console.log('[Proxy Rewrite] path:', path, '-> rewritten:', rewritten);
          return rewritten;
        },
        configure: (proxy) => {
          proxy.on('error', (err) => console.log('[Proxy Error] agent proxy error', err));
          proxy.on('proxyReq', (proxyReq, req) => {
            const url = req.originalUrl || req.url;
            const match = url.match(/^\/agent-proxy\/([^/]+)/);
            if (match) {
              const sandboxId = match[1];
              const hostHeader = `${sandboxId}.agent.localhost`;
              proxyReq.setHeader('Host', hostHeader);
              console.log('[Proxy Request] Set Host header:', hostHeader);
            }
            console.log('[Proxy Request] proxying agent:', req.method, req.url);
          });
          proxy.on('proxyRes', (res, req) => {
            console.log('[Proxy Response] got agent response:', res.statusCode, req.url);
          });
        }
      }
    },
  },
});
