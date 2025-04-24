export function QueueManagementSkeleton() {
  return (
    <div className="space-y-8">
      <div className="h-10 w-[400px] rounded-md bg-muted animate-pulse" />

      <div className="grid gap-6 md:grid-cols-4">
        <div className="md:col-span-3 h-[500px] rounded-md bg-muted animate-pulse" />
        <div className="h-[500px] rounded-md bg-muted animate-pulse" />
      </div>
    </div>
  )
}
