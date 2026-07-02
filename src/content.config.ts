import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.union([z.string(), z.date()]).optional(),
    date: z.union([z.string(), z.date()]).optional(),
    author: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    keywords: z.union([z.string(), z.array(z.string())]).optional(),
    canonical: z.string().optional(),
    image: z.string().optional(),
    slug: z.string().optional(),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.union([z.string(), z.date()]).optional(),
    date: z.union([z.string(), z.date()]).optional(),
    author: z.string().optional(),
    tags: z.array(z.string()).optional(),
    keywords: z.union([z.string(), z.array(z.string())]).optional(),
    image: z.string().optional(),
    slug: z.string().optional(),
    category: z.string().optional(),
  }),
});

const articlesV6 = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.union([z.string(), z.date()]).optional(),
    schema: z.record(z.any()).optional(),
    keywords: z.array(z.string()).optional(),
    faq: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
  }),
});

export const collections = { articles, blog, 'articles-v6': articlesV6 };
