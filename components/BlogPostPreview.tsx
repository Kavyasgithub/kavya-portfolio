// /components/BlogPostPreview.tsx

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Import the TypeScript interface for a Post, which we'll use for props
import { Post } from '@/types'

// Import the ShadCN UI components we'll use for the layout
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// Define the props interface for our component, expecting a single `post` object
interface BlogPostPreviewProps {
  post: Post
}

/**
 * A helper function to format a date string into a more readable format.
 * Example: "June 18, 2024"
 * @param dateString The date string to format (e.g., from Sanity).
 * @returns A formatted date string.
 */
function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

/**
 * BlogPostPreview is a reusable component to display a preview of a single blog post.
 * It's designed to be used in a list of posts, like on the main blog page.
 */
const BlogPostPreview = ({ post }: BlogPostPreviewProps) => {
  return (
    // The entire card is a clickable link leading to the full blog post.
    // The `group` class enables styling child elements on hover of this parent Link.
    <Link
      href={`/blog/${post.slug}`}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <Card className="h-full overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg">
        {/* Post Main Image */}
        <div className="aspect-video overflow-hidden">
          {post.mainImage?.imageUrl && (
            <Image
              src={post.mainImage.imageUrl}
              alt={post.mainImage.alt || 'Cover image for the blog post'}
              width={600} // Provide an appropriate width for a blog post image
              height={338} // Matching height for a 16:9 aspect ratio
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          )}
        </div>

        {/* Card Header with Title and Excerpt */}
        <CardHeader>
          <CardTitle className="text-xl font-semibold tracking-tight group-hover:text-primary">
            {post.title}
          </CardTitle>
          <CardDescription className="line-clamp-3">
            {post.excerpt}
          </CardDescription>
        </CardHeader>

        {/* Card Content with Author and Date information */}
        <CardContent>
          <div className="flex items-center gap-4">
            <Avatar>
              {/* The AvatarImage will be displayed if the src is valid */}
              <AvatarImage src={post.author.picture} alt={post.author.name} />
              {/* The AvatarFallback is displayed if the image fails to load, ensuring a robust UI */}
              <AvatarFallback>
                {post.author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">{post.author.name}</p>
              <p className="text-xs text-muted-foreground">
                {formatDate(post.publishedAt)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default BlogPostPreview