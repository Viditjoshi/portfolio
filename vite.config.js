import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// Allow setting the base path at build time for GitHub Pages
// Usage in CI: vite build --base="/${REPO_NAME}/"
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  base: process.env.VITE_BASE || '/',
})