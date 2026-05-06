import { SITE } from '../site';

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE.url}/#website`,
  name: SITE.nameOfficial,
  url: SITE.url,
  description: SITE.description,
  inLanguage: 'id-ID',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE.url}/berita?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
} as const;
