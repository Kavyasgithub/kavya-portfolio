import { Briefcase, User } from 'lucide-react'
import type { ProjectType } from '@/lib/data'

export function ProjectTypeBadge({ type }: { type: ProjectType }) {
  const freelance = type === 'Freelance'
  const Icon = freelance ? Briefcase : User
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
        freelance
          ? 'border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400'
          : 'border border-primary/20 bg-primary/10 text-primary'
      }`}
    >
      <Icon className="h-3 w-3" />
      {freelance ? 'Freelance · Client Project' : 'Personal Project'}
    </span>
  )
}
