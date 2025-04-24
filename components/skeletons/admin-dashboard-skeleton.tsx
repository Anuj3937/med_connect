export function AdminDashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-lg border h-[120px] animate-pulse bg-muted/50"></div>
        ))}
      </div>
      <div className="rounded-lg border h-[400px] animate-pulse bg-muted/50"></div>
    </div>
  )
}
