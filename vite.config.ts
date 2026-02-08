
import { defineConfig } from 'vite';

export default defineConfig({
  // Setting base to './' ensures all assets are loaded relative to the index.html location,
  // which is critical for GitHub Pages subfolder deployments (e.g. /X9M8-AI-QR-STUDIO/).
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    port: 3000,
  }
});
