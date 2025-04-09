import { Suspense } from "react"
import type { Metadata } from "next"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HospitalMap } from "@/components/map/hospital-map"
import { HospitalFilters } from "@/components/map/hospital-filters"
import { HospitalList } from "@/components/map/hospital-list"
import { MapSkeleton } from "@/components/skeletons/map-skeleton"
import { HospitalDetailsSidebar } from "@/components/map/hospital-details-sidebar"

export const metadata: Metadata = {
  title: "Hospital Map | MediConnect",
  description: "Interactive map of hospitals and healthcare facilities in the MediConnect network",
}

export default function MapPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <a href="/">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Home</span>
              </a>
            </Button>
            <h1 className="text-xl font-bold">Hospital Map</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Share Map
            </Button>
            <Button size="sm">Request Transfer</Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight mb-2">Interactive Hospital Map</h2>
          <p className="text-muted-foreground">
            View and filter hospitals by capacity, specialty, and available resources. Calculate distances between
            facilities and track ambulances in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card className="mb-6">
              <CardHeader className="pb-0">
                <CardTitle>Hospital Network</CardTitle>
                <CardDescription>Interactive map showing all hospitals in the MediConnect network</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <HospitalFilters />

                <div className="mt-4 rounded-md border overflow-hidden h-[600px]">
                  <Suspense fallback={<MapSkeleton height={600} />}>
                    <HospitalMap />
                  </Suspense>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hospital List</CardTitle>
                <CardDescription>Detailed list of all hospitals in the network</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all">
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">All Hospitals</TabsTrigger>
                    <TabsTrigger value="trauma">Trauma Centers</TabsTrigger>
                    <TabsTrigger value="pediatric">Pediatric</TabsTrigger>
                    <TabsTrigger value="specialty">Specialty</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all">
                    <HospitalList />
                  </TabsContent>

                  <TabsContent value="trauma">
                    <HospitalList filterType="trauma" />
                  </TabsContent>

                  <TabsContent value="pediatric">
                    <HospitalList filterType="pediatric" />
                  </TabsContent>

                  <TabsContent value="specialty">
                    <HospitalList filterType="specialty" />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div>
            <HospitalDetailsSidebar />
          </div>
        </div>
      </main>
    </div>
  )
}
