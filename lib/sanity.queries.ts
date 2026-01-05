// /lib/sanity.queries.ts

import { groq } from 'next-sanity'

// We are adding our first real query here.
// This query will be used to fetch all documents of the 'project' type.
export const projectsQuery = groq`
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    "coverImage": {
      "alt": coverImage.alt,
      "imageUrl": coverImage.asset->url
    },
    description,
    technologies,
    projectUrl
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    "coverImage": {
      "alt": coverImage.alt,
      "imageUrl": coverImage.asset->url
    },
    description,
    technologies,
    projectUrl
  }
`
// This query fetches a list of all posts for the blog listing page.
export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "mainImage": {
      "alt": mainImage.alt,
      "imageUrl": mainImage.asset->url
    },
    publishedAt,
    // We follow the reference to the author to fetch their name and picture.
    "author": {
      "name": author->name,
      "picture": author->image.asset->url
    }
  }
`

// It includes the 'body' field, which is the rich text content of the post.
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "mainImage": {
      "alt": mainImage.alt,
      "imageUrl": mainImage.asset->url
    },
    publishedAt,
    "author": {
      "name": author->name,
      "picture": author->image.asset->url
    },
    // We fetch the full 'body' of the post for the detail page.
    // This is the Portable Text field and will require a special component to render.
    body
  }
`

// Query for the personalInfo singleton document
export const personalInfoQuery = groq`
  *[_type == "personalInfo"][0] {
    _id,
    name,
    bio,
    socialLinks[] {
      _key,
      platform,
      url
    }
  }
`

// This query is optimized to fetch only the slugs of all projects.
// It's used by `generateStaticParams` to know which pages to pre-build.
export const projectSlugsQuery = groq`
*[_type == "project" && defined(slug.current)][].slug.current
`
// This query is optimized to fetch only the 'slug' of all documents of type 'post'.
// It's used by `generateStaticParams` in the dynamic post page to know which pages to pre-build.
export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`