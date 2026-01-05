// /types/index.ts

import type { TypedObject } from '@portabletext/types'

/**
 * Interface representing the payload for an image object.
 * We create this as a reusable type because both Projects and Posts
 * will have images with the same structure. This follows the DRY principle.
 */
export interface ImagePayload {
  alt: string
  imageUrl: string
}

/**
 * Interface representing a Project document.
 * This shape is based on the projection in `projectsQuery` and `projectBySlugQuery`.
 */
export interface Project {
  _id: string
  title: string
  slug: string
  coverImage: ImagePayload // Using our reusable image type
  description: string | null // Description can be optional
  technologies: string[] // An array of strings
  projectUrl: string | null // The project URL can be optional
}

/**
 * Interface representing a Post document.
 * This shape is based on the projection in `postsQuery` and `postBySlugQuery`.
 */
export interface Post {
  _id: string
  title: string
  slug: string
  excerpt: string | null // Excerpt can be optional
  mainImage: ImagePayload // Reusing the image type again
  publishedAt: string // Dates from Sanity are typically returned as ISO strings
  // The author is a nested object based on our query projection.
  author: {
    name: string
    picture: string
  }
  // The 'body' is the rich text content from Sanity.
  // It's a complex array of objects. We use 'any' for now as a placeholder.
  // We will handle this with more specific types when we render the content.
  body: TypedObject | TypedObject[]
}

/**
 * Interface for a single social link object from the PersonalInfo singleton.
 */
export interface SocialLink {
  _key: string
  platform: string
  url:string
}

/**
 * Interface for the PersonalInfo singleton document.
 * This shape is based on the projection in `personalInfoQuery`.
 */
export interface PersonalInfo {
  _id: string
  name: string
  bio: string | null
  socialLinks: SocialLink[]
}

