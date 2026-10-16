'use client'

import { useState } from 'react'
import { Github, Linkedin, Mail, Send, ArrowUpRight, CheckCircle2, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { profile, socials } from '@/lib/data'

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
}

const inputClass =
  'w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20'

export function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', company: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMessage('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setStatus('sent')
        setFormData({ name: '', email: '', message: '', company: '' })
        return
      }
      const data = await res.json().catch(() => null)
      setErrorMessage(data?.error || `Something went wrong. Please email ${profile.email} directly.`)
      setStatus('error')
    } catch {
      setErrorMessage(`Network error. Please email ${profile.email} directly.`)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="w-full scroll-mt-20 py-20">
      <div className="mb-12 text-center">
        <h2 className="mb-4 font-mono text-3xl font-bold">
          <span className="text-primary">{'<'}</span>
          Contact
          <span className="text-primary">{' />'}</span>
        </h2>
        <p className="text-muted-foreground">
          Open to full-time roles, freelance projects and collaborations. I usually reply within a day.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-2">
          <h3 className="mb-4 text-lg font-semibold">Find me on</h3>
          {socials.map((social) => {
            const Icon = socialIcons[social.platform]
            const external = social.platform !== 'email'
            return (
              <a
                key={social.platform}
                href={social.url}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group block"
              >
                <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-x-1 hover:border-primary/40 hover:shadow-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-background">
                    <Icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{social.label}</p>
                    <p className="truncate font-mono text-xs text-muted-foreground">{social.handle}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </div>
              </a>
            )
          })}
          <p className="flex items-center gap-2 pt-2 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            {profile.location}
          </p>
        </div>

        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-6 sm:p-8">
            <h3 className="mb-6 text-lg font-semibold">Send a message</h3>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    maxLength={100}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    maxLength={200}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className={inputClass}
                  />
                </div>
              </div>
              {/* Honeypot for bots; hidden from people and assistive tech */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Tell me about the role or project"
                  rows={5}
                  maxLength={5000}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className={`${inputClass} resize-none`}
                />
              </div>
              <Button type="submit" className="w-full gap-2 py-3" disabled={status === 'sending'} size="lg">
                {status === 'sending' ? (
                  'Sending...'
                ) : (
                  <>
                    Send Message
                    <Send className="h-4 w-4" />
                  </>
                )}
              </Button>
              <div aria-live="polite">
                {status === 'sent' && (
                  <p className="flex items-center justify-center gap-2 text-sm text-green-500">
                    <CheckCircle2 className="h-4 w-4" />
                    Thanks, your message has been sent. I&apos;ll get back to you soon.
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-center text-sm text-destructive">{errorMessage}</p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
