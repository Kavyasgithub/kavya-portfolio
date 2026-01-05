import React from 'react'
import { client } from '@/lib/sanity.client'
import { postBySlugQuery } from '@/lib/sanity.queries'
import { Post } from '@/types'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import PortableTextComponent from '@/components/PortableTextComponent'
// 1. Import the `Metadata` type from Next.js for full type support
import type { Metadata } from 'next'

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post: Post = await client.fetch(postBySlugQuery, { slug })

  if (!post) {
    return {
      title: 'Post Not Found',
      description:
        'This post could not be found. It may have been moved or deleted.',
    }
  }

  // 5. Return the dynamic metadata object for this specific post
   return {
    title: post.title,
    description: post.excerpt,
    // --- ADD THIS NEW OBJECT ---
    openGraph: {
      title: post.title, // Use the post's title
      description: post.excerpt ?? undefined, // Use the post's excerpt for the description
      url: `https://kavyasharma.com/blog/${post.slug}`, // The canonical URL for this post
      siteName: 'Kavya Sharma | Blog', // The name of your website's blog section
      images: [
        {
          // We use the post's main image as the OG image
          url: post.mainImage?.imageUrl || '/default-og-image.png', // Fallback to a default image
          width: 1200,
          height: 630,
          alt: post.mainImage?.alt || post.title,
        },
      ],
      locale: 'en_US',
      type: 'article', // Set the type to 'article' for blog posts
      publishedTime: post.publishedAt, // Add the publication date
      authors: [post.author.name], // Add the author's name
    },
  }
}

// Helper function to format the date
function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

// (The data fetching logic remains unchanged)
export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post: Post = await client.fetch(postBySlugQuery, { slug })

  if (!post) {
    notFound()
  }

  // --- THIS IS THE PART WE ARE REPLACING ---
  // We are replacing the old return statement with this new, detailed layout.
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <article className="mx-auto max-w-3xl">
        {/* Article Header */}
        <header className="mb-8 text-center">
          <p className="text-sm font-medium text-muted-foreground">Blog</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={post.author.picture} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-foreground">{post.author.name}</span>
            </div>
            <span>&bull;</span>
            <time dateTime={post.publishedAt} className="text-sm">
              {formatDate(post.publishedAt)}
            </time>
          </div>
        </header>

        {/* Main Image */}
        {post.mainImage?.imageUrl && (
          <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-2xl border bg-card shadow-sm">
            <Image
              src={post.mainImage.imageUrl}
              alt={post.mainImage.alt || 'Main image for the blog post'}
              fill
              className="object-cover"
              priority // Prioritize loading the main image as it's the Largest Contentful Paint (LCP)
            />
          </div>
        )}

        {/* Article Body */}
        {/*
          We wrap our PortableTextComponent in a div with the `prose` class.
          This class from the `@tailwindcss/typography` plugin provides beautiful,
          readable styling for long-form content out of the box.
        */}
        <div className="prose prose-neutral max-w-none dark:prose-invert prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-blockquote:border-primary">
          <PortableTextComponent value={post.body} />
        </div>
      </article>
    </main>
  )
}