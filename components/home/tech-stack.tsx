import { Code2, Database, Layout, Server, Sparkles, Wrench } from 'lucide-react'
import { skillGroups, engineeringPractices, type SkillGroup } from '@/lib/data'

const iconMap: Record<SkillGroup['icon'], typeof Code2> = {
  Code2,
  Layout,
  Server,
  Database,
  Wrench,
  Sparkles,
}

export function TechStack() {
  return (
    <section id="skills" className="w-full scroll-mt-20 py-20">
      <div className="mb-12 text-center">
        <h2 className="mb-4 font-mono text-3xl font-bold">
          <span className="text-primary">{'<'}</span>
          Skills
          <span className="text-primary">{' />'}</span>
        </h2>
        <p className="text-muted-foreground">The stack I use to ship production software</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => {
          const Icon = iconMap[group.icon]
          return (
            <div
              key={group.category}
              className="group rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="font-mono text-sm font-semibold">
                  <span className="text-muted-foreground">const </span>
                  {group.category.toLowerCase().replace(/[^a-z]+/g, '_')}
                </h3>
                <span className="ml-auto font-mono text-xs text-muted-foreground">{group.items.length}</span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground/90 transition-colors group-hover:border-primary/20"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      <div className="mt-6 rounded-xl border border-dashed border-border bg-card/40 p-5">
        <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          <span className="text-primary">#</span> engineering practices
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {engineeringPractices.map((practice) => (
            <li key={practice} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
              {practice}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
