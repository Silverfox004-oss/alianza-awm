import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Workforce Map',
  description: 'AI readiness assessment platform by Alianza Connects',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
