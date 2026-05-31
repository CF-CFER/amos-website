import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://amoscomposites.cn',
  output: 'static',
  compressHTML: true,
  build: {
    format: 'file'
  }
});
