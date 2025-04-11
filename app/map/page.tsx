import { Suspense } from "react"
import type { Metadata } from "next"
import { ArrowLeft, Filter, Download, Share2, Layers, MapIcon, Info, Bell } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HospitalMap } from "@/components/map/hospital-map"
import { HospitalList } from "@/components/map/hospital-list"
import { MapSkeleton } from "@/components/skeletons/map-skeleton"
import { HospitalDetailsSidebar } from "@/components/map/hospital-details-sidebar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const metadata: Metadata = {
  title: "Hospital Map | MediConnect",
  description: "Interactive map of hospitals and healthcare facilities in the MediConnect network",
}

export default function MapPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <a href="/">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Home</span>
              </a>
            </Button>
            <div>
              <h1 className="text-xl font-bold flex items-center">
                <MapIcon className="mr-2 h-5 w-5 text-blue-600" />
                Hospital Network Map
              </h1>
              <p className="text-sm text-muted-foreground">Real-time healthcare facility status and coordination</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button size="sm">
              <Bell className="mr-2 h-4 w-4" />
              Alerts
              <Badge className="ml-2 bg-red-500 hover:bg-red-600">3</Badge>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <Card className="overflow-hidden border-blue-100 dark:border-blue-900/40 shadow-md">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/10 pb-0">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center text-blue-700 dark:text-blue-400">
                      <Layers className="mr-2 h-5 w-5" />
                      Interactive Hospital Map
                    </CardTitle>
                    <CardDescription>
                      View real-time hospital capacity, resources, and emergency status across the network
                    </CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Hospital Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Hospitals</SelectItem>
                        <SelectItem value="trauma">Trauma Centers</SelectItem>
                        <SelectItem value="pediatric">Pediatric</SelectItem>
                        <SelectItem value="specialty">Specialty</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      Filters
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Info className="mr-2 h-4 w-4" />
                      Legend
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="p-4 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/10 dark:to-transparent">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow">
                      <Input placeholder="Search by hospital name, location, or specialty..." className="pr-10" />
                      <Button variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Find Nearest
                      </Button>
                      <Button variant="outline" size="sm">
                        Clear
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="rounded-md overflow-hidden h-[600px] relative">
                  <Suspense fallback={<MapSkeleton height={600} />}>
                    <HospitalMap />
                  </Suspense>

                  {/* Status indicator overlay */}
                  <div className="absolute bottom-4 left-4 z-20 bg-background/90 p-3 rounded-md shadow-md border">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-xs font-medium">Live Data</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">Last updated: Just now</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md border-blue-100 dark:border-blue-900/40">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Hospital Network Status</CardTitle>
                    <CardDescription>Comprehensive view of all facilities in the network</CardDescription>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800"
                  >
                    42 Facilities
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="mb-4 w-full justify-start bg-blue-50/50 dark:bg-blue-950/20">
                    <TabsTrigger
                      value="all"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-background"
                    >
                      All Hospitals
                    </TabsTrigger>
                    <TabsTrigger
                      value="trauma"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-background"
                    >
                      Trauma Centers
                    </TabsTrigger>
                    <TabsTrigger
                      value="pediatric"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-background"
                    >
                      Pediatric
                    </TabsTrigger>
                    <TabsTrigger
                      value="specialty"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-background"
                    >
                      Specialty
                    </TabsTrigger>
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
            <Card className="sticky top-20 shadow-md border-blue-100 dark:border-blue-900/40">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/10">
                <CardTitle className="text-blue-700 dark:text-blue-400">Hospital Details</CardTitle>
                <CardDescription>Select a hospital on the map to view details</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <HospitalDetailsSidebar />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
