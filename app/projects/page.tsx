import type { Metadata } from 'next'
import { featuredProjects, otherProjects } from '@/lib/data'
import ProjectCard from '@/components/projects/project-card'
import { FeaturedProjects } from '@/components/home/featured-projects'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Freelance client work and personal projects: financial systems, role-based platforms and real-time apps.',
}

export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <header className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-sm text-primary">
          <span className="text-muted-foreground">~/</span>projects
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Things I&apos;ve built</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          Client work and personal builds, from double-entry ledgers to real-time multiplayer apps.
        </p>
      </header>

      <section className="mt-14">
        <h2 className="mb-6 font-mono text-sm uppercase tracking-wider text-muted-foreground">
          <span className="text-primary">#</span> featured
        </h2>
        <FeaturedProjects projects={featuredProjects} />
      </section>

      <section className="mt-20">
        <h2 className="mb-6 font-mono text-sm uppercase tracking-wider text-muted-foreground">
          <span className="text-primary">#</span> more projects
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {otherProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </div>
  )
}
