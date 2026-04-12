'use client'

import { useEffect, useState } from 'react'
import { Flame, TrendingUp, GitCommit } from 'lucide-react'

interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

function generateMockContributions(): ContributionDay[] {
  const contributions: ContributionDay[] = []
  const today = new Date()

  for (let i = 364; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const count = Math.floor(Math.random() * 10)
    const level = (count === 0 ? 0 : Math.min(Math.floor(count / 2) + 1, 4)) as 0 | 1 | 2 | 3 | 4

    contributions.push({
      date: date.toISOString().split('T')[0],
      count,
      level,
    })
  }

  return contributions
}

const levelColors = {
  0: 'bg-muted hover:bg-muted/80',
  1: 'bg-primary/25 hover:bg-primary/35',
  2: 'bg-primary/45 hover:bg-primary/55',
  3: 'bg-primary/70 hover:bg-primary/80',
  4: 'bg-primary hover:bg-primary/90',
}

export function GitHubActivity() {
  const [contributions, setContributions] = useState<ContributionDay[]>([])
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null)

  useEffect(() => {
    setContributions(generateMockContributions())
  }, [])

  const weeks: ContributionDay[][] = []
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7))
  }

  const totalContributions = contributions.reduce((sum, day) => sum + day.count, 0)

  return (
    <section className="w-full py-20">
      <div className="mb-12 text-center">
        <h2 className="mb-4 font-mono text-3xl font-bold">
          <span className="text-primary">{'<'}</span>
          GitHub Activity
          <span className="text-primary">{' />'}</span>
        </h2>
        <p className="text-muted-foreground">
          {totalContributions} contributions in the last year
        </p>
      </div>

      {/* Stats cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Total Contributions', value: totalContributions, icon: GitCommit, color: 'from-blue-500/10 to-cyan-500/10 border-blue-500/20' },
          { label: 'Current Streak', value: '42 days', icon: Flame, color: 'from-orange-500/10 to-red-500/10 border-orange-500/20' },
          { label: 'Longest Streak', value: '127 days', icon: TrendingUp, color: 'from-green-500/10 to-emerald-500/10 border-green-500/20' },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`group relative overflow-hidden rounded-xl border bg-gradient-to-br p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${stat.color}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold text-foreground">{stat.value}</p>
              </div>
              <stat.icon className="h-8 w-8 text-muted-foreground/30 transition-colors group-hover:text-primary/40" />
            </div>
          </div>
        ))}
      </div>

      {/* Contribution graph */}
      <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
        <div className="mb-4 flex items-center justify-end gap-2 text-xs">
          <span className="text-muted-foreground">Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`h-3 w-3 rounded-sm ${levelColors[level as keyof typeof levelColors]}`}
            />
          ))}
          <span className="text-muted-foreground">More</span>
        </div>

        <div className="relative overflow-x-auto pb-2">
          <div className="inline-flex gap-[3px]">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[3px]">
                {week.map((day) => (
                  <div
                    key={day.date}
                    className={`h-[13px] w-[13px] rounded-[3px] transition-all duration-200 cursor-pointer ${
                      levelColors[day.level]
                    } ${hoveredDay?.date === day.date ? 'ring-2 ring-primary ring-offset-1 ring-offset-background scale-125' : ''}`}
                    onMouseEnter={() => setHoveredDay(day)}
                    onMouseLeave={() => setHoveredDay(null)}
                    title={`${day.count} contributions on ${day.date}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {hoveredDay && (
          <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-border bg-popover px-3 py-2 text-sm shadow-sm">
            <span className="font-semibold text-foreground">
              {hoveredDay.count} {hoveredDay.count === 1 ? 'contribution' : 'contributions'}
            </span>
            <span className="text-muted-foreground">on {hoveredDay.date}</span>
          </div>
        )}
      </div>
    </section>
  )
}
