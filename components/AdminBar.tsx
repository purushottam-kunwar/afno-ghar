'use client'

import { useAdmin } from './AdminProvider'

export default function AdminBar() {
  const { isAdmin, signOut } = useAdmin()
  if (!isAdmin) return null

  return (
    <div className="admin-bar">
      <span className="admin-bar-dot" />
      <span>Admin mode — edits publish to the live site</span>
      <button onClick={signOut} className="admin-bar-logout">
        Log out
      </button>
    </div>
  )
}
