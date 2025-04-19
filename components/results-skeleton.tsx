import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ResultsSkeleton() {
  return (
    <div className="space-y-8">
      <div>
        <Skeleton className="h-8 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </div>

      {/* Summary Card Skeleton */}
      <Card className="p-6">
        <Skeleton className="h-6 w-1/4 mb-3" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </Card>

      {/* Tabs Skeleton */}
      <Tabs defaultValue="impacts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="impacts">Impacts</TabsTrigger>
          <TabsTrigger value="mechanisms">Mechanisms</TabsTrigger>
          <TabsTrigger value="evidence">Evidence</TabsTrigger>
        </TabsList>

        <TabsContent value="impacts" className="space-y-6 mt-6">
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/3 mb-3" />
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start">
                  <Skeleton className="h-5 w-5 mr-2 mt-0.5" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Skeleton className="h-6 w-1/3 mb-3" />
            <div className="space-y-2">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-start">
                  <Skeleton className="h-5 w-5 mr-2 mt-0.5" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Citations Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-px w-full" />
        <Skeleton className="h-6 w-1/4 mb-3" />
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>

      {/* Follow-up Form Skeleton */}
      <Card className="p-6 mt-8">
        <Skeleton className="h-6 w-1/3 mb-4" />
        <div className="flex flex-col gap-4 sm:flex-row">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-24" />
        </div>
      </Card>
    </div>
  )
}
