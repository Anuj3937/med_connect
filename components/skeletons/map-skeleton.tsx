import { Skeleton } from "@/components/ui/skeleton"

type MapSkeletonProps = {
  height?: number
}

export function MapSkeleton({ height = 400 }: MapSkeletonProps) {
  return (
    <div className="rounded-md overflow-hidden">
      <Skeleton className="w-full" style={{ height: `${height}px` }} />
    </div>
  )
}
