'use client'

import { useEffect, useRef, useState } from 'react'

interface AnimateOnScrollProps {
  children: React.ReactNode
  className?: string
  animation?: 'fade-up' | 'fade-in' | 'fade-left' | 'fade-right' | 'scale-up'
  delay?: number
  threshold?: number
  once?: boolean
}

const animationClasses: Record<string, { hidden: string; visible: string }> = {
  'fade-up': {
    hidden: 'opacity-0 translate-y-8',
    visible: 'opacity-100 translate-y-0',
  },
  'fade-in': {
    hidden: 'opacity-0',
    visible: 'opacity-100',
  },
  'fade-left': {
    hidden: 'opacity-0 -translate-x-8',
    visible: 'opacity-100 translate-x-0',
  },
  'fade-right': {
    hidden: 'opacity-0 translate-x-8',
    visible: 'opacity-100 translate-x-0',
  },
  'scale-up': {
    hidden: 'opacity-0 scale-95',
    visible: 'opacity-100 scale-100',
  },
}

export function AnimateOnScroll({
  children,
  className = '',
  animation = 'fade-up',
  delay = 0,
  threshold = 0.1,
  once = true,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.unobserve(el)
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, once])

  const anim = animationClasses[animation]

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${isVisible ? anim.visible : anim.hidden} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
