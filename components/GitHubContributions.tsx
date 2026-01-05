'use client'

import { useEffect, useState } from 'react'

interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

// Generate mock contribution data (in real app, fetch from GitHub API)
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
  0: 'bg-muted',
  1: 'bg-primary/30',
  2: 'bg-primary/50',
  3: 'bg-primary/70',
  4: 'bg-primary',
}

export function GitHubContributions() {
  const [contributions, setContributions] = useState<ContributionDay[]>([])
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null)

  useEffect(() => {
    setContributions(generateMockContributions())
  }, [])

  // Group contributions by week
  const weeks: ContributionDay[][] = []
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7))
  }

  const totalContributions = contributions.reduce((sum, day) => sum + day.count, 0)

  return (
    <section className="w-full py-20">
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-dot dot-red" />
          <div className="terminal-dot dot-yellow" />
          <div className="terminal-dot dot-green" />
          <span className="ml-2 text-xs text-muted-foreground">github-activity.log</span>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">GitHub Activity</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {totalContributions} contributions in the last year
              </p>
            </div>
            
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground">Less</span>
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`h-3 w-3 rounded-sm ${levelColors[level as keyof typeof levelColors]}`}
                />
              ))}
              <span className="text-muted-foreground">More</span>
            </div>
          </div>

          <div className="relative overflow-x-auto pb-4">
            <div className="inline-flex gap-1">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((day, dayIndex) => (
                    <div
                      key={day.date}
                      className={`h-3 w-3 rounded-sm transition-all duration-200 hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-background ${
                        levelColors[day.level]
                      }`}
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
            <div className="mt-4 rounded-lg border border-border bg-card p-3 text-sm">
              <p className="font-medium">
                {hoveredDay.count} {hoveredDay.count === 1 ? 'contribution' : 'contributions'}
              </p>
              <p className="text-muted-foreground">{hoveredDay.date}</p>
            </div>
          )}

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-sm text-muted-foreground">Total Contributions</p>
              <p className="mt-1 text-2xl font-bold text-primary">{totalContributions}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-sm text-muted-foreground">Current Streak</p>
              <p className="mt-1 text-2xl font-bold text-primary">42 days</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-sm text-muted-foreground">Longest Streak</p>
              <p className="mt-1 text-2xl font-bold text-primary">127 days</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
