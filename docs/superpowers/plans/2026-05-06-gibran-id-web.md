# gibran-id-web Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement task-by-task.

**Goal:** Port `remixed-f77cad1e.html` to production-grade Astro 6 + Bun + Cloudflare Pages with 100% visual fidelity.

**Architecture:** Static Astro 6 site, content via Content Layer API (Markdown/MDX), Tailwind v4 CSS-first config, all fonts self-hosted via Astro Fonts API, deployed to Cloudflare Pages.

**Tech Stack:** Astro 6, Bun 1.3+, TypeScript strict, Tailwind CSS v4, @astrojs/cloudflare, @astrojs/sitemap, @astrojs/mdx

---

## File Map

```
gibranid/gibran-id-web/
├── astro.config.mjs
├── tsconfig.json
├── package.json
├── CONTENT_VERIFICATION.md
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── _headers
│   ├── _redirects
│   └── images/portrait-official.webp (downloaded from Wikimedia)
├── src/
│   ├── styles/
│   │   ├── global.css          ← Tailwind entry + @import tokens/components/animations
│   │   ├── tokens.css          ← @theme blocks (colors, spacing, fonts)
│   │   ├── components.css      ← All recipe classes from source HTML
│   │   ├── animations.css      ← @keyframes pulse, scroll
│   │   └── prose.css           ← MDX article prose styles
│   ├── data/
│   │   ├── site.ts             ← SITE constant
│   │   ├── navigation.ts       ← NAV_LINKS array
│   │   └── schemas/
│   │       ├── person.ts
│   │       ├── website.ts
│   │       ├── breadcrumb.ts
│   │       ├── newsArticle.ts
│   │       └── governmentOrganization.ts
│   ├── lib/
│   │   ├── reveal.ts           ← IntersectionObserver
│   │   ├── citations.ts        ← Citation helpers
│   │   └── format.ts           ← ID date/number formatters
│   ├── content/
│   │   ├── config.ts
│   │   ├── programs/*.md       ← 6 files
│   │   ├── timeline/*.md       ← 6 files
│   │   ├── diplomacy/*.md      ← 4 files
│   │   ├── news/*.md           ← 6 files
│   │   ├── stats.json
│   │   └── citations.json
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Nav.astro
│   │   │   └── Footer.astro
│   │   ├── seo/
│   │   │   ├── BaseSEO.astro
│   │   │   └── JsonLd.astro
│   │   ├── ui/
│   │   │   ├── Button.astro
│   │   │   ├── Eyebrow.astro
│   │   │   ├── SectionTitle.astro
│   │   │   ├── HeroBadge.astro
│   │   │   └── CitationLink.astro
│   │   └── sections/
│   │       ├── Hero.astro
│   │       ├── Marquee.astro
│   │       ├── About.astro
│   │       ├── Programs.astro
│   │       ├── Lapor.astro
│   │       ├── Timeline.astro
│   │       ├── Diplomacy.astro
│   │       ├── Youth.astro
│   │       ├── Newsroom.astro
│   │       └── Visi.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── PageLayout.astro
│   └── pages/
│       ├── index.astro
│       ├── tentang.astro
│       ├── disclaimer.astro
│       ├── 404.astro
│       ├── llms.txt.ts
│       └── program/[slug].astro
```

---

### Task 1: Scaffold Project

- [ ] Run in `/home/ekalliptus/dev/gibranid/`:
```bash
bun create astro@latest gibran-id-web -- --template minimal --typescript strict --no-git --install
```
- [ ] Install deps:
```bash
cd gibran-id-web
bun add tailwindcss @tailwindcss/vite
bun add @astrojs/sitemap @astrojs/mdx @astrojs/cloudflare
```
- [ ] Verify: `bun run astro -- --version` shows 6.x
- [ ] Commit: `git init && git add -A && git commit -m "feat: scaffold Astro 6 project"`

---

### Task 2: astro.config.mjs

