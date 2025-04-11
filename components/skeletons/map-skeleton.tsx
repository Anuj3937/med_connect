export function MapSkeleton({ height = 600 }: { height?: number }) {
  return (
    <div
      className="animate-pulse bg-muted rounded-md flex items-center justify-center"
      style={{ height: `${height}px` }}
    >
      <div className="text-center">
        <div className="h-12 w-12 rounded-full bg-muted-foreground/20 mx-auto mb-4"></div>
        <div className="h-4 w-32 bg-muted-foreground/20 mx-auto mb-2 rounded"></div>
        <div className="h-3 w-48 bg-muted-foreground/20 mx-auto rounded"></div>
      </div>
    </div>
  )
}
