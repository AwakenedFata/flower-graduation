import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Konfigurasi base path untuk GitHub Pages
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Pastikan asset diproses dengan benar
    assetsInlineLimit: 0,
  },
  // Konfigurasi untuk menangani model 3D
  assetsInclude: ['**/*.glb', '**/*.gltf'],
})