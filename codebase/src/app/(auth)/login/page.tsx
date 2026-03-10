'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient as createBrowserClient } from '@/lib/supabase/client'
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
  const [adminError, setAdminError] = useState<string | null>(null)
  const [adminLoading, setAdminLoading] = useState(false)

  // Employee magic link
  const [magicEmail, setMagicEmail]     = useState('')
  const [magicSent, setMagicSent]       = useState(false)
  const [magicError, setMagicError]     = useState<string | null>(null)
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">AI Workforce Map</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to your account</p>
        </div>

        <Tabs defaultValue="admin">
          <TabsList className="w-full">
            <TabsTrigger value="admin" className="flex-1">Admin Login</TabsTrigger>
            <TabsTrigger value="employee" className="flex-1">Employee Access</TabsTrigger>
          </TabsList>

          {/* Admin Tab */}
          <TabsContent value="admin">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Admin Sign In</CardTitle>
                <CardDescription>For company administrators only.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  {adminError && <Alert variant="destructive"><AlertDescription>{adminError}</AlertDescription></Alert>}
                  <div className="space-y-1.5">
                    <Label htmlFor="admin-email">Email</Label>
                    <Input id="admin-email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="admin-password">Password</Label>
                    <Input id="admin-password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                  </div>
                  <Button type="submit" className="w-full" disabled={adminLoading}>
                    {adminLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                  <p className="text-center text-sm text-gray-500">
                    New admin?{' '}
                    <Link href="/signup" className="text-blue-600 hover:underline">Create account</Link>
                  </p>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Employee Magic Link Tab */}
          <TabsContent value="employee">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Employee Access</CardTitle>
                <CardDescription>Enter your email to receive a secure sign-in link.</CardDescription>
              </CardHeader>
              <CardContent>
                {magicSent ? (
                  <div className="text-center py-6 space-y-2">
                    <p className="text-2xl">&#9993;</p>
                    <p className="font-medium text-gray-800">Check your email</p>
                    <p className="text-sm text-gray-500">We sent a sign-in link to <strong>{magicEmail}</strong>.</p>
                    <Button variant="ghost" size="sm" onClick={() => setMagicSent(false)}>Use a different email</Button>
                  </div>
                ) : (
                  <form onSubmit={handleMagicLink} className="space-y-4">
                    {magicError && <Alert variant="destructive"><AlertDescription>{magicError}</AlertDescription></Alert>}
                    <div className="space-y-1.5">
                      <Label htmlFor="magic-email">Work Email</Label>
                      <Input
                        id="magic-email"
                        type="email"
                        placeholder="you@company.com"
                        value={magicEmail}
                        onChange={e => setMagicEmail(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={magicLoading}>
                      {magicLoading ? 'Sending...' : 'Send Magic Link'}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
