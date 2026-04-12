import React from 'react'
import { projects } from '@/lib/data'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ExternalLink, ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'

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
    return {
      title: 'Project Not Found',
      description: 'The project you are looking for does not exist.',
    }
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description ?? undefined,
      url: `https://kavyasharma.com/projects/${project.slug}`,
      siteName: 'Kavya Sharma | Portfolio',
      images: [
        {
          url: project.coverImage?.imageUrl || '/profile.jpg',
          width: 1200,
          height: 630,
          alt: project.coverImage?.alt || project.title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      {/* Back link */}
      <Link
        href="/projects"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Projects
      </Link>

      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        {/* Image */}
        {project.coverImage?.imageUrl ? (
          <div className="relative order-2 lg:order-1 lg:sticky lg:top-24">
            <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent blur-xl" />
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-border shadow-xl">
              <Image
                src={project.coverImage.imageUrl}
                alt={project.coverImage.alt || 'Cover image for the project'}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        ) : null}

        {/* Content */}
        <div className="order-1 lg:order-2 space-y-6">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Project
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {project.title}
          </h1>

          {project.description ? (
            <p className="text-lg text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          ) : null}

          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {project.projectUrl ? (
            <div className="pt-2">
              <Button asChild size="lg" className="gap-2 shadow-lg shadow-primary/20">
                <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Visit Live Project
                </a>
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  )
}
