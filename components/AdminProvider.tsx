'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface AdminContextValue {
  isAdmin: boolean
  signOut: () => Promise<void>
}

const AdminContext = createContext<AdminContextValue>({
  isAdmin: false,
  signOut: async () => {},
})

export const useAdmin = () => useContext(AdminContext)

export default function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data }) => setIsAdmin(!!data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdmin(!!session)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    await supabase?.auth.signOut()
    setIsAdmin(false)
  }

  return (
    <AdminContext.Provider value={{ isAdmin, signOut }}>
      {children}
    </AdminContext.Provider>
  )
}
