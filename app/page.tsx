"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Suspense } from "react"
import Link from "next/link"
import { ArrowRight, Bell, Building2, Clock, FileText, MapPin, PlusCircle, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

import { HospitalCapacityChart } from "@/components/dashboard/hospital-capacity-chart"
import { ResourceAvailabilityChart } from "@/components/dashboard/resource-availability-chart"
import { EmergencyAlertsList } from "@/components/dashboard/emergency-alerts-list"
import { NewsTicker } from "@/components/dashboard/news-ticker"
import { QuickStatCards } from "@/components/dashboard/quick-stat-cards"
import { RecentTransfersList } from "@/components/dashboard/recent-transfers-list"
import { DashboardSkeleton } from "@/components/skeletons/dashboard-skeleton"

export default function HomePage() {
  const router = useRouter()
  const { isLoggedIn, user } = useAuth()

  useEffect(() => {
    // Redirect based on authentication status
    if (isLoggedIn) {
      if (user.type === "patient") {
        router.push("/patient-portal")
      } else if (user.type === "hospital") {
        router.push("/hospital-portal")
      }
    } else {
      router.push("/login")
    }
  }, [isLoggedIn, router, user.type])

  if (isLoggedIn) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 py-16 md:py-24">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Connecting Healthcare Systems When It Matters Most
            </h1>
            <p className="text-blue-100 text-lg md:text-xl mb-8">
              MediConnect helps hospitals coordinate resources, manage patient transfers, and respond to emergencies
              through real-time data sharing and communication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                Request Emergency Resources
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-600">
                Register Your Hospital
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              fill="white"
              d="M47.5,-61.7C59.9,-51.5,67.3,-35.1,71.9,-17.7C76.4,-0.3,78.2,18.1,71.3,32.8C64.4,47.5,49,58.4,32.4,65.5C15.8,72.6,-1.9,75.8,-19.9,72.1C-37.9,68.4,-56.2,57.8,-67.1,42C-78,26.2,-81.5,5.2,-76.9,-13.2C-72.3,-31.7,-59.6,-47.6,-44.7,-57.3C-29.8,-67,-14.9,-70.5,1.3,-72.1C17.4,-73.7,35,-71.9,47.5,-61.7Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
      </section>

      {/* News Ticker */}
      <div className="bg-amber-50 border-y border-amber-200 py-2">
        <div className="container mx-auto px-4">
          <NewsTicker />
        </div>
      </div>

      {/* Main Dashboard */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight mb-2">Healthcare System Dashboard</h2>
          <p className="text-muted-foreground">
            Real-time overview of healthcare resources and emergency status across the network.
          </p>
        </div>

        <Suspense fallback={<DashboardSkeleton />}>
          <div className="mb-8">
            <QuickStatCards />
          </div>

          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList>
              <TabsTrigger value="overview">System Overview</TabsTrigger>
              <TabsTrigger value="hospitals">Hospitals</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="transfers">Patient Transfers</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Hospital Capacity</CardTitle>
                    <CardDescription>Current bed availability across all facilities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <HospitalCapacityChart />
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild>
                      <Link href="/hospitals">
                        View All Hospitals
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Resource Availability</CardTitle>
                    <CardDescription>Critical medical resources across the network</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResourceAvailabilityChart />
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild>
                      <Link href="/resources">
                        Manage Resources
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Recent Patient Transfers</CardTitle>
                    <CardDescription>Last 24 hours of transfer activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentTransfersList />
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild>
                      <Link href="/transfers">
                        View All Transfers
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Emergency Alerts</CardTitle>
                      <Badge variant="destructive" className="ml-2">
                        4 Active
                      </Badge>
                    </div>
                    <CardDescription>Current emergency situations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <EmergencyAlertsList />
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild>
                      <Link href="/alerts">
                        View All Alerts
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <Alert className="bg-blue-50 border-blue-200">
                <Bell className="h-4 w-4 text-blue-600" />
                <AlertTitle>System Notification</AlertTitle>
                <AlertDescription>
                  Quarterly emergency response drill scheduled for all hospitals on July 15th. Please ensure all staff
                  are prepared.
                </AlertDescription>
              </Alert>
            </TabsContent>

            <TabsContent value="hospitals" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Memorial General Hospital</CardTitle>
                    <CardDescription>Level I Trauma Center</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Bed Capacity:</span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium">78%</span>
                          <div className="ml-2 h-2 w-16 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 rounded-full" style={{ width: "78%" }}></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">ICU Availability:</span>
                        <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
                          Critical (2 beds)
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">ER Status:</span>
                        <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
                          High Volume
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-3 flex justify-between">
                    <Button variant="ghost" size="sm" className="text-blue-600">
                      <MapPin className="mr-1 h-4 w-4" />
                      View on Map
                    </Button>
                    <Button variant="ghost" size="sm" className="text-blue-600">
                      <FileText className="mr-1 h-4 w-4" />
                      Details
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>University Medical Center</CardTitle>
                    <CardDescription>Academic Medical Center</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Bed Capacity:</span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium">65%</span>
                          <div className="ml-2 h-2 w-16 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: "65%" }}></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">ICU Availability:</span>
                        <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                          Available (8 beds)
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">ER Status:</span>
                        <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                          Normal
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-3 flex justify-between">
                    <Button variant="ghost" size="sm" className="text-blue-600">
                      <MapPin className="mr-1 h-4 w-4" />
                      View on Map
                    </Button>
                    <Button variant="ghost" size="sm" className="text-blue-600">
                      <FileText className="mr-1 h-4 w-4" />
                      Details
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Riverside Community Hospital</CardTitle>
                    <CardDescription>Community Hospital</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Bed Capacity:</span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium">92%</span>
                          <div className="ml-2 h-2 w-16 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-red-500 rounded-full" style={{ width: "92%" }}></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">ICU Availability:</span>
                        <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
                          Full
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">ER Status:</span>
                        <Badge variant="destructive">Diverting</Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-3 flex justify-between">
                    <Button variant="ghost" size="sm" className="text-blue-600">
                      <MapPin className="mr-1 h-4 w-4" />
                      View on Map
                    </Button>
                    <Button variant="ghost" size="sm" className="text-blue-600">
                      <FileText className="mr-1 h-4 w-4" />
                      Details
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="flex justify-center">
                <Button asChild>
                  <Link href="/hospitals">
                    View All Hospitals
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="resources" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Ventilators</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">42</div>
                    <p className="text-xs text-muted-foreground">Available across network</p>
                    <div className="mt-2 flex items-center text-xs">
                      <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
                        Low Supply
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">ICU Beds</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">18</div>
                    <p className="text-xs text-muted-foreground">Available across network</p>
                    <div className="mt-2 flex items-center text-xs">
                      <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
                        Critical Supply
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Blood Supply (O-)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">86 units</div>
                    <p className="text-xs text-muted-foreground">Available across network</p>
                    <div className="mt-2 flex items-center text-xs">
                      <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                        Adequate Supply
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Isolation Rooms</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-xs text-muted-foreground">Available across network</p>
                    <div className="mt-2 flex items-center text-xs">
                      <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                        Adequate Supply
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center">
                <Button asChild>
                  <Link href="/resources">
                    Manage Resources
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="transfers" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Transfer Requests</CardTitle>
                  <CardDescription>Active transfer requests requiring approval</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">
                              Urgent
                            </Badge>
                            <span className="text-sm font-medium">Transfer #TR-2024-0642</span>
                          </div>
                          <h4 className="font-medium">Riverside Community Hospital → University Medical Center</h4>
                          <p className="text-sm text-muted-foreground">Cardiac patient requiring specialized care</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>Requested 35 minutes ago</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          <Button size="sm">Approve</Button>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="destructive">Emergency</Badge>
                            <span className="text-sm font-medium">Transfer #TR-2024-0641</span>
                          </div>
                          <h4 className="font-medium">Memorial General Hospital → University Medical Center</h4>
                          <p className="text-sm text-muted-foreground">
                            Trauma patient requiring neurosurgical intervention
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>Requested 12 minutes ago</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          <Button size="sm">Approve</Button>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">
                              Standard
                            </Badge>
                            <span className="text-sm font-medium">Transfer #TR-2024-0640</span>
                          </div>
                          <h4 className="font-medium">University Medical Center → Riverside Community Hospital</h4>
                          <p className="text-sm text-muted-foreground">
                            Post-surgical patient returning to local facility
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>Requested 1 hour ago</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          <Button size="sm">Approve</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/transfers">
                      View All Transfer Requests
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </Suspense>
      </main>

      {/* Quick Access Section */}
      <section className="bg-gray-50 border-t py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/map" className="group">
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 transition-all hover:shadow-md hover:border-blue-200">
                <div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-medium text-lg mb-2 group-hover:text-blue-600">Hospital Map</h3>
                <p className="text-sm text-muted-foreground">
                  View interactive map of all facilities and their current status
                </p>
              </div>
            </Link>

            <Link href="/dashboard" className="group">
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 transition-all hover:shadow-md hover:border-blue-200">
                <div className="rounded-full bg-indigo-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Building2 className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="font-medium text-lg mb-2 group-hover:text-blue-600">Hospital Dashboard</h3>
                <p className="text-sm text-muted-foreground">Access your hospital's resource management dashboard</p>
              </div>
            </Link>

            <Link href="/patients" className="group">
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 transition-all hover:shadow-md hover:border-blue-200">
                <div className="rounded-full bg-green-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-medium text-lg mb-2 group-hover:text-blue-600">Patient Portal</h3>
                <p className="text-sm text-muted-foreground">
                  Patient registration, records, and appointment scheduling
                </p>
              </div>
            </Link>

            <Link href="/emergency" className="group">
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 transition-all hover:shadow-md hover:border-blue-200">
                <div className="rounded-full bg-red-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <PlusCircle className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="font-medium text-lg mb-2 group-hover:text-blue-600">Emergency Response</h3>
                <p className="text-sm text-muted-foreground">Coordinate emergency response and resource allocation</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-medium mb-4">MediConnect</h3>
              <p className="text-sm mb-4">
                Connecting healthcare systems when it matters most. Our platform helps hospitals coordinate resources
                and respond to emergencies effectively.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white text-lg font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    Hospital Map
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Patient Portal
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Emergency Response
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Resource Management
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white text-lg font-medium mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Training Videos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    System Status
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Support Center
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white text-lg font-medium mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li>1234 Healthcare Ave</li>
                <li>Suite 500</li>
                <li>Medical City, MC 12345</li>
                <li className="pt-2">support@mediconnect.com</li>
                <li>+1 (555) 123-4567</li>
              </ul>
            </div>
          </div>

          <Separator className="my-8 bg-gray-800" />

          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">© {new Date().getFullYear()} MediConnect. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="text-sm hover:text-white">
                Terms of Service
              </a>
              <a href="#" className="text-sm hover:text-white">
                HIPAA Compliance
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
