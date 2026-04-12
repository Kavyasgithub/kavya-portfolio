'use client'

import { useState } from 'react'
import { ExternalLink, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { StaticProject } from '@/lib/data'

interface FeaturedProjectsProps {
  projects: StaticProject[]
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const [activeTab, setActiveTab] = useState(0)

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        No projects available
      </div>
    )
  }

  return (
    <section className="w-full">
      {/* Tab buttons */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {projects.slice(0, 3).map((project, index) => (
          <button
            key={project.slug}
            onClick={() => setActiveTab(index)}
            className={`flex-shrink-0 rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
              activeTab === index
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                : 'border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/40'
            }`}
          >
            {project.title}
          </button>
        ))}
      </div>

      {/* Project content */}
      {projects.slice(0, 3).map((project, index) => (
        <div
          key={project.slug}
          className={`${activeTab === index ? 'block' : 'hidden'}`}
        >
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-xl">
            <div className="grid lg:grid-cols-2">
              {/* Image */}
              <div className="relative aspect-video overflow-hidden bg-muted lg:aspect-auto lg:min-h-[400px]">
                {project.coverImage?.imageUrl ? (
                  <Image
                    src={project.coverImage.imageUrl}
                    alt={project.coverImage.alt || project.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    No image available
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent lg:bg-gradient-to-r" />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                <div className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Featured Project
                </div>

                <h3 className="mb-3 text-2xl font-bold sm:text-3xl">{project.title}</h3>
                <p className="mb-6 text-muted-foreground leading-relaxed">{project.description}</p>

                <div className="mb-6 flex flex-wrap gap-2">
                  {project.technologies?.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-border bg-muted px-3 py-1 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  {project.projectUrl && (
                    <Button asChild className="gap-2 shadow-sm">
                      <Link href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </Link>
                    </Button>
                  )}
                  <Button asChild variant="outline" className="gap-2">
                    <Link href={`/projects/${project.slug}`}>
                      View Details
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
