'use client'

import { Github, Linkedin, Mail, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface ContactSectionProps {
  socialLinks?: Array<{ platform: string; url: string }>
}

export function ContactSection({ socialLinks = [] }: ContactSectionProps) {
  const defaultSocials = [
    { platform: 'github', url: 'https://github.com', icon: <Github className="h-5 w-5" /> },
    { platform: 'linkedin', url: 'https://linkedin.com', icon: <Linkedin className="h-5 w-5" /> },
    { platform: 'twitter', url: 'https://twitter.com', icon: <Twitter className="h-5 w-5" /> },
    { platform: 'email', url: 'mailto:hello@example.com', icon: <Mail className="h-5 w-5" /> },
  ]

  return (
    <section className="w-full py-20">
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-dot dot-red" />
          <div className="terminal-dot dot-yellow" />
          <div className="terminal-dot dot-green" />
          <span className="ml-2 text-xs text-muted-foreground">contact.sh</span>
        </div>

        <div className="p-6 md:p-8">
          <div className="mb-8">
            <p className="mb-2 font-mono text-sm text-muted-foreground">
              <span className="text-primary">$</span> ./contact.sh
            </p>
            <h2 className="text-3xl font-bold">Let&apos;s Connect</h2>
            <p className="mt-2 text-muted-foreground">
              Feel free to reach out for collaborations or just a friendly chat
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {defaultSocials.map((social, index) => (
              <Link
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div
                  className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:scale-105 hover:border-primary hover:shadow-lg hover:shadow-primary/20"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="mb-3 text-muted-foreground transition-all duration-300 group-hover:text-primary">
                    {social.icon}
                  </div>
                  <p className="text-sm font-medium capitalize">{social.platform}</p>
                  
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 -z-10 rounded-lg bg-primary/0 blur-xl transition-all duration-300 group-hover:bg-primary/20" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 rounded-lg border border-border bg-muted/50 p-6">
            <p className="mb-4 font-mono text-sm text-muted-foreground">
              <span className="text-primary">// Quick message</span>
            </p>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-md border border-border bg-background px-4 py-2 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <input
                type="email"
                placeholder="your.email@example.com"
                className="w-full rounded-md border border-border bg-background px-4 py-2 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <textarea
                placeholder="Your message..."
                rows={4}
                className="w-full rounded-md border border-border bg-background px-4 py-2 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <Button className="w-full">
                Send Message
              </Button>
            </div>
          </div>

          <p className="mt-6 text-center font-mono text-xs text-muted-foreground">
            <span className="text-primary">$</span> echo &quot;Thanks for visiting!&quot;
          </p>
        </div>
      </div>
    </section>
  )
}
