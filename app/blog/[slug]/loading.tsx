import { Skeleton } from '@/components/shared/skeleton'

export default function PostDetailLoading() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <article className="mx-auto max-w-3xl">
        <header className="mb-8 text-center space-y-4">
          <Skeleton className="h-5 w-12 mx-auto" />
          <Skeleton className="h-12 w-3/4 mx-auto" />
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-4 w-32" />
          </div>
        </header>
        <Skeleton className="aspect-video w-full rounded-2xl mb-12" />
        <div className="space-y-4">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
          <Skeleton className="h-8 w-1/2 mt-8" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
        </div>
      </article>
    </main>
  )
}
