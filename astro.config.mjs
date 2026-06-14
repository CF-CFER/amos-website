import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://amoscomposites.cn',
  output: 'static',
  adapter: vercel(),
  compressHTML: true,
  build: {
    format: 'file'
  }
});
