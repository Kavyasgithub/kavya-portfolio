import React from 'react'
import { connectDB } from '@/lib/mongodb'
import PostModel from '@/models/post'
import { Post } from '@/types'
import BlogPostPreview from '@/components/blog/blog-post-preview'

export const revalidate = 60

export default async function BlogPage() {
  await connectDB()

  const postDocs = await PostModel.find().sort({ publishedAt: -1 }).lean()
  const posts: Post[] = JSON.parse(JSON.stringify(postDocs))

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
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogPostPreview key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No posts yet. Check back soon!</p>
        )}
      </section>
    </main>
  )
}
