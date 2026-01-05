// /app/about/page.tsx

import { client } from '@/lib/sanity.client'
import { personalInfoQuery } from '@/lib/sanity.queries'
import { PersonalInfo } from '@/types'
import Image from 'next/image'

// This is a powerful Next.js feature called Incremental Static Regeneration (ISR).
// It tells Next.js to treat this page as static, but to re-generate it in the
// background at most once every 60 seconds if new requests come in.
// This provides a super-fast user experience while keeping content fresh.
export const revalidate = 60

/**
 * The AboutPage component fetches and displays detailed personal information.
 * It leverages React Server Components for efficient, server-side data fetching.
 */
export default async function AboutPage() {
  // We fetch the personalInfo data using the same query as the homepage.
  // This demonstrates the reusability of our centralized query library.
  // The <PersonalInfo> generic ensures our data is fully typed.
  const personalInfo: PersonalInfo = await client.fetch(personalInfoQuery)

  const skills = [
    'Full Stack Development',
    'System Architecture',
    'API Integration',
    'Database Management',
    'Front-end Development',
    'Back-end Development',
    'Problem Solving',
    'Collaboration'
  ]

  const highlights = [
    {
      icon: '💼',
      title: 'Professional',
      description: 'Dedicated to delivering high-quality solutions'
    },
    {
      icon: '🚀',
      title: 'Innovative',
      description: 'Continuously learning and adapting to new technologies'
    },
    {
      icon: '🎯',
      title: 'Results-Driven',
      description: 'Focus on creating impactful digital experiences'
    }
  ]

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/professional-photo.jpg"
          alt="Professional Background"
          fill
          className="object-cover object-center opacity-20 dark:opacity-10"
          priority
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/85"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center text-center mb-16 min-h-[60vh]">
          {/* Header Content */}
          <div className="space-y-6 max-w-4xl">
            <div className="inline-block">
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium animate-fade-in backdrop-blur-sm">
                About Me
              </span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight animate-slide-up">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                Crafting Digital
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary animate-gradient-x">
                Experiences
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed animate-fade-in-delay max-w-3xl mx-auto">
              A passionate developer dedicated to building scalable, efficient, and user-friendly web applications that make a difference.
            </p>

            {/* Floating badge */}
            <div className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-xl shadow-lg backdrop-blur-sm">
              <p className="font-semibold">Full Stack Developer</p>
            </div>

            {/* Quick highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 max-w-3xl mx-auto">
              {highlights.map((highlight, index) => (
                <div 
                  key={index}
                  className="text-center p-6 rounded-xl bg-card/80 border border-border/50 backdrop-blur-md hover:bg-card hover:scale-105 transition-all duration-300 shadow-lg"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-4xl mb-2">{highlight.icon}</div>
                  <p className="text-sm font-semibold mb-1">{highlight.title}</p>
                  <p className="text-xs text-muted-foreground">{highlight.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <section className="mb-16">
          <div className="relative rounded-3xl border border-border/50 bg-card/80 backdrop-blur-md p-8 sm:p-12 shadow-xl overflow-hidden group hover:shadow-2xl transition-shadow duration-500">
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl transform translate-x-32 -translate-y-32 group-hover:translate-x-24 group-hover:-translate-y-24 transition-transform duration-700"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-primary rounded-full"></span>
                My Journey
              </h2>
              <div className="prose prose-neutral max-w-none dark:prose-invert prose-lg">
                <p className="text-foreground/90 leading-relaxed whitespace-pre-line">
                  {personalInfo?.bio ||
                    'I am a dedicated Full Stack Developer with expertise in designing, developing, and deploying scalable web applications. My technical background covers both front-end and back-end development, allowing me to deliver complete and efficient solutions. I focus on writing clean, maintainable code and building applications that are both high-performing and user-friendly. With a strong understanding of system architecture, API integration, and database management, I am well-equipped to contribute to complex development projects. I am continuously expanding my skill set and enjoy working in dynamic, collaborative environments where I can apply problem-solving abilities to create impactful digital solutions.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Core Competencies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-xl border border-border/50 bg-card/80 backdrop-blur-md hover:bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-accent/5 rounded-xl transition-all duration-300"></div>
                <p className="relative text-center font-medium text-sm group-hover:text-primary transition-colors duration-300">
                  {skill}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">  
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-accent/20 blur-2xl rounded-full"></div>
              <a 
                href="/cv.pdf" 
                download="CV.pdf"
                className="relative flex items-center gap-2 bg-card/80 backdrop-blur-md border-2 border-primary/50 text-foreground px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:border-primary transform hover:scale-105 transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download CV
              </a>
            </div>
          </div>
        </section>
       </div>
    </main>
  )
}