'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Users, TrendingUp, Star, AlertTriangle } from 'lucide-react'

interface Props {
  total: number
  avgScore: number
  highLeverage: number
  riskFlags: number
}

const KPI_CONFIG = [
  { key: 'total',       label: 'Employees Assessed',  icon: Users,         color: 'text-blue-600',   bg: 'bg-blue-50' },
  { key: 'avgScore',    label: 'Avg Readiness Score', icon: TrendingUp,    color: 'text-green-600',  bg: 'bg-green-50' },
  { key: 'highLeverage',label: 'High-Leverage',       icon: Star,          color: 'text-purple-600', bg: 'bg-purple-50' },
  { key: 'riskFlags',   label: 'High Risk Flags',     icon: AlertTriangle, color: 'text-red-600',    bg: 'bg-red-50' },
]

export function OverviewKPIs({ total, avgScore, highLeverage, riskFlags }: Props) {
  const values = { total, avgScore, highLeverage, riskFlags }
  return (
    <div className="grid grid-cols-4 gap-4">
      {KPI_CONFIG.map(({ key, label, icon: Icon, color, bg }) => (
        <Card key={key}>
          <CardContent className="pt-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{(values as any)[key]}</p>
              </div>
              <div className={`p-3 rounded-xl ${bg}`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
