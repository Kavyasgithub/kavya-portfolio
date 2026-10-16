import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { AnimatedCodeText } from '@/components/shared/animated-code-text'
import { Terminal, Code2, Download, Github, Linkedin, Mail, MapPin } from 'lucide-react'
import { animatedTexts, profile, projects, experience, socials } from '@/lib/data'

const socialIcons = { github: Github, linkedin: Linkedin, email: Mail }

const stats = [
  { value: '1+', label: 'years in industry' },
  { value: String(experience.length), label: 'roles' },
  { value: String(projects.length), label: 'projects shipped' },
]

export function HeroSection() {
  return (
    <section className="relative flex min-h-[85vh] items-center py-20">
      {/* Subtle background grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,var(--background)_100%)]" />

      <div className="relative grid w-full gap-12 lg:grid-cols-2 lg:items-center">
        {/* Mobile photo */}
        <div className="fade-in-up flex justify-center lg:hidden">
          <div className="relative">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-primary/20 to-primary/5 blur-xl" />
            <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-primary/20 shadow-xl">
              <Image src="/profile.jpg" alt={profile.name} fill className="object-cover object-center" priority sizes="160px" />
            </div>
          </div>
        </div>

        <div className="fade-in-up space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 text-sm text-muted-foreground backdrop-blur-sm">
            <Terminal className="h-4 w-4 text-primary" />
            <span className="font-mono">kavya@dev:~$ whoami</span>
            <span className="ml-1 inline-block h-4 w-[2px] animate-pulse bg-primary" />
          </div>

          <div>
            <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {profile.name}
            </h1>
            <div className="font-mono text-xl text-muted-foreground sm:text-2xl">
              <span className="text-primary">{'> '}</span>
              <AnimatedCodeText texts={animatedTexts} className="text-foreground" />
            </div>
          </div>

          <p className="max-w-prose text-lg leading-relaxed text-muted-foreground">{profile.summary}</p>

          <dl className="grid max-w-md grid-cols-3 gap-4 border-y border-border py-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-mono text-2xl font-bold text-primary sm:text-3xl">{stat.value}</dd>
                <dd className="mt-1 text-xs text-muted-foreground">{stat.label}</dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="gap-2 shadow-lg shadow-primary/20">
              <Link href="/projects">
                <Code2 className="h-4 w-4" />
                View Projects
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <a href={profile.resumeUrl} download={profile.resumeFileName}>
                <Download className="h-4 w-4" />
                Download CV
              </a>
            </Button>
            <div className="flex items-center gap-1 sm:ml-2">
              {socials.map((social) => {
                const Icon = socialIcons[social.platform]
                return (
                  <Button key={social.platform} asChild variant="ghost" size="sm" className="w-9 px-0">
                    <a
                      href={social.url}
                      aria-label={social.label}
                      {...(social.platform !== 'email' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  </Button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Desktop photo */}
        <div className="fade-in-up hidden justify-center lg:flex" style={{ animationDelay: '200ms' }}>
          <div className="relative">
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-primary/20 to-primary/5 blur-2xl" />
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/30 via-primary/10 to-transparent" />
            <div className="relative">
              <div className="relative h-[500px] w-[400px] overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background shadow-2xl">
                <Image
                  src="/profile.jpg"
                  alt={`${profile.name}, ${profile.role}`}
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-primary/20 bg-background/95 px-6 py-3 shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
                    <div className="absolute inset-0 h-2.5 w-2.5 animate-ping rounded-full bg-green-500/60" />
                  </div>
                  <span className="font-mono text-sm font-medium">Open to opportunities</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    Gurugram
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
