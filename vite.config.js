import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  // Relative paths support deployment inside a GitHub Pages repository URL.
  base: "./",
  plugins: [react(), tailwindcss()],
})
