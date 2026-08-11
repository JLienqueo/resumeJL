import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      // Opciones para procesar CSS
    },
    // Desactivar el minificado CSS problemático
    devSourcemap: false,
  },
  build: {
    // Opciones de build
    cssMinify: false, // ← Desactiva el minificado CSS temporalmente
  },
});