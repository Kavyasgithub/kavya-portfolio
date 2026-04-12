import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
import { ScrollProgress } from '@/components/shared/scroll-progress'
import { ScrollToTop } from '@/components/shared/scroll-to-top'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Kavya Sharma',
    default: 'Kavya Sharma - Full-Stack Developer & Creator',
  },
  description:
    'Welcome to the portfolio of Kavya Sharma, a passionate full-stack developer specializing in creating modern, high-performance web applications with Next.js, React, and MongoDB.',
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
