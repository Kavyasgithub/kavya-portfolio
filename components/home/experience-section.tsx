import { experience } from '@/lib/data'
import { Briefcase, MapPin, Calendar } from 'lucide-react'

export function ExperienceSection() {
  return (
    <section className="py-20">
      <div className="mb-16 text-center">
        <h2 className="mb-4 font-mono text-3xl font-bold">
          <span className="text-primary">{'<'}</span>
          Experience
          <span className="text-primary">{' />'}</span>
        </h2>
        <p className="text-muted-foreground">
          Professional journey and internships
        </p>
      </div>

      {/* Timeline */}
      <div className="relative mx-auto max-w-4xl">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent md:left-1/2 md:-translate-x-px" />

        {experience.map((entry, index) => {
          const isLeft = index % 2 === 0

          return (
            <div
              key={entry.company}
              className={`relative mb-12 last:mb-0 flex items-start gap-8 md:gap-0 ${
                isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-6 z-10 -translate-x-1/2 md:left-1/2">
                <div className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-background shadow-lg shadow-primary/20">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" style={{ animationDuration: '3s' }} />
                </div>
              </div>

              {/* Content card */}
              <div className={`ml-16 w-full md:ml-0 md:w-[calc(50%-2.5rem)] ${
                isLeft ? 'md:pr-0' : 'md:pl-0'
              }`}>
                <div className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-500 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
                  {/* Top accent bar */}
                  <div className="h-1 w-full bg-gradient-to-r from-primary via-primary/60 to-transparent" />

                  <div className="p-6">
                    {/* Period badge */}
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                      <Calendar className="h-3 w-3" />
                      {entry.period}
                    </div>

                    {/* Title & Company */}
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {entry.title}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-primary/80">
                      {entry.company}
                    </p>
                    <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {entry.location}
                    </div>

                    {/* Bullets */}
                    <ul className="mt-4 space-y-3">
                      {entry.bullets.map((bullet, i) => (
                        <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/60" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
