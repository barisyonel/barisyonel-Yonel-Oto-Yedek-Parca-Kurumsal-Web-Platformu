import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: false, // Hot Module Replacement'ı devre dışı bırak
    watch: {
      usePolling: false // Dosya izlemeyi devre dışı bırak
    }
  },
  build: {
    sourcemap: false, // Source map'leri devre dışı bırak
    minify: true // Kodu küçült
  }
})
