'use client'

import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Document, Page, Text, View, StyleSheet, PDFDownloadLink,
} from '@react-pdf/renderer'
import type { Assessment, RoleFitResult } from '@/types'

const styles = StyleSheet.create({
  page:         { padding: 40, fontFamily: 'Helvetica', backgroundColor: '#fff' },
  title:        { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  section:      { marginBottom: 20 },
  heading:      { fontSize: 14, fontWeight: 'bold', marginBottom: 6, color: '#1e3a5f' },
  row:          { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  label:        { fontSize: 10, color: '#6b7280' },
  value:        { fontSize: 10, color: '#111827', fontWeight: 'bold' },
  badge:        { fontSize: 10, padding: '2 6', borderRadius: 4, backgroundColor: '#dbeafe', color: '#1e40af' },
  domainRow:    { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  bar:          { height: 6, backgroundColor: '#3b82f6', borderRadius: 3, marginLeft: 8 },
  barBg:        { width: 80, height: 6, backgroundColor: '#e5e7eb', borderRadius: 3 },
  flag:         { padding: '4 8', marginBottom: 4, borderRadius: 4, backgroundColor: '#fef9c3', fontSize: 9 },
  footer:       { position: 'absolute', bottom: 20, left: 40, right: 40, fontSize: 8, color: '#9ca3af', textAlign: 'center' },
})

const ROLE_LABELS: Record<string, string> = {
  ai_operator: 'AI Operator',
  ai_approver: 'AI Approver',
  workflow_translator: 'Workflow Translator',
  ai_qa_reviewer: 'AI QA Reviewer',
  change_champion: 'Change Champion',
}

function ResultsDocument({
  assessment,
  roleFitResults,
  domainScores,
}: {
  assessment: Assessment
  roleFitResults: RoleFitResult[]
  domainScores: Array<{ domain: string; score: number }>
}) {
  const riskFlags: Array<{ flag: string; severity: string }> = (assessment.risk_flags as any) ?? []
  const track = assessment.training_track as string

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>AI Readiness Assessment Report</Text>
        <Text style={{ fontSize: 10, color: '#6b7280', marginBottom: 24 }}>
          Generated {new Date().toLocaleDateString()}
        </Text>

        {/* Readiness Overview */}
        <View style={styles.section}>
          <Text style={styles.heading}>Readiness Overview</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Readiness Band</Text>
            <Text style={styles.badge}>{assessment.readiness_band?.replace('_', ' ').toUpperCase()}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Overall Score</Text>
            <Text style={styles.value}>{assessment.overall_score} / 100</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Training Track</Text>
            <Text style={styles.value}>Track {track}</Text>
          </View>
        </View>

        {/* Role Fit */}
        <View style={styles.section}>
          <Text style={styles.heading}>Top Role Fits</Text>
          {roleFitResults.slice(0, 3).map((r, i) => (
            <View key={r.role_key} style={styles.row}>
              <Text style={styles.label}>#{i + 1} {ROLE_LABELS[r.role_key] ?? r.role_key}</Text>
              <Text style={styles.value}>{r.fit_score}</Text>
            </View>
          ))}
        </View>

        {/* Domain Scores */}
        <View style={styles.section}>
          <Text style={styles.heading}>Domain Scores</Text>
          {domainScores.map((d) => (
            <View key={d.domain} style={styles.domainRow}>
              <Text style={{ fontSize: 9, width: 120, color: '#374151' }}>{d.domain}</Text>
              <View style={styles.barBg}>
                <View style={[styles.bar, { width: (d.score / 100) * 80 }]} />
              </View>
              <Text style={{ fontSize: 9, marginLeft: 6, color: '#374151' }}>{d.score}</Text>
            </View>
          ))}
        </View>

        {/* Risk Flags */}
        {riskFlags.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>Risk Flags</Text>
            {riskFlags.map((f, i) => (
              <View key={i} style={styles.flag}>
                <Text>{f.flag} ({f.severity} severity)</Text>
              </View>
            ))}
          </View>
        )}

        <Text style={styles.footer}>Confidential — AI Workforce Map Assessment</Text>
      </Page>
    </Document>
  )
}

export function ResultsPDFDownload({
  assessment,
  roleFitResults,
  domainScores,
}: {
  assessment: Assessment
  roleFitResults: RoleFitResult[]
  domainScores: Array<{ domain: string; score: number }>
}) {
  return (
    <PDFDownloadLink
      document={<ResultsDocument assessment={assessment} roleFitResults={roleFitResults} domainScores={domainScores} />}
      fileName={`ai-readiness-results-${assessment.id}.pdf`}
    >
      {({ loading }) => (
        <Button variant="outline" disabled={loading}>
          <Download className="w-4 h-4 mr-2" />
          {loading ? 'Preparing PDF...' : 'Download Report'}
        </Button>
      )}
    </PDFDownloadLink>
  )
}
