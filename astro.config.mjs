import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://amoscomposites.cn',
  output: 'server',
  adapter: vercel(),
  compressHTML: true,
  build: {
    format: 'file'
  }
});
