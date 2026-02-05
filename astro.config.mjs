// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://lewrap.com',

  devToolbar: {
    enabled: false
  },

  integrations: [react()],

  vite: {
    // @ts-ignore
    plugins: [tailwindcss()],

    build: {
      // Minify with terser for better compression
      minify: 'esbuild',

      rollupOptions: {
        output: {
          // Code splitting for better caching
          manualChunks: (id) => {
            // Split vendor code
            if (id.includes('node_modules')) {
              return 'vendor';
            }
            // Split React separately if needed
            if (id.includes('react')) {
              return 'react-vendor';
            }
          },

          // Optimize chunk file names for caching
          chunkFileNames: 'chunks/[name].[hash].js',
          entryFileNames: 'entry/[name].[hash].js',
          assetFileNames: 'assets/[name].[hash][extname]',
        },
      },

      // CSS optimization
      cssCodeSplit: true, // Split CSS per route
    },

    // Optimize dependencies
    optimizeDeps: {
      include: ['react', 'react-dom'], // Pre-bundle heavy dependencies
    },
  },

  adapter: vercel(),
});