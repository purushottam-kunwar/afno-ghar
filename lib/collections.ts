export interface CollectionItem {
  id?: string
  sort_order?: number
  data: Record<string, string>
}

export interface FieldConfig {
  key: string
  label: string
  type?: 'text' | 'textarea'
  placeholder?: string
}

interface CollectionConfig {
  /** Shown in the modal title, e.g. "Hero Stat" */
  itemName: string
  fields: FieldConfig[]
  /** Rendered when Supabase is unconfigured/unreachable or the table is missing. */
  fallback: Record<string, string>[]
}

export const COLLECTIONS: Record<string, CollectionConfig> = {
  hero_stats: {
    itemName: 'Hero Stat',
    fields: [
      { key: 'num', label: 'Number', placeholder: '40' },
      { key: 'suffix', label: 'Suffix', placeholder: '+ or %' },
      { key: 'label', label: 'Label', placeholder: 'Homes Completed' },
    ],
    fallback: [
      { num: '40', suffix: '+', label: 'Homes Completed' },
      { num: '100', suffix: '+', label: 'Structural Designs Delivered' },
      { num: '1K', suffix: '+', label: 'Site Inspections Conducted' },
      { num: '100', suffix: '%', label: 'NBC Compliance Rate' },
    ],
  },
  trust_bar: {
    itemName: 'Trust Badge',
    fields: [{ key: 'label', label: 'Label', placeholder: 'NBC Compliant' }],
    fallback: [
      { label: 'NBC Compliant' },
      { label: 'Earthquake Resistant Design' },
      { label: 'Municipality Approval Support' },
      { label: 'Professional Civil Engineers' },
      { label: 'Transparent Cost Estimation' },
    ],
  },
  counters: {
    itemName: 'Counter',
    fields: [
      { key: 'end', label: 'Number (digits only)', placeholder: '1000' },
      { key: 'suffix', label: 'Suffix', placeholder: '+ or %' },
      { key: 'label', label: 'Label', placeholder: 'Site Inspections' },
      { key: 'desc', label: 'Description', placeholder: 'Quality control visits conducted' },
    ],
    fallback: [
      { end: '40', suffix: '+', label: 'Homes Completed', desc: 'Residential buildings across Nepal' },
      { end: '100', suffix: '+', label: 'Structural Designs', desc: 'NBC-compliant engineering drawings' },
      { end: '1000', suffix: '+', label: 'Site Inspections', desc: 'Quality control visits conducted' },
      { end: '100', suffix: '%', label: 'NBC Compliance', desc: 'Every project meets national standards' },
    ],
  },
  why_items: {
    itemName: 'Advantage Card',
    fields: [
      { key: 'icon', label: 'Icon (emoji)', placeholder: '🛡' },
      { key: 'badge', label: 'Badge', placeholder: 'Safety' },
      { key: 'title', label: 'Title', placeholder: 'Safety First, Always' },
      { key: 'desc', label: 'Description', type: 'textarea' },
    ],
    fallback: [
      { icon: '🛡', badge: 'Safety', title: 'Safety First, Always', desc: "Every structure we design is earthquake-resistant and fully NBC-compliant. Your family's safety is never negotiated — it is engineered." },
      { icon: '📐', badge: 'Precision', title: 'Engineering Precision', desc: 'We calculate, analyze, and verify — no guesswork. Load calculations, structural analysis, and field checks at every stage.' },
      { icon: '💰', badge: 'Transparency', title: 'Transparent Budgeting', desc: 'You receive a detailed cost breakdown before construction begins. No hidden charges, no last-minute surprises — just honest numbers.' },
      { icon: '🏗', badge: 'Quality', title: 'Quality Construction', desc: 'Premium materials, certified workers, and strict quality checks at foundation, column, slab, and finishing stages.' },
      { icon: '📞', badge: 'Support', title: 'Dedicated Project Support', desc: 'A dedicated engineer is assigned to your project. Get real-time updates, progress reports, and answers whenever you need them.' },
    ],
  },
  services: {
    itemName: 'Service',
    fields: [
      { key: 'icon', label: 'Icon (emoji)', placeholder: '🏛' },
      { key: 'title', label: 'Title', placeholder: 'Architectural Design' },
      { key: 'desc', label: 'Description', type: 'textarea' },
    ],
    fallback: [
      { icon: '🏛', title: 'Architectural Design', desc: 'Custom 2D floor plans and 3D visualizations tailored to your lifestyle, plot size, and budget. See your home before a single brick is laid.' },
      { icon: '📊', title: 'Structural Analysis', desc: 'Earthquake-resistant design with full load calculations per NBC and IS codes. Your building is engineered to protect your family for decades.' },
      { icon: '🏗', title: 'Building Construction', desc: 'End-to-end construction with professional material management, certified workforce, and strict quality checks from foundation to finishing.' },
      { icon: '🔍', title: 'Site Supervision', desc: 'Regular on-site inspections, material quality verification, and detailed progress reports — so you always know exactly where your project stands.' },
      { icon: '📋', title: 'Municipality Approval', desc: 'We prepare and submit all technical drawings and documents required for building permit approval. Hassle-free, compliant, and fast.' },
      { icon: '💰', title: 'Cost Estimation', desc: 'Accurate, itemized cost breakdowns before construction starts. No hidden charges. Plan your budget with complete confidence.' },
      { icon: '🛋', title: 'Interior Design', desc: 'Space planning, material selection, and modern finishing concepts that make every room feel exactly the way you imagined it.' },
    ],
  },
  process_steps: {
    itemName: 'Process Step',
    fields: [
      { key: 'timeline', label: 'Timeline', placeholder: 'Day 1' },
      { key: 'title', label: 'Title', placeholder: 'Free Consultation' },
      { key: 'desc', label: 'Description', type: 'textarea' },
      { key: 'deliverable', label: 'Deliverable', placeholder: 'Project feasibility assessment' },
    ],
    fallback: [
      { timeline: 'Day 1', title: 'Free Consultation', desc: 'We listen to your vision, requirements, and budget in a free first meeting — online or at your site.', deliverable: 'Project feasibility assessment' },
      { timeline: 'Day 2–4', title: 'Site Visit & Survey', desc: 'Our engineers visit your land, conduct soil assessment, take measurements, and evaluate site conditions.', deliverable: 'Site survey report' },
      { timeline: 'Week 1–3', title: 'Design & Drawings', desc: 'We create architectural floor plans, 3D visualizations, and complete structural engineering drawings.', deliverable: 'Full architectural + structural drawings' },
      { timeline: 'Week 3–6', title: 'Municipality Approval', desc: 'We prepare and submit all technical documents for your building permit on your behalf.', deliverable: 'Approved building permit' },
      { timeline: 'Month 2–14', title: 'Construction', desc: 'Professional construction with supervised execution — foundation, columns, slabs, brickwork, and finishing.', deliverable: 'Fully constructed building' },
      { timeline: 'Final Week', title: 'Handover', desc: 'Final quality inspection, snag list resolution, and formal handover with all documentation.', deliverable: 'Keys + as-built drawings + warranty' },
    ],
  },
  about_trust: {
    itemName: 'Checklist Item',
    fields: [{ key: 'label', label: 'Text', type: 'textarea' }],
    fallback: [
      { label: 'Engineering-based approach, not just contractors' },
      { label: 'Transparency in work and communication at every stage' },
      { label: 'Focus on safety, durability, and cost-efficiency' },
      { label: 'On-site supervision and rigorous quality control' },
    ],
  },
}

export function fallbackItems(collection: string): CollectionItem[] {
  return COLLECTIONS[collection].fallback.map((data) => ({ data }))
}
