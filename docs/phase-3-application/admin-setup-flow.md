# Phase 3 — Company Admin Setup Flow

**Notion URL:** https://www.notion.so/31ed807b91118194939dd583e5015245

---

# Overview
This page is the **developer handoff spec** for the admin onboarding and employee invite system. It covers admin signup, company profile setup, assessment link generation, and the login page for both admins and employees.
---
## File Map
| File | Purpose |
|---|---|
| `src/app/(auth)/signup/page.tsx` | Admin email+password registration |
| `src/app/(admin)/setup/page.tsx` | Company profile setup form |
| `src/app/(admin)/invite/page.tsx` | Assessment link generation + management |
| `src/app/(auth)/login/page.tsx` | Admin login + employee magic link |
| `src/app/api/admin/setup/route.ts` | POST: create company |
| `src/app/api/admin/invite/route.ts` | POST: create link, GET: list links |
| `src/components/auth/auth-guard.tsx` | Admin route protection HOC |
| `src/lib/supabase/server.ts` | Server-side Supabase client |
| `src/lib/supabase/client.ts` | Browser-side Supabase client |
---
## 1. Admin Signup Page
`src/app/(auth)/signup/page.tsx`
```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Link from 'next/link'

export default function SignupPage() {
  const router = useRouter()
  const supabase = createBrowserClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (password.length 
      
        
          Create Admin Account
          Sign up to manage your company's AI readiness assessment.
        
        
          
            {error && (
              
                {error}
              
            )}
            
              Work Email
               setEmail(e.target.value)}
                required
              />
            
            
              Password
               setPassword(e.target.value)}
                required
              />
            
            
              Confirm Password
               setConfirmPassword(e.target.value)}
                required
              />
            
            
              {loading ? 'Creating account...' : 'Create Account'}
            
            
              Already have an account?{' '}
              Log in
            
          
        
      
    
  )
}
```
---
## 2. Company Setup Form
`src/app/(admin)/setup/page.tsx`
```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Plus, X } from 'lucide-react'

const AI_ADOPTION_GOALS = [
  { id: 'automate_repetitive',   label: 'Automate repetitive tasks' },
  { id: 'improve_decision',      label: 'Improve decision quality' },
  { id: 'augment_workforce',     label: 'Augment workforce capacity' },
  { id: 'reduce_errors',         label: 'Reduce errors and risk' },
  { id: 'customer_experience',   label: 'Enhance customer experience' },
  { id: 'competitive_advantage', label: 'Gain competitive advantage' },
]

const TARGET_FUNCTIONS = [
  'Operations', 'Finance', 'HR', 'Sales', 'Marketing',
  'Customer Service', 'IT', 'Legal', 'Product', 'Engineering',
]

export default function SetupPage() {
  const router = useRouter()
  const [companyName, setCompanyName] = useState('')
  const [departments, setDepartments] = useState([''])
  const [goals, setGoals] = useState([])
  const [riskSensitivity, setRiskSensitivity] = useState('medium')
  const [targetFunctions, setTargetFunctions] = useState([])
  const [expectedCount, setExpectedCount] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function addDepartment() {
    setDepartments(prev => [...prev, ''])
  }

  function removeDepartment(index: number) {
    setDepartments(prev => prev.filter((_, i) => i !== index))
  }

  function updateDepartment(index: number, value: string) {
    setDepartments(prev => prev.map((d, i) => i === index ? value : d))
  }

  function toggleGoal(id: string) {
    setGoals(prev => prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id])
  }

  function toggleFunction(fn: string) {
    setTargetFunctions(prev => prev.includes(fn) ? prev.filter(f => f !== fn) : [...prev, fn])
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!companyName.trim()) {
      setError('Company name is required.')
      return
    }
    const validDepts = departments.filter(d => d.trim())
    if (validDepts.length === 0) {
      setError('At least one department is required.')
      return
    }

    setLoading(true)
    const res = await fetch('/api/admin/setup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        company_name: companyName.trim(),
        departments: validDepts,
        ai_adoption_goals: goals,
        risk_sensitivity: riskSensitivity,
        target_functions: targetFunctions,
        expected_employee_count: expectedCount ? parseInt(expectedCount) : null,
      }),
    })

    const data = await res.json()
    if (!res.ok) {
      setError(data.error ?? 'Setup failed.')
    } else {
      router.push('/invite')
    }
    setLoading(false)
  }

  return (
    
      
        
          Set Up Your Company
          This takes about 3 minutes. You can update these settings later.
        

        
          {error && {error}}

          {/* Company Name */}
          
            Company Information
            
              
                Company Name *
                 setCompanyName(e.target.value)}
                  required
                />
              
              
                Expected Employee Count
                 setExpectedCount(e.target.value)}
                />
              
            
          

          {/* Departments */}
          
            Departments *
            
              {departments.map((dept, i) => (
                
                   updateDepartment(i, e.target.value)}
                  />
                  {departments.length > 1 && (
                     removeDepartment(i)}>
                      
                    
                  )}
                
              ))}
              
                 Add Department
              
            
          

          {/* AI Adoption Goals */}
          
            AI Adoption Goals
            
              
                {AI_ADOPTION_GOALS.map(goal => (
                  
                     toggleGoal(goal.id)}
                    />
                    {goal.label}
                  
                ))}
              
            
          

          {/* Risk Sensitivity */}
          
            Risk Sensitivity
            
               setRiskSensitivity(v)}
                className="flex gap-6"
              >
                {(['low', 'medium', 'high'] as const).map(level => (
                  
                    
                    {level}
                  
                ))}
              
            
          

          {/* Target Functions */}
          
            Target Functions
            
              
                {TARGET_FUNCTIONS.map(fn => (
                   toggleFunction(fn)}
                    className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                      targetFunctions.includes(fn)
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    {fn}
                  
                ))}
              
            
          

          
            {loading ? 'Saving...' : 'Save and Continue →'}
          
        
      
    
  )
}
```
---
## 3. Invite / Link Management
`src/app/(admin)/invite/page.tsx`
```typescript
'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Copy, Link, Power, Plus } from 'lucide-react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'

interface AssessmentLink {
  id: string
  slug: string
  department: string | null
  max_uses: number | null
  use_count: number
  expires_at: string | null
  is_active: boolean
  created_at: string
}

export default function InvitePage() {
  const [links, setLinks] = useState([])
  const [departments, setDepartments] = useState([])
  const [department, setDepartment] = useState('')
  const [maxUses, setMaxUses] = useState('')
  const [expiresIn, setExpiresIn] = useState('')
  const [loading, setLoading] = useState(false)
  const [copiedId, setCopiedId] = useState(null)

  const loadLinks = useCallback(async () => {
    const res = await fetch('/api/admin/invite')
    if (res.ok) {
      const data = await res.json()
      setLinks(data.links ?? [])
      setDepartments(data.departments ?? [])
    }
  }, [])

  useEffect(() => { loadLinks() }, [loadLinks])

  async function generateLink() {
    setLoading(true)
    const res = await fetch('/api/admin/invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        department: department || null,
        max_uses: maxUses ? parseInt(maxUses) : null,
        expires_in_days: expiresIn ? parseInt(expiresIn) : null,
      }),
    })
    if (res.ok) {
      setDepartment('')
      setMaxUses('')
      setExpiresIn('')
      await loadLinks()
    }
    setLoading(false)
  }

  async function deactivateLink(id: string) {
    await fetch(`/api/admin/invite/${id}`, { method: 'PATCH', body: JSON.stringify({ is_active: false }) })
    await loadLinks()
  }

  function copyLink(slug: string, id: string) {
    const url = `${window.location.origin}/assess?link=${slug}`
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const assessUrl = (slug: string) => `${window.location.origin}/assess?link=${slug}`

  return (
    
      
        Assessment Links

        {/* Generate New Link */}
        
           Generate New Link
          
            
              
                Department (optional)
                
                  
                  
                    All departments
                    {departments.map(d => {d})}
                  
                
              
              
                Max Uses (optional)
                 setMaxUses(e.target.value)}
                />
              
              
                Expires In (days, optional)
                 setExpiresIn(e.target.value)}
                />
              
            
            
              
              {loading ? 'Generating...' : 'Generate Link'}
            
          
        

        {/* Links Table */}
        
          Existing Links
          
            
              
                
                  Link
                  Department
                  Uses
                  Expires
                  Status
                  Actions
                
              
              
                {links.length === 0 ? (
                  No links yet. Generate one above.
                ) : links.map(link => (
                  
                    
                      {assessUrl(link.slug)}
                    
                    {link.department ?? All}
                    
                      {link.use_count} {link.max_uses ? `/ ${link.max_uses}` : ''}
                    
                    
                      {link.expires_at
                        ? new Date(link.expires_at).toLocaleDateString()
                        : Never}
                    
                    
                      
                        {link.is_active ? 'Active' : 'Inactive'}
                      
                    
                    
                      
                         copyLink(link.slug, link.id)}
                          title="Copy link"
                        >
                          
                        
                        {link.is_active && (
                           deactivateLink(link.id)}
                            title="Deactivate"
                          >
                            
                          
                        )}
                      
                    
                  
                ))}
              
            
          
        
      
    
  )
}
```
---
## 4. Login Page
`src/app/(auth)/login/page.tsx`
```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createBrowserClient()

  // Admin password login
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [adminError, setAdminError] = useState(null)
  const [adminLoading, setAdminLoading] = useState(false)

  // Employee magic link
  const [magicEmail, setMagicEmail]     = useState('')
  const [magicSent, setMagicSent]       = useState(false)
  const [magicError, setMagicError]     = useState(null)
  const [magicLoading, setMagicLoading] = useState(false)

  async function handleAdminLogin(e: React.FormEvent) {
    e.preventDefault()
    setAdminError(null)
    setAdminLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setAdminError(error.message)
    } else {
      router.push('/dashboard')
    }
    setAdminLoading(false)
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault()
    setMagicError(null)
    setMagicLoading(true)

    const { error } = await supabase.auth.signInWithOtp({
      email: magicEmail,
      options: { emailRedirectTo: `${window.location.origin}/results` },
    })

    if (error) {
      setMagicError(error.message)
    } else {
      setMagicSent(true)
    }
    setMagicLoading(false)
  }

  return (
    
      
        
          AI Workforce Map
          Sign in to your account
        

        
          
            Admin Login
            Employee Access
          

          {/* Admin Tab */}
          
            
              
                Admin Sign In
                For company administrators only.
              
              
                
                  {adminError && {adminError}}
                  
                    Email
                     setEmail(e.target.value)} required />
                  
                  
                    Password
                     setPassword(e.target.value)} required />
                  
                  
                    {adminLoading ? 'Signing in...' : 'Sign In'}
                  
                  
                    New admin?{' '}
                    Create account
                  
                
              
            
          

          {/* Employee Magic Link Tab */}
          
            
              
                Employee Access
                Enter your email to receive a secure sign-in link.
              
              
                {magicSent ? (
                  
                    &#9993;
                    Check your email
                    We sent a sign-in link to {magicEmail}.
                     setMagicSent(false)}>Use a different email
                  
                ) : (
                  
                    {magicError && {magicError}}
                    
                      Work Email
                       setMagicEmail(e.target.value)}
                        required
                      />
                    
                    
                      {magicLoading ? 'Sending...' : 'Send Magic Link'}
                    
                  
                )}
              
            
          
        
      
    
  )
}
```
---
## 5. API Routes
### POST /api/admin/setup — Create Company
`src/app/api/admin/setup/route.ts`
```typescript
import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const {
    company_name,
    departments,
    ai_adoption_goals,
    risk_sensitivity,
    target_functions,
    expected_employee_count,
  } = body

  if (!company_name?.trim()) {
    return NextResponse.json({ error: 'company_name is required' }, { status: 400 })
  }
  if (!departments?.length) {
    return NextResponse.json({ error: 'At least one department required' }, { status: 400 })
  }

  // Check if user already has a company
  const { data: existingLink } = await supabase
    .from('company_users').select('company_id').eq('user_id', user.id).single()
  if (existingLink?.company_id) {
    return NextResponse.json({ error: 'Company already configured' }, { status: 409 })
  }

  // Insert company
  const { data: company, error: companyError } = await supabase
    .from('companies')
    .insert({
      name: company_name.trim(),
      departments,
      ai_adoption_goals,
      risk_sensitivity,
      target_functions,
      expected_employee_count,
      created_by: user.id,
    })
    .select('id')
    .single()

  if (companyError) {
    return NextResponse.json({ error: companyError.message }, { status: 500 })
  }

  // Link user to company as admin
  const { error: userError } = await supabase
    .from('company_users')
    .insert({ user_id: user.id, company_id: company.id, role: 'admin' })

  if (userError) {
    return NextResponse.json({ error: userError.message }, { status: 500 })
  }

  return NextResponse.json({ company_id: company.id }, { status: 201 })
}
```
### POST/GET /api/admin/invite — Create + List Links
`src/app/api/admin/invite/route.ts`
```typescript
import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { nanoid } from 'nanoid'

export async function GET() {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: companyUser } = await supabase
    .from('company_users').select('company_id, companies(departments)').eq('user_id', user.id).single()
  if (!companyUser) return NextResponse.json({ error: 'No company found' }, { status: 404 })

  const { data: links } = await supabase
    .from('assessment_links')
    .select('*')
    .eq('company_id', companyUser.company_id)
    .order('created_at', { ascending: false })

  const departments = (companyUser.companies as any)?.departments ?? []

  return NextResponse.json({ links: links ?? [], departments })
}

export async function POST(req: Request) {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: companyUser } = await supabase
    .from('company_users').select('company_id, role').eq('user_id', user.id).single()
  if (!companyUser || companyUser.role !== 'admin') {
    return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
  }

  const body = await req.json()
  const { department, max_uses, expires_in_days } = body

  const slug = nanoid(10)
  const expires_at = expires_in_days
    ? new Date(Date.now() + expires_in_days * 86400_000).toISOString()
    : null

  const { data: link, error } = await supabase
    .from('assessment_links')
    .insert({
      company_id: companyUser.company_id,
      slug,
      department: department ?? null,
      max_uses: max_uses ?? null,
      expires_at,
      use_count: 0,
      is_active: true,
      created_by: user.id,
    })
    .select('*')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ link }, { status: 201 })
}
```
---
## 6. Auth Guard Components
`src/components/auth/auth-guard.tsx`
```typescript
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@/lib/supabase/client'

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
      
        
      
    )
  }
  if (!authorized) return null
  return <>{children}
}
```
Use in any client component that wraps admin pages:
```typescript
// Usage example in a page
export default function AdminPage() {
  return (
    
      
    
  )
}
```
For server-side protection, use Next.js middleware as shown in the Employer Dashboard spec.
---
## Supabase Table Schemas
**`companies`**
```sql
CREATE TABLE companies (
  id                      uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name                    text NOT NULL,
  departments             text[] NOT NULL DEFAULT '{}',
  ai_adoption_goals       text[] DEFAULT '{}',
  risk_sensitivity        text CHECK (risk_sensitivity IN ('low','medium','high')) DEFAULT 'medium',
  target_functions        text[] DEFAULT '{}',
  expected_employee_count integer,
  created_by              uuid REFERENCES auth.users(id),
  created_at              timestamptz DEFAULT now()
);
```
**`company_users`**
```sql
CREATE TABLE company_users (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id    uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
  role       text CHECK (role IN ('admin','member')) DEFAULT 'member',
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, company_id)
);
```
**`assessment_links`**
```sql
CREATE TABLE assessment_links (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id  uuid REFERENCES companies(id) ON DELETE CASCADE,
  slug        text UNIQUE NOT NULL,
  department  text,
  max_uses    integer,
  use_count   integer DEFAULT 0,
  expires_at  timestamptz,
  is_active   boolean DEFAULT true,
  created_by  uuid REFERENCES auth.users(id),
  created_at  timestamptz DEFAULT now()
);
```
**RLS Policies (add to all tables):**
```sql
-- companies: admin can read/update their own company
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin_can_manage_own_company" ON companies
  USING (
    id IN (
      SELECT company_id FROM company_users
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- company_users: users can see their own row
ALTER TABLE company_users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own_row" ON company_users USING (user_id = auth.uid());

-- assessment_links: admin can CRUD their company's links
ALTER TABLE assessment_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin_links" ON assessment_links
  USING (
    company_id IN (
      SELECT company_id FROM company_users
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );
```
---
## Dependencies
```bash
# nanoid for unique slug generation
npm install nanoid
```
---
## Flow Summary
1. Admin visits `/signup` → creates Supabase auth account
2. Redirected to `/setup` → fills company profile → POST `/api/admin/setup` creates `companies` + `company_users` rows
3. Redirected to `/invite` → generates assessment links with `nanoid` slugs
4. Admin shares link `https://app.domain.com/assess?link=` with employees
5. Employees click link → land on `/assess` → link validated and `use_count` incremented
6. After assessment, employee redirected to `/results?evaluation_id=`
7. Admin returns to `/dashboard` via email+password login
---
## Notes
- `nanoid(10)` generates a 10-character URL-safe slug. Import from `nanoid` (ESM-compatible with Next.js 15 via `"type": "module"` or `import()`).
- The `expires_in_days` parameter on link creation calculates the absolute `expires_at` timestamp server-side to avoid client clock skew.
- The `assess` page (not in this spec) must validate the link on load: check `is_active`, `expires_at`, and `use_count < max_uses` before allowing the assessment to begin.
- Magic links via `signInWithOtp` require Supabase email auth to be enabled. Set the redirect URL in Supabase Auth settings under "URL Configuration".
- The `AuthGuard` client component is for pages that cannot use server-side session checks. Prefer middleware for route-level protection.