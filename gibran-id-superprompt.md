# SUPERPROMPT — gibran.id (Astro 6 + Bun + Cloudflare Pages)

> **PROJECT**: Public information site tentang Gibran Rakabuming Raka, Wakil Presiden Republik Indonesia ke-14
> **DOMAIN**: `gibran.id` (proposed)
> **STATUS**: **Unofficial public information site** — bukan situs resmi kenegaraan, semua konten berbasis informasi yang sudah dipublikasikan secara publik (KPU, rilis pers, Wikipedia, wapresri.go.id, media massa kredibel)
> **MISSION**: Implement design `remixed-f77cad1e.html` jadi production-grade Astro 6 + Bun, **tampilan persis 1:1**, deploy ke Cloudflare Pages
>
> Paste ke coding agent (Claude Code, Cursor, Aider). Lampirin file HTML source. **Jangan dipotong**.

---

## 1. ROLE & MISSION

Lo bertindak sebagai **Senior Fullstack Engineer + Civic Tech Specialist + Compliance-Aware Builder**.

**Misi 5-pillar**:

1. **Visual fidelity 100%** — port design source (Editorial Statesman style) persis sampai ke level font weight 300 vs 400, italic accent words, noise grain overlay, pulse animation
2. **Public information site** — konten berbasis citation, semua data wajib ada source attribution (KPU, Wikipedia, wapresri.go.id, rilis pers media)
3. **Disclaimer-first compliance** — clear "unofficial" disclaimer di footer + meta + about page; jangan ngaku-ngaku resmi
4. **Indonesian web standards** — siapkan struktur untuk PSE Kominfo registration kalau perlu live di domain `.id`
5. **Modern stack** — Astro 6 + Bun + TypeScript strict + Tailwind v4 + Cloudflare Pages

### 1.1 Penting: Compliance & Etika Content

Karena ini site tentang **figur publik politik aktif**, ada beberapa rule wajib:

| Rule | Kenapa |
|---|---|
| ✅ Semua quote wajib **verbatim verified** dari source published | Hindari fabricated/misattributed quote |
| ✅ Semua angka stat wajib **citation source visible** | UU ITE — info menyesatkan illegal |
| ✅ Disclaimer "Unofficial" di footer + about + meta tag | Hindari klaim representasi resmi |
| ✅ Foto wajib **public domain** atau **fair use editorial** | Wikipedia → Commons license OK; foto press → cite source |
| ✅ Tidak boleh ada call-to-action politik (vote, donasi, kampanye) | Site informasi, bukan kampanye |
| ✅ Tidak boleh fabricate data (e.g. "94% tindak lanjut" tanpa source) | Kalau angka gak ada source, hapus atau replace dengan "Data: KPU, [tanggal]" |
| ❌ Hindari opini editorial yang tendensius | Jaga netralitas — fakta + citation, bukan glorifikasi |
| ❌ Tidak ada form submission yang mengaku-ngaku "diteruskan ke Wapres" | Cuma redirect ke channel resmi (wapresri.go.id, lapormaswapres.id) |

### 1.2 Audit Konten Source HTML — Yang Harus Diverifikasi

Sebelum implement, **audit semua claim** di source HTML lawan source publik:

| Claim di source | Source verifikasi |
|---|---|
| "96.2 juta suara 2024" | KPU.go.id final tally Pilpres 2024 |
| "58.6% kemenangan" | KPU.go.id |
| "36 — Wapres termuda RI" | Verifikasi (lahir 1 Okt 1987, dilantik 20 Okt 2024 = umur 37) — **KEMUNGKINAN ERROR DI SOURCE** |
| "12,847 aspirasi diterima" | lapormaswapres.id atau rilis resmi — **wajib cite atau hapus** |
| "94% tingkat tindak lanjut" | **wajib cite atau ganti placeholder "Data dalam pengembangan"** |
| Quote "Tugas saya bukan jadi nomor dua..." | Cek transkrip pidato resmi — **kalau gak verified, hapus quote** |
| Quote anak muda "Saya tidak ingin..." | Sama — verify atau hapus |
| Bisnis "Chilli Pari, Markobar, Sang Pisang" | Public knowledge ✅ |
| "Wali Kota Solo ke-18" | Public knowledge ✅ |

> **Wajib**: bikin file `CONTENT_VERIFICATION.md` di repo dengan tabel di atas + status verified/unverified/replaced per claim.

---

## 2. PROJECT CONTEXT

### 2.1 Identity

| Field | Value |
|---|---|
| Site name | gibran.id |
| Tagline | "Mendengar. Hadir. Bekerja." |
| Tagline subline | "Ruang informasi pendamping tentang Wakil Presiden Republik Indonesia" |
| Domain | `gibran.id` (proposed) |
| Status | **Unofficial public information site** |
| Bahasa | Indonesia (`lang="id"`) |
| Tone | Editorial, informatif, netral, respectful |
| Audience | Masyarakat umum yang mau cari info terstruktur tentang VP Gibran |

### 2.2 Subject Profile (Public Information)

| Field | Value | Source |
|---|---|---|
| Nama | Gibran Rakabuming Raka | Public |
| Lahir | 1 Oktober 1987, Surakarta | Public |
| Posisi | Wakil Presiden Republik Indonesia ke-14 | Public |
| Periode | 2024–2029 | Public |
| Dilantik | 20 Oktober 2024 | Public |
| Sebelumnya | Wali Kota Surakarta (Solo) ke-18 (2021–2024) | Public |
| Latar belakang | Pengusaha kuliner (Chilli Pari, Markobar, Sang Pisang) | Public |
| Mendampingi | Presiden Prabowo Subianto | Public |

### 2.3 Programs (Public Information)

| Program | Konteks |
|---|---|
| **Asta Cita** | 8 misi pemerintahan Prabowo-Gibran 2024–2029 |
| **Makan Bergizi Gratis (MBG)** | Program gizi anak sekolah |
| **Sekolah Rakyat** | Pendidikan gratis untuk keluarga kurang mampu |
| **Cek Kesehatan Gratis (CKG)** | Skrining kesehatan nasional |
| **PANDAI** | AI & robotika di pesantren/sekolah |
| **Ekonomi Kreatif** | UMKM, ekraf, industri digital |
| **Lapor Mas Wapres** | Channel aspirasi langsung (lapormaswapres.id) |

> Konten detail tiap program **wajib cite** dari rilis pers / website kementerian terkait.

---

## 3. TECH STACK (WAJIB)

| Layer | Pilihan | Versi minimum | Alasan |
|---|---|---|---|
| Framework | **Astro** | `^6.1.0` | Static-first, SEO friendly |
| Runtime/PM | **Bun** | `>=1.1.0` | Fast install, native TS |
| Language | **TypeScript strict** | — | Type safety |
| Styling | **Tailwind CSS v4** + custom CSS | `^4.0.0` | CSS-first config (`@theme`) |
| Content | **Astro Content Layer + MDX** | latest | File-based, citation-friendly |
| Icons | **Inline SVG / emoji unicode** | — | Sesuai source |
| Fonts | **Astro Fonts API v6** | — | Auto-subset Fraunces variable + italic |
| Sitemap | `@astrojs/sitemap` | latest | Auto-generate |
| RSS | `@astrojs/rss` | latest | Feed berita |
| Output | `static` | — | Information site = static, deploy mudah |
| Adapter | **`@astrojs/cloudflare`** | latest | Cloudflare Pages |

**Bun usage**:
```bash
bun create astro@latest gibran-id-web -- --template minimal --typescript strict --git --install
cd gibran-id-web
bun add tailwindcss @tailwindcss/vite
bun add @astrojs/sitemap @astrojs/rss @astrojs/mdx @astrojs/cloudflare
bun run dev
bun run build
bun run preview
```

**Hindari**:
- ❌ React/Vue runtime di production
- ❌ External CDN runtime — pakai Astro Fonts API self-host
- ❌ Form submission yang "ngaku" diteruskan ke Wapres — cuma redirect ke channel resmi
- ❌ Auth / user account — site read-only public info
- ❌ Database / backend dynamic — fully static dari Markdown
- ❌ Cookie/tracking yang invasive — hindari, cuma analytics privacy-friendly (Plausible/Umami)

---

## 4. DESIGN SYSTEM (PERSIS DARI SOURCE — NON-NEGOTIABLE)

### 4.1 Color Tokens

```css
/* src/styles/tokens.css — port persis dari :root source */
@theme {
  --color-ink:           #0a0a0a;
  --color-paper:         #f5f1ea;       /* warm cream BG default */
  --color-paper-warm:    #ebe5d9;       /* deeper cream untuk section break */

  --color-merah:         #b8231b;
  --color-merah-deep:    #8a1812;

  --color-gold:          #b89968;
  --color-gold-soft:     #d4b87a;

  --color-line:          rgba(10,10,10,0.12);
  --color-muted:         rgba(10,10,10,0.6);
}
```

### 4.2 Typography (4-Font Stack — KRITIKAL)

| Font | Source | Peran | Weights | Styles |
|---|---|---|---|---|
| **Fraunces** (variable opsz 9-144) | Google Fonts | Headlines display, brand mark, section title | 300, 400, 500, 700, 900 | normal + **italic** |
| **Instrument Serif** | Google Fonts | "italic accent words" only (`.display`, `.italic` accent) | 400 | **italic wajib** |
| **Geist** | Google Fonts | Body, button, paragraph | 300, 400, 500, 600, 700 | normal |
| **Geist Mono** | Google Fonts | Eyebrow, meta labels, numerical small | 400, 500 | normal, letter-spacing 0.10-0.18em |

**Astro Fonts API setup** (wajib):

```ts
// astro.config.mjs
experimental: {
  fonts: [
    {
      provider: 'google',
      name: 'Fraunces',
      cssVariable: '--font-serif',
      weights: [300, 400, 500, 700, 900],
      styles: ['normal', 'italic'],
      variationSettings: { opsz: '9..144' },
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
    },
    {
      provider: 'google',
      name: 'Geist Mono',
      cssVariable: '--font-mono',
      weights: [400, 500],
    },
  ],
}
```

### 4.3 Typography Spec Table (PERSIS)

> **WAJIB**: setiap element pakai font + weight + letter-spacing yang TEPAT seperti tabel ini.

| Element | Font | Weight | Style | Size | Letter-spacing | Line-height |
|---|---|---|---|---|---|---|
| Body default | Geist | 400 | normal | 16px | normal | 1.6 |
| `.mono` | Geist Mono | 400 | normal | inherit | -0.02em | inherit |
| `.serif` | Fraunces | inherit | inherit | inherit | inherit | inherit |
| **`.display`** | **Instrument Serif** | 400 | **italic** | inherit | inherit | inherit |
| **`.nav-brand`** | Fraunces | **500** | normal | 18px | -0.02em | normal |
| `.nav-brand-mark` | Fraunces | 700 | normal | 14px | normal | normal |
| `.nav-links a` | Geist | 400 | normal | 13px | normal | normal |
| `.nav-cta` | Geist | 500 | normal | 13px | normal | normal |
| `.hero-eyebrow` | Geist Mono | 400 | normal | 11px | **0.15em** UPPERCASE | normal |
| **`.hero h1`** | Fraunces | **300** | normal | `clamp(48px, 7vw, 96px)` | **-0.035em** | **0.96** |
| **`.hero h1 .accent`** | **Instrument Serif** | 400 | **italic** | inherit | inherit | inherit (color: merah) |
| `.hero-tagline` | Geist | 400 | normal | 18px | normal | 1.6 |
| `.hero-tagline strong` | Geist | **500** | normal | inherit | inherit | inherit |
| `.btn-primary` / `.btn-secondary` | Geist | 500 | normal | 14px | normal | normal |
| `.hero-stat-num` | Fraunces | 400 | normal | 36px | -0.03em | 1 |
| `.hero-stat-label` | Geist Mono | 400 | normal | 10px | **0.12em** UPPERCASE | normal |
| `.hero-portrait-name` | Fraunces | 400 | normal | 24px | -0.02em | 1.1 |
| `.hero-portrait-title` | Geist Mono | 400 | normal | 10px | **0.15em** UPPERCASE | normal |
| `.hero-badge` | Geist Mono | 400 | normal | 10px | **0.15em** UPPERCASE | normal |
| **`.marquee-track`** | Fraunces | **300** | normal | 28px | -0.02em | normal |
| **`.section-eyebrow`** | Geist Mono | 400 | normal | 11px | **0.18em** UPPERCASE | normal (color: merah) |
| **`.section-title`** | Fraunces | **300** | normal | `clamp(40px, 5vw, 72px)` | **-0.03em** | 1.02 |
| **`.section-title .italic`** | **Instrument Serif** | 400 | **italic** | inherit | inherit | inherit (color: merah) |
| `.section-lead` | Geist | 400 | normal | 18px | normal | 1.6 |
| `.about-quote` | Fraunces | 300 | normal | `clamp(28px, 3vw, 42px)` | -0.02em | 1.2 |
| `.about-meta-num` | Fraunces | 400 | normal | 32px | normal | 1 (color: merah) |
| `.about-meta-label` | Geist Mono | 400 | normal | 10px | **0.10em** UPPERCASE | normal |
| `.program-card-title` | Fraunces | 500 | normal | 22px | -0.02em | 1.2 |
| `.program-card-tag` | Geist Mono | 400 | normal | 10px | **0.10em** UPPERCASE | normal |
| `.program-card-link` | Geist Mono | 400 | normal | 11px | **0.10em** UPPERCASE | normal |
| **`.pc-symbol`** | Fraunces | 400 | **italic** | **200px** | normal | 1 (color rgba 0.12 white) |
| **`.lapor::before` decorative** | Fraunces | 300 | **italic** | **400px** | normal | 0.8 (color rgba 0.08 merah) |
| `.lapor h2` | Fraunces | 300 | normal | `clamp(40px, 5vw, 72px)` | -0.03em | 1.02 |
| **`.lapor h2 .italic`** | **Instrument Serif** | 400 | **italic** | inherit | inherit | inherit (color: gold-soft) |
| `.lapor-channel-title` | Fraunces | 500 | normal | 18px | normal | normal |
| `.lapor-channel-desc` | Geist Mono | 400 | normal | 11px | normal | normal |
| **`.lapor-stat-num`** | Fraunces | **300** | normal | **64px** | -0.03em | 1 (color: gold-soft) |
| `.timeline-year` | Fraunces | 500 | normal | 18px | normal | normal (color: merah) |
| `.timeline-title` | Fraunces | 500 | normal | 24px | -0.02em | 1.2 |
| `.news-card-title` | Fraunces | 500 | normal | 20px | -0.02em | 1.25 |
| `.news-card-featured .news-card-title` | Fraunces | 500 | normal | 28px | -0.02em | 1.25 |
| `.news-card-tag` | Geist Mono | 400 | normal | 10px | **0.12em** UPPERCASE | normal (color: merah) |
| `.news-card-meta` | Geist Mono | 400 | normal | 11px | normal | normal |
| `.youth h2` | Fraunces | 300 | normal | `clamp(40px, 5vw, 72px)` | -0.03em | 1.02 |
| **`.youth-quote`** | **Instrument Serif** | 400 | **italic** | 22px | normal | 1.3 |
| `.youth-list li::before` | Geist Mono | 400 | normal | 11px | normal | normal (counter `decimal-leading-zero`) |
| `.dip-event` | Fraunces | 500 | normal | 18px | normal | 1.2 |
| `.dip-loc` | Geist Mono | 400 | normal | 11px | **0.10em** UPPERCASE | normal |
| **`.visi h2`** | Fraunces | **300** | normal | `clamp(48px, 6vw, 88px)` | -0.03em | **1.05** |
| **`.visi h2 .italic`** | **Instrument Serif** | 400 | **italic** | inherit | inherit | inherit (color: gold-soft) |
| **`.visi-signature-name`** | **Instrument Serif** | 400 | **italic** | 32px | normal | normal |
| `.visi-signature-title` | Geist Mono | 400 | normal | 11px | **0.15em** UPPERCASE | normal |
| `.footer-brand` | Fraunces | 400 | normal | 24px | normal | normal |
| **`.footer-brand .italic`** | **Instrument Serif** | 400 | **italic** | inherit | inherit | inherit (color: gold-soft) |
| `.footer-col-title` | Geist Mono | 400 | normal | 11px | **0.12em** UPPERCASE | normal |
| `.footer-bottom` | Geist Mono | 400 | normal | 11px | 0.05em | normal |

