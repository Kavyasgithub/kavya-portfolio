import { Github, ArrowUpRight } from 'lucide-react'
import { profile } from '@/lib/data'

interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

interface ContributionsResponse {
  total: { lastYear: number }
  contributions: ContributionDay[]
}

const levelColors = {
  0: 'bg-foreground/10',
  1: 'bg-primary/25',
  2: 'bg-primary/45',
  3: 'bg-primary/70',
  4: 'bg-primary',
}

const profileUrl = `https://github.com/${profile.githubUsername}`

// Public mirror of GitHub's contribution calendar; no token required.
async function getContributions(): Promise<ContributionsResponse | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${profile.githubUsername}?y=last`,
      { next: { revalidate: 60 * 60 * 12 } }
    )
    if (!res.ok) return null
    return (await res.json()) as ContributionsResponse
  } catch {
    return null
  }
}

export async function GitHubActivity() {
  const data = await getContributions()

  const weeks: ContributionDay[][] = []
  if (data) {
    for (let i = 0; i < data.contributions.length; i += 7) {
      weeks.push(data.contributions.slice(i, i + 7))
    }
  }

  return (
    <section className="w-full py-20">
      <div className="mb-12 text-center">
        <h2 className="mb-4 font-mono text-3xl font-bold">
          <span className="text-primary">{'<'}</span>
          GitHub Activity
          <span className="text-primary">{' />'}</span>
        </h2>
        <p className="text-muted-foreground">
          {data ? `${data.total.lastYear} contributions in the last year` : 'Open source and side projects'}
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <Github className="h-4 w-4" />
            github.com/{profile.githubUsername}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          {data && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground">Less</span>
              {([0, 1, 2, 3, 4] as const).map((level) => (
                <div key={level} className={`h-3 w-3 rounded-sm ${levelColors[level]}`} />
              ))}
              <span className="text-muted-foreground">More</span>
            </div>
          )}
        </div>

        {data ? (
          <div className="overflow-x-auto pb-2">
            <div className="inline-flex gap-[3px]">
              {weeks.map((week) => (
                <div key={week[0].date} className="flex flex-col gap-[3px]">
                  {week.map((day) => (
                    <div
                      key={day.date}
                      className={`h-[13px] w-[13px] rounded-[3px] ${levelColors[day.level]}`}
                      title={`${day.count} ${day.count === 1 ? 'contribution' : 'contributions'} on ${day.date}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Contribution graph is unavailable right now. See the full activity on GitHub.
          </p>
        )}
      </div>
    </section>
  )
}
