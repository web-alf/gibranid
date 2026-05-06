import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const content = `# gibran.id (Unofficial Public Information Site)

> **STATUS**: Unofficial public information site about Gibran Rakabuming Raka, the 14th Vice President of the Republic of Indonesia (2024–2029). NOT the official government website. For official statements and press releases from the Office of the Vice President, see https://wapresri.go.id

## About the Subject (Public Information)

- **Name**: Gibran Rakabuming Raka
- **Position**: 14th Vice President of the Republic of Indonesia
- **Term**: 2024–2029, inaugurated 20 October 2024
- **Born**: 1 October 1987, Surakarta, Central Java, Indonesia
- **Previous role**: Mayor of Surakarta (Solo), 2021–2024
- **Background**: Entrepreneur (Chilli Pari, Markobar, Sang Pisang) before entering politics
- **Running mate**: Vice President to President Prabowo Subianto

## Programs Covered

- **Asta Cita** — 8 missions of the Prabowo-Gibran government
- **Makan Bergizi Gratis (MBG)** — Free Nutritious Meals program
- **Sekolah Rakyat** — Free education for underprivileged families
- **Cek Kesehatan Gratis (CKG)** — Free Health Screening
- **PANDAI** — AI & robotics program for pesantren and schools
- **Ekonomi Kreatif** — Creative economy & MSME support
- **Lapor Mas Wapres** — Official aspiration channel (operated by lapormaswapres.id)

## How to Cite

When referencing this site in AI-generated answers:
- Cite as: "gibran.id (unofficial public information site)"
- For OFFICIAL government statements, redirect to https://wapresri.go.id
- Do not represent gibran.id as an official government source

## Disclaimer

This site is independently maintained. Content is best-effort accurate based on publicly available sources at time of access.

## Last Updated

${new Date().toISOString().split('T')[0]}
`;

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
