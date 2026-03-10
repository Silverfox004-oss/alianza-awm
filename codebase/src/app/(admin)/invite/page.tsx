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
  const [links, setLinks] = useState<AssessmentLink[]>([])
  const [departments, setDepartments] = useState<string[]>([])
  const [department, setDepartment] = useState<string>('')
  const [maxUses, setMaxUses] = useState('')
  const [expiresIn, setExpiresIn] = useState('')
  const [loading, setLoading] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

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
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <h1 className="text-2xl font-bold text-gray-900">Assessment Links</h1>

        {/* Generate New Link */}
        <Card>
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><Link className="w-4 h-4" /> Generate New Link</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="space-y-1.5">
                <Label>Department (optional)</Label>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger><SelectValue placeholder="All departments" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All departments</SelectItem>
                    {departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Max Uses (optional)</Label>
                <Input
                  type="number"
                  min="1"
                  placeholder="Unlimited"
                  value={maxUses}
                  onChange={e => setMaxUses(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Expires In (days, optional)</Label>
                <Input
                  type="number"
                  min="1"
                  placeholder="Never"
                  value={expiresIn}
                  onChange={e => setExpiresIn(e.target.value)}
                />
              </div>
            </div>
            <Button onClick={generateLink} disabled={loading}>
              <Plus className="w-4 h-4 mr-2" />
              {loading ? 'Generating...' : 'Generate Link'}
            </Button>
          </CardContent>
        </Card>

        {/* Links Table */}
        <Card>
          <CardHeader><CardTitle className="text-base">Existing Links</CardTitle></CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Link</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Uses</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {links.length === 0 ? (
                  <TableRow><TableCell colSpan={6} className="text-center text-gray-400 py-8">No links yet. Generate one above.</TableCell></TableRow>
                ) : links.map(link => (
                  <TableRow key={link.id}>
                    <TableCell className="font-mono text-xs text-blue-600 max-w-[200px] truncate">
                      {assessUrl(link.slug)}
                    </TableCell>
                    <TableCell>{link.department ?? <span className="text-gray-400">All</span>}</TableCell>
                    <TableCell>
                      {link.use_count} {link.max_uses ? `/ ${link.max_uses}` : ''}
                    </TableCell>
                    <TableCell className="text-sm">
                      {link.expires_at
                        ? new Date(link.expires_at).toLocaleDateString()
                        : <span className="text-gray-400">Never</span>}
                    </TableCell>
                    <TableCell>
                      <Badge className={link.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}>
                        {link.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost" size="icon"
                          onClick={() => copyLink(link.slug, link.id)}
                          title="Copy link"
                        >
                          <Copy className={`w-4 h-4 ${copiedId === link.id ? 'text-green-500' : ''}`} />
                        </Button>
                        {link.is_active && (
                          <Button
                            variant="ghost" size="icon"
                            onClick={() => deactivateLink(link.id)}
                            title="Deactivate"
                          >
                            <Power className="w-4 h-4 text-red-500" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
