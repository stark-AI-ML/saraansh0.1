// vite.config.js
import  {defineConfig}  from 'vite';
import { crx } from '@crxjs/vite-plugin';
import manifest from './src/manifest.json';

export default defineConfig({
  plugins: [crx({ manifest })],
  optimizeDeps: {
    include: ['html2pdf.js']
  },
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 1000, 
    sourcemap: true,
    rollupOptions: {
      input: {
        background: 'src/background/background.js',
        content: 'src/content/loader.js',
        css: 'src/features/saraanshLeetCode',
        preview: "src/core/preview.html"
      }
    }
  }
});