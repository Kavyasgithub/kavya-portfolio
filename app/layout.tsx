// /app/layout.tsx

import type { Metadata } from 'next' // 1. Import the Metadata type
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar' // Assuming you have these
import Footer from '@/components/Footer' // components

const inter = Inter({ subsets: ['latin'] })

// 2. Define and export the static metadata object
// This metadata will be the default for all pages in your application.
export const metadata: Metadata = {
  // The `title` object allows for a dynamic template.
  // The `template` property will be used on child pages, replacing `%s`
  // with the specific title of the page.
  // The `default` property is the title for the root layout (e.g., your homepage).
  title: {
    template: '%s | Kavya Sharma', // Example: "My First Project | Kavya Sharma"
    default: 'Kavya Sharma - Full-Stack Developer & Creator', // Title for the homepage
  },
  // The `description` is the default meta description for your site.
  // It's a crucial piece for SEO, as it's often shown in search results.
  description:
    'Welcome to the portfolio of Kavya Sharma, a passionate full-stack developer specializing in creating modern, high-performance web applications with Next.js, React, and Sanity.io.',
  // You can add more default metadata here, such as keywords or open graph defaults
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
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}