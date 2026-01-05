'use client'

import { useEffect, useState } from 'react'

interface AnimatedCodeTextProps {
  texts: string[]
  className?: string
}

export function AnimatedCodeText({ texts, className = '' }: AnimatedCodeTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentFullText = texts[currentTextIndex]
    const typingSpeed = isDeleting ? 50 : 100
    const pauseDuration = 2000

    const timeout = setTimeout(() => {
      if (!isDeleting && displayedText === currentFullText) {
        // Pause before deleting
        setTimeout(() => setIsDeleting(true), pauseDuration)
      } else if (isDeleting && displayedText === '') {
        // Move to next text
        setIsDeleting(false)
        setCurrentTextIndex((prev) => (prev + 1) % texts.length)
      } else {
        // Type or delete character
        setDisplayedText(
          isDeleting
            ? currentFullText.substring(0, displayedText.length - 1)
            : currentFullText.substring(0, displayedText.length + 1)
        )
      }
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [displayedText, isDeleting, currentTextIndex, texts])

  return (
    <span className={`inline-block ${className}`}>
      {displayedText}
      <span className="animate-pulse text-primary">|</span>
    </span>
  )
}
