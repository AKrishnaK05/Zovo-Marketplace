import { defineConfig } from 'vite' // restart
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Zovo/',
  server: {
    port: 5174
  }
})
