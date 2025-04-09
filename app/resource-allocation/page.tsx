import { Suspense } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, TrendingUp, Clock, Download, Filter, Plus, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

import { ResourceAllocationMap } from "@/components/resource-allocation/resource-allocation-map"
import { ResourceDistributionChart } from "@/components/resource-allocation/resource-distribution-chart"
import { ResourceAllocationTable } from "@/components/resource-allocation/resource-allocation-table"
import { ResourceAllocationSkeleton } from "@/components/skeletons/resource-allocation-skeleton"

export const metadata: Metadata = {
  title: "Resource Allocation | MediConnect",
  description: "Optimize resource allocation based on predicted demand and SDoH factors",
}

export default function ResourceAllocationPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Home</span>
              </Link>
            </Button>
            <h1 className="text-xl font-bold">Resource Allocation</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export Plan
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              New Allocation
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight mb-2">Resource Allocation Planning</h2>
          <p className="text-muted-foreground">
            Optimize distribution of healthcare resources based on predicted demand and SDoH factors
          </p>
        </div>

        <Alert className="mb-6 bg-blue-50 border-blue-200">
          <TrendingUp className="h-4 w-4 text-blue-600" />
          <AlertTitle>Resource Allocation Recommendation</AlertTitle>
          <AlertDescription>
            Based on predicted demand increases in ZIP codes 12345, 23456, and 34567, we recommend redistributing
            respiratory medications and increasing staffing levels at facilities in these areas.
          </AlertDescription>
        </Alert>

        <Suspense fallback={<ResourceAllocationSkeleton />}>
          <Tabs defaultValue="map" className="space-y-8">
            <TabsList>
              <TabsTrigger value="map">Geographic View</TabsTrigger>
              <TabsTrigger value="distribution">Resource Distribution</TabsTrigger>
              <TabsTrigger value="allocation">Allocation Plans</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="map" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resource Allocation Map</CardTitle>
                  <CardDescription>Geographic view of resource allocation based on predicted demand</CardDescription>
                </CardHeader>
                <CardContent className="h-[600px] p-0">
                  <ResourceAllocationMap />
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>High-Priority Allocation Areas</CardTitle>
                    <CardDescription>
                      Areas requiring immediate resource allocation based on SDoH factors
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          zipCode: "12345",
                          location: "Los Angeles, CA",
                          demandChange: 25,
                          resources: ["Respiratory Medications", "Nursing Staff", "Ventilators"],
                          urgency: "high",
                        },
                        {
                          zipCode: "34567",
                          location: "Houston, TX",
                          demandChange: 32,
                          resources: ["Antibiotics", "Doctors", "ICU Beds"],
                          urgency: "high",
                        },
                        {
                          zipCode: "56789",
                          location: "New York, NY",
                          demandChange: 22,
                          resources: ["Mental Health Medications", "Therapists", "Telehealth Equipment"],
                          urgency: "medium",
                        },
                      ].map((area, index) => (
                        <div key={index} className="rounded-lg border p-4">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">
                                  ZIP {area.zipCode} - {area.location}
                                </span>
                                {area.urgency === "high" ? (
                                  <Badge variant="destructive">Urgent</Badge>
                                ) : (
                                  <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
                                    Medium Priority
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <TrendingUp className="h-4 w-4 text-red-500" />
                                <span className="text-red-500">+{area.demandChange}% predicted demand increase</span>
                              </div>
                              <div className="mt-2">
                                <p className="text-sm font-medium">Required Resources:</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {area.resources.map((resource, i) => (
                                    <Badge key={i} variant="secondary" className="text-xs">
                                      {resource}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <Button size="sm">Allocate Resources</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Priority Areas
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Resource Availability</CardTitle>
                    <CardDescription>Available resources for allocation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Respiratory Medications</span>
                          <span className="text-sm">450 units</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: "65%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Antibiotics</span>
                          <span className="text-sm">320 units</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: "45%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Ventilators</span>
                          <span className="text-sm">28 units</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-red-500 rounded-full" style={{ width: "25%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">ICU Beds</span>
                          <span className="text-sm">42 units</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: "40%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Nursing Staff</span>
                          <span className="text-sm">85 available</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: "70%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Manage Resources
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="distribution" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resource Distribution</CardTitle>
                  <CardDescription>Current distribution of resources across facilities</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResourceDistributionChart />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="allocation" className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Clock className="mr-2 h-4 w-4" />
                    Last Updated: 30 minutes ago
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    New Plan
                  </Button>
                </div>
              </div>

              <Card>
                <CardContent className="p-0">
                  <ResourceAllocationTable />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Allocation History</CardTitle>
                  <CardDescription>Historical resource allocation data</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground py-8">
                    Select the History tab to view detailed content
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </Suspense>
      </main>
    </div>
  )
}
