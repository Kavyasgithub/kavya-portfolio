'use client'

import { useState } from 'react'
import { ExternalLink, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { Project } from '@/types'

interface TabbedProjectsProps {
  projects: Project[]
}

export function TabbedProjects({ projects }: TabbedProjectsProps) {
  const [activeTab, setActiveTab] = useState(0)

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        No projects available
      </div>
    )
  }

  return (
    <section className="w-full py-20">
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-dot dot-red" />
          <div className="terminal-dot dot-yellow" />
          <div className="terminal-dot dot-green" />
          <div className="ml-4 flex gap-2">
            {projects.slice(0, 3).map((project, index) => (
              <button
                key={project._id}
                onClick={() => setActiveTab(index)}
                className={`rounded-t-md px-4 py-1 text-xs transition-colors ${
                  activeTab === index
                    ? 'bg-background text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {project.title}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 md:p-8">
          {projects.slice(0, 3).map((project, index) => (
            <div
              key={project._id}
              className={`${activeTab === index ? 'block' : 'hidden'} fade-in-up`}
            >
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 text-2xl font-bold">{project.title}</h3>
                    <p className="text-muted-foreground">{project.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    {project.projectUrl && (
                      <Button asChild size="sm" className="gap-2">
                        <Link href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                          Live Demo
                        </Link>
                      </Button>
                    )}
                    <Button asChild size="sm" variant="outline" className="gap-2">
                      <Link href={`/projects/${project.slug}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>

                  {/* Progress bar for completion */}
                  <div className="pt-4">
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium text-primary">100%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full bg-primary transition-all duration-1000"
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="relative aspect-video overflow-hidden rounded-lg border border-border bg-muted">
                  {project.coverImage?.imageUrl ? (
                    <Image
                      src={project.coverImage.imageUrl}
                      alt={project.coverImage.alt || project.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                      No image available
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
