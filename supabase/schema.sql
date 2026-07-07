-- Afno Ghar admin experiment — run this once in the Supabase SQL Editor.
-- Creates the content tables, locks them down with RLS
-- (public read, signed-in admin write), and seeds the current site content.

create table if not exists projects (
  id          uuid primary key default gen_random_uuid(),
  tag         text not null,
  title       text not null,
  description text not null,
  img         text not null,
  area        text not null default '',
  storeys     text not null default '',
  status      text not null default 'Completed',
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now()
);

create table if not exists testimonials (
  id           uuid primary key default gen_random_uuid(),
  project_type text not null,
  text         text not null,
  name         text not null,
  location     text not null,
  sort_order   int  not null default 0,
  created_at   timestamptz not null default now()
);

alter table projects     enable row level security;
alter table testimonials enable row level security;

-- Anyone may read (the public website)
create policy "public read projects"     on projects     for select using (true);
create policy "public read testimonials" on testimonials for select using (true);

-- Only signed-in users may write (your admin account)
create policy "admin write projects" on projects
  for all to authenticated using (true) with check (true);
create policy "admin write testimonials" on testimonials
  for all to authenticated using (true) with check (true);

-- Seed with the current site content
insert into projects (tag, title, description, img, area, storeys, status, sort_order) values
  ('Residential', '3-Storey Family Home — Kathmandu', 'Earthquake-resistant RCC structure with modern facade. Full design, approval, and supervised construction.', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', '2,400 sq.ft', '3 Storeys', 'Completed', 1),
  ('Design + Build', 'Modern Residence — Lalitpur', 'Contemporary 2-storey home with open-plan living spaces and structural design per NBC standards.', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80', '1,800 sq.ft', '2 Storeys', 'Completed', 2),
  ('Structural Design', 'Family Residence — Bhaktapur', 'Full structural analysis and NBC-compliant drawings for a 4-storey family residence. Municipality approved.', 'https://images.unsplash.com/photo-1592595896616-c37162298647?w=800&q=80', '3,100 sq.ft', '4 Storeys', 'Completed', 3),
  ('Commercial', 'Mixed-Use Building — Pokhara', 'Ground-floor commercial units with residential floors above. Structural design, supervision, and handover.', 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80', '4,200 sq.ft', '5 Storeys', 'Completed', 4),
  ('Renovation', 'Structural Reinforcement — Biratnagar', 'Full structural assessment and reinforcement of an existing 2-storey home. Seismic retrofitting completed.', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', '1,600 sq.ft', '2 Storeys', 'Completed', 5),
  ('Interior Design', 'Luxury Interior — Chitwan', 'Complete interior design, space planning, and premium finishing for a newly constructed residence.', 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80', '2,200 sq.ft', '2 Storeys', 'Completed', 6);

insert into testimonials (project_type, text, name, location, sort_order) values
  ('3-Storey Residence · Kathmandu', 'Afno Ghar delivered our home exactly as planned. Their engineering knowledge and on-site supervision made us feel confident throughout. We knew exactly what was happening at every stage.', 'Ram Kumar Shrestha', 'Kathmandu', 1),
  ('Design + Build · Lalitpur', 'Very professional team. They explained everything clearly, completed on time, and the construction quality is excellent. Our house passed inspection on the first attempt — no issues at all.', 'Sita Maharjan', 'Lalitpur', 2),
  ('Structural Design · Bhaktapur', 'The structural drawings they provided gave us complete peace of mind during municipality approval. Transparent pricing and no hidden charges. A team that genuinely knows their engineering.', 'Bikram Poudel', 'Bhaktapur', 3),
  ('Full Construction · Pokhara', 'From design to handover, everything was handled with great care. The engineer assigned to us was always available. The result exceeded what we had imagined.', 'Anita Karki', 'Pokhara', 4),
  ('Commercial Building · Biratnagar', 'We hired Afno Ghar for our commercial project and they delivered outstanding results. Attention to detail, commitment to deadlines, and honest cost estimates throughout.', 'Nabin Rai', 'Biratnagar', 5),
  ('Interior Design · Chitwan', 'The interior design team understood our vision perfectly. They transformed our house into a home we are truly proud of — on budget and without any compromise on quality.', 'Priya Shrestha', 'Chitwan', 6);
