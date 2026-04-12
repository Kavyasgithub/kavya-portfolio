import { CardGridSkeleton } from '@/components/shared/skeleton'

export default function BlogLoading() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <header className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium text-muted-foreground">Blog</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          The Digital Logbook
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          Insights, tutorials, and stories from my journey through code.
        </p>
      </header>

      <section className="mt-10">
        <CardGridSkeleton count={6} />
      </section>
    </main>
  )
}
