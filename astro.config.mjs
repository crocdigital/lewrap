// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://lewrap.com', // ← Actual domain
  devToolbar: {
    enabled: false
  },

  integrations: [react()],

  vite: {
    // @ts-ignore
    plugins: [tailwindcss()],
  },

  adapter: vercel(),
});