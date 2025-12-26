import type { Metadata, Viewport } from 'next'
import { Inter, Fira_Code } from 'next/font/google'
import './globals.css'
import MainLayoutClient from './components/ui/MainLayoutClient'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-fira-code',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'MeowFi - Backend & Solana Dev :: Eclectic Mix v3',
  description: 'Backend developer focused on Rust, Solana, and building scalable systems.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0f18',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${firaCode.variable}`}>
      <body className="bg-slate-950 text-slate-300 selection:bg-blue-500 selection:text-white">
        <MainLayoutClient>
          {children}
        </MainLayoutClient>
      </body>
    </html>
  )
}
