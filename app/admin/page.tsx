'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    supabase?.auth.getSession().then(({ data }) => {
      if (data.session) router.replace('/')
    })
  }, [router])

  if (!supabase) {
    return (
      <div className="admin-login-page">
        <div className="admin-login-card">
          <h1>Admin not configured</h1>
          <p className="admin-login-note">
            Set <code>NEXT_PUBLIC_SUPABASE_URL</code> and{' '}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in <code>.env.local</code>,
            then restart the dev server. See <code>ADMIN-SETUP.md</code>.
          </p>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    const { error } = await supabase!.auth.signInWithPassword({ email, password })
    setBusy(false)
    if (error) {
      setError(`Login failed: ${error.message}`)
      return
    }
    router.replace('/')
  }

  return (
    <div className="admin-login-page">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <div className="admin-login-brand">
          Afno Ghar <span>Admin</span>
        </div>
        <h1>Sign in to edit the site</h1>
        <label className="adm-label" htmlFor="admin-email">Email</label>
        <input
          id="admin-email"
          className="adm-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
        <label className="adm-label" htmlFor="admin-password">Password</label>
        <input
          id="admin-password"
          className="adm-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        {error && <div className="adm-error">{error}</div>}
        <button className="adm-btn-primary" type="submit" disabled={busy}>
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
        <a className="admin-login-back" href="/">← Back to website</a>
      </form>
    </div>
  )
}
