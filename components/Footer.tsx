// /components/Footer.tsx

import React from 'react'
// 1. Import the Button component
import { Button } from '@/components/ui/button'
import { Code2, Heart } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-card/50">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="font-mono text-sm text-muted-foreground">
            <span className="text-primary">$</span> © {new Date().getFullYear()} portfolio.dev
          </p>
          <p className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
            <span>Built with</span>
            <Button asChild variant="link" className="h-auto p-0 font-mono text-primary">
              <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
                Consistency.js
              </a>
            </Button>
          </p>
        </div>
        <div className="mt-4 text-center">
          <p className="font-mono text-xs text-muted-foreground">
            <Code2 className="inline h-3 w-3" /> Powered by caffeine and clean code
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer