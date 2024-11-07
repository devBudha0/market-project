import SkeletonCard from '@/components/SkeletonCard'

export default function loadingSkeleton() {
  return (
    <main>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {"abcdefghijkl".split('').map(i => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </main>
  )
}
