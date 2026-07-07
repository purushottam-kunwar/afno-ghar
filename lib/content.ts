export interface Project {
  id?: string
  tag: string
  title: string
  description: string
  img: string
  area: string
  storeys: string
  status: string
}

export interface Testimonial {
  id?: string
  project_type: string
  text: string
  name: string
  location: string
}

/** Rendered when Supabase is not configured or unreachable. */
export const fallbackProjects: Project[] = [
  {
    tag: 'Residential',
    title: '3-Storey Family Home — Kathmandu',
    description:
      'Earthquake-resistant RCC structure with modern facade. Full design, approval, and supervised construction.',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    area: '2,400 sq.ft',
    storeys: '3 Storeys',
    status: 'Completed',
  },
  {
    tag: 'Design + Build',
    title: 'Modern Residence — Lalitpur',
    description:
      'Contemporary 2-storey home with open-plan living spaces and structural design per NBC standards.',
    img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    area: '1,800 sq.ft',
    storeys: '2 Storeys',
    status: 'Completed',
  },
  {
    tag: 'Structural Design',
    title: 'Family Residence — Bhaktapur',
    description:
      'Full structural analysis and NBC-compliant drawings for a 4-storey family residence. Municipality approved.',
    img: 'https://images.unsplash.com/photo-1592595896616-c37162298647?w=800&q=80',
    area: '3,100 sq.ft',
    storeys: '4 Storeys',
    status: 'Completed',
  },
  {
    tag: 'Commercial',
    title: 'Mixed-Use Building — Pokhara',
    description:
      'Ground-floor commercial units with residential floors above. Structural design, supervision, and handover.',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    area: '4,200 sq.ft',
    storeys: '5 Storeys',
    status: 'Completed',
  },
  {
    tag: 'Renovation',
    title: 'Structural Reinforcement — Biratnagar',
    description:
      'Full structural assessment and reinforcement of an existing 2-storey home. Seismic retrofitting completed.',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    area: '1,600 sq.ft',
    storeys: '2 Storeys',
    status: 'Completed',
  },
  {
    tag: 'Interior Design',
    title: 'Luxury Interior — Chitwan',
    description:
      'Complete interior design, space planning, and premium finishing for a newly constructed residence.',
    img: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
    area: '2,200 sq.ft',
    storeys: '2 Storeys',
    status: 'Completed',
  },
]

export const fallbackTestimonials: Testimonial[] = [
  {
    project_type: '3-Storey Residence · Kathmandu',
    text: 'Afno Ghar delivered our home exactly as planned. Their engineering knowledge and on-site supervision made us feel confident throughout. We knew exactly what was happening at every stage.',
    name: 'Ram Kumar Shrestha',
    location: 'Kathmandu',
  },
  {
    project_type: 'Design + Build · Lalitpur',
    text: 'Very professional team. They explained everything clearly, completed on time, and the construction quality is excellent. Our house passed inspection on the first attempt — no issues at all.',
    name: 'Sita Maharjan',
    location: 'Lalitpur',
  },
  {
    project_type: 'Structural Design · Bhaktapur',
    text: 'The structural drawings they provided gave us complete peace of mind during municipality approval. Transparent pricing and no hidden charges. A team that genuinely knows their engineering.',
    name: 'Bikram Poudel',
    location: 'Bhaktapur',
  },
  {
    project_type: 'Full Construction · Pokhara',
    text: 'From design to handover, everything was handled with great care. The engineer assigned to us was always available. The result exceeded what we had imagined.',
    name: 'Anita Karki',
    location: 'Pokhara',
  },
  {
    project_type: 'Commercial Building · Biratnagar',
    text: 'We hired Afno Ghar for our commercial project and they delivered outstanding results. Attention to detail, commitment to deadlines, and honest cost estimates throughout.',
    name: 'Nabin Rai',
    location: 'Biratnagar',
  },
  {
    project_type: 'Interior Design · Chitwan',
    text: 'The interior design team understood our vision perfectly. They transformed our house into a home we are truly proud of — on budget and without any compromise on quality.',
    name: 'Priya Shrestha',
    location: 'Chitwan',
  },
]

export function initialsOf(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
