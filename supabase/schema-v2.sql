-- Afno Ghar admin v2 — makes every section editable.
-- Run this once in the Supabase SQL Editor (after schema.sql).
--
--   site_content     one row per editable text/image on the site (key → value).
--                    Starts EMPTY on purpose: the site shows its built-in text
--                    until you edit something, which creates the row.
--   collection_items one generic table for every repeating list
--                    (hero stats, counters, trust badges, why-cards,
--                    services, process steps, about checklist).

create table if not exists site_content (
  key        text primary key,
  value      text not null,
  updated_at timestamptz not null default now()
);

create table if not exists collection_items (
  id         uuid primary key default gen_random_uuid(),
  collection text not null,
  data       jsonb not null default '{}'::jsonb,
  sort_order int  not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists collection_items_collection_idx
  on collection_items (collection, sort_order);

alter table site_content     enable row level security;
alter table collection_items enable row level security;

create policy "public read site_content" on site_content
  for select using (true);
create policy "admin write site_content" on site_content
  for all to authenticated using (true) with check (true);

create policy "public read collection_items" on collection_items
  for select using (true);
create policy "admin write collection_items" on collection_items
  for all to authenticated using (true) with check (true);

-- ── Seed the lists with the current site content ─────────────────────────

insert into collection_items (collection, data, sort_order) values
  ('hero_stats', '{"num":"40","suffix":"+","label":"Homes Completed"}', 1),
  ('hero_stats', '{"num":"100","suffix":"+","label":"Structural Designs Delivered"}', 2),
  ('hero_stats', '{"num":"1K","suffix":"+","label":"Site Inspections Conducted"}', 3),
  ('hero_stats', '{"num":"100","suffix":"%","label":"NBC Compliance Rate"}', 4);

insert into collection_items (collection, data, sort_order) values
  ('trust_bar', '{"label":"NBC Compliant"}', 1),
  ('trust_bar', '{"label":"Earthquake Resistant Design"}', 2),
  ('trust_bar', '{"label":"Municipality Approval Support"}', 3),
  ('trust_bar', '{"label":"Professional Civil Engineers"}', 4),
  ('trust_bar', '{"label":"Transparent Cost Estimation"}', 5);

insert into collection_items (collection, data, sort_order) values
  ('counters', '{"end":"40","suffix":"+","label":"Homes Completed","desc":"Residential buildings across Nepal"}', 1),
  ('counters', '{"end":"100","suffix":"+","label":"Structural Designs","desc":"NBC-compliant engineering drawings"}', 2),
  ('counters', '{"end":"1000","suffix":"+","label":"Site Inspections","desc":"Quality control visits conducted"}', 3),
  ('counters', '{"end":"100","suffix":"%","label":"NBC Compliance","desc":"Every project meets national standards"}', 4);

insert into collection_items (collection, data, sort_order) values
  ('why_items', '{"icon":"🛡","badge":"Safety","title":"Safety First, Always","desc":"Every structure we design is earthquake-resistant and fully NBC-compliant. Your family''s safety is never negotiated — it is engineered."}', 1),
  ('why_items', '{"icon":"📐","badge":"Precision","title":"Engineering Precision","desc":"We calculate, analyze, and verify — no guesswork. Load calculations, structural analysis, and field checks at every stage."}', 2),
  ('why_items', '{"icon":"💰","badge":"Transparency","title":"Transparent Budgeting","desc":"You receive a detailed cost breakdown before construction begins. No hidden charges, no last-minute surprises — just honest numbers."}', 3),
  ('why_items', '{"icon":"🏗","badge":"Quality","title":"Quality Construction","desc":"Premium materials, certified workers, and strict quality checks at foundation, column, slab, and finishing stages."}', 4),
  ('why_items', '{"icon":"📞","badge":"Support","title":"Dedicated Project Support","desc":"A dedicated engineer is assigned to your project. Get real-time updates, progress reports, and answers whenever you need them."}', 5);

insert into collection_items (collection, data, sort_order) values
  ('services', '{"icon":"🏛","title":"Architectural Design","desc":"Custom 2D floor plans and 3D visualizations tailored to your lifestyle, plot size, and budget. See your home before a single brick is laid."}', 1),
  ('services', '{"icon":"📊","title":"Structural Analysis","desc":"Earthquake-resistant design with full load calculations per NBC and IS codes. Your building is engineered to protect your family for decades."}', 2),
  ('services', '{"icon":"🏗","title":"Building Construction","desc":"End-to-end construction with professional material management, certified workforce, and strict quality checks from foundation to finishing."}', 3),
  ('services', '{"icon":"🔍","title":"Site Supervision","desc":"Regular on-site inspections, material quality verification, and detailed progress reports — so you always know exactly where your project stands."}', 4),
  ('services', '{"icon":"📋","title":"Municipality Approval","desc":"We prepare and submit all technical drawings and documents required for building permit approval. Hassle-free, compliant, and fast."}', 5),
  ('services', '{"icon":"💰","title":"Cost Estimation","desc":"Accurate, itemized cost breakdowns before construction starts. No hidden charges. Plan your budget with complete confidence."}', 6),
  ('services', '{"icon":"🛋","title":"Interior Design","desc":"Space planning, material selection, and modern finishing concepts that make every room feel exactly the way you imagined it."}', 7);

insert into collection_items (collection, data, sort_order) values
  ('process_steps', '{"timeline":"Day 1","title":"Free Consultation","desc":"We listen to your vision, requirements, and budget in a free first meeting — online or at your site.","deliverable":"Project feasibility assessment"}', 1),
  ('process_steps', '{"timeline":"Day 2–4","title":"Site Visit & Survey","desc":"Our engineers visit your land, conduct soil assessment, take measurements, and evaluate site conditions.","deliverable":"Site survey report"}', 2),
  ('process_steps', '{"timeline":"Week 1–3","title":"Design & Drawings","desc":"We create architectural floor plans, 3D visualizations, and complete structural engineering drawings.","deliverable":"Full architectural + structural drawings"}', 3),
  ('process_steps', '{"timeline":"Week 3–6","title":"Municipality Approval","desc":"We prepare and submit all technical documents for your building permit on your behalf.","deliverable":"Approved building permit"}', 4),
  ('process_steps', '{"timeline":"Month 2–14","title":"Construction","desc":"Professional construction with supervised execution — foundation, columns, slabs, brickwork, and finishing.","deliverable":"Fully constructed building"}', 5),
  ('process_steps', '{"timeline":"Final Week","title":"Handover","desc":"Final quality inspection, snag list resolution, and formal handover with all documentation.","deliverable":"Keys + as-built drawings + warranty"}', 6);

insert into collection_items (collection, data, sort_order) values
  ('about_trust', '{"label":"Engineering-based approach, not just contractors"}', 1),
  ('about_trust', '{"label":"Transparency in work and communication at every stage"}', 2),
  ('about_trust', '{"label":"Focus on safety, durability, and cost-efficiency"}', 3),
  ('about_trust', '{"label":"On-site supervision and rigorous quality control"}', 4);
