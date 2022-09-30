import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000",
        proxyTimeout: 5000,
      },
      "/assets": {
        target: "http://127.0.0.1:3000",
        proxyTimeout: 5000,
      },
    },
    headers: {
      "Origin-Agent-Cluster": "?1",
    }
  }
});