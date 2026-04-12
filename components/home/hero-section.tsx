import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { AnimatedCodeText } from '@/components/shared/animated-code-text'
import { Terminal, Code2, Download, ArrowRight } from 'lucide-react'
import { animatedTexts } from '@/lib/data'

interface HeroSectionProps {
  name: string
}

export function HeroSection({ name }: HeroSectionProps) {
  return (
    <section className="relative min-h-[85vh] flex items-center py-20">
      {/* Subtle background grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,var(--background)_100%)]" />

      <div className="relative grid w-full gap-12 lg:grid-cols-2 lg:items-center">
        <div className="fade-in-up space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 text-sm text-muted-foreground backdrop-blur-sm">
            <Terminal className="h-4 w-4 text-primary" />
            <span className="font-mono">developer@portfolio:~$</span>
            <span className="ml-1 inline-block h-4 w-[2px] animate-pulse bg-primary" />
          </div>

          <div>
            <h1 className="mb-4 font-mono text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              <span className="text-muted-foreground">const </span>
              <span className="text-primary">developer</span>
              <span className="text-muted-foreground"> = </span>
              <span className="text-foreground">{'{}'}</span>
            </h1>

            <div className="font-mono text-xl text-muted-foreground sm:text-2xl">
              <span className="text-primary">{'> '}</span>
              <AnimatedCodeText
                texts={animatedTexts}
                className="text-foreground"
              />
            </div>
          </div>

          <p className="max-w-prose text-lg leading-relaxed text-muted-foreground">
            Building elegant solutions to complex problems. Enthusiastic about creating modern, scalable web applications with cutting-edge technologies.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button asChild size="lg" className="gap-2 shadow-lg shadow-primary/20">
              <Link href="/projects">
                <Code2 className="h-4 w-4" />
                View Projects
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/about">
                About Me
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="/blog">Blog</Link>
            </Button>
            <Button asChild size="sm" variant="outline" className="font-mono gap-2">
              <a href="/KAVYA_RESUME.pdf" download="KAVYA_RESUME.pdf">
                <Download className="h-4 w-4" />
                CV
              </a>
            </Button>
          </div>
        </div>

        {/* Desktop photo */}
        <div className="fade-in-up hidden lg:flex justify-center" style={{ animationDelay: '200ms' }}>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl blur-2xl" />
            <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 via-primary/10 to-transparent rounded-2xl" />
            <div className="relative">
              <div className="relative h-[500px] w-[400px] overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background shadow-2xl">
                <Image
                  src="/profile.jpg"
                  alt={`${name} - Full-Stack Developer`}
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-primary/20 bg-background/95 px-6 py-3 shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
                    <div className="absolute inset-0 h-2.5 w-2.5 animate-ping rounded-full bg-green-500/60" />
                  </div>
                  <span className="font-mono text-sm font-medium">Available for work</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile photo */}
        <div className="fade-in-up flex justify-center lg:hidden mb-8">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-primary/5 rounded-full blur-xl" />
            <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-primary/20 shadow-xl">
              <Image
                src="/profile.jpg"
                alt={name}
                fill
                className="object-cover object-center"
                priority
                sizes="192px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
