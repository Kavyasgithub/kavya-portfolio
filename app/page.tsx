import { connectDB } from '@/lib/mongodb'
import PersonalInfoModel from '@/models/personal-info'
import { PersonalInfo } from '@/types'
import { projects } from '@/lib/data'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { HeroSection } from '@/components/home/hero-section'
import { TechStack } from '@/components/home/tech-stack'
import { ExperienceSection } from '@/components/home/experience-section'
import { FeaturedProjects } from '@/components/home/featured-projects'
import { GitHubActivity } from '@/components/home/github-activity'
import { ContactSection } from '@/components/home/contact-section'
import { AnimateOnScroll } from '@/components/shared/animate-on-scroll'

export const revalidate = 60

export default async function HomePage() {
  await connectDB()

  const personalInfoDoc = await PersonalInfoModel.findOne().lean()

  const personalInfo: PersonalInfo = personalInfoDoc
    ? JSON.parse(JSON.stringify(personalInfoDoc))
    : { _id: '', name: 'Developer', bio: null, socialLinks: [] }

  const recentProjects = projects.slice(0, 3)

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <HeroSection name={personalInfo?.name || 'Developer'} />

      <AnimateOnScroll animation="fade-up">
        <TechStack />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up">
        <ExperienceSection />
      </AnimateOnScroll>

      {/* Featured Projects Section */}
      <AnimateOnScroll animation="fade-up">
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
          <FeaturedProjects projects={recentProjects} />
          <div className="mt-8 text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/projects">View All Projects →</Link>
            </Button>
          </div>
        </section>
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up">
        <GitHubActivity />
      </AnimateOnScroll>

      {/* Blog Section */}
      <AnimateOnScroll animation="fade-up">
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
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up">
        <ContactSection socialLinks={personalInfo?.socialLinks} />
      </AnimateOnScroll>
    </main>
  )
}