- [ ] Create `astro.config.mjs`:
```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://gibran.id',
  output: 'static',
  adapter: cloudflare(),
  integrations: [sitemap(), mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
  experimental: {
    fonts: [
      {
        provider: 'google',
        name: 'Fraunces',
        cssVariable: '--font-serif',
        weights: [300, 400, 500, 700, 900],
        styles: ['normal', 'italic'],
      },
      {
        provider: 'google',
        name: 'Instrument Serif',
        cssVariable: '--font-display',
        weights: [400],
        styles: ['normal', 'italic'],
      },
      {
        provider: 'google',
        name: 'Geist',
        cssVariable: '--font-body',
        weights: [300, 400, 500, 600, 700],
        styles: ['normal'],
      },
      {
        provider: 'google',
        name: 'Geist Mono',
        cssVariable: '--font-mono',
        weights: [400, 500],
        styles: ['normal'],
      },
    ],
  },
});
```
- [ ] Run `bun run astro check` — expect zero errors
- [ ] Commit: `git commit -m "feat: configure Astro with fonts + integrations"`

---

### Task 3: Design Tokens & CSS

**`src/styles/tokens.css`:**
```css
@theme {
  --color-ink: #0a0a0a;
  --color-paper: #f5f1ea;
  --color-paper-warm: #ebe5d9;
  --color-merah: #b8231b;
  --color-merah-deep: #8a1812;
  --color-gold: #b89968;
  --color-gold-soft: #d4b87a;
  --color-line: rgba(10,10,10,0.12);
  --color-muted: rgba(10,10,10,0.6);

  --max-width-content: 1440px;
  --radius-card: 4px;
  --radius-pill: 100px;

  --shadow-portrait: 0 30px 80px rgba(0,0,0,0.20);
  --shadow-program: 0 30px 60px rgba(0,0,0,0.08);
  --shadow-btn-primary: 0 12px 30px rgba(184,35,27,0.25);
}
```

**`src/styles/animations.css`:**
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}
@keyframes scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
```

**`src/styles/global.css`:**
```css
@import "tailwindcss";
@import "./tokens.css";
@import "./animations.css";
@import "./components.css";

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }

body {
  font-family: var(--font-body), sans-serif;
  background: var(--color-paper);
  color: var(--color-ink);
  overflow-x: hidden;
  font-feature-settings: "ss01", "ss02";
}

body::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 100;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

.mono { font-family: var(--font-mono), monospace; letter-spacing: -0.02em; }
.serif { font-family: var(--font-serif), serif; }
.display { font-family: var(--font-display), serif; font-style: italic; }

@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
  .marquee-track, .hero-badge::before { animation: none !important; }
}
```

**`src/styles/components.css`** — port ALL classes from source HTML exactly.

- [ ] Create all 4 CSS files
- [ ] Run `bun run dev` — check page loads with warm cream background
- [ ] Commit: `git commit -m "feat: design tokens and CSS system"`

---

### Task 4: Data & Schemas

**`src/data/site.ts`:**
```ts
export const SITE = {
  url: 'https://gibran.id',
  name: 'gibran.id',
  nameOfficial: 'gibran.id (unofficial)',
  description: 'Ruang informasi pendamping tentang Wakil Presiden Gibran Rakabuming Raka, programnya, dan saluran aspirasi resmi.',
  officialVPUrl: 'https://wapresri.go.id',
  laporUrl: 'https://lapormaswapres.id',
  sp4nUrl: 'https://lapor.go.id',
  whatsappLapor: '+6281117042204',
} as const;
```

**`src/data/schemas/person.ts`:**
```ts
import { SITE } from '../site';
export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE.url}/#person-gibran`,
  name: 'Gibran Rakabuming Raka',
  birthDate: '1987-10-01',
  birthPlace: { '@type': 'Place', name: 'Surakarta, Jawa Tengah, Indonesia' },
  jobTitle: 'Wakil Presiden Republik Indonesia',
  affiliation: {
    '@type': 'GovernmentOrganization',
    name: 'Pemerintah Republik Indonesia',
    url: SITE.officialVPUrl,
  },
  image: `${SITE.url}/images/portrait-official.webp`,
  sameAs: [
    'https://en.wikipedia.org/wiki/Gibran_Rakabuming_Raka',
    'https://id.wikipedia.org/wiki/Gibran_Rakabuming_Raka',
    'https://www.wikidata.org/wiki/Q15917141',
  ],
} as const;
```

- [ ] Create site.ts, navigation.ts, all schemas
- [ ] Commit: `git commit -m "feat: site data and JSON-LD schemas"`

---

### Task 5: Content Collections

**`src/content/config.ts`** — full schema as in superprompt section 8.

- [ ] Create config.ts with all 6 collections
- [ ] Create 6 program MD files, 6 timeline MD files, 4 diplomacy MD files, 6 news MD files
- [ ] Create stats.json and citations.json
- [ ] Run `bun run astro check` — zero errors
- [ ] Commit: `git commit -m "feat: content collections and seed data"`

---

### Task 6: BaseLayout & SEO Components

**`src/layouts/BaseLayout.astro`:**
```astro
---
import { Font } from 'astro:assets';
import BaseSEO from '../components/seo/BaseSEO.astro';
import JsonLd from '../components/seo/JsonLd.astro';
import Nav from '../components/layout/Nav.astro';
import Footer from '../components/layout/Footer.astro';
import '../styles/global.css';

