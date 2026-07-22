# Admin Mode — Setup Guide

## Dev / Prod databases

The site uses two separate Supabase projects, routed by Next.js env files:

| File | Database | Used by |
| --- | --- | --- |
| `.env.development` | **dev** | `npm run dev` (local editing/testing) |
| `.env.production` | **prod** | `npm run build` + Netlify deploys |

Both files are committed — publishable keys are safe in git because RLS
policies enforce all security. `.env.local` stays git-ignored and must NOT
contain `NEXT_PUBLIC_SUPABASE_*` values (it would override both files).

**Setting up the prod project (one time):**

1. Create a second Supabase project (this is prod; the existing one is dev).
2. In its SQL Editor run, in order: `schema.sql`, `schema-v2.sql`,
   `schema-v3.sql`, then `prod-data.sql` (a snapshot of the dev content —
   regenerate it any time you want to promote dev content to prod).
3. Authentication → Users → Add user (email + password, **Auto Confirm ON**).
4. Put the prod URL + publishable key into `.env.production`.

Note: images uploaded in dev are stored in the dev project's storage bucket;
their URLs keep working in prod, but images uploaded *while on the prod site*
go to the prod bucket. That is the correct long-term behavior.

The site supports a full admin mode: log in at `/admin`, and the homepage
becomes editable in place —

- **Every text** (headings, paragraphs, buttons, contact info) gets a dashed
  outline in admin mode; click it, edit, **Update website** — live instantly.
- **Every list** (hero stats, counters, trust badges, why-cards, services,
  process steps, about checklist, projects, reviews) gets ✎ / ✕ buttons per
  item and an **+ Add** control.
- **Images** (about photo, project photos) are **uploaded from your computer**
  via the ✎ chips / project form. Uploads are validated before they're accepted:
  JPG/PNG/WebP only, max 5 MB, and the right resolution for the slot —
  project images: landscape (16:10), at least 800×500 px;
  about photo: portrait (4:5), at least 600×750 px.
  Files are stored in the public `site-images` Supabase Storage bucket.
- Contact details (phone, WhatsApp, email) are stored once and update
  everywhere they appear (contact section, footer, floating buttons, CTA).

Changes save to Supabase and are live for every visitor immediately — no
rebuild or redeploy. Content lives in four tables: `projects`,
`testimonials`, `site_content` (one row per text, created when you first
edit it), and `collection_items` (all repeating lists).

> **Upgrading from v1?** Run `supabase/schema-v2.sql` in the SQL Editor once.

Until Supabase is configured, the site behaves exactly as before (it renders
the built-in content and `/admin` shows a "not configured" notice).

## 1. Create the Supabase project (free)

1. Go to [supabase.com](https://supabase.com) → New project.
2. Pick any name (e.g. `afno-ghar`) and a strong database password.

## 2. Create the tables

1. In the Supabase dashboard, open **SQL Editor**.
2. Paste the entire contents of [`supabase/schema.sql`](supabase/schema.sql) and click **Run**.
3. Then paste the entire contents of [`supabase/schema-v2.sql`](supabase/schema-v2.sql) and click **Run**.
4. Then paste the entire contents of [`supabase/schema-v3.sql`](supabase/schema-v3.sql) and click **Run**
   (creates the `site-images` storage bucket for photo uploads).

This creates all four content tables, seeds them with the current site
content, and sets the security rules: anyone can read, only a signed-in
user can write.

## 3. Create your admin account

1. Dashboard → **Authentication → Users → Add user → Create new user**.
2. Enter your email and a strong password. Check **Auto Confirm User**.

That's the account you'll use at `/admin`. Don't share it — anyone signed
in can edit the site.

## 4. Connect the website

Local development:

```bash
cp .env.local.example .env.local
# then edit .env.local with the values from
# Supabase Dashboard → Project Settings → API:
#   Project URL  → NEXT_PUBLIC_SUPABASE_URL
#   anon public  → NEXT_PUBLIC_SUPABASE_ANON_KEY
npm run dev
```

Netlify (production): Site settings → **Environment variables** → add the
same two variables, then trigger a redeploy so they're baked into the build.

## 5. Use it

- Visit `/admin` and sign in → you're redirected to the homepage.
- A pill at the bottom shows you're in admin mode; each project/review card
  gets **✎ Edit** and **✕** buttons, and a dashed **+ Add** card appears at
  the end of each grid.
- **Update website** publishes instantly. **Log out** from the pill when done.

## How it works / limits

- The site is still a fully static export — there is no server. The browser
  fetches projects and reviews from Supabase on page load and, when you're
  logged in, writes to it directly. Security is enforced by Supabase
  row-level security, not by the site.
- The anon key in the build is public by design; it only allows what the
  RLS policies permit (read for everyone, write for authenticated users).
- Images are added by URL. For your own photos, upload to Supabase Storage
  (dashboard → Storage → create a public bucket) and paste the public URL.
- If Supabase is unreachable, the site silently falls back to the built-in
  content, so the public site never breaks.
