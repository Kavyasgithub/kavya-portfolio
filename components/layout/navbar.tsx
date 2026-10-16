'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/shared/theme-toggle'
import { Terminal, Menu, X, Download } from 'lucide-react'
import { profile } from '@/lib/data'

const navLinks = [
  { href: '/', label: 'home' },
  { href: '/about', label: 'about' },
  { href: '/projects', label: 'projects' },
  { href: '/#contact', label: 'contact' },
]

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const [lastPathname, setLastPathname] = useState(pathname)

  // Close mobile menu on route change (incl. back/forward); link clicks close it directly
  if (pathname !== lastPathname) {
    setLastPathname(pathname)
    setMobileOpen(false)
  }

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav aria-label="Primary" className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-mono text-base font-semibold tracking-tight transition-colors hover:text-primary"
          >
            <Terminal className="h-5 w-5 text-primary" />
            <span className="hidden sm:inline">~/kavya-sharma</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className={`font-mono transition-colors ${
                      pathname === link.href
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </Button>
                </li>
              ))}
            </ul>
            <div className="ml-2 flex items-center gap-2">
              <Button asChild variant="outline" size="sm" className="gap-1.5 font-mono">
                <a href={profile.resumeUrl} download={profile.resumeFileName}>
                  <Download className="h-3.5 w-3.5" />
                  cv
                </a>
              </Button>
              <div className="border-l border-border pl-2">
                <ThemeToggle />
              </div>
            </div>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              className="w-9 px-0"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 top-16 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Menu panel */}
          <div className="relative bg-background border-b border-border shadow-xl animate-slide-up">
            <nav className="mx-auto max-w-7xl px-6 py-6">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 rounded-lg px-4 py-3 font-mono text-base transition-colors ${
                        pathname === link.href
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      <span className="text-primary">$</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-4 border-t border-border pt-4">
                <a
                  href={profile.resumeUrl}
                  download={profile.resumeFileName}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 font-mono text-base text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <span className="text-primary">$</span>
                  download cv
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
