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
  const [departments, setDepartments] = useState<string[]>([''])
  const [goals, setGoals] = useState<string[]>([])
  const [riskSensitivity, setRiskSensitivity] = useState<'low' | 'medium' | 'high'>('medium')
  const [targetFunctions, setTargetFunctions] = useState<string[]>([])
  const [expectedCount, setExpectedCount] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Set Up Your Company</h1>
          <p className="text-gray-500 mt-2">This takes about 3 minutes. You can update these settings later.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}

          {/* Company Name */}
          <Card>
            <CardHeader><CardTitle className="text-base">Company Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="company">Company Name *</Label>
                <Input
                  id="company"
                  placeholder="Acme Corp"
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="count">Expected Employee Count</Label>
                <Input
                  id="count"
                  type="number"
                  min="1"
                  placeholder="e.g. 150"
                  value={expectedCount}
                  onChange={e => setExpectedCount(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Departments */}
          <Card>
            <CardHeader><CardTitle className="text-base">Departments *</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {departments.map((dept, i) => (
                <div key={i} className="flex gap-2">
                  <Input
                    placeholder={`Department ${i + 1}`}
                    value={dept}
                    onChange={e => updateDepartment(i, e.target.value)}
                  />
                  {departments.length > 1 && (
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeDepartment(i)}>
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addDepartment}>
                <Plus className="w-4 h-4 mr-1" /> Add Department
              </Button>
            </CardContent>
          </Card>

          {/* AI Adoption Goals */}
          <Card>
            <CardHeader><CardTitle className="text-base">AI Adoption Goals</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {AI_ADOPTION_GOALS.map(goal => (
                  <div key={goal.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={goal.id}
                      checked={goals.includes(goal.id)}
                      onCheckedChange={() => toggleGoal(goal.id)}
                    />
                    <Label htmlFor={goal.id} className="text-sm font-normal cursor-pointer">{goal.label}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Risk Sensitivity */}
          <Card>
            <CardHeader><CardTitle className="text-base">Risk Sensitivity</CardTitle></CardHeader>
            <CardContent>
              <RadioGroup
                value={riskSensitivity}
                onValueChange={(v: 'low' | 'medium' | 'high') => setRiskSensitivity(v)}
                className="flex gap-6"
              >
                {(['low', 'medium', 'high'] as const).map(level => (
                  <div key={level} className="flex items-center space-x-2">
                    <RadioGroupItem value={level} id={`risk-${level}`} />
                    <Label htmlFor={`risk-${level}`} className="capitalize cursor-pointer">{level}</Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Target Functions */}
          <Card>
            <CardHeader><CardTitle className="text-base">Target Functions</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {TARGET_FUNCTIONS.map(fn => (
                  <button
                    key={fn}
                    type="button"
                    onClick={() => toggleFunction(fn)}
                    className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                      targetFunctions.includes(fn)
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    {fn}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? 'Saving...' : 'Save and Continue →'}
          </Button>
        </form>
      </div>
    </div>
  )
}
