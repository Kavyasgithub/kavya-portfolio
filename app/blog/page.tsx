// /app/blog/page.tsx

import React from 'react'
// 1. Import the necessary tools and types from your library
import { client } from '@/lib/sanity.client'
import { postsQuery } from '@/lib/sanity.queries'
import { Post } from '@/types'
import BlogPostPreview from '@/components/BlogPostPreview' // Your custom preview component!

// 2. Add the revalidate option for Incremental Static Regeneration (ISR)
// This tells Next.js to re-generate this page in the background at most once every 60 seconds.
// It ensures your blog list is always fresh without sacrificing the speed of a static site.
export const revalidate = 60

// 3. Convert the component to an `async` function to enable server-side data fetching
export default async function BlogPage() {
  // 4. Fetch the array of blog posts from Sanity
  // We use the client.fetch method with our predefined query.
  // We also provide the `Post[]` type to ensure full type safety for our data.
  const posts: Post[] = await client.fetch(postsQuery)

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <header className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium text-muted-foreground">Blog</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          The Digital Logbook
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          Insights, tutorials, and stories from my journey through code.
        </p>
      </header>

      <section className="mt-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogPostPreview key={post._id} post={post} />
          ))}
        </div>
      </section>
    </main>
  )
}