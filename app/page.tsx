import { client } from '@/lib/sanity.client'
import { personalInfoQuery, projectsQuery } from '@/lib/sanity.queries'
import { PersonalInfo, Project } from '@/types'
import Link from 'next/link'
import { Button } from '@/components/ui/button' 
import { AnimatedCodeText } from '@/components/AnimatedCodeText'
import { TechStack } from '@/components/TechStack'
import { TabbedProjects } from '@/components/TabbedProjects'
import { GitHubContributions } from '@/components/GitHubContributions'
import { ContactSection } from '@/components/ContactSection'
import BlogPostPreview from '@/components/BlogPostPreview'
import { Terminal, Code2, Sparkles } from 'lucide-react'
import Image from 'next/image'
import {Download} from 'lucide-react'

// This tells Next.js to re-fetch the data for this page every 60 seconds.
// This is called Incremental Static Regeneration (ISR).
export const revalidate = 60

export default async function HomePage() {
  // We fetch the data for personal info and projects in parallel.
  // This is more efficient than fetching them one after another.
  const [personalInfo, projects]: [PersonalInfo, Project[]] = await Promise.all([
    client.fetch<PersonalInfo>(personalInfoQuery),
    client.fetch<Project[]>(projectsQuery),
  ])

  // We only want to show a summary of recent projects on the homepage.
  // We'll take the first 3 projects from the list.
  const recentProjects = projects.slice(0, 3)

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Hero Section with Terminal Theme */}
      <section className="relative min-h-[80vh] py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="fade-in-up space-y-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Terminal className="h-4 w-4" />
              <span className="font-mono">developer@portfolio:~$</span>
            </div>
            
            <div>
              <h1 className="mb-4 font-mono text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">
                <span className="text-muted-foreground">const </span>
                <span className="text-primary">developer</span>
                <span className="text-muted-foreground"> = </span>
                <span className="text-foreground">{'{}'}</span>
              </h1>
              
              <div className="font-mono text-xl text-muted-foreground sm:text-2xl">
                <span className="text-primary">{'> '}</span>
                <AnimatedCodeText 
                  texts={[
                    'Full-Stack Developer',
                    'UI/UX Enthusiast',
                    'Open Source Contributor',
                    'Problem Solver'
                  ]}
                  className="text-foreground"
                />
              </div>
            </div>

            <p className="max-w-prose text-lg leading-relaxed text-muted-foreground">
              {'Building elegant solutions to complex problems. Enthusiastic about creating modern, scalable web applications with cutting-edge technologies.'}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-4">
              <Button asChild size="lg" className="gap-2">
                <Link href="/projects">
                  <Code2 className="h-4 w-4" />
                  View Projects
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about">About Me</Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link href="/blog">Blog</Link>
              </Button>
              <Button asChild size="sm" className="font-mono hidden sm:flex">
                  <a href="/cv.pdf" download="CV.pdf">
                    <Download className="h-4 w-4 mr-2" />
                       CV
                  </a>
              </Button>
            </div>
          </div>

          {/* Photo with modern design */}
          <div className="fade-in-up hidden lg:flex justify-center" style={{ animationDelay: '200ms' }}>
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl blur-2xl" />
              <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 via-primary/10 to-transparent rounded-2xl" />
              
              {/* Main photo container */}
              <div className="relative">
                <div className="relative h-[500px] w-[400px] overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background shadow-2xl">
                  <Image
                    src="/profile.jpg"
                    alt="Kavya Sharma - Full-Stack Developer"
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  {/* Subtle overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                </div>
                
                {/* Floating badge */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-primary/20 bg-background/95 px-6 py-3 shadow-lg backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="font-mono text-sm font-medium">Available for work</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: Show smaller photo above content */}
          <div className="fade-in-up flex justify-center lg:hidden mb-8">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-primary/5 rounded-full blur-xl" />
              <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-primary/20 shadow-xl">
                <Image
                  src="/profile.jpg"
                  alt="Kavya Sharma"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="192px"
                />
              </div>
            </div>
          </div>

          {/* Original terminal window - keeping for reference but hidden */}
          <div className="fade-in-up hidden" style={{ animationDelay: '200ms' }}>
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dot dot-red" />
                <div className="terminal-dot dot-yellow" />
                <div className="terminal-dot dot-green" />
                <span className="ml-2 text-xs text-muted-foreground">profile.json</span>
              </div>
              <div className="p-6 font-mono text-sm">
                <pre className="text-muted-foreground">
                  <code>
{`{
  "name": "${personalInfo?.name || 'Developer'}",
  "role": "Full-Stack Developer",
  "location": "Remote",
  "status": "Available for work",
  "skills": [
    "React.js", "Next.js", "JavaScript",
    "Express.js", "Node.js", "MongoDB", "SQL", "Azure", "Docker"
  ],
  "passion": "Clean code ✨"
}`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <TechStack />

      {/* Experience Section */}
      <section className="py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-mono text-3xl font-bold">
            <span className="text-primary">{'<'}</span>
            Experience
            <span className="text-primary">{' />'}</span>
          </h2>
          <p className="text-muted-foreground">
            Professional journey and internships
          </p>
        </div>

        <div className="mx-auto max-w-4xl space-y-8">
          {/* Qlimber Consulting */}
          <div className="group relative">
            <div className="absolute -inset-4 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 blur transition duration-300 group-hover:opacity-100" />
            <div className="relative rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground">Software Development Intern</h3>
                  <p className="mt-1 font-semibold text-primary">Qlimber Consulting Pvt. Ltd.</p>
                  <p className="mt-1 text-sm text-muted-foreground">Faridabad, Haryana</p>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 font-mono text-sm font-medium text-primary">
                  Jul 2025 - Nov 2025
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  <span>Led the design and development of supply chain & logistics product modules, improving efficiency in order tracking and route management.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  <span>Worked on MVC framework to create modular, scalable, and maintainable solutions.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  <span>Collaborated with the product and technical teams to analyze logistics workflows and implement automation features to reduce manual dependencies.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* FIVEPS Digital */}
          <div className="group relative">
            <div className="absolute -inset-4 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 blur transition duration-300 group-hover:opacity-100" />
            <div className="relative rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground">Java Development Intern</h3>
                  <p className="mt-1 font-semibold text-primary">FIVEPS Digital Pvt. Ltd.</p>
                  <p className="mt-1 text-sm text-muted-foreground">Delhi, NCR</p>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 font-mono text-sm font-medium text-primary">
                  Jul 2024 - Aug 2024
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  <span>Developed a desktop-based Airline Management System using <strong className="text-foreground">Java Swing</strong> for flight bookings, passenger records, and scheduling.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  <span>Integrated <strong className="text-foreground">MySQL</strong> database for secure and persistent data storage with CRUD functionality.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  <span>Developed a user-friendly reporting tool for booking data, enhancing analytics and operational efficiency.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-mono text-3xl font-bold">
            <span className="text-primary">{'<'}</span>
            Featured Projects
            <span className="text-primary">{' />'}</span>
          </h2>
          <p className="text-muted-foreground">
            Check out some of my recent work
          </p>
        </div>
        <TabbedProjects projects={recentProjects} />
        <div className="mt-8 text-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/projects">View All Projects →</Link>
          </Button>
        </div>
      </section>

      {/* GitHub Contributions */}
      <GitHubContributions />

      {/* Blog Section */}
      <section className="py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-mono text-3xl font-bold">
            <span className="text-primary">#</span>
            {' Latest Posts'}
          </h2>
          <p className="text-muted-foreground">
            Thoughts on development, design, and technology
          </p>
        </div>
        <div className="flex justify-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/blog">Read All Posts →</Link>
          </Button>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection socialLinks={personalInfo?.socialLinks} />
    </main>
  )
}