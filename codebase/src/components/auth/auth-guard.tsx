'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient as createBrowserClient } from '@/lib/supabase/client'

type RequiredRole = 'admin' | 'any'

export function AuthGuard({
  children,
  requiredRole = 'any',
}: {
  children: React.ReactNode
  requiredRole?: RequiredRole
}) {
  const router = useRouter()
  const supabase = createBrowserClient()
  const [checking, setChecking] = useState(true)
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    async function check() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.replace('/login'); return }

      if (requiredRole === 'admin') {
        const { data } = await supabase
          .from('company_users')
          .select('role')
          .eq('user_id', user.id)
          .single()
        if (data?.role !== 'admin') { router.replace('/login'); return }
      }
      setAuthorized(true)
      setChecking(false)
    }
    check()
  }, [router, supabase, requiredRole])

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent" />
      </div>
    )
  }
  if (!authorized) return null
  return <>{children}</>
}
