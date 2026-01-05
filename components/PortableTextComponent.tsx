// /components/PortableTextComponent.tsx

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { urlFor } from '@/lib/sanity.client' // Import our new urlFor helper

// Define the props interface for this component
// It expects a 'value' which is the Portable Text array
interface PortableTextComponentProps {
  value: React.ComponentProps<typeof PortableText>['value']
}

type PortableTextImageValue = {
  alt?: string
  asset?: {
    metadata?: {
      dimensions?: {
        width?: number
        height?: number
      }
    }
  }
}

type PortableTextLinkMarkValue = {
  href?: string
}

/**
 * A custom component for rendering Sanity's Portable Text.
 * It provides custom renderers for different block types, such as images,
 * links, and blockquotes, to ensure they are styled correctly and use
 * performance-optimized components like next/image.
 */
const PortableTextComponent = ({ value }: PortableTextComponentProps) => {
  // Define custom components for different Portable Text block types
  const components = {
    types: {
      // Custom renderer for the 'image' type
      image: ({ value }: { value: PortableTextImageValue }) => {
        // Use the urlFor helper to get the image URL and its dimensions
        const imageUrl = urlFor(value).width(800).fit('max').auto('format').url()
        const imageWidth = value.asset?.metadata?.dimensions?.width || 800
        const imageHeight = value.asset?.metadata?.dimensions?.height || 450

        return (
          <div className="relative my-6 overflow-hidden rounded-2xl border bg-card shadow-sm">
            <Image
              src={imageUrl}
              alt={value.alt || 'Blog post image'}
              width={imageWidth}
              height={imageHeight}
              className="w-full h-auto object-contain"
            />
          </div>
        )
      },
      // You can add custom renderers for other custom block types here
      // E.g., a 'code' block with syntax highlighting
    },
    marks: {
      // Custom renderer for links
      link: ({
        children,
        value,
      }: {
        children?: React.ReactNode
        value?: PortableTextLinkMarkValue
      }) => {
        const href = value?.href
        const isInternal = typeof href === 'string' && href.startsWith('/')
        const rel = !isInternal ? 'noreferrer noopener' : undefined
        const target = !isInternal ? '_blank' : undefined

        // If the link is internal, use the Next.js Link component
        if (isInternal && href) {
          return (
            <Link href={href} className="text-primary hover:underline">
              {children}
            </Link>
          )
        }

        // If it's an external link, use a standard `<a>` tag
        return (
          <a
            href={href}
            rel={rel}
            target={target}
            className="text-primary hover:underline"
          >
            {children}
          </a>
        )
      },
    },
    block: {
      // Custom renderer for blockquotes
      blockquote: ({ children }: { children?: React.ReactNode }) => (
        <blockquote className="my-6 rounded-xl border-l-4 border-primary/40 bg-muted/40 px-4 py-3 italic text-muted-foreground">
          {children}
        </blockquote>
      ),
      // Custom renderers for headings, lists, etc.
      h2: ({ children }: { children?: React.ReactNode }) => (
        <h2 className="mt-10 text-2xl font-semibold tracking-tight sm:text-3xl">{children}</h2>
      ),
      h3: ({ children }: { children?: React.ReactNode }) => (
        <h3 className="mt-8 text-xl font-semibold tracking-tight sm:text-2xl">{children}</h3>
      ),
    },
    list: {
      // Custom renderer for bulleted lists
      bullet: ({ children }: { children?: React.ReactNode }) => (
        <ul className="my-4 list-disc space-y-2 pl-6">{children}</ul>
      ),
      // Custom renderer for numbered lists
      number: ({ children }: { children?: React.ReactNode }) => (
        <ol className="my-4 list-decimal space-y-2 pl-6">{children}</ol>
      ),
    },
    listItem: {
      // Custom renderer for list items
      bullet: ({ children }: { children?: React.ReactNode }) => (
        <li>{children}</li>
      ),
    },
  }

  // Render the Portable Text using the main component and our custom renderers
  return <PortableText value={value} components={components} />
}

export default PortableTextComponent