import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const contentLinksSchema = z
  .array(
    z.object({
      title: z.string(),
      link: z.string().url(),
    })
  )
  .default([]);

const moments = defineCollection({
  loader: file('src/content/moments/moments.json'),
  schema: ({ image }) =>
    z.object({
      id: z.string(),
      caption: z.string(),
      image: image(),
    }),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    links: contentLinksSchema,
    description: z.string(),
    tags: z.array(z.string()).default([]),
    socialImage: z.string().optional(),
  }),
});

const writing = defineCollection({
  loader: glob({ base: './src/content/writing', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    links: contentLinksSchema,
    tags: z.array(z.string()).default([]),
    socialImage: z.string().optional(),
  }),
});

export const collections = { moments, projects, writing };
