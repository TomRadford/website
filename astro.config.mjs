import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';
// https://astro.build/config
export default defineConfig({
  prefetch: true,
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
    imageService: 'compile',
  }),
  image: {
    layout: 'constrained',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
