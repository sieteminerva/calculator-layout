import { defineConfig } from 'vite';
export default defineConfig({
  build: {
    outDir: 'demo',
    emptyOutDir: true, // also necessary
  }
});