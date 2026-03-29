export function ReferralTableSkeleton() {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <div className="animate-pulse">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="flex gap-4 p-4 border-b border-gray-200"
          >
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
          </div>
        ))}
      </div>
    </div>
  )
}
