// /app/projects/page.tsx

import React from 'react'
import { client } from '@/lib/sanity.client'
import { projectsQuery } from '@/lib/sanity.queries'
import { Project } from '@/types'
// 1. Import your custom ProjectCard component
import ProjectCard from '@/components/ProjectCard'

export const revalidate = 60

export default async function ProjectsPage() {
  const projects: Project[] = await client.fetch(projectsQuery)

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <header className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium text-muted-foreground">Projects</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          My Projects
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          A collection of my work, from web applications to personal experiments.
        </p>
      </header>

      <section className="mt-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </section>
    </main>
  )
}