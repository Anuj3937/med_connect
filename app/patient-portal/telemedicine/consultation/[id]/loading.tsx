import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Clock } from "lucide-react"

export default function ConsultationLoading() {
  return (
    <div className="container py-6 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" disabled>
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>
          <div>
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48 mt-2" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <Skeleton className="h-6 w-16" />
        </div>
      </div>

      <Tabs defaultValue="video" className="space-y-4">
        <TabsList className="grid grid-cols-4 md:w-[600px]">
          <TabsTrigger value="video" disabled>
            Video
          </TabsTrigger>
          <TabsTrigger value="chat" disabled>
            Chat
          </TabsTrigger>
          <TabsTrigger value="documents" disabled>
            Documents
          </TabsTrigger>
          <TabsTrigger value="notes" disabled>
            Notes
          </TabsTrigger>
        </TabsList>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Skeleton className="aspect-video w-full rounded-lg" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-[200px] w-full rounded-lg" />
            <Skeleton className="h-[300px] w-full rounded-lg" />
          </div>
        </div>
      </Tabs>
    </div>
  )
}
