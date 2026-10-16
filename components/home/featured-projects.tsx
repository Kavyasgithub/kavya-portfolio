import { ExternalLink, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { StaticProject } from '@/lib/data'
import { ProjectTypeBadge } from '@/components/projects/project-type-badge'

interface FeaturedProjectsProps {
  projects: StaticProject[]
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <div className="space-y-10">
      {projects.map((project, index) => (
        <article
          key={project.slug}
          className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
        >
          <div className="grid lg:grid-cols-2">
            {/* Image */}
            <Link
              href={`/projects/${project.slug}`}
              className={`group flex items-center border-b border-border bg-muted/40 p-4 sm:p-6 lg:border-b-0 lg:p-8 ${
                index % 2 === 1 ? 'lg:order-2 lg:border-l' : 'lg:border-r'
              }`}
            >
              {/* Browser-window frame keeps the full 16:9 screenshot visible */}
              <div className="w-full overflow-hidden rounded-lg border border-border bg-background shadow-lg transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-primary/10">
                <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                  <span className="ml-3 truncate font-mono text-[11px] text-muted-foreground">
                    {project.projectUrl ? project.projectUrl.replace(/^https?:\/\//, '') : `${project.slug} · private`}
                  </span>
                </div>
                <div className="relative aspect-video">
                  <Image
                    src={project.coverImage.imageUrl}
                    alt={project.coverImage.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </Link>

            {/* Content */}
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <ProjectTypeBadge type={project.type} />
              </div>

              <h3 className="text-2xl font-bold sm:text-3xl">{project.title}</h3>
              <p className="mt-1 font-mono text-sm text-primary">{project.tagline}</p>
              <p className="mt-4 leading-relaxed text-muted-foreground">{project.description}</p>

              <ul className="mt-5 space-y-2">
                {project.highlights.slice(0, 3).map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-1.5 font-mono text-xs text-primary">▹</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="rounded-md border border-border bg-muted px-3 py-1 font-mono text-xs">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {project.projectUrl && (
                  <Button asChild className="gap-2 shadow-sm">
                    <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                )}
                <Button asChild variant="outline" className="gap-2">
                  <Link href={`/projects/${project.slug}`}>
                    Case Study
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
