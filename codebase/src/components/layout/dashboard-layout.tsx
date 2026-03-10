'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, Users, Grid3x3, AlertTriangle, BookOpen, LogOut,
} from 'lucide-react'
import { createClient as createBrowserClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Overview',    icon: LayoutDashboard },
  { href: '/ranking',   label: 'Rankings',    icon: Users },
  { href: '/matrix',    label: 'Role Matrix', icon: Grid3x3 },
  { href: '/risk',      label: 'Risk',        icon: AlertTriangle },
  { href: '/training',  label: 'Training',    icon: BookOpen },
]

export function DashboardLayout({ children, companyName }: { children: React.ReactNode; companyName?: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createBrowserClient()

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-5 border-b border-gray-100">
          <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">AI Workforce Map</p>
          {companyName && <p className="text-sm font-semibold text-gray-800 mt-1 truncate">{companyName}</p>}
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                pathname === href || pathname.startsWith(href)
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-gray-100">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-3 py-2 w-full text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
