import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="grid grid-cols-1 gap-5 p-6 justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {Array.from({ length: 20 }).map((_, index) => (
        <Card
          key={index}
          className="w-102 overflow-hidden rounded-xl"
        >
          {/* Image */}
          <div className="flex h-60 items-center justify-center bg-muted p-6">
            <Skeleton className="h-44 w-44 rounded-lg" />
          </div>

          <CardContent className="space-y-4 pt-6">
            {/* Category Badge */}
            <Skeleton className="h-6 w-24 rounded-full" />

            {/* Title */}
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />

            {/* Description */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </div>

            {/* Rating */}
            <div className="flex justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-24" />
            </div>
          </CardContent>

          <CardFooter className="flex items-center justify-between">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-10 w-28 rounded-md" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Loading;