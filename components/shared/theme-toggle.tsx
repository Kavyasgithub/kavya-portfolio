'use client'

import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

// The initial theme is applied before paint by the inline script in app/layout.tsx,
// so the <html> class is the source of truth and the icon is switched purely with CSS.
export function ThemeToggle() {
  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark')
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light')
    } catch {}
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="w-9 px-0 hover:bg-accent"
      aria-label="Toggle theme"
    >
      <Moon className="h-4 w-4 transition-all dark:hidden" />
      <Sun className="hidden h-4 w-4 transition-all dark:block" />
    </Button>
  )
}
