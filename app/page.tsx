import { featuredProjects } from '@/lib/data'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { HeroSection } from '@/components/home/hero-section'
import { TechStack } from '@/components/home/tech-stack'
import { ExperienceSection } from '@/components/home/experience-section'
import { FeaturedProjects } from '@/components/home/featured-projects'
import { GitHubActivity } from '@/components/home/github-activity'
import { ContactSection } from '@/components/home/contact-section'
import { AnimateOnScroll } from '@/components/shared/animate-on-scroll'

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <HeroSection />

      <AnimateOnScroll animation="fade-up">
        <section id="work" className="scroll-mt-20 py-20">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-mono text-3xl font-bold">
              <span className="text-primary">{'<'}</span>
              Featured Work
              <span className="text-primary">{' />'}</span>
            </h2>
            <p className="text-muted-foreground">
              Production systems I&apos;ve designed and built end-to-end
            </p>
          </div>
          <FeaturedProjects projects={featuredProjects} />
          <div className="mt-10 text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/projects">View All Projects →</Link>
            </Button>
          </div>
        </section>
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up">
        <ExperienceSection />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up">
        <TechStack />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up">
        <GitHubActivity />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up">
        <ContactSection />
      </AnimateOnScroll>
    </div>
  )
}
