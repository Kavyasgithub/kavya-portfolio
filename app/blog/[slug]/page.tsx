import React from 'react'
import { connectDB } from '@/lib/mongodb'
import PostModel from '@/models/post'
import { Post } from '@/types'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MarkdownRenderer } from '@/components/blog/markdown-renderer'
import { ArrowLeft, Clock } from 'lucide-react'
import type { Metadata } from 'next'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  await connectDB()
  const doc = await PostModel.findOne({ slug }).lean()

  if (!doc) {
    return {
      title: 'Post Not Found',
      description: 'This post could not be found.',
    }
  }

  const post: Post = JSON.parse(JSON.stringify(doc))

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      url: `https://kavyasharma.com/blog/${post.slug}`,
      siteName: 'Kavya Sharma | Blog',
      images: [
        {
          url: post.mainImage?.imageUrl || '/profile.jpg',
          width: 1200,
          height: 630,
          alt: post.mainImage?.alt || post.title,
        },
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
  }
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function estimateReadTime(content: string): string {
  const words = content.split(/\s+/).length
  const minutes = Math.max(1, Math.ceil(words / 200))
  return `${minutes} min read`
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  await connectDB()
  const doc = await PostModel.findOne({ slug }).lean()

  if (!doc) {
    notFound()
  }

  const post: Post = JSON.parse(JSON.stringify(doc))

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <article className="mx-auto max-w-3xl">
        {/* Back link */}
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 border-b border-border pb-6">
            <div className="flex items-center gap-2.5">
              <Avatar className="h-9 w-9">
                <AvatarImage src={post.author.picture} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold">{post.author.name}</p>
                <p className="text-xs text-muted-foreground">Author</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
              <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {estimateReadTime(post.content)}
              </span>
            </div>
          </div>
        </header>

        {/* Main Image */}
        {post.mainImage?.imageUrl && (
          <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-2xl border border-border shadow-lg">
            <Image
              src={post.mainImage.imageUrl}
              alt={post.mainImage.alt || 'Main image for the blog post'}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Article Body */}
        <div className="prose prose-neutral max-w-none dark:prose-invert prose-headings:tracking-tight prose-h2:mt-10 prose-h2:text-2xl prose-h3:mt-8 prose-h3:text-xl prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-blockquote:border-primary prose-blockquote:bg-muted/30 prose-blockquote:rounded-r-lg prose-blockquote:py-1 prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:text-foreground prose-code:before:content-none prose-code:after:content-none prose-pre:rounded-xl prose-pre:border prose-pre:border-border prose-pre:bg-muted prose-pre:text-foreground prose-img:rounded-xl">
          <MarkdownRenderer content={post.content} />
        </div>
      </article>
    </main>
  )
}
