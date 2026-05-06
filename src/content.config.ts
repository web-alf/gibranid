import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const PROGRAMS = ['mbg', 'sekolah-rakyat', 'ckg', 'pandai', 'ekraf', 'lapor'] as const;

const programs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/programs' }),
  schema: z.object({
    slug: z.enum(PROGRAMS),
    title: z.string(),
    titleShort: z.string(),
    tag: z.string(),
    symbol: z.string(),
    gradient: z.string(),
    description: z.string(),
    citations: z.array(z.object({
      label: z.string(),
      url: z.string().url(),
    })),
    seo: z.object({
      title: z.string(),
      description: z.string(),
    }),
  }),
});

const timeline = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/timeline' }),
  schema: z.object({
    year: z.number(),
    order: z.number(),
    title: z.string(),
    description: z.string(),
    isUpcoming: z.boolean().default(false),
    citation: z.object({
      label: z.string(),
      url: z.string().url(),
    }).optional(),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    tag: z.string(),
    featured: z.boolean().default(false),
    imageClass: z.string().default('ni-1'),
    sourceLabel: z.string(),
    sourceUrl: z.string().url(),
  }),
});

const diplomacy = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/diplomacy' }),
  schema: z.object({
    flag: z.string(),
    event: z.string(),
    location: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    citation: z.object({
      label: z.string(),
      url: z.string().url(),
    }),
  }),
});

const stats = defineCollection({
  loader: file('./src/content/stats.json'),
  schema: z.object({
    id: z.string(),
    label: z.string(),
    value: z.string(),
    unit: z.string().optional(),
    citationLabel: z.string(),
    citationUrl: z.string().url(),
    accessedAt: z.coerce.date(),
    isVerified: z.boolean(),
  }),
});

export const collections = { programs, timeline, news, diplomacy, stats };
