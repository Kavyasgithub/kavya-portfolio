import React from 'react'
import { Code2, Heart } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-card/30 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Left - branding */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Code2 className="h-4 w-4 text-primary" />
            <span className="font-mono">&copy; {new Date().getFullYear()} Kavya Sharma</span>
          </div>

          {/* Center - nav links */}
          <nav className="flex items-center gap-6">
            {[
              { label: 'Home', href: '/' },
              { label: 'Projects', href: '/projects' },
              { label: 'Blog', href: '/blog' },
              { label: 'About', href: '/about' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right - built with */}
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            Built with {' '}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-foreground hover:text-primary transition-colors"
            >
              Next.js
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
