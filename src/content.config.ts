import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const moments = defineCollection({
  loader: file('src/content/moments/moments.json'),
  schema: ({ image }) =>
    z.object({
      id: z.string(),
      caption: z.string(),
      image: image(),
    }),
});

export const collections = { moments };
