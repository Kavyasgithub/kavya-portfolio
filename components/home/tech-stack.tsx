'use client'

import { Code2, Database, GitBranch, Globe, Layers, Server } from 'lucide-react'
import { techStack } from '@/lib/data'

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="h-7 w-7" />,
  Globe: <Globe className="h-7 w-7" />,
  Server: <Server className="h-7 w-7" />,
  Database: <Database className="h-7 w-7" />,
  Layers: <Layers className="h-7 w-7" />,
  GitBranch: <GitBranch className="h-7 w-7" />,
}

const categoryColors: Record<string, string> = {
  Frontend: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
  Backend: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
  Language: 'from-purple-500/20 to-violet-500/20 border-purple-500/30',
  Database: 'from-orange-500/20 to-amber-500/20 border-orange-500/30',
  DevOps: 'from-red-500/20 to-pink-500/20 border-red-500/30',
  Cloud: 'from-sky-500/20 to-indigo-500/20 border-sky-500/30',
  Tools: 'from-gray-500/20 to-slate-500/20 border-gray-500/30',
  AI: 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30',
}

export function TechStack() {
  return (
    <section className="w-full py-20">
      <div className="mb-12 text-center">
        <h2 className="mb-4 font-mono text-3xl font-bold">
          <span className="text-primary">{'<'}</span>
          Tech Stack
          <span className="text-primary">{' />'}</span>
        </h2>
        <p className="text-muted-foreground">
          Technologies I work with
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
        {techStack.map((tech) => (
          <div
            key={tech.name}
            className={`group relative flex flex-col items-center justify-center gap-3 rounded-xl border bg-gradient-to-br p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
              categoryColors[tech.category] || 'from-muted/50 to-muted/30 border-border'
            }`}
          >
            <div className="text-foreground/70 transition-all duration-300 group-hover:text-primary group-hover:scale-110">
              {iconMap[tech.icon]}
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold">{tech.name}</p>
              <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                {tech.category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
