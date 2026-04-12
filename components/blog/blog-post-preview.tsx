import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Post } from '@/types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArrowUpRight, Clock } from 'lucide-react'

interface BlogPostPreviewProps {
  post: Post
}

function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

function estimateReadTime(content: string): string {
  const words = content.split(/\s+/).length
  const minutes = Math.max(1, Math.ceil(words / 200))
  return `${minutes} min read`
}

const BlogPostPreview = ({ post }: BlogPostPreviewProps) => {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <article className="h-full overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden bg-muted">
          {post.mainImage?.imageUrl && (
            <Image
              src={post.mainImage.imageUrl}
              alt={post.mainImage.alt || 'Cover image for the blog post'}
              width={600}
              height={338}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0 translate-x-2">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Meta info */}
          <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {estimateReadTime(post.content)}
            </span>
          </div>

          <h3 className="mb-2 text-lg font-bold tracking-tight transition-colors group-hover:text-primary">
            {post.title}
          </h3>
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>

          {/* Author */}
          <div className="flex items-center gap-2.5 border-t border-border pt-4">
            <Avatar className="h-7 w-7">
              <AvatarImage src={post.author.picture} alt={post.author.name} />
              <AvatarFallback className="text-xs">{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-xs font-medium">{post.author.name}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default BlogPostPreview
