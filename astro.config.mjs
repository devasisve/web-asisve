// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';


// https://astro.build/config
export default defineConfig({
  output: 'static',

  vite: {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        '/api': {
          target: 'https://forestgreen-pelican-956861.hostingersite.com',
          changeOrigin: true,
        }
      }
    }
  },

  integrations: []
});