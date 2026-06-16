import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/rubycom': {
        target: 'http://192.241.128.45',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace('/api/rubycom', '/rubycom'),
      },
    },
  },
})
