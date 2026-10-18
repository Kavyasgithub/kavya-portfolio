import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
import { ScrollProgress } from '@/components/shared/scroll-progress'
import { ScrollToTop } from '@/components/shared/scroll-to-top'

const inter = Inter({ subsets: ['latin'] })

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s | Kavya Sharma',
    default: 'Kavya Sharma | Full Stack Developer',
  },
  description:
    'Kavya Sharma is a full stack developer building production web applications with React, Next.js, Node.js, Express.js and PostgreSQL. Projects include LedgerX, a double-entry financial ledger, and RGC System, a health membership platform.',
  openGraph: {
    title: 'Kavya Sharma | Full Stack Developer',
    description:
      'Full stack developer building production web applications with React, Node.js and PostgreSQL.',
    siteName: 'Kavya Sharma | Portfolio',
    images: [{ url: '/projects/ledgerx.png', width: 1600, height: 900, alt: 'LedgerX by Kavya Sharma' }],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 'dark';
                document.documentElement.classList.toggle('dark', theme === 'dark');
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}
      >
        <ScrollProgress />
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <ScrollToTop />
      </body>
    </html>
  )
}
