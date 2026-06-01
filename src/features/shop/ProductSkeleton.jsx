import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";

export default function ProductSkeleton() {
  return (
    <Card className="w-full">
      <CardContent>
        <Skeleton className="aspect-video w-full" />
      </CardContent>
      <CardHeader>
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-2/3" />
      </CardHeader>
    </Card>
  );
}