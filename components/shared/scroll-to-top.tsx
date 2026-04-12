'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-50 h-10 w-10 rounded-full p-0 shadow-lg border-primary/30 bg-background/90 backdrop-blur-sm transition-all duration-300 hover:border-primary hover:shadow-primary/20 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ArrowUp className="h-4 w-4" />
    </Button>
  )
}
