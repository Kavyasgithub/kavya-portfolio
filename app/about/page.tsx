import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { profile, experience, education, certifications, achievements, skillGroups } from '@/lib/data'
import { AnimateOnScroll } from '@/components/shared/animate-on-scroll'
import { Button } from '@/components/ui/button'
import { Download, MapPin, Briefcase, GraduationCap, Award, Trophy, Mail, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About',
  description: `${profile.name}: ${profile.role}. Experience, education, certifications and the stack I work with.`,
}

const currentRoles = experience.filter((e) => e.current)

function SectionHeading({ icon: Icon, children }: { icon: typeof Briefcase; children: React.ReactNode }) {
  return (
    <h2 className="mb-8 flex items-center gap-3 text-2xl font-bold">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </span>
      {children}
    </h2>
  )
}

export default function AboutPage() {
  const facts = [
    { label: 'role', value: currentRoles.map((r) => (r.company === 'Self-employed' ? r.title : `${r.title} @ ${r.company}`)).join(' · ') },
    { label: 'location', value: profile.location },
    { label: 'education', value: 'B.Tech ECE, DCRUST (8.26 CGPA)' },
    { label: 'focus', value: 'Full stack · APIs · PostgreSQL' },
    { label: 'email', value: profile.email },
  ]

  return (
    <div className="relative w-full overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-15" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--background)_100%)]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* Intro */}
        <section className="mb-24 grid gap-12 pt-6 lg:grid-cols-5 lg:items-center">
          <div className="flex justify-center lg:col-span-2">
            <div className="relative">
              <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 blur-xl" />
              <div className="relative h-80 w-72 overflow-hidden rounded-2xl border-2 border-primary/20 shadow-xl sm:h-96 sm:w-80">
                <Image src="/profile.jpg" alt={profile.name} fill sizes="320px" className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="mb-3 font-mono text-sm text-primary">
              <span className="text-muted-foreground">~/</span>about
            </p>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
              I build software that holds up in production.
            </h1>
            <div className="space-y-4 text-base leading-relaxed text-foreground/85">
              {profile.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Quick facts */}
        <AnimateOnScroll animation="fade-up">
          <section className="mb-24">
            <div className="terminal-window overflow-hidden">
              <div className="terminal-header">
                <span className="terminal-dot dot-red" />
                <span className="terminal-dot dot-yellow" />
                <span className="terminal-dot dot-green" />
                <span className="ml-2 font-mono text-xs text-muted-foreground">kavya.json</span>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-sm leading-7 sm:p-6">
                <span className="text-muted-foreground">{'{'}</span>
                {facts.map((fact, i) => (
                  <span key={fact.label} className="block pl-4 sm:pl-6">
                    <span className="text-[#0451a5] dark:text-[#9cdcfe]">&quot;{fact.label}&quot;</span>
                    <span className="text-muted-foreground">: </span>
                    <span className="text-[#a31515] dark:text-[#ce9178]">&quot;{fact.value}&quot;</span>
                    {i < facts.length - 1 && <span className="text-muted-foreground">,</span>}
                  </span>
                ))}
                <span className="text-muted-foreground">{'}'}</span>
              </pre>
            </div>
          </section>
        </AnimateOnScroll>

        {/* Career at a glance */}
        <AnimateOnScroll animation="fade-up">
          <section className="mb-24">
            <SectionHeading icon={Briefcase}>Career</SectionHeading>
            <ol className="relative space-y-6 border-l border-border pl-8">
              {experience.map((entry) => (
                <li key={`${entry.company}-${entry.title}`} className="relative">
                  <span
                    className={`absolute -left-[37px] top-1.5 h-3 w-3 rounded-full border-2 border-background ${
                      entry.current ? 'bg-green-500' : 'bg-primary'
                    }`}
                  />
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="font-semibold">
                      {entry.title}
                      <span className="font-normal text-muted-foreground"> · {entry.company}</span>
                    </h3>
                    <span className="font-mono text-xs text-muted-foreground">{entry.period}</span>
                  </div>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {entry.location} · {entry.employmentType}
                  </p>
                </li>
              ))}
            </ol>
            <Link
              href="/#experience"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              Full experience details
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>
        </AnimateOnScroll>

        {/* Education & Certifications */}
        <AnimateOnScroll animation="fade-up">
          <section className="mb-24 grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading icon={GraduationCap}>Education</SectionHeading>
              <div className="space-y-4">
                {education.map((item) => (
                  <div key={item.institution} className="rounded-xl border border-border bg-card p-5">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-semibold leading-snug">{item.institution}</h3>
                      <span className="shrink-0 font-mono text-xs text-muted-foreground">{item.period}</span>
                    </div>
                    <p className="mt-2 text-sm text-foreground/85">{item.degree}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      <span className="font-mono text-primary">{item.detail}</span> · {item.location}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionHeading icon={Award}>Certifications</SectionHeading>
              <div className="space-y-4">
                {certifications.map((cert) => (
                  <div key={cert.name} className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 font-mono text-xs font-bold text-primary">
                      OCI
                    </div>
                    <div>
                      <h3 className="font-semibold">{cert.name}</h3>
                      <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimateOnScroll>

        {/* Leadership & Community */}
        <AnimateOnScroll animation="fade-up">
          <section className="mb-24">
            <SectionHeading icon={Trophy}>Leadership &amp; Community</SectionHeading>
            <div className="grid gap-4 md:grid-cols-2">
              {achievements.map((item) => (
                <div key={item.title} className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        </AnimateOnScroll>

        {/* Stack summary */}
        <AnimateOnScroll animation="fade-up">
          <section className="mb-24">
            <h2 className="mb-6 text-2xl font-bold">Stack</h2>
            <div className="divide-y divide-border rounded-xl border border-border bg-card">
              {skillGroups.map((group) => (
                <div key={group.category} className="grid gap-2 p-4 sm:grid-cols-[180px_1fr] sm:gap-6">
                  <p className="font-mono text-xs uppercase tracking-wider text-primary">{group.category}</p>
                  <p className="text-sm text-foreground/85">{group.items.join(' · ')}</p>
                </div>
              ))}
            </div>
          </section>
        </AnimateOnScroll>

        {/* CTA */}
        <AnimateOnScroll animation="fade-up">
          <section className="flex flex-col items-center gap-4 pb-10 text-center">
            <p className="text-muted-foreground">Want the one-page version?</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="gap-2 shadow-lg shadow-primary/20">
                <a href={profile.resumeUrl} download={profile.resumeFileName}>
                  <Download className="h-4 w-4" />
                  Download CV
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2">
                <Link href="/#contact">
                  <Mail className="h-4 w-4" />
                  Get in touch
                </Link>
              </Button>
            </div>
          </section>
        </AnimateOnScroll>
      </div>
    </div>
  )
}
