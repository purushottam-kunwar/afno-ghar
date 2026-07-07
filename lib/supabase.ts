import { createClient, SupabaseClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

/**
 * Null when env vars are not set — the site then renders the built-in
 * fallback content and admin features stay disabled.
 */
export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null
