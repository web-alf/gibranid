import { SITE } from '../site';

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE.url}/#person-gibran`,
  name: 'Gibran Rakabuming Raka',
  birthDate: '1987-10-01',
  birthPlace: {
    '@type': 'Place',
    name: 'Surakarta, Jawa Tengah, Indonesia',
  },
  jobTitle: 'Wakil Presiden Republik Indonesia',
  affiliation: {
    '@type': 'GovernmentOrganization',
    name: 'Pemerintah Republik Indonesia',
    url: SITE.officialVPUrl,
  },
  image: `${SITE.url}/images/portrait-official.jpg`,
  sameAs: [
    'https://en.wikipedia.org/wiki/Gibran_Rakabuming_Raka',
    'https://id.wikipedia.org/wiki/Gibran_Rakabuming_Raka',
    'https://www.wikidata.org/wiki/Q15917141',
  ],
} as const;
