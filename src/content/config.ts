import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.string(),
    category: z.string(),
    keywords: z.array(z.string()),
    author: z.string().default('Amos Composites'),
    image: z.string().optional(),
  }),
});

export const collections = { articles };
