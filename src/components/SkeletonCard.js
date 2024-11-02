import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { Skeleton } from './ui/skeleton'


export default function SkeletonCard() {
  return (
    <Card className="flex flex-col justify-between min-h-[300px]">
      <CardHeader className="bg-gray-200 w-full h-[150px] flex items-center justify-center rounded-t-lg">
        {/* Placeholder for image skeleton */}
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-2 px-4 text-center">
        <Skeleton className="flex h-6 mb-2 w-3/4" /> {/* Adjusted height and width */}
        <Skeleton className="flex h-6 w-1/2" />
      </CardContent>
      <CardFooter className="flex justify-between px-4 pb-4">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>

  )
}
