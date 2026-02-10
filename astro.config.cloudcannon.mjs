// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    site: 'https://lewrap.com',

    devToolbar: {
        enabled: false
    },

    integrations: [react()],

    vite: {
        // @ts-ignore
        plugins: [tailwindcss()],
    },

    // NO ADAPTER - CloudCannon builds static
});