interface Props {
  title: string;
  description?: string;
  schemas?: object[];
}
const { title, description, schemas = [] } = Astro.props;
---
<!doctype html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <Font cssVariable="--font-serif" preload />
  <Font cssVariable="--font-display" preload />
  <Font cssVariable="--font-body" preload />
  <Font cssVariable="--font-mono" />
  <BaseSEO title={title} description={description} />
  {schemas.map(s => <JsonLd schema={s} />)}
</head>
<body>
  <Nav />
  <main>
    <slot />
  </main>
  <Footer />
  <script src="../lib/reveal.ts"></script>
</body>
</html>
```

- [ ] Create BaseLayout.astro, PageLayout.astro
- [ ] Create BaseSEO.astro, JsonLd.astro
- [ ] Create Nav.astro (sticky, blur 20px, brand + links + CTA)
- [ ] Create Footer.astro (4-col + disclaimer box)
- [ ] Commit: `git commit -m "feat: base layout, SEO, nav, footer"`

---

### Task 7: All Section Components

Port each section from source HTML 1:1:

- [ ] `Hero.astro` — eyebrow, H1 with `.accent` italic, portrait, 3 stats, badge
- [ ] `Marquee.astro` — CSS-only infinite 40s, Fraunces 300 28px, ✦ separator
- [ ] `About.astro` — 2-col grid, portrait image, bio paragraphs, 3 meta cards
- [ ] `Programs.astro` — 6 cards with gradient, 200px symbol, hover lift
- [ ] `Lapor.astro` — dark bg, 400px "LAPOR" decorative, 3 channels, stat cards
- [ ] `Timeline.astro` — vertical line + dot markers, 6 milestones
- [ ] `Diplomacy.astro` — 4-col grid, flag emoji, dip-card
- [ ] `Youth.astro` — red bg, counter list 01-05, quote portrait, gold CTA
- [ ] `Newsroom.astro` — 2fr/1fr/1fr grid, 1 featured + 5 standard
- [ ] `Visi.astro` — dark bg, 88px H1, Instrument Serif signature
- [ ] Commit: `git commit -m "feat: all section components"`

---

### Task 8: Homepage & Pages

- [ ] `src/pages/index.astro` — compose all 10 sections in order
- [ ] `src/pages/program/[slug].astro` — getStaticPaths from content collection
- [ ] `src/pages/tentang.astro`, `disclaimer.astro`, `404.astro`
- [ ] `src/pages/llms.txt.ts` — GEO endpoint
- [ ] Commit: `git commit -m "feat: pages and routing"`

---

### Task 9: Public Files & Deploy Config

- [ ] Download portrait to `public/images/portrait-official.webp`:
```bash
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Cropped_Vice_President_of_Indonesia_Gibran_Rakabuming_Raka_Official_Portrait.jpg/800px-Cropped_Vice_President_of_Indonesia_Gibran_Rakabuming_Raka_Official_Portrait.jpg" -o public/images/portrait-official.webp
```
- [ ] Create `public/favicon.svg` (G on red circle)
- [ ] Create `public/robots.txt`, `public/_headers`, `public/_redirects`
- [ ] Create `CONTENT_VERIFICATION.md`
- [ ] Final build: `bun run build` — zero errors
- [ ] Commit: `git commit -m "feat: public assets, deploy config, build verified"`
