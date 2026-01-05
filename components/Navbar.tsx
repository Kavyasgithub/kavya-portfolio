// /components/Navbar.tsx

import Link from 'next/link'
import React from 'react'
// 1. Import the Button component from your UI library
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Terminal, Download } from 'lucide-react'

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav aria-label="Primary" className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-mono text-base font-semibold tracking-tight transition-colors hover:text-primary"
          >
            <Terminal className="h-5 w-5 text-primary" />
            <span className="hidden sm:inline">~/portfolio</span>
          </Link>

          <div className="flex items-center gap-1">
            <ul className="flex items-center gap-1">
              <li>
                <Button asChild variant="ghost" size="sm" className="font-mono text-muted-foreground hover:text-foreground">
                  <Link href="/">home</Link>
                </Button>
              </li>
              <li>
                <Button asChild variant="ghost" size="sm" className="font-mono text-muted-foreground hover:text-foreground">
                  <Link href="/about">about</Link>
                </Button>
              </li>
              <li>
                <Button asChild variant="ghost" size="sm" className="font-mono text-muted-foreground hover:text-foreground">
                  <Link href="/projects">projects</Link>
                </Button>
              </li>
              <li>
                <Button asChild variant="ghost" size="sm" className="font-mono text-muted-foreground hover:text-foreground">
                  <Link href="/blog">blog</Link>
                </Button>
              </li>
            </ul>
            <div className="ml-2 flex items-center gap-2">
              <div className="border-l border-border pl-2">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar