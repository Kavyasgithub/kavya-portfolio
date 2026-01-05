'use client'

import { Code2, Database, GitBranch, Globe, Layers, Server } from 'lucide-react'

interface TechItem {
  name: string
  icon: React.ReactNode
  category: string
}

const techStack: TechItem[] = [
  { name: 'React.js', icon: <Code2 className="h-8 w-8" />, category: 'Frontend' },
  { name: 'Next.js', icon: <Globe className="h-8 w-8" />, category: 'Frontend' },
  { name: 'JavaScript', icon: <Code2 className="h-8 w-8" />, category: 'Language' },
  { name: 'Java', icon: <Code2 className="h-8 w-8" />, category: 'Language' },
  { name: 'Node.js', icon: <Server className="h-8 w-8" />, category: 'Backend' },
  { name: 'MySQL', icon: <Database className="h-8 w-8" />, category: 'Database' },
  { name: 'MongoDB', icon: <Database className="h-8 w-8" />, category: 'Database' },
  { name: 'Docker', icon: <Layers className="h-8 w-8" />, category: 'DevOps' },
  { name: 'Azure', icon: <Globe className="h-8 w-8" />, category: 'Cloud' },
  { name: 'Git', icon: <GitBranch className="h-8 w-8" />, category: 'Tools' },
]

export function TechStack() {
  return (
    <section className="w-full py-20">
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-dot dot-red" />
          <div className="terminal-dot dot-yellow" />
          <div className="terminal-dot dot-green" />
          <span className="ml-2 text-xs text-muted-foreground">tech-stack.tsx</span>
        </div>
        
        <div className="p-6 md:p-8">
          <h2 className="mb-2 font-mono text-sm text-muted-foreground">
            <span className="text-primary">const</span> techStack <span className="text-primary">=</span> {'{'}
          </h2>
          
          <div className="grid grid-cols-2 gap-4 py-6 md:grid-cols-4 lg:gap-6">
            {techStack.map((tech, index) => (
              <div
                key={tech.name}
                className="group relative flex flex-col items-center justify-center rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:scale-105 hover:border-primary hover:shadow-lg hover:shadow-primary/20"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="mb-3 text-primary transition-all duration-300 group-hover:scale-110 group-hover:text-primary">
                  {tech.icon}
                </div>
                <p className="text-center text-sm font-medium">{tech.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{tech.category}</p>
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 -z-10 rounded-lg bg-primary/0 blur-xl transition-all duration-300 group-hover:bg-primary/20" />
              </div>
            ))}
          </div>
          
          <p className="font-mono text-sm text-muted-foreground">{'}'}</p>
        </div>
      </div>
    </section>
  )
}
