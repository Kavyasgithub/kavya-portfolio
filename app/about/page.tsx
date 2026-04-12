import { connectDB } from '@/lib/mongodb'
import PersonalInfoModel from '@/models/personal-info'
import { PersonalInfo } from '@/types'
import { skills, highlights, experience } from '@/lib/data'
import Image from 'next/image'
import { AnimateOnScroll } from '@/components/shared/animate-on-scroll'
import { Download, MapPin, Briefcase, Calendar } from 'lucide-react'

export const revalidate = 60

export default async function AboutPage() {
  await connectDB()

  const personalInfoDoc = await PersonalInfoModel.findOne().lean()
  const personalInfo: PersonalInfo | null = personalInfoDoc
    ? JSON.parse(JSON.stringify(personalInfoDoc))
    : null

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-15" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--background)_100%)]" />

      {/* Floating blurs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* Hero */}
        <div className="flex flex-col items-center text-center mb-20 pt-10">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
            About Me
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="text-foreground">Crafting Digital</span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Experiences
            </span>
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
            A passionate developer dedicated to building scalable, efficient, and user-friendly web applications that make a difference.
          </p>

          {/* Quick highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl w-full">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-border bg-card/80 backdrop-blur-sm hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300 hover:shadow-lg"
              >
                <div className="text-3xl mb-3">{highlight.icon}</div>
                <p className="text-sm font-semibold mb-1">{highlight.title}</p>
                <p className="text-xs text-muted-foreground">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bio Section */}
        <AnimateOnScroll animation="fade-up">
          <section className="mb-20">
            <div className="grid gap-8 lg:grid-cols-5">
              {/* Photo */}
              <div className="lg:col-span-2 flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 blur-xl" />
                  <div className="relative h-80 w-72 overflow-hidden rounded-2xl border-2 border-primary/20 shadow-xl sm:h-96 sm:w-80">
                    <Image
                      src="/profile.jpg"
                      alt="Kavya Sharma"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                  </div>
                </div>
              </div>

              {/* Bio text */}
              <div className="lg:col-span-3 flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="h-8 w-1 rounded-full bg-primary" />
                  My Journey
                </h2>
                <p className="text-foreground/85 leading-relaxed text-base">
                  {personalInfo?.bio ||
                    'I am a dedicated Full Stack Developer with expertise in designing, developing, and deploying scalable web applications. My technical background covers both front-end and back-end development, allowing me to deliver complete and efficient solutions. I focus on writing clean, maintainable code and building applications that are both high-performing and user-friendly. With a strong understanding of system architecture, API integration, and database management, I am well-equipped to contribute to complex development projects. I am continuously expanding my skill set and enjoy working in dynamic, collaborative environments where I can apply problem-solving abilities to create impactful digital solutions.'}
                </p>
              </div>
            </div>
          </section>
        </AnimateOnScroll>

        {/* Experience Timeline */}
        <AnimateOnScroll animation="fade-up">
          <section className="mb-20">
            <h2 className="text-2xl font-bold mb-10 text-center flex items-center justify-center gap-3">
              <Briefcase className="h-6 w-6 text-primary" />
              Work Experience
            </h2>

            <div className="relative mx-auto max-w-3xl">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent sm:left-8" />

              {experience.map((entry, index) => (
                <div key={entry.company} className="relative mb-10 last:mb-0 pl-16 sm:pl-20">
                  {/* Dot */}
                  <div className="absolute left-6 top-1 z-10 -translate-x-1/2 sm:left-8">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary bg-background">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                  </div>

                  <div className="rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        <Calendar className="h-3 w-3" />
                        {entry.period}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {entry.location}
                      </span>
                    </div>
                    <h3 className="text-base font-bold">{entry.title}</h3>
                    <p className="text-sm font-medium text-primary/80">{entry.company}</p>
                    <ul className="mt-3 space-y-2">
                      {entry.bullets.map((bullet, i) => (
                        <li key={i} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                          <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-primary/50" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </AnimateOnScroll>

        {/* Skills Grid */}
        <AnimateOnScroll animation="fade-up">
          <section className="mb-20">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Core Competencies
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="group p-5 rounded-xl border border-border bg-card hover:border-primary/40 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                >
                  <p className="text-center text-sm font-medium group-hover:text-primary transition-colors">
                    {skill}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </AnimateOnScroll>

        {/* CTA */}
        <AnimateOnScroll animation="fade-up">
          <section className="text-center pb-10">
            <a
              href="/KAVYA_RESUME.pdf"
              download="KAVYA_RESUME.pdf"
              className="inline-flex items-center gap-3 rounded-xl border-2 border-primary/50 bg-card px-8 py-4 font-semibold shadow-lg transition-all duration-300 hover:border-primary hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-0.5"
            >
              <Download className="h-5 w-5 text-primary" />
              Download CV
            </a>
          </section>
        </AnimateOnScroll>
      </div>
    </main>
  )
}
