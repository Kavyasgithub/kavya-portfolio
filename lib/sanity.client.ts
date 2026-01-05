import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url' // Import the named export

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION!

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // `false` if you want to ensure fresh data
})

// --- ADD THE CODE BELOW ---

// Get a pre-configured url-builder from your sanity client
const builder = createImageUrlBuilder(client)

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
type BuilderImageSource = Parameters<(typeof builder)['image']>[0]

export function urlFor(source: BuilderImageSource) {
  return builder.image(source)
}