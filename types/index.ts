export interface ImagePayload {
  alt: string
  imageUrl: string
}

export interface Project {
  _id: string
  title: string
  slug: string
  coverImage: ImagePayload
  description: string | null
  technologies: string[]
  projectUrl: string | null
}

export interface Post {
  _id: string
  title: string
  slug: string
  excerpt: string | null
  mainImage: ImagePayload
  publishedAt: string
  author: {
    name: string
    picture: string
  }
  content: string // Markdown content
}

export interface SocialLink {
  _key?: string
  platform: string
  url: string
}

export interface PersonalInfo {
  _id: string
  name: string
  bio: string | null
  socialLinks: SocialLink[]
}
