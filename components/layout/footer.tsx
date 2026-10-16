import React from 'react'
import { Code2, Github, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'
import { profile, socials } from '@/lib/data'

const socialIcons = { github: Github, linkedin: Linkedin, email: Mail }

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-card/30 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Code2 className="h-4 w-4 text-primary" />
            <span className="font-mono">&copy; {new Date().getFullYear()} {profile.name}</span>
          </div>

          <nav aria-label="Footer" className="flex items-center gap-6">
            {[
              { label: 'Home', href: '/' },
              { label: 'Projects', href: '/projects' },
              { label: 'About', href: '/about' },
              { label: 'Contact', href: '/#contact' },
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

          <div className="flex items-center gap-4">
            {socials.map((social) => {
              const Icon = socialIcons[social.platform]
              return (
                <a
                  key={social.platform}
                  href={social.url}
                  aria-label={social.label}
                  className="text-muted-foreground transition-colors hover:text-primary"
                  {...(social.platform !== 'email' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <Icon className="h-4 w-4" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
