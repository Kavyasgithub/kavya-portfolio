import React from 'react'
import { projects } from '@/lib/data'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ExternalLink, ArrowLeft, ArrowRight, Lock } from 'lucide-react'
import type { Metadata } from 'next'
import { ProjectTypeBadge } from '@/components/projects/project-type-badge'

export const dynamicParams = false

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return { title: 'Project Not Found' }
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title}: ${project.tagline}`,
      description: project.description,
      siteName: 'Kavya Sharma | Portfolio',
      images: [{ url: project.coverImage.imageUrl, width: 1600, height: 900, alt: project.coverImage.alt }],
      locale: 'en_US',
      type: 'website',
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const index = projects.findIndex((p) => p.slug === slug)

  if (index === -1) {
    notFound()
  }

  const project = projects[index]
  const next = projects[(index + 1) % projects.length]

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Link
        href="/projects"
        className="mb-8 inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        cd ../projects
      </Link>

      <header className="mb-10 max-w-3xl space-y-4">
        <ProjectTypeBadge type={project.type} />
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{project.title}</h1>
        <p className="font-mono text-primary">{project.tagline}</p>
        <p className="text-lg leading-relaxed text-muted-foreground">{project.description}</p>
      </header>

      <div className="relative mb-12">
        <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent blur-xl" />
        <div className="relative aspect-video overflow-hidden rounded-2xl border border-border shadow-xl">
          <Image
            src={project.coverImage.imageUrl}
            alt={project.coverImage.alt}
            fill
            sizes="(min-width: 1152px) 1104px, 100vw"
            className="object-cover object-top"
            priority
          />
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <h2 className="mb-5 font-mono text-sm uppercase tracking-wider text-muted-foreground">
            <span className="text-primary">#</span> what I built
          </h2>
          <ul className="space-y-4">
            {project.highlights.map((point) => (
              <li key={point} className="flex gap-3 leading-relaxed text-foreground/85">
                <span className="mt-1 font-mono text-sm text-primary">▹</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        <aside className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="rounded-md border border-border bg-background px-2.5 py-1 font-mono text-xs">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {project.projectUrl ? (
            <Button asChild size="lg" className="w-full gap-2 shadow-lg shadow-primary/20">
              <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                Visit Live Project
              </a>
            </Button>
          ) : (
            <p className="flex items-start gap-2 rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">
              <Lock className="mt-0.5 h-4 w-4 shrink-0" />
              Private client project. Happy to walk through the architecture in a conversation.
            </p>
          )}
        </aside>
      </div>

      <div className="mt-16 border-t border-border pt-8 text-right">
        <Link
          href={`/projects/${next.slug}`}
          className="group inline-flex flex-col items-end gap-1"
        >
          <span className="font-mono text-xs text-muted-foreground">next project</span>
          <span className="inline-flex items-center gap-2 text-lg font-semibold transition-colors group-hover:text-primary">
            {next.title}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </div>
    </div>
  )
}
