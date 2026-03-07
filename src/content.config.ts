import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const moments = defineCollection({
  loader: file('src/content/moments/moments.json'),
  schema: ({ image }) =>
    z.object({
      id: z.string(),
      alt: z.string(),
      caption: z.string(),
      image: image(),
      order: z.number().int().nonnegative(),
    }),
});

export const collections = { moments };
