import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: [
      '3b0f-2800-150-123-563-7630-fb69-4e94-333c.ngrok-free.app',
      '.ngrok-free.app', // Permite cualquier subdominio de ngrok
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});