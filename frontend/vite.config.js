import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { fileURLToPath, URL } from 'url'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
      clientPort: 5173,
    },
    watch: {
      usePolling: true,
      interval: 1000,
    },
    // HTTPS ayarları (development için - manuel olarak aktif edilebilir)
    // https: {
    //   // Self-signed certificate için
    //   key: undefined,
    //   cert: undefined,
    // },
    proxy: {
      '/api': {
        target: 'https://yonelticapi.onrender.com',
        changeOrigin: true,
        secure: true, // HTTPS bağlantıları için güvenli
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  },
  build: {
    sourcemap: false,
    minify: 'esbuild', // Changed from terser to esbuild for better compatibility
    target: 'es2015', // More compatible target
    rollupOptions: {
      output: {
        // Simplified output configuration
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    reportCompressedSize: false,
  },
  resolve: {
    alias: {
      '@': resolve(fileURLToPath(new URL('.', import.meta.url)), 'src'),
    },
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', '@mui/material', '@mui/icons-material'],
  },
})
