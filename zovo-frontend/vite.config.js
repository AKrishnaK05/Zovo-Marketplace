import { defineConfig } from 'vite' // restart
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 5174
  }
})
