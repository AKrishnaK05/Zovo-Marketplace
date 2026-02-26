import { defineConfig } from 'vite' // restart
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/Zovo-Marketplace/' : '/',
  server: {
    port: 5174
  }
})
