export const governmentOrgSchema = {
  '@context': 'https://schema.org',
  '@type': 'GovernmentOrganization',
  '@id': 'https://wapresri.go.id/#organization',
  name: 'Sekretariat Wakil Presiden Republik Indonesia',
  url: 'https://wapresri.go.id',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'ID',
    addressLocality: 'Jakarta',
  },
} as const;
