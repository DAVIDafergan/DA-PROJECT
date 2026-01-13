import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      build: {
        // אופטימיזציה עבור דפדפנים מודרניים
        target: 'esnext',
        // שימוש ב-esbuild למיניפיקציה מהירה ביותר
        minify: 'esbuild',
        // חלוקת ה-CSS לקבצים נפרדים לטעינה מקבילית
        cssCodeSplit: true,
        rollupOptions: {
          output: {
            // פיצול ספריות כבדות לקבצים נפרדים (Caching טוב יותר)
            manualChunks: {
              vendor: ['react', 'react-dom', 'framer-motion'],
              icons: ['lucide-react']
            }
          }
        }
      },
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});