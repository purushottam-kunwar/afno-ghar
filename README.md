# Afno Ghar Consulting & Construction

Website for a Nepal-based civil engineering and residential construction firm.

## Tech Stack

- **Next.js 14** (App Router, static export)
- **TypeScript**
- **Outfit + Inter** (Google Fonts via `next/font`)
- **Formspree** (contact form)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy

```bash
npm run build
netlify deploy --dir=out --prod
```

## Structure

```
app/
├── layout.tsx      # fonts, metadata
├── globals.css     # all styles
└── page.tsx        # composes all sections
components/
├── Nav.tsx
├── Hero.tsx
├── About.tsx
├── Services.tsx
├── WhyChooseUs.tsx
├── Process.tsx
├── Projects.tsx
├── Testimonials.tsx
├── CTA.tsx
├── Contact.tsx
└── Footer.tsx
```

## Contact

**Afno Ghar Consulting & Construction**  
Naya Thimi, Bhaktapur, Nepal  
+977-9860648569 · support@afnoghar.com
