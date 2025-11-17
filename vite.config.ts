import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ['unfeelingly-filterable-chet.ngrok-free.dev']
  },
  plugins: [react(), tailwindcss()],
})
