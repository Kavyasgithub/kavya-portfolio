import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import path from 'path'

// Load env from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  console.error('MONGODB_URI not found in .env.local')
  process.exit(1)
}

// Define schemas inline to avoid module resolution issues with ts-node
const PersonalInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String, default: null },
  socialLinks: [
    {
      platform: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
})

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    coverImage: {
      alt: { type: String, default: '' },
      imageUrl: { type: String, required: true },
    },
    description: { type: String, default: null },
    technologies: [{ type: String }],
    projectUrl: { type: String, default: null },
  },
  { timestamps: true }
)

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, default: null },
    mainImage: {
      alt: { type: String, default: '' },
      imageUrl: { type: String, required: true },
    },
    publishedAt: { type: Date, required: true },
    author: {
      name: { type: String, required: true },
      picture: { type: String, default: '' },
    },
    content: { type: String, required: true },
  },
  { timestamps: true }
)

async function seed() {
  console.log('Connecting to MongoDB...')
  await mongoose.connect(MONGODB_URI)
  console.log('Connected!')

  const PersonalInfo =
    mongoose.models.PersonalInfo || mongoose.model('PersonalInfo', PersonalInfoSchema)
  const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema)
  const Post = mongoose.models.Post || mongoose.model('Post', PostSchema)

  // Clear existing data
  await PersonalInfo.deleteMany({})
  await Project.deleteMany({})
  await Post.deleteMany({})
  console.log('Cleared existing data.')

  // Seed Personal Info
  await PersonalInfo.create({
    name: 'Kavya Sharma',
    bio: 'I am a dedicated Full Stack Developer with expertise in designing, developing, and deploying scalable web applications. My technical background covers both front-end and back-end development, allowing me to deliver complete and efficient solutions. I focus on writing clean, maintainable code and building applications that are both high-performing and user-friendly. With a strong understanding of system architecture, API integration, and database management, I am well-equipped to contribute to complex development projects. I am continuously expanding my skill set and enjoy working in dynamic, collaborative environments where I can apply problem-solving abilities to create impactful digital solutions.',
    socialLinks: [
      { platform: 'github', url: 'https://github.com' },
      { platform: 'linkedin', url: 'https://linkedin.com' },
      { platform: 'twitter', url: 'https://twitter.com' },
      { platform: 'email', url: 'mailto:hello@example.com' },
    ],
  })
  console.log('Seeded personal info.')

  // Seed Projects
  await Project.create([
    {
      title: 'WanderStay',
      slug: 'wanderstay-property-listing',
      coverImage: {
        alt: 'WanderStay Property Listing Application',
        imageUrl: '/profile.jpg',
      },
      description:
        'A full-stack property listing platform with bookings and reviews. Implemented search filters, authentication, and secure CRUD operations. Deployed on Render.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB'],
      projectUrl: 'https://delta-project-v2ag.onrender.com/listings',
    },
    {
      title: 'Tether',
      slug: 'tether-chat-application',
      coverImage: {
        alt: 'Tether Chat & Video Messaging Application',
        imageUrl: '/profile.jpg',
      },
      description:
        'A real-time communication platform supporting chat and video calls. Features direct messaging, group chats, video calls, screen sharing, and call recording. Enabled channel creation and private user invitations.',
      technologies: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'Clerk', 'Stream API'],
      projectUrl: 'https://tether-together-frontend.vercel.app/auth',
    },
    {
      title: 'Chess Game',
      slug: 'chess-game-multiplayer',
      coverImage: {
        alt: 'Real-time Multiplayer Chess Game',
        imageUrl: '/profile.jpg',
      },
      description:
        'A real-time multiplayer chess application using Socket.io for low-latency gameplay. Implemented server-side state management and move validation using Chess.js. Designed an event-driven architecture handling rooms, player roles, and concurrent sessions.',
      technologies: ['Node.js', 'Socket.io', 'Chess.js', 'Express.js', 'JavaScript'],
      projectUrl: 'https://chessgame-po24.onrender.com',
    },
    {
      title: 'Edemy',
      slug: 'edemy-lms-platform',
      coverImage: {
        alt: 'Edemy LMS Platform',
        imageUrl: '/profile.jpg',
      },
      description:
        'A full-stack Learning Management System supporting course discovery, enrollment, and progress tracking with optimized data flow. Integrated Stripe payments and Clerk authentication for secure transactions and user management. Designed scalable REST APIs and built a responsive UI for seamless user experience.',
      technologies: ['React.js', 'Node.js', 'Express.js', 'Stripe', 'Clerk', 'REST API'],
      projectUrl: 'https://edemy-kohl.vercel.app/',
    },
  ])
  console.log('Seeded projects.')

  // Seed Blog Posts
  await Post.create([
    {
      title: 'Getting Started with Next.js and MongoDB',
      slug: 'getting-started-nextjs-mongodb',
      excerpt:
        'A complete guide to building full-stack applications with Next.js and MongoDB — from project setup and database connections to creating API routes and deploying to production.',
      mainImage: {
        alt: 'Next.js and MongoDB',
        imageUrl: '/blog1.png',
      },
      publishedAt: new Date('2025-06-15'),
      author: {
        name: 'Kavya Sharma',
        picture: '/blog1.png',
      },
      content: `# Getting Started with Next.js and MongoDB

Building modern web applications requires a tech stack that balances developer experience with production performance. Next.js paired with MongoDB is one of the most popular combinations for full-stack JavaScript development — and for good reason. In this guide, I'll walk you through everything you need to go from zero to a fully functional application.

## Why Next.js + MongoDB?

**Next.js** is a React framework that provides server-side rendering (SSR), static site generation (SSG), API routes, file-based routing, and built-in optimizations out of the box. It eliminates the need to configure Webpack, Babel, or routing manually.

**MongoDB** is a NoSQL document database that stores data in flexible, JSON-like documents. Unlike relational databases, MongoDB doesn't require a fixed schema, making it ideal for rapid prototyping and applications where data structures evolve over time.

Together, they offer:
- **End-to-end JavaScript/TypeScript** — one language across your entire stack
- **Flexible data modeling** — MongoDB's schema-less nature pairs well with TypeScript interfaces
- **Server-side data fetching** — Next.js Server Components can query MongoDB directly without exposing an API
- **Excellent DX** — hot reloading, TypeScript support, and a rich ecosystem

## Prerequisites

Before we begin, make sure you have:
- **Node.js 18+** installed
- A **MongoDB Atlas** account (free tier works perfectly) or a local MongoDB instance
- Basic familiarity with React and TypeScript

## Step 1: Create a New Next.js Project

\`\`\`bash
npx create-next-app@latest my-fullstack-app --typescript --tailwind --app
cd my-fullstack-app
\`\`\`

This scaffolds a Next.js project with TypeScript and Tailwind CSS using the App Router.

## Step 2: Install Mongoose

Mongoose is an ODM (Object Data Modeling) library for MongoDB. It provides schema validation, type casting, query building, and middleware hooks.

\`\`\`bash
npm install mongoose
\`\`\`

## Step 3: Set Up Environment Variables

Create a \`.env.local\` file in your project root:

\`\`\`
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/myapp?retryWrites=true&w=majority
\`\`\`

Replace the connection string with your MongoDB Atlas URI. You can find this in your Atlas dashboard under **Connect > Drivers**.

> **Important:** Never commit \`.env.local\` to version control. Next.js automatically adds it to \`.gitignore\`.

## Step 4: Create a Database Connection Utility

One of the most common mistakes with MongoDB in Next.js is creating multiple database connections during development. Next.js hot-reloads modules, which can cause Mongoose to attempt reconnecting on every change.

The solution is a **connection singleton** that caches the connection across hot reloads.

Create \`lib/mongodb.ts\`:

\`\`\`typescript
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

let cached = (global as any).mongoose

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null }
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}
\`\`\`

**What's happening here:**
- We store the connection on \`global\` so it persists across hot reloads
- \`bufferCommands: false\` ensures Mongoose throws errors immediately if the connection drops, rather than silently buffering operations
- The try/catch resets the promise if the connection fails, allowing retries

## Step 5: Define a Mongoose Model

Let's create a simple \`Post\` model. Create \`models/post.ts\`:

\`\`\`typescript
import mongoose, { Schema, Document } from 'mongoose'

export interface IPost extends Document {
  title: string
  slug: string
  content: string
  excerpt: string
  publishedAt: Date
  createdAt: Date
  updatedAt: Date
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String, default: '' },
    publishedAt: { type: Date, required: true },
  },
  { timestamps: true }
)

// Prevent model recompilation in development
export default mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema)
\`\`\`

The \`mongoose.models.Post ||\` pattern is critical — without it, Mongoose throws an \`OverwriteModelError\` during hot reloads because it tries to redefine the same model.

## Step 6: Fetch Data in Server Components

One of the most powerful features of Next.js App Router is **Server Components**. They run exclusively on the server, meaning you can query your database directly without building an API layer.

Create \`app/blog/page.tsx\`:

\`\`\`typescript
import { connectDB } from '@/lib/mongodb'
import PostModel from '@/models/post'

export default async function BlogPage() {
  await connectDB()

  const posts = await PostModel
    .find()
    .sort({ publishedAt: -1 })
    .lean()

  return (
    <main>
      <h1>Blog</h1>
      {posts.map((post) => (
        <article key={post._id.toString()}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </main>
  )
}
\`\`\`

**Key points:**
- \`.lean()\` returns plain JavaScript objects instead of Mongoose documents, which is more performant and serializable
- No \`useEffect\`, no loading states — the data is fetched at request time on the server
- The page is automatically server-rendered with fresh data

## Step 7: Build an API Route

While Server Components can query the database directly, you still need API routes for mutations (creating, updating, deleting data) and for client-side fetches.

Create \`app/api/posts/route.ts\`:

\`\`\`typescript
import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import PostModel from '@/models/post'

export async function GET() {
  await connectDB()
  const posts = await PostModel.find().sort({ publishedAt: -1 }).lean()
  return NextResponse.json(posts)
}

export async function POST(request: NextRequest) {
  await connectDB()

  const body = await request.json()
  const { title, slug, content, excerpt } = body

  if (!title || !slug || !content) {
    return NextResponse.json(
      { error: 'Title, slug, and content are required' },
      { status: 400 }
    )
  }

  const post = await PostModel.create({
    title,
    slug,
    content,
    excerpt: excerpt || '',
    publishedAt: new Date(),
  })

  return NextResponse.json(post, { status: 201 })
}
\`\`\`

## Step 8: Add Caching and Revalidation

Next.js gives you fine-grained control over caching. For a blog, you might want pages to be statically generated but revalidate periodically:

\`\`\`typescript
// At the top of your page component
export const revalidate = 3600 // Revalidate every hour
\`\`\`

Or use on-demand revalidation when content changes:

\`\`\`typescript
import { revalidatePath } from 'next/cache'

// After creating/updating a post
revalidatePath('/blog')
\`\`\`

## Step 9: Deploy to Vercel

Deploying a Next.js + MongoDB app to Vercel is straightforward:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add your \`MONGODB_URI\` environment variable in Vercel's project settings
4. Deploy

**Important for MongoDB Atlas:** Make sure to whitelist \`0.0.0.0/0\` in your Atlas Network Access settings, since Vercel's serverless functions use dynamic IP addresses.

## Common Pitfalls and Solutions

### Connection Limits
MongoDB Atlas free tier allows 500 connections. In serverless environments, each function invocation may create a new connection. The singleton pattern we used helps, but also consider:
- Setting \`maxPoolSize\` in your connection options
- Using MongoDB Atlas connection pooling

### Serialization Errors
Mongoose documents contain methods and circular references that can't be serialized. Always use \`.lean()\` when passing data to components, or serialize with \`JSON.parse(JSON.stringify(doc))\`.

### TypeScript Strictness
Define your interfaces separately from Mongoose schemas. Use the interface for your components and the schema for database operations. This keeps your frontend code decoupled from the database layer.

## Wrapping Up

The Next.js + MongoDB stack gives you a productive, full-stack JavaScript environment with excellent performance characteristics. Server Components eliminate the need for most API routes, Mongoose provides robust data modeling, and Vercel makes deployment effortless.

The key takeaways:
- **Use a connection singleton** to prevent multiple connections during development
- **Use \`.lean()\` queries** for better performance and serialization
- **Leverage Server Components** for direct database queries
- **Build API routes** only for mutations and client-side operations
- **Cache strategically** with ISR or on-demand revalidation

Start small, iterate fast, and let the framework handle the complexity.
`,
    },
    {
      title: 'Building a Professional Developer Portfolio',
      slug: 'building-developer-portfolio',
      excerpt:
        'A comprehensive guide to designing and developing a portfolio that actually gets you hired — covering architecture decisions, content strategy, and the technical details that set you apart.',
      mainImage: {
        alt: 'Developer Portfolio',
        imageUrl: '/blog2.png',
      },
      publishedAt: new Date('2025-05-20'),
      author: {
        name: 'Kavya Sharma',
        picture: '/blog2.png',
      },
      content: `# Building a Professional Developer Portfolio

In a competitive job market, your portfolio is your most powerful asset. It's not just a collection of links — it's a demonstration of how you think, build, and communicate. After building my own portfolio and reviewing dozens of others, here's everything I've learned about creating one that actually makes an impact.

## Why You Need a Portfolio (Even with a Great Resume)

A resume tells recruiters *what* you've done. A portfolio shows them *how* you do it. It demonstrates:

- **Your coding ability** — through real, deployed projects
- **Your design sensibility** — through the portfolio itself
- **Your communication skills** — through how you describe your work
- **Your technical depth** — through blog posts and project write-ups

Many developers skip the portfolio because they think their GitHub profile is enough. But raw repositories don't tell a story. A portfolio curates your best work and presents it in a way that non-technical stakeholders (hiring managers, clients) can understand.

## Choosing Your Tech Stack

Your portfolio's tech stack is itself a statement about your skills. Here's what I recommend and why:

### Framework: Next.js

Next.js is the ideal choice for a developer portfolio because it gives you:
- **Server-side rendering** for fast initial loads and SEO
- **Static generation** for pages that rarely change (about, projects)
- **Image optimization** with \`next/image\` — automatic WebP conversion, lazy loading, and responsive sizes
- **File-based routing** — no router configuration needed
- **API routes** if you need backend functionality

### Styling: Tailwind CSS

Tailwind CSS lets you build responsive, consistent UIs rapidly without writing custom CSS files. Combined with a component library like shadcn/ui, you get polished, accessible components with minimal effort.

### Deployment: Vercel

Vercel (the company behind Next.js) offers the smoothest deployment experience:
- Push to GitHub, and your site deploys automatically
- Preview deployments for every pull request
- Edge network for global performance
- Free tier is generous for personal sites

## Architecture and Project Structure

A well-organized codebase makes maintenance easy and demonstrates your engineering discipline:

\`\`\`
portfolio/
├── app/
│   ├── page.tsx              # Home page
│   ├── about/page.tsx        # About page
│   ├── projects/
│   │   ├── page.tsx          # Projects listing
│   │   └── [slug]/page.tsx   # Individual project
│   ├── blog/
│   │   ├── page.tsx          # Blog listing
│   │   └── [slug]/page.tsx   # Individual post
│   └── layout.tsx            # Root layout
├── components/
│   ├── ui/                   # Reusable UI components
│   ├── home/                 # Home page sections
│   ├── layout/               # Navbar, Footer
│   └── shared/               # Shared components
├── lib/                      # Utilities and data
└── public/                   # Static assets
\`\`\`

### Static Data vs. CMS vs. Database

You have three main options for managing content:

**Static data files** (TypeScript arrays/objects):
- Simplest approach — no external dependencies
- Version controlled with your code
- Edit and deploy — changes are instant
- Best for: small portfolios with infrequent updates

**Headless CMS** (Sanity, Contentful, Strapi):
- Visual editing interface
- Good for non-technical content updates
- Best for: portfolios with frequent blog posts or client work

**Database** (MongoDB, PostgreSQL):
- Full control over data structure
- Good learning experience
- Best for: portfolios that double as a full-stack project showcase

For most developers, I recommend starting with static data files and migrating to a CMS or database only when you outgrow them.

## Essential Pages and Sections

### 1. Home Page — The First Impression

Your home page should answer three questions within 5 seconds:
1. **Who are you?** — Name and title
2. **What do you do?** — A concise tagline
3. **What should I do next?** — Clear call-to-action

\`\`\`tsx
<section className="min-h-screen flex items-center">
  <div>
    <p className="text-primary font-mono">Hi, my name is</p>
    <h1 className="text-5xl font-bold mt-2">Kavya Sharma</h1>
    <h2 className="text-3xl text-muted-foreground mt-2">
      I build things for the web.
    </h2>
    <p className="max-w-lg mt-4 text-muted-foreground">
      Full-stack developer specializing in React, Node.js,
      and cloud-native applications.
    </p>
    <div className="flex gap-4 mt-8">
      <Button asChild>
        <Link href="/projects">View My Work</Link>
      </Button>
      <Button variant="outline" asChild>
        <a href="/resume.pdf" download>Download CV</a>
      </Button>
    </div>
  </div>
</section>
\`\`\`

**Additional home page sections to consider:**
- **Tech stack** — visual grid of technologies you work with
- **Featured projects** — your top 3 projects with interactive previews
- **Experience timeline** — work history at a glance
- **GitHub activity** — shows you're actively coding
- **Contact section** — social links and email

### 2. Projects Page — Show, Don't Tell

Each project should include:
- **Title and description** — what the project does and why you built it
- **Technologies used** — displayed as badges/tags
- **Live demo link** — so visitors can try it
- **Source code link** — for those who want to dig deeper
- **Cover image or screenshot** — visual representation

**Writing great project descriptions:**

Bad: *"A chat application built with React and Node.js"*

Good: *"A real-time communication platform supporting direct messaging, group chats, video calls, and screen sharing. Built with React and Node.js, using Socket.io for low-latency WebSocket connections and Stream API for video infrastructure. Handles concurrent sessions with an event-driven architecture."*

The difference? The second version describes the **technical challenges** and **architectural decisions**, not just the ingredients.

### 3. About Page — Your Story

The about page is where personality meets professionalism. Include:
- **A professional photo** — it humanizes your digital presence
- **Your background** — education, career journey, what drives you
- **Skills breakdown** — categorized by frontend, backend, tools, etc.
- **A downloadable resume** — always have a PDF version available

### 4. Blog — Demonstrate Depth

A blog transforms your portfolio from a project showcase to a thought leadership platform. Write about:
- **Tutorials** — teach something you've learned
- **Project deep-dives** — explain the architecture behind your projects
- **Problem-solving stories** — describe bugs you've fixed and how
- **Technology comparisons** — share your perspective on tools and frameworks

Even 2-3 well-written posts can make a significant difference. Quality over quantity.

## Performance Optimization

A slow portfolio is a bad portfolio. Here's how to keep it fast:

### Image Optimization

\`\`\`tsx
import Image from 'next/image'

// Always use next/image instead of <img>
<Image
  src="/project-screenshot.png"
  alt="Project screenshot"
  width={800}
  height={450}
  className="rounded-lg"
  priority // for above-the-fold images
/>
\`\`\`

Next.js automatically:
- Converts images to WebP/AVIF
- Generates responsive sizes
- Lazy loads below-the-fold images
- Prevents Cumulative Layout Shift (CLS)

### Font Loading

\`\`\`tsx
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
\`\`\`

\`next/font\` automatically self-hosts fonts and eliminates layout shift during loading.

### Metadata and SEO

\`\`\`tsx
export const metadata: Metadata = {
  title: 'Kavya Sharma | Full Stack Developer',
  description: 'Portfolio of Kavya Sharma — full-stack developer...',
  openGraph: {
    title: 'Kavya Sharma | Full Stack Developer',
    description: 'Portfolio of Kavya Sharma...',
    url: 'https://kavyasharma.com',
    siteName: 'Kavya Sharma',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
}
\`\`\`

Good metadata ensures your portfolio looks great when shared on LinkedIn, Twitter, or Slack.

## Design Principles

### Dark Mode Support

Most developers prefer dark mode. Implement it with next-themes:

\`\`\`bash
npm install next-themes
\`\`\`

Use CSS variables or Tailwind's \`dark:\` modifier for seamless theme switching. Let the user choose, but default to their system preference.

### Responsive Design

Test on three breakpoints at minimum:
- **Mobile** (375px) — single column, hamburger menu
- **Tablet** (768px) — two columns, adapted navigation
- **Desktop** (1280px) — full layout

### Animations — Less Is More

Subtle animations add polish. Over-the-top animations add loading time and distraction.

Good animations:
- Fade-in on scroll for sections
- Hover effects on project cards
- Smooth page transitions

Bad animations:
- Particle backgrounds
- Auto-playing carousels
- Parallax on every section

### Typography and Spacing

- Use a clean sans-serif font (Inter, Geist, or similar)
- Use a monospace font for code elements and developer-themed accents
- Maintain consistent spacing with a design system (Tailwind's spacing scale)
- Limit your color palette — primary, muted, and accent is enough

## Common Mistakes to Avoid

1. **Too many projects** — Show your best 4-6, not everything you've ever built
2. **Broken links** — Test every external link regularly
3. **No mobile optimization** — Recruiters often browse on phones
4. **Generic descriptions** — "Built with React" tells me nothing about your skills
5. **No call-to-action** — Always make it easy to contact you or view your resume
6. **Outdated content** — Remove old projects that no longer represent your skill level
7. **Over-engineering** — Your portfolio doesn't need microservices. Keep it simple.

## Deployment Checklist

Before you go live, verify:

- [ ] All pages load correctly on mobile and desktop
- [ ] Images are optimized and have alt text
- [ ] Meta tags and Open Graph images are set
- [ ] Resume/CV download works
- [ ] External links open in new tabs
- [ ] Dark mode and light mode both look good
- [ ] Page load time is under 3 seconds
- [ ] No console errors in production
- [ ] Custom 404 page exists
- [ ] Analytics is set up (Vercel Analytics or Google Analytics)

## Final Thoughts

Your portfolio is a living document. It should evolve as you grow as a developer. Don't wait until it's "perfect" to deploy — ship it, share it, and iterate based on feedback.

The best portfolio isn't the one with the flashiest animations or the most projects. It's the one that clearly communicates who you are, what you can build, and why someone should work with you.

Start building. Start shipping. The rest follows.
`,
    },
  ])
  console.log('Seeded blog posts.')

  await mongoose.disconnect()
  console.log('Done! Database seeded successfully.')
}

seed().catch((err) => {
  console.error('Seed error:', err)
  process.exit(1)
})
