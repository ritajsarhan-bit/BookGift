export default function BookSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      <div className="bg-gray-200 h-56 w-full" />
      <div className="p-4 space-y-3">
        <div className="bg-gray-200 h-4 rounded w-3/4" />
        <div className="bg-gray-200 h-3 rounded w-1/2" />
        <div className="bg-gray-200 h-4 rounded w-1/4 mt-2" />
        <div className="bg-gray-200 h-9 rounded-xl w-full mt-2" />
      </div>
    </div>
  );
}

export function BookGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <BookSkeleton key={i} />
      ))}
    </div>
  );
}