**Pemakaian style guideline**:
- **Fraunces 300** = section/hero headlines (tipis, editorial elegan)
- **Instrument Serif italic** = HANYA untuk accent words yang dihighlight merah/gold
- **Geist Mono** = uppercase eyebrow, label, meta — NEVER body
- **Geist** = body & UI default

### 4.4 Layout & Spacing

```css
@theme {
  --max-content: 1440px;
  --container-padding: 32px;
  --section-py: 120px;            /* default */
  --section-py-lg: 160px;         /* visi/CTA section */
  --section-py-mobile: 60px;

  --radius-card: 4px;             /* SHARP corners — editorial style, NOT rounded */
  --radius-pill: 100px;           /* pills/buttons */
  --radius-circle: 50%;
}
```

> **PENTING**: Border-radius hampir semua **4px** (sharp). Cuma button/pill/badge yang **100px**. Hindari rounded-corners modern (12-16px) — jaga editorial vibe.

### 4.5 Shadows

```css
@theme {
  --shadow-portrait:    0 30px 80px rgba(0,0,0,0.20);
  --shadow-program:     0 30px 60px rgba(0,0,0,0.08);
  --shadow-news:        0 20px 40px rgba(0,0,0,0.08);
  --shadow-dip:         0 20px 40px rgba(0,0,0,0.06);
  --shadow-btn-primary: 0 12px 30px rgba(184,35,27,0.25);
}
```

---

## 5. EFFECT CATALOG (PERSIS — JANGAN SKIP)

> 12 effect signature. Setiap wajib di-port.

### 5.1 SVG Noise Grain Overlay (KRITIS — texture kertas)

