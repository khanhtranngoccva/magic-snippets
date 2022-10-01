import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
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
    },
  }
});