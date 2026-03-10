'use client'

import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-brand-600 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-xl font-semibold text-gray-900 tracking-tight">AI Workforce Map</span>
          </div>
          <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link href="/login" className="hover:text-gray-900 transition-colors">Sign In</Link>
            <Link href="/signup" className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors">Get Started</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="mx-auto max-w-6xl px-6">
        <section className="py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-sm font-medium mb-6 border border-brand-100">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            AI Readiness Assessment Platform
          </div>
          <h1 className="text-5xl font-bold text-gray-900 tracking-tight leading-tight max-w-3xl mx-auto">
            Measure your team&apos;s readiness for the AI-powered workplace
          </h1>
          <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Scenario-based assessments scored by multi-LLM grading. Map every employee to their ideal AI role with actionable insights for training and deployment.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link href="/signup" className="px-6 py-3 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition-colors shadow-sm">
              Start Free Assessment
            </Link>
            <Link href="/login" className="px-6 py-3 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors border border-gray-200">
              Employer Dashboard
            </Link>
          </div>
        </section>

        {/* Features Grid */}
        <section className="pb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: '24 Scenarios',
                desc: 'Real-world AI workplace situations across 12 archetypes with industry-specific variants.',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                ),
              },
              {
                title: '7-Domain Grading',
                desc: 'Dual-LLM pipeline with primary + skeptic graders across task framing, risk judgment, and more.',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                ),
              },
              {
                title: '5 AI Roles',
                desc: 'Map employees to Operator, Approver, Workflow Translator, QA Reviewer, or Change Champion.',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                ),
              },
            ].map((f, i) => (
              <div key={i} className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-10 w-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="pb-24">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Generate Link', desc: 'Admin creates a unique assessment URL for the team' },
              { step: '2', title: 'Employee Intake', desc: 'Employee fills out background info — no account needed' },
              { step: '3', title: 'Scenario Assessment', desc: 'AI-probed responses across real workplace situations' },
              { step: '4', title: 'Results & Mapping', desc: 'Readiness band, role fit, risk flags, and training plan' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="h-12 w-12 rounded-full bg-brand-600 text-white flex items-center justify-center text-lg font-bold mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Readiness Bands */}
        <section className="pb-24">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">Readiness Bands</h2>
          <div className="flex flex-col md:flex-row gap-3 max-w-4xl mx-auto">
            {[
              { band: 'Not Ready', range: '0–34', color: 'bg-red-500' },
              { band: 'Emerging', range: '35–54', color: 'bg-orange-500' },
              { band: 'Capable', range: '55–69', color: 'bg-yellow-500' },
              { band: 'Strong', range: '70–84', color: 'bg-green-500' },
              { band: 'High Leverage', range: '85–100', color: 'bg-brand-600' },
            ].map((b, i) => (
              <div key={i} className="flex-1 p-4 bg-white rounded-lg border border-gray-100 shadow-sm text-center">
                <div className={`h-2 w-full rounded-full ${b.color} mb-3`} />
                <div className="font-semibold text-gray-900 text-sm">{b.band}</div>
                <div className="text-xs text-gray-400 mt-1">{b.range}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-8">
        <div className="mx-auto max-w-6xl px-6 flex items-center justify-between text-sm text-gray-400">
          <span>&copy; 2026 Alianza Connects. All rights reserved.</span>
          <span>AI Workforce Map v0.1.0</span>
        </div>
      </footer>
    </div>
  )
}
