import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { StaticProject } from '@/lib/data'
import { ArrowUpRight } from 'lucide-react'

interface ProjectCardProps {
  project: StaticProject
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <article className="h-full overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden bg-muted">
          {project.coverImage?.imageUrl && (
            <Image
              src={project.coverImage.imageUrl}
              alt={project.coverImage.alt || 'Cover image for the project'}
              width={500}
              height={281}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0 translate-x-2">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="mb-2 text-xl font-bold tracking-tight transition-colors group-hover:text-primary">
            {project.title}
          </h3>
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border bg-muted/50 px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
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
