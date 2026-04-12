import { Skeleton } from '@/components/shared/skeleton'

export default function ProjectDetailLoading() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">
        <div className="order-2 lg:order-1">
          <Skeleton className="aspect-video w-full rounded-2xl" />
        </div>
        <div className="order-1 lg:order-2 space-y-6">
          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-14 w-3/4" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-5 w-2/3" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24 rounded-lg" />
            <Skeleton className="h-10 w-28 rounded-lg" />
            <Skeleton className="h-10 w-20 rounded-lg" />
          </div>
          <Skeleton className="h-12 w-40 rounded-lg" />
        </div>
      </div>
    </main>
  )
}
