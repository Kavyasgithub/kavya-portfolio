// /components/ProjectCard.tsx

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Import the TypeScript interface for a Project
import { Project } from '@/types'

// Import the ShadCN Card components we will use
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

// Define the props interface for our component
interface ProjectCardProps {
  project: Project
}

/**
 * ProjectCard is a reusable component to display a preview of a single project.
 * It uses ShadCN's Card component for styling and layout.
 * The entire card is a clickable link that navigates to the project's detail page.
 */
const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    // The entire card is wrapped in a Next.js Link component to make it clickable.
    // The `group` class is used by Tailwind to style child elements on hover of the parent.
    <Link
      href={`/projects/${project.slug}`}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <Card className="h-full overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg">
        {/* Project Cover Image */}
        {/* We use a div container to enforce a consistent aspect ratio for all card images. */}
        <div className="aspect-video overflow-hidden">
          {project.coverImage?.imageUrl && (
            <Image
              src={project.coverImage.imageUrl}
              alt={project.coverImage.alt || 'Cover image for the project'}
              width={500} // Provide an appropriate width
              height={281} // Provide a matching height for a 16:9 aspect ratio
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          )}
        </div>

        {/* Card Header containing the title and description */}
        <CardHeader>
          <CardTitle className="text-xl font-semibold tracking-tight group-hover:text-primary">
            {project.title}
          </CardTitle>
          <CardDescription className="line-clamp-3">
            {project.description}
          </CardDescription>
        </CardHeader>

        {/* Card Content for additional details, like technologies */}
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="bg-secondary text-secondary-foreground text-xs font-semibold px-2 py-1 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default ProjectCard