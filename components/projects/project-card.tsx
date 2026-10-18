import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { StaticProject } from '@/lib/data'
import { ArrowUpRight } from 'lucide-react'
import { ProjectTypeBadge } from '@/components/projects/project-type-badge'

interface ProjectCardProps {
  project: StaticProject
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <article className="h-full overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
        <div className="relative aspect-video overflow-hidden border-b border-border bg-muted">
          <Image
            src={project.coverImage.imageUrl}
            alt={project.coverImage.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute right-3 top-3 flex h-8 w-8 translate-x-2 items-center justify-center rounded-full bg-background/80 opacity-0 backdrop-blur-sm transition-all group-hover:translate-x-0 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>

        <div className="p-5">
          <div className="mb-3">
            <ProjectTypeBadge type={project.type} />
          </div>
          <h3 className="text-xl font-bold tracking-tight transition-colors group-hover:text-primary">
            {project.title}
          </h3>
          <p className="mb-3 font-mono text-xs text-primary/80">{project.tagline}</p>
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border bg-muted/50 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  )
}

export default ProjectCard
