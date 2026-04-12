'use client'

import { useState } from 'react'
import { Github, Linkedin, Mail, Twitter, Send, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface ContactSectionProps {
  socialLinks?: Array<{ platform: string; url: string }>
}

const defaultSocials = [
  { platform: 'github', url: 'https://github.com', icon: Github, label: 'GitHub', color: 'hover:border-gray-400 hover:bg-gray-500/10' },
  { platform: 'linkedin', url: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn', color: 'hover:border-blue-400 hover:bg-blue-500/10' },
  { platform: 'twitter', url: 'https://twitter.com', icon: Twitter, label: 'Twitter', color: 'hover:border-sky-400 hover:bg-sky-500/10' },
  { platform: 'email', url: 'mailto:hello@example.com', icon: Mail, label: 'Email', color: 'hover:border-red-400 hover:bg-red-500/10' },
]

export function ContactSection({ socialLinks = [] }: ContactSectionProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setStatus('sent')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="w-full py-20">
      <div className="mb-12 text-center">
        <h2 className="mb-4 font-mono text-3xl font-bold">
          <span className="text-primary">{'<'}</span>
          Contact
          <span className="text-primary">{' />'}</span>
        </h2>
        <p className="text-muted-foreground">
          Feel free to reach out for collaborations or just a friendly chat
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Social links - left side */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-semibold mb-4">Find me on</h3>
          {defaultSocials.map((social) => (
            <Link
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div
                className={`flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-x-1 hover:shadow-md ${social.color}`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-background">
                  <social.icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold capitalize">{social.label}</p>
                  <p className="text-xs text-muted-foreground">{social.platform === 'email' ? 'Send a message' : `@${social.platform}`}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </div>

        {/* Contact form - right side */}
        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-6 sm:p-8">
            <h3 className="text-lg font-semibold mb-6">Send a message</h3>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="What would you like to talk about?"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <Button
                type="submit"
                className="w-full gap-2 py-3"
                disabled={status === 'sending'}
                size="lg"
              >
                {status === 'sending' ? (
                  'Sending...'
                ) : status === 'sent' ? (
                  'Message Sent!'
                ) : (
                  <>
                    Send Message
                    <Send className="h-4 w-4" />
                  </>
                )}
              </Button>
              {status === 'error' && (
                <p className="text-center text-sm text-destructive">Failed to send. Please try again.</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
