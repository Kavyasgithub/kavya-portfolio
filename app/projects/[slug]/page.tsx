
import React from 'react'
import { client } from '@/lib/sanity.client'
import { projectBySlugQuery, projectSlugsQuery } from '@/lib/sanity.queries'
import { Project } from '@/types'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// 1. Import the `Metadata` type from Next.js for type safety
import type { Metadata } from 'next'

// (The generateStaticParams function you wrote earlier remains unchanged)
export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(projectSlugsQuery)
  return slugs.map((slug) => ({
    slug,
  }))
}

// 2. Define and export the `generateMetadata` function
// This function receives the same `params` as the page component.
interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project: Project = await client.fetch(projectBySlugQuery, { slug })

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The project you are looking for does not exist.',
    }
  }


  // 5. Return the dynamic metadata object
  return {
    title: project.title, // This will replace '%s' in the layout's title template
    description: project.description, // This will override the layout's default description
    // You can add more specific metadata here, like Open Graph tags for social sharing
     openGraph: {
      title: project.title, // Use the project's title for the OG title
      description: project.description ?? undefined, // Ensure type matches `string | undefined` for OG description
      url: `https://kavyasharma.com/projects/${project.slug}`, // The canonical URL for this page
      siteName: 'Kavya Sharma | Portfolio', // The name of your website
      images: [
        {
          // We use the project's cover image as the OG image
          url: project.coverImage?.imageUrl || '/default-og-image.png', // Fallback to a default image,
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

// (Your Page Component remains unchanged)
export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project: Project = await client.fetch(projectBySlugQuery, { slug })

  if (!project) {
    notFound()
  }

  // --- THIS IS THE PART WE ARE REPLACING ---
  // We are replacing the old return statement with this new, detailed layout.
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      {/* Hero Section with Image */}
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">
        {/* Project Image */}
        {project.coverImage?.imageUrl ? (
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-video overflow-hidden rounded-2xl border-2 border-border shadow-xl hover:shadow-2xl transition-shadow duration-300">
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

        {/* Project Info */}
        <div className="order-1 lg:order-2 space-y-6">
          <div className="inline-block">
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              Project
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            {project.title}
          </h1>

          {project.description ? (
            <p className="text-lg text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          ) : null}

          {/* Technologies */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground/80">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-lg bg-card border border-border text-sm font-medium hover:border-primary/50 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Project Link */}
          {project.projectUrl ? (
            <div className="pt-2">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                  Visit Project
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                    <path d="M7 17L17 7"></path>
                    <path d="M7 7h10v10"></path>
                  </svg>
                </a>
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  )
}