```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 100;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

> Effect ini bikin keseluruhan page punya texture "kertas tua". **WAJIB** di-port persis. Tanpa ini, vibe "editorial" hilang.

### 5.2 Pulse Dot (hero badge)

```css
.hero-badge::before {
  content: '';
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--color-merah);
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}
```

### 5.3 Marquee Infinite Scroll (40s linear)

```css
@keyframes scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.marquee-track {
  display: flex;
  gap: 60px;
  animation: scroll 40s linear infinite;
  white-space: nowrap;
  font-family: 'Fraunces', serif;
  font-size: 28px;
  font-weight: 300;
  letter-spacing: -0.02em;
}
.marquee-track span::after {
  content: '✦';
  color: var(--color-merah);
}
```

> Marquee text "Asta Cita ✦ Indonesia Emas 2045 ✦ Makan Bergizi Gratis ✦ Sekolah Rakyat ✦ Lapor Mas Wapres ✦ Generasi Maju" — duplicate 2x untuk seamless loop.

### 5.4 Big Decorative "LAPOR" Text (signature)

```css
.lapor::before {
  content: 'LAPOR';
  position: absolute;
  bottom: -80px; right: -40px;
  font-family: 'Fraunces', serif;
  font-size: 400px;          /* HUGE */
  font-weight: 300;
  color: rgba(184,35,27,0.08);
  font-style: italic;
  line-height: 0.8;
  pointer-events: none;
}
```

### 5.5 Backdrop Blur Sticky Nav

```css
.nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 50;
  padding: 18px 32px;
  background: rgba(245, 241, 234, 0.85);
  backdrop-filter: blur(20px);          /* 20px, NOT 10px */
  border-bottom: 1px solid var(--color-line);
}
```

### 5.6 Counter-Style Numbered List (`youth-list`)

```css
.youth-list { counter-reset: youth-counter; list-style: none; }
.youth-list li::before {
  content: counter(youth-counter, decimal-leading-zero);   /* "01", "02", ... */
  counter-increment: youth-counter;
  font-family: 'Geist Mono', monospace;
  font-size: 11px;
  color: var(--color-gold-soft);
  background: rgba(255,255,255,0.1);
  padding: 4px 8px;
  border-radius: 100px;
  flex-shrink: 0;
}
```

> Effect: bullet list jadi "01 02 03 04 05" dengan leading zero. Editorial feel.

### 5.7 Timeline Vertical Line + Dot Markers

```css
.timeline::before {
  content: '';
  position: absolute;
  left: 60px;
  top: 0; bottom: 0;
  width: 1px;
  background: var(--color-line);
}
.timeline-item::before {
  content: '';
  position: absolute;
  left: 56px; top: 44px;
  width: 9px; height: 9px;
  background: var(--color-merah);
  border-radius: 50%;
  border: 2px solid var(--color-paper);
}
```

### 5.8 Program Card Hover Lift

```css
.program-card {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.program-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 30px 60px rgba(0,0,0,0.08);
}
.program-card:hover .program-card-link {
  gap: 10px;          /* arrow moves */
  color: var(--color-merah);
}
```

### 5.9 Program Card Symbol Decorative (200px italic)

```css
.pc-symbol {
  position: absolute;
  bottom: -20px; right: -20px;
  font-family: 'Fraunces', serif;
  font-size: 200px;
  font-weight: 400;
  color: rgba(255,255,255,0.12);
  line-height: 1;
  font-style: italic;
}
```

> Tiap program card punya symbol initial besar (M, S, C, AI, E, L) di pojok kanan bawah, italic, opacity 0.12.

### 5.10 Program Card Gradients (6 unique)

```css
.pc-mbg     { background: linear-gradient(135deg, #d4691f, #8b3a0e); }    /* orange-brown — Makan Bergizi */
.pc-lapor   { background: linear-gradient(135deg, #b8231b, #6b1410); }    /* merah deep */
.pc-sekolah { background: linear-gradient(135deg, #1f4d3d, #0d2a20); }    /* hijau gelap */
.pc-ckg     { background: linear-gradient(135deg, #2a4f7a, #14283d); }    /* biru navy */
.pc-pandai  { background: linear-gradient(135deg, #4a3373, #261a3d); }    /* ungu */
.pc-ekraf   { background: linear-gradient(135deg, #b89968, #6b5638); }    /* gold-brown */
```

### 5.11 Lapor Channel Hover Slide

```css
.lapor-channel:hover {
  background: rgba(184,35,27,0.2);
  border-color: var(--color-merah);
  transform: translateX(6px);
}
.lapor-channel:hover .lapor-channel-arrow {
  opacity: 1;
  transform: translateX(4px);
}
```

### 5.12 Reveal on Scroll (IntersectionObserver)

```ts
// src/lib/reveal.ts
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document
  .querySelectorAll('section, .program-card, .news-card, .timeline-item, .dip-card')
  .forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
```

```css
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
  .marquee-track, .hero-badge::before { animation: none; }
}
```

---

## 6. PROJECT STRUCTURE

```
gibran-id-web/
├── public/
│   ├── favicon.svg                          # G mark on merah background
│   ├── favicon.png
│   ├── apple-touch-icon.png
│   ├── og-default.png                       # 1200x630 editorial style
│   ├── robots.txt                           # AI crawler whitelist
│   ├── llms.txt                             # GEO + factual info source
│   ├── _headers                             # Cloudflare headers
│   ├── _redirects                           # 301 redirects
│   └── images/
│       ├── portrait-official.webp           # Resized from Wikipedia Commons
│       ├── portrait-bw.webp                 # Grayscale variant
│       └── press/                           # News thumbnails (atau gradient placeholder)
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Nav.astro                    # Sticky blur 20px
│   │   │   ├── Footer.astro
│   │   │   └── DisclaimerBar.astro          # Optional top bar "unofficial"
│   │   ├── ui/
│   │   │   ├── Button.astro                 # btn-primary, btn-secondary
│   │   │   ├── Eyebrow.astro                # Geist Mono, with line prefix
│   │   │   ├── SectionTitle.astro           # Fraunces 300 + .italic span
│   │   │   ├── DisplaySpan.astro            # Instrument Serif italic accent
│   │   │   ├── HeroBadge.astro              # Pulse dot
│   │   │   ├── Reveal.astro                 # IntersectionObserver wrapper
│   │   │   ├── CitationLink.astro           # <cite> with source URL (KRITIS)
│   │   │   └── NoiseOverlay.astro           # SVG grain (sekali di BaseLayout)
│   │   ├── icons/
│   │   │   └── *.astro                      # SVG icons (port emoji ke SVG)
│   │   ├── seo/
│   │   │   ├── BaseSEO.astro
│   │   │   ├── JsonLd.astro
│   │   │   └── Breadcrumbs.astro
│   │   └── sections/
│   │       ├── Hero.astro                   # H1 + portrait + 3 stats
│   │       ├── Marquee.astro                # CSS-only infinite
│   │       ├── About.astro                  # Bio dengan citation
│   │       ├── Programs.astro               # 6 program cards
│   │       ├── Lapor.astro                  # Aspirasi channels (link to wapresri/lapormaswapres)
│   │       ├── Timeline.astro               # 6 milestones
│   │       ├── Diplomacy.astro              # 4 diplomatic events
│   │       ├── Youth.astro                  # 5 inisiatif anak muda
│   │       ├── Newsroom.astro               # Latest news preview
│   │       └── Visi.astro                   # CTA Visi 2045 + signature
│   ├── content/
│   │   ├── config.ts                        # Content Layer API
│   │   ├── programs/                        # 1 .md per program (citable detail)
│   │   │   ├── makan-bergizi-gratis.md
│   │   │   ├── sekolah-rakyat.md
│   │   │   ├── cek-kesehatan-gratis.md
│   │   │   ├── pandai.md
│   │   │   ├── ekonomi-kreatif.md
│   │   │   └── lapor-mas-wapres.md
│   │   ├── timeline/                        # 1 .md per milestone
│   │   │   └── ...
│   │   ├── news/                            # MDX articles
│   │   │   └── ...
│   │   ├── diplomacy/                       # International events
│   │   │   └── ...
│   │   ├── stats.json                       # All stats with source URL
│   │   └── citations.json                   # Master citation database
│   ├── data/
│   │   ├── site.ts                          # Site metadata
│   │   ├── navigation.ts
│   │   └── schemas/                         # JSON-LD generators
│   │       ├── person.ts                    # Person schema (Gibran)
│   │       ├── governmentOrganization.ts
│   │       ├── website.ts
│   │       ├── breadcrumb.ts
│   │       ├── newsArticle.ts
│   │       └── faqPage.ts
│   ├── layouts/
│   │   ├── BaseLayout.astro                 # HTML shell, SEO, JSON-LD
│   │   └── PageLayout.astro                 # Subpage layout
│   ├── lib/
│   │   ├── seo.ts
│   │   ├── geo.ts                           # llms.txt generator
│   │   ├── reveal.ts                        # Vanilla IntersectionObserver
│   │   ├── citations.ts                     # Citation helpers
│   │   └── format.ts                        # Date ID, number ID
│   ├── pages/
│   │   ├── index.astro                      # One-page landing
│   │   ├── tentang.astro                    # Detail bio (multi-page kalau perlu)
│   │   ├── program/
│   │   │   └── [slug].astro                 # Per-program detail
│   │   ├── berita/
│   │   │   ├── index.astro                  # Listing
│   │   │   └── [...slug].astro              # Detail
│   │   ├── timeline.astro                   # Full timeline detail
│   │   ├── disclaimer.astro                 # Full disclaimer + sources
│   │   ├── 404.astro
│   │   └── llms.txt.ts                      # Dynamic GEO endpoint
│   └── styles/
│       ├── global.css                       # Entry: tailwind + tokens + components
│       ├── tokens.css                       # @theme blocks
│       ├── components.css                   # Recipe classes (port persis)
│       ├── animations.css                   # @keyframes
│       └── prose.css                        # MDX article styling
├── CONTENT_VERIFICATION.md                  # Audit table (section 1.2)
├── astro.config.mjs
├── tsconfig.json
├── package.json
├── bun.lock
├── .env.example
├── .gitignore
└── README.md
```

---

## 7. PAGE STRUCTURE — `/` (One-Page Landing)

**Source ref**: `remixed-f77cad1e.html`. Section order **WAJIB** sama persis:

| # | Section | Component | BG Color | Special |
|---|---|---|---|---|
| 0 | Disclaimer Bar (optional) | `DisclaimerBar.astro` | merah subtle | "Situs informasi pendamping — bukan situs resmi kenegaraan" |
| 1 | Sticky Nav | `Nav.astro` | paper 85% + blur 20px | Brand "gibran.id" + 6 nav links + CTA "Sampaikan Aspirasi" |
| 2 | Hero | `Hero.astro` | paper | Eyebrow + H1 "Mendengar. Hadir. Bekerja." + portrait + 3 stats |
| 3 | Marquee | `Marquee.astro` | ink (BLACK) | Fraunces 300 28px + ✦ separator + 40s scroll |
| 4 | About (`#tentang`) | `About.astro` | paper-warm | 2-col: portrait + bio + 3 meta (2021/2024/8) |
| 5 | Programs (`#program`) | `Programs.astro` | paper | 6 cards dengan gradient unik + symbol 200px italic |
| 6 | Lapor (`#lapor`) | `Lapor.astro` | ink (BLACK) + 400px "LAPOR" decorative | 2-col: 3 channels + 3 stat cards |
| 7 | Timeline | `Timeline.astro` | paper | 6 milestones 1987-2026 dengan vertical line |
| 8 | Diplomacy | `Diplomacy.astro` | paper-warm | 4 cards (G20, dll) |
| 9 | Youth (`#anakmuda`) | `Youth.astro` | merah (RED) | Quote portrait + 5 numbered list + CTA gold |
| 10 | Newsroom (`#berita`) | `Newsroom.astro` | paper | 6 news cards (1 featured 2-col + 5 standard) |
| 11 | Visi (`#visi`) | `Visi.astro` | ink (BLACK) | H2 88px + signature Instrument Serif italic |
| 12 | Footer | `Footer.astro` | #0a0a0a | 4-col grid + disclaimer box (KRITIS) + socials |

### 7.1 Hero Section Detail

**Eyebrow**: "Wakil Presiden Republik Indonesia · 2024–2029"

**H1** (Fraunces 300, clamp 48-96px, italic accent):
```html
Mendengar.<br>
Hadir. <span class="accent">Bekerja.</span>
```

**Tagline** (Geist 400, max 480px):
> **Gibran Rakabuming Raka** — Wakil Presiden ke-14 Republik Indonesia. Anak muda yang dipercaya rakyat untuk membawa Indonesia menuju cita-cita Emas 2045 bersama Presiden Prabowo Subianto.

**CTAs**:
- Primary "Sampaikan Aspirasi Anda →" → `#lapor`
- Secondary "Lihat Program Kerja" → `#program`

**Stats** (3 entries, dengan citation):
| Num | Label | Source |
|---|---|---|
| **96.2 jt** | Suara Rakyat 2024 | KPU.go.id final tally |
| **58.6%** | Kemenangan Pilpres | KPU.go.id |
| **37** | Wapres ke-14 RI | Public records (FIX dari source: 36 → 37, lahir Okt 1987 dilantik Okt 2024) |

**Portrait**:
- Image: re-host dari Wikimedia Commons ke `/images/portrait-official.webp`
- Wajib include alt text: "Foto resmi Wakil Presiden Gibran Rakabuming Raka, sumber: Wikimedia Commons"
- Filter: `contrast(1.05) saturate(0.9)` (port persis)
- Badge "Aktif Bertugas" with pulse dot
- Overlay caption: "Gibran Rakabuming Raka — Wakil Presiden ke-14 · Republik Indonesia"

### 7.2 About Section Detail

**Bio paragraphs** (port + add citations):

> Lahir di Surakarta, **1 Oktober 1987**. **Gibran Rakabuming Raka** mengawali kiprahnya sebagai pengusaha muda di bidang kuliner — Chilli Pari, Markobar, Sang Pisang — sebelum memimpin Kota Solo sebagai Wali Kota termuda dalam usia 33 tahun.[¹]
>
> Pada **20 Oktober 2024**, beliau dilantik menjadi **Wakil Presiden ke-14 Republik Indonesia** mendampingi Presiden Prabowo Subianto, mengusung visi besar Indonesia Emas 2045.[²]

> [¹] Wikipedia · [²] Sekretariat Wakil Presiden, wapresri.go.id

**Meta** (3 cards):
- 2021 — Wali Kota Solo
- 2024 — Wapres RI ke-14
- 8 — Misi Asta Cita

### 7.3 Programs Section Detail

**6 cards** dengan gradient + symbol + tag + title + desc + link:

| # | Title | Tag | Symbol | Gradient | Desc focus |
|---|---|---|---|---|---|
| 1 | Makan Bergizi Gratis (MBG) | Asta Cita 4 | M | pc-mbg | Gizi anak sekolah, generasi penerus |
| 2 | Sekolah Rakyat | Asta Cita 4 | S | pc-sekolah | Pendidikan gratis untuk keluarga kurang mampu |
| 3 | Cek Kesehatan Gratis (CKG) | Asta Cita 4 | C | pc-ckg | Skrining kesehatan menyeluruh |
| 4 | PANDAI — Program Digital AI | Asta Cita 6 | AI | pc-pandai | AI & robotika di pesantren |
| 5 | Ekonomi Kreatif | Asta Cita 3 | E | pc-ekraf | UMKM, ekraf, industri digital |
| 6 | Lapor Mas Wapres | Direct Channel | L | pc-lapor | Saluran aspirasi langsung |

Tiap card link ke `/program/{slug}` untuk detail page.

### 7.4 Lapor Section Detail (KRITIS — compliance)

**3 channels** — semua redirect ke channel **resmi** (jangan bikin form sendiri):

| Icon | Title | Desc | URL |
|---|---|---|---|
| 💬 | WhatsApp Resmi | +62 811-1704-2204 · 24 jam | `https://wa.me/+6281117042204` |
| 📋 | Portal Lapor Mas Wapres | lapormaswapres.id · Form digital terverifikasi | `https://lapormaswapres.id` |
| 🏛️ | SP4N-LAPOR Nasional | Sistem pengaduan resmi pemerintah | `https://lapor.go.id` |

**3 stat cards** (PERHATIKAN: data dummy di source — wajib replace dengan source real atau placeholder):

| Source HTML | Recommendation |
|---|---|
| "12,847 Aspirasi Diterima" | Cite: lapormaswapres.id real-time atau ganti "Data dalam pengembangan" |
| "94% Tingkat Tindak Lanjut" | Cite source atau ganti |
| "38 Provinsi Terjangkau" | Cite source resmi |

> **Wajib**: kalau gak ada source verified, **ganti angka jadi placeholder** atau **hapus stat card-nya**. Jangan publish angka tanpa source.

### 7.5 Timeline Detail (6 milestones)

| Year | Title | Verifikasi |
|---|---|---|
| 1987 | Lahir di Surakarta | ✅ Public |
| 2010 | Memulai Bisnis Kuliner (Chilli Pari, Markobar, Sang Pisang) | ✅ Public |
| 2021 | Wali Kota Surakarta ke-18 | ✅ Public |
| 2024 | Wakil Presiden ke-14 (dilantik 20 Oktober 2024) | ✅ KPU + Sekretariat |
| 2025 | G20 Johannesburg & Diplomasi | ✅ Press release |
| 2026 | Relokasi ke Ibu Kota Nusantara | ⚠️ **VERIFY** — kalau forward-looking/belum terjadi, mark "rencana" atau hapus |

### 7.6 Diplomacy (4 cards)

- 🇿🇦 KTT G20 Johannesburg · Afrika Selatan · Nov 2025
- 🌍 Indonesia–Africa CEO Forum · Johannesburg · 2025
- 🇮🇩 Promosi QRIS Global · Forum Internasional
- 🤝 Diplomasi MBG · Model Gizi untuk Dunia

> Tiap card wajib cite source rilis pers di detail page (kalau mau bikin sub-page).

### 7.7 Youth Section (`#anakmuda`)

H2: "Masa depan Indonesia <span class='italic'>milik anak muda.</span>"

**5 inisiatif** (numbered list dengan counter `decimal-leading-zero`):
1. Magang & internship Sekretariat Wakil Presiden untuk mahasiswa berprestasi
2. Hackathon AI & robotika untuk pelajar pesantren dan sekolah umum
3. Forum dialog Wapres–Gen Z di kampus-kampus seluruh Indonesia
4. Pendampingan UMKM muda & startup ekraf
5. Beasiswa Indonesia Pintar dan akses pendidikan vokasi

**Quote portrait** (Instrument Serif italic 22px, gold-soft):
> "Saya tidak ingin anak muda Indonesia hanya jadi penonton. Mereka harus jadi pemain utama dalam pertandingan masa depan."

> ⚠️ **VERIFY QUOTE**: kalau gak verified dari pidato/wawancara published, **hapus** atau ganti dengan quote yang verified.

### 7.8 Newsroom (6 cards)

1 featured (2-col) + 5 standard. Konten dari content collection.

### 7.9 Visi 2045 Section

H2 (Fraunces 300, clamp 48-88px):
```html
Bukan janji.<br>
Ini <span class="italic">tugas</span> yang kami pikul.
```

Body paragraph + quote (Instrument Serif italic 24px gold-soft):
> "Tugas saya bukan jadi nomor dua. Tugas saya melayani 280 juta rakyat Indonesia."

> ⚠️ **VERIFY QUOTE** — sama seperti Youth section.

Signature (Instrument Serif italic 32px):
> — Gibran Rakabuming Raka
> Wakil Presiden Republik Indonesia

### 7.10 Footer Detail (KRITIS — Disclaimer)

**4-col grid**:
1. Brand `gibran.id` + tagline + **Disclaimer box** (background rgba(184,35,27,0.1), border)
2. Navigasi (5 internal links)
3. Program (5 program links)
4. Hubungi (4 official channels: WhatsApp Lapor, Portal Aspirasi, Situs Resmi Wapres, Press Kit)

**Disclaimer text WAJIB di footer**:
> **Disclaimer.** Situs ini merupakan ruang informasi pendamping. Untuk informasi resmi kenegaraan dan rilis pers Sekretariat Wakil Presiden, kunjungi [wapresri.go.id](https://wapresri.go.id). Konten berbasis informasi yang sudah dipublikasikan secara publik (KPU, Wikimedia Commons, rilis pers, media kredibel). Foto resmi dari Wikimedia Commons.

**Bottom**: © 2026 GIBRAN.ID — DIBANGUN UNTUK INDONESIA + 4 social icons (IG, X, YT, TT)

---

## 8. CONTENT COLLECTIONS (Citation-First)

`src/content/config.ts`:

```ts
import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const PROGRAMS = ['mbg', 'sekolah-rakyat', 'ckg', 'pandai', 'ekraf', 'lapor'] as const;

const programs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/programs' }),
  schema: z.object({
    slug: z.enum(PROGRAMS),
    title: z.string(),
    titleShort: z.string(),
    tag: z.string(),                        // "Asta Cita 4", "Direct Channel"
    symbol: z.string(),                     // "M", "S", "AI"
    gradient: z.string(),                   // "pc-mbg"
    description: z.string(),
    longDesc: z.string().optional(),
    citations: z.array(z.object({
      label: z.string(),
      url: z.string().url(),
      accessedAt: z.coerce.date().optional(),
    })),
    relatedAstaCita: z.string().optional(),
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
    citation: z.object({
      label: z.string(),
      url: z.string().url(),
    }).optional(),
    isUpcoming: z.boolean().default(false),  // Mark as "rencana" if forward-looking
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    publishDate: z.coerce.date(),
    tag: z.string(),                       // "Kunjungan Kerja", "Pidato", dll
    featured: z.boolean().default(false),
    sourceLabel: z.string(),               // "Sekretariat Wakil Presiden"
    sourceUrl: z.string().url(),
    relatedProgram: z.enum(PROGRAMS).optional(),
  }),
});

const diplomacy = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/diplomacy' }),
  schema: z.object({
    flag: z.string(),                      // "🇿🇦", "🌍"
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
    isVerified: z.boolean(),               // KRITIS — kalau false, jangan tampilkan
  }),
});

const citations = defineCollection({
  loader: file('./src/content/citations.json'),
  schema: z.object({
    id: z.string(),
    label: z.string(),
    url: z.string().url(),
    publisher: z.string(),
    accessedAt: z.coerce.date(),
    type: z.enum(['government', 'wikipedia', 'press', 'kpu', 'official']),
  }),
});

export const collections = { programs, timeline, news, diplomacy, stats, citations };
```

### 8.1 Seed: `stats.json` (TEMPLATE — verifikasi sebelum publish)

```json
[
  {
    "id": "votes-2024",
    "label": "Suara Rakyat 2024",
    "value": "96.2",
    "unit": "jt",
    "citationLabel": "KPU.go.id — Final Pilpres 2024",
    "citationUrl": "https://www.kpu.go.id/",
    "accessedAt": "2024-11-01",
    "isVerified": true
  },
  {
    "id": "win-percent",
    "label": "Kemenangan Pilpres",
    "value": "58.6",
    "unit": "%",
    "citationLabel": "KPU.go.id",
    "citationUrl": "https://www.kpu.go.id/",
    "accessedAt": "2024-11-01",
    "isVerified": true
  },
  {
    "id": "aspirasi-received",
    "label": "Aspirasi Diterima",
    "value": "TBD",
    "unit": "",
    "citationLabel": "Lapormaswapres.id",
    "citationUrl": "https://lapormaswapres.id",
    "accessedAt": "2026-01-01",
    "isVerified": false
  }
]
```

> **Behavior**: stat dengan `isVerified: false` → render placeholder "Data dalam pengembangan" atau hide section.

---

## 9. SEO + GEO REQUIREMENTS

### 9.1 Per-page Meta

| Page | Title | Description |
|---|---|---|
| `/` | `gibran.id — Wakil Presiden Republik Indonesia (Unofficial)` | "Ruang informasi pendamping tentang Wakil Presiden Gibran Rakabuming Raka, programnya, dan saluran aspirasi resmi." |
| `/program/mbg` | `Makan Bergizi Gratis — Program Asta Cita` | "Program gizi anak sekolah dalam misi Asta Cita ke-4 pemerintahan Prabowo-Gibran." |
| `/disclaimer` | `Disclaimer — gibran.id` | "Informasi tentang status, sumber konten, dan keterbatasan situs gibran.id." |

### 9.2 JSON-LD Schemas

Generate via `src/data/schemas/*.ts`. Render via `<JsonLd />`.

**Wajib di setiap halaman**:
1. **`WebSite`** — name "gibran.id", url, potentialAction SearchAction
2. **`BreadcrumbList`**

**Di homepage**:
3. **`Person`** — Gibran Rakabuming Raka (jobTitle: Wakil Presiden Republik Indonesia, birthDate, image, sameAs Wikipedia)
4. **`AboutPage`** — describing site purpose
5. **`GovernmentOrganization`** (referenced) — RI government context

**Di `/program/[slug]`**:
6. **`Article`** + **`mainEntityOfPage`** — describe program
7. **`GovernmentService`** — kalau program pemerintah

**Di `/berita/[slug]`**:
8. **`NewsArticle`** + **`Person.author`** + **`Organization.publisher`** (gibran.id)

**Contoh** `src/data/schemas/person.ts`:

```ts
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
    url: 'https://wapresri.go.id',
  },
  image: `${SITE.url}/images/portrait-official.webp`,
  sameAs: [
    'https://en.wikipedia.org/wiki/Gibran_Rakabuming_Raka',
    'https://id.wikipedia.org/wiki/Gibran_Rakabuming_Raka',
    'https://www.wikidata.org/wiki/Q15917141',
  ],
} as const;
```

### 9.3 Disclaimer Meta Tags (KRITIS)

```html
<meta name="description" content="..." />
<meta name="application-name" content="gibran.id (unofficial)" />
<meta name="author" content="gibran.id" />
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />

<!-- Disclaimer di meta -->
<meta name="disclaimer" content="Unofficial public information site. For official Vice President releases, visit wapresri.go.id" />

<!-- OG -->
<meta property="og:locale" content="id_ID" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="gibran.id (unofficial)" />
```

### 9.4 GEO

`public/robots.txt`:
```
User-agent: *
Allow: /

# AI crawlers
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

Crawl-delay: 1

Sitemap: https://gibran.id/sitemap-index.xml
Sitemap: https://gibran.id/llms.txt
```

`src/pages/llms.txt.ts` (KRITIS — biar AI pas summary, gak misrepresent):

```ts
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

## Site Purpose

gibran.id is an information aggregation site that collects and presents publicly available information about the Vice President's activities, programs, and public initiatives. All content is sourced from:

- Official government press releases (wapresri.go.id, presiden.go.id)
- KPU (Komisi Pemilihan Umum / General Elections Commission)
- Wikipedia / Wikimedia Commons (for biographical info and photos)
- Mainstream Indonesian media (Kompas, Tempo, Antara, etc.)

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

This site is independently maintained. Content is best-effort accurate based on publicly available sources at time of access. For authoritative information, refer to official government sources.

## Last Updated

${new Date().toISOString().split('T')[0]}
`;

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
```

### 9.5 Performance & A11y

- Lighthouse Performance ≥ 95 (mobile + desktop)
- LCP < 1.5s — preload portrait image, font subset
- CLS < 0.05
- INP < 100ms
- JS budget ≤ 10 KB gzipped
- WCAG 2.1 AA — semantic HTML, focus styles, alt text wajib, `prefers-reduced-motion` guard
- Color contrast: cek `--color-muted` (rgba(10,10,10,0.6)) di `--color-paper` (#f5f1ea) — should pass AA

---

## 10. CLOUDFLARE PAGES DEPLOYMENT

### 10.1 Build Settings

```
Framework preset: Astro
Build command: bun run build
Build output: dist
Root: /
```

### 10.2 Environment Variables

```
BUN_VERSION = 1.1.0
NODE_VERSION = 20

PUBLIC_SITE_URL = https://gibran.id
PUBLIC_SITE_NAME = gibran.id
PUBLIC_OFFICIAL_VP_URL = https://wapresri.go.id
PUBLIC_LAPOR_URL = https://lapormaswapres.id
PUBLIC_SP4N_URL = https://lapor.go.id
PUBLIC_WHATSAPP_LAPOR = 6281117042204
```

### 10.3 `_headers`

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload

/_astro/*
  Cache-Control: public, max-age=31536000, immutable

/images/*
  Cache-Control: public, max-age=31536000, immutable

/llms.txt
  Cache-Control: public, max-age=3600

/*.html
  Cache-Control: public, max-age=300, must-revalidate
```

### 10.4 `_redirects`

```
# Brand consistency
/wapresri https://wapresri.go.id 302
/lapor https://lapormaswapres.id 302
/wa https://wa.me/+6281117042204 302

# Old paths fallback
/about /tentang 301
/programs /program 301
```

### 10.5 PSE Kominfo (kalau live di domain `.id`)

Kalau site live di `.id` dan target audience Indonesia, **wajib daftar PSE** di pse.kominfo.go.id. Skip ini kalau staging/personal use only. Note di README.

---

## 11. EXECUTION ORDER (10 Phase, ~25-30 jam)

### Phase 1 — Audit & Verification (~3 jam) [CRITICAL]
1. Buka `remixed-f77cad1e.html`, identify SEMUA claim/data point
2. Cross-check tiap claim dengan source publik:
   - 96.2 jt suara → KPU
   - 58.6% kemenangan → KPU
   - "Wapres termuda 36" → fact-check (lahir 1987, dilantik 2024 = 37)
   - 12,847 aspirasi, 94% follow-up, 38 prov → cek source
   - Quotes "Tugas saya bukan jadi nomor dua...", "Saya tidak ingin..." → cek transkrip
3. Tulis `CONTENT_VERIFICATION.md` dengan tabel verifikasi
4. Decision: stat tanpa source → replace placeholder atau hapus
5. Quote tanpa source → hapus atau replace dengan verified quote

### Phase 2 — Scaffold (~30 menit)
6. `bun create astro@latest`
7. Install deps: Tailwind v4, sitemap, RSS, MDX, Cloudflare adapter
8. Configure `astro.config.mjs` (4 fonts: Fraunces variable italic, Instrument Serif italic, Geist, Geist Mono, sitemap, env)
9. Folder structure section 6

### Phase 3 — Design Tokens & CSS (~2 jam) [VISUAL FIDELITY]
10. Port `:root` → `tokens.css` sebagai `@theme`
11. Port semua recipe class → `components.css` (12 effect catalog)
12. Port `@keyframes pulse` + `@keyframes scroll` → `animations.css`
13. Setup `prefers-reduced-motion` guard
14. Setup `body::before` SVG noise overlay (wajib persis)
15. Test render plain page, font weight 300/400/italic Fraunces + Instrument Serif italic muncul

### Phase 4 — Foundation Components (~2 jam)
16. SEO: BaseSEO, JsonLd (8 schemas: Person, WebSite, Breadcrumb, Article, NewsArticle, GovernmentOrganization, AboutPage)
17. Layout: Nav (sticky blur 20px), Footer (4-col + disclaimer box), DisclaimerBar (optional top)
18. UI: Button, Eyebrow, SectionTitle (Fraunces 300 + .italic span Instrument Serif), DisplaySpan, HeroBadge (pulse), Reveal, **CitationLink**, NoiseOverlay
19. Lib: reveal.ts (vanilla IO), citations.ts (helpers), format.ts

### Phase 5 — Content Collections (~2 jam)
20. Setup `content/config.ts`
21. Bikin 6 file `programs/*.md` dengan citations
22. Bikin 6 file `timeline/*.md` (1987-2026)
23. Bikin 4 file `diplomacy/*.md`
24. Bikin `stats.json` dengan `isVerified` flag
25. Bikin `citations.json` master DB

### Phase 6 — Sections (~5 jam) [BIGGEST]
26. Hero — eyebrow + H1 (italic accent "Bekerja.") + portrait + 3 stats dengan citation tooltip
27. Marquee — CSS-only infinite scroll
28. About — bio dengan citation footnotes
29. Programs — 6 cards dengan symbol 200px italic + gradient unique
30. Lapor — 3 channels (link to OFFICIAL only) + 3 stat cards (or hide if no source)
31. Timeline — 6 milestones dengan vertical line + dot markers
32. Diplomacy — 4 cards
33. Youth — counter-style numbered list + quote (verify or remove)
34. Newsroom — 6 news cards
35. Visi — H2 88px + signature Instrument Serif italic
36. Compose `index.astro`

### Phase 7 — Subpages (~2 jam)
37. `/program/[slug]` dynamic dengan getStaticPaths
38. `/disclaimer` lengkap
39. `/tentang` (kalau perlu detail bio multi-page)
40. `/404`

### Phase 8 — SEO + GEO (~1 jam)
41. JSON-LD render di setiap page
42. `pages/llms.txt.ts` dynamic
43. `public/robots.txt` AI bot whitelist
44. Sitemap configure

### Phase 9 — Polish & Audit (~2 jam)
45. Lighthouse target ≥95
46. A11y audit dengan axe-devtools
47. Cross-browser test (Chrome, Safari, Firefox)
48. Mobile responsive test (375px, 768px, 1440px)
49. Visual fidelity side-by-side dengan source HTML
50. Validate JSON-LD: validator.schema.org

### Phase 10 — Deploy (~1.5 jam)
51. Push ke GitHub
52. Connect Cloudflare Pages
53. Set env vars
54. Setup `_headers`, `_redirects`
55. Setup AI bot allowlist di Cloudflare WAF
56. Test production
57. Submit sitemap ke Google Search Console + Bing
58. (Optional) PSE Kominfo registration kalau live

---

## 12. DELIVERABLES

1. **Repo Git** dengan struktur lengkap
2. **`README.md`** — setup, env, build, deploy
3. **`CONTENT_VERIFICATION.md`** — audit tabel SEMUA claim dengan source
4. **`DISCLAIMER.md`** — full disclaimer text (link dari footer)
5. **`PRESS_KIT.md`** — buat journalist/researcher bisa cite site (opsional)
6. **Lighthouse reports** — ≥95 di semua page
7. **JSON-LD validation** dari validator.schema.org
8. **Live URL** `https://gibran.id` (atau staging) dengan SSL valid
9. **Visual fidelity screenshots** — side-by-side source vs production

---

## 13. OUT OF SCOPE

❌ Form submission yang "diteruskan ke Wapres" — cuma redirect ke channel resmi
❌ User account / login / auth
❌ Comments / discussion forum (moderation overhead)
❌ Donation / fundraising (illegal tanpa autorisasi politik)
❌ Vote / poll / survey (potential manipulation)
❌ Real-time data scraping dari wapresri.go.id (legal gray area)
❌ Live stream / video embed dari pidato (copyright)
❌ Backend admin / CMS dashboard
❌ Database integration
❌ Multi-language full i18n
❌ Hot-link foto external (wajib download + re-host dari Wikimedia Commons)
❌ Quote yang gak verified — harus diaudit Phase 1
❌ Stat tanpa source — harus diaudit Phase 1

---

## 14. ACCEPTANCE CRITERIA

**Build & Runtime**:
- ✅ `bun install && bun run build` zero error/warning
- ✅ `bun run preview` jalan, semua page navigable
- ✅ `bun run astro check` zero error
- ✅ Bundle JS ≤ 10 KB gzipped

**Visual fidelity (PERSIS dengan source HTML)**:
- ✅ SVG noise grain overlay aktif (body::before opacity 0.035)
- ✅ Hero h1 Fraunces 300, kata "Bekerja." pakai Instrument Serif italic merah
- ✅ Section title pattern: Fraunces 300, accent words italic Instrument Serif
- ✅ Eyebrow Geist Mono, letter-spacing 0.18em uppercase, dengan line prefix 28x1px
- ✅ Marquee 28px Fraunces 300 dengan ✦ separator merah, 40s scroll
- ✅ Big "LAPOR" text 400px italic opacity 0.08 di lapor section
- ✅ Backdrop blur 20px nav (NOT 10px)
- ✅ Pulse dot animation 2s infinite di hero badge
- ✅ Counter list `decimal-leading-zero` di youth-list (01, 02, 03...)
- ✅ Timeline vertical line 1px + dot markers 9x9 merah
- ✅ Program cards 6 unique gradients + symbol 200px italic
- ✅ Lapor channel hover translateX(6px) + bg merah subtle
- ✅ Border-radius 4px (sharp), pill 100px
- ✅ Cubic-bezier 0.16, 1, 0.3, 1 untuk program card hover

**Compliance & Disclaimer**:
- ✅ Footer disclaimer box visible
- ✅ Meta tag `disclaimer` ada
- ✅ JSON-LD pakai "unofficial" naming
- ✅ llms.txt jelas-jelasin status unofficial
- ✅ Semua quote yang gak verified DIHAPUS atau diganti
- ✅ Semua stat yang gak verified diganti placeholder atau hide
- ✅ Foto re-host dari Wikimedia (bukan hotlink)
- ✅ Lapor section cuma redirect ke channel resmi (gak bikin form sendiri)
- ✅ `CONTENT_VERIFICATION.md` lengkap dengan tabel audit

**SEO**:
- ✅ Lighthouse SEO = 100
- ✅ Per-page meta unik
- ✅ JSON-LD valid (8 schemas, Person + GovernmentOrganization)
- ✅ Sitemap.xml auto-generated
- ✅ Open Graph + Twitter Card

**GEO**:
- ✅ `llms.txt` accessible, jelas-jelasin "unofficial"
- ✅ `robots.txt` allow AI bots
- ✅ Cloudflare AI bot allowlist active

**Responsive**:
- ✅ @ 968px: hero-grid 1-col, programs-grid 1-col, footer 1-2 col
- ✅ Mobile: nav-links hidden (drawer atau menu icon)
- ✅ Section padding turun 60px di mobile

**A11y**:
- ✅ Skip link works
- ✅ Color contrast lulus AA
- ✅ All decorative emoji aria-hidden
- ✅ Foto alt text jelas (subject + source)
- ✅ `prefers-reduced-motion` disable pulse + marquee + reveal

**Performance**:
- ✅ Lighthouse Performance ≥ 95
- ✅ LCP < 1.5s, CLS < 0.05, INP < 100ms

**Cloudflare Deploy**:
- ✅ Build sukses
- ✅ SSL valid
- ✅ AI bots return 200
- ✅ `_headers`, `_redirects` aktif

---

## 15. REFERENSI DOKUMENTASI

- Astro 6: https://docs.astro.build
- Astro Fonts API: https://docs.astro.build/en/reference/experimental-flags/fonts/
- Astro Cloudflare adapter: https://docs.astro.build/en/guides/integrations-guide/cloudflare/
- Tailwind v4: https://tailwindcss.com/docs
- Bun: https://bun.com/docs
- Cloudflare Pages: https://developers.cloudflare.com/pages/
- Schema.org Person: https://schema.org/Person
- Schema.org GovernmentOrganization: https://schema.org/GovernmentOrganization
- Wikimedia Commons (foto): https://commons.wikimedia.org/
- KPU.go.id (data Pilpres): https://www.kpu.go.id
- Wapresri.go.id (situs resmi): https://wapresri.go.id
- llms.txt spec: https://llmstxt.org

---

## 16. CARA PAKAI

### A. Wajib Phase 1 dulu — JANGAN SKIP
Phase 1 (Audit & Verification) **wajib selesai** sebelum lanjut. Tanpa ini, lo bisa publish info salah yang berpotensi:
- Misinformation (UU ITE)
- Defamation klaim
- Misrepresent figur publik

### B. Bertahap (Recommended — 10 sesi)
Tiap sesi paste section 1-3 + section relevan, kerjain 1 phase, review.

### C. Side-by-side check
Phase 6 selesai → wajib sandingkan source HTML vs production hasil. Jangan pass kalau ada visual diff.

---

## 17. PENTING — Kalau Status Project Berubah

Kalau ternyata project ini **resmi** (otorisasi tim Wapres):
- Add: PSE Kominfo registration
- Add: official statement workflow (versi/tanggal/penanggungjawab)
- Add: legal review buat content moderation
- Update: branding bisa lebih bold (drop "unofficial" disclaimer)
- Update: integrate sama wapresri.go.id (cross-link, sitemap link)
- Add: contact form yang beneran masuk ke staf Sekretariat (dengan compliance audit trail)

Kalau ternyata project ini **mockup/portfolio**:
- Tukar nama subject ke fictional politician (e.g., "John Doe — Vice President")
- Drop semua data real, ganti placeholder
- Add: README jelas "Portfolio mockup, not associated with real persons"

---

**END OF SUPERPROMPT**
