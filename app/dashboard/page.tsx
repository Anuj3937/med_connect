import { Suspense } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Bed,
  Users,
  Stethoscope,
  Ambulance,
  Clock,
  CalendarClock,
  PlusCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { BedCapacityChart } from "@/components/dashboard/bed-capacity-chart"
import { StaffingChart } from "@/components/dashboard/staffing-chart"
import { PatientFlowChart } from "@/components/dashboard/patient-flow-chart"
import { ResourceUsageChart } from "@/components/dashboard/resource-usage-chart"
import { DashboardSkeleton } from "@/components/skeletons/dashboard-skeleton"
import { HospitalAlerts } from "@/components/dashboard/hospital-alerts"
import { TransferRequestTable } from "@/components/dashboard/transfer-request-table"

export const metadata: Metadata = {
  title: "Hospital Dashboard | MediConnect",
  description: "Hospital resource management dashboard for MediConnect",
}

export default function DashboardPage() {
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
            <h1 className="text-xl font-bold">Hospital Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                3
              </span>
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>MD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-1">Memorial General Hospital</h2>
            <p className="text-muted-foreground">Hospital resource management dashboard</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Clock className="mr-2 h-4 w-4" />
              Last Updated: 5 minutes ago
            </Button>
            <Button variant="outline" size="sm">
              <CalendarClock className="mr-2 h-4 w-4" />
              July 10, 2024
            </Button>
            <Button size="sm">
              <Bell className="mr-2 h-4 w-4" />
              Send Alert
            </Button>
          </div>
        </div>

        <Alert className="mb-6 bg-amber-50 border-amber-200">
          <Bell className="h-4 w-4 text-amber-600" />
          <AlertTitle>High Patient Volume Alert</AlertTitle>
          <AlertDescription>
            Emergency Department is experiencing high patient volume. Consider diverting non-critical patients to
            alternate facilities.
          </AlertDescription>
        </Alert>

        <Suspense fallback={<DashboardSkeleton />}>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Bed Occupancy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <div className="mt-1 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "78%" }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">312 of 400 beds occupied</p>
                <div className="mt-2 flex items-center text-xs">
                  <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
                    High Occupancy
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">ICU Capacity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <div className="mt-1 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: "92%" }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">46 of 50 ICU beds occupied</p>
                <div className="mt-2 flex items-center text-xs">
                  <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
                    Critical Capacity
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Staff On Duty</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">142</div>
                <p className="text-xs text-muted-foreground mt-1">24 doctors, 86 nurses, 32 support</p>
                <div className="mt-2 flex items-center text-xs">
                  <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                    Adequate Staffing
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">ER Wait Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">48 min</div>
                <p className="text-xs text-muted-foreground mt-1">Average wait for non-critical patients</p>
                <div className="mt-2 flex items-center text-xs">
                  <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
                    Above Average
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="beds">Bed Management</TabsTrigger>
              <TabsTrigger value="staff">Staffing</TabsTrigger>
              <TabsTrigger value="transfers">Patient Transfers</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Bed Capacity Trend</CardTitle>
                    <CardDescription>Last 24 hours of bed utilization</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BedCapacityChart />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Patient Flow</CardTitle>
                    <CardDescription>Admissions and discharges over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PatientFlowChart />
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Active Alerts</CardTitle>
                    <CardDescription>Current alerts requiring attention</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <HospitalAlerts />
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/alerts">
                        View All Alerts
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Department Status</CardTitle>
                    <CardDescription>Current status by department</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-red-500"></div>
                          <span className="text-sm font-medium">Emergency</span>
                        </div>
                        <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
                          High Volume
                        </Badge>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                          <span className="text-sm font-medium">ICU</span>
                        </div>
                        <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
                          Near Capacity
                        </Badge>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span className="text-sm font-medium">Surgery</span>
                        </div>
                        <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                          Normal
                        </Badge>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span className="text-sm font-medium">Pediatrics</span>
                        </div>
                        <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                          Normal
                        </Badge>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                          <span className="text-sm font-medium">Maternity</span>
                        </div>
                        <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
                          Busy
                        </Badge>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span className="text-sm font-medium">Cardiology</span>
                        </div>
                        <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                          Normal
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="beds" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Bed Allocation by Department</CardTitle>
                    <CardDescription>Current bed usage across departments</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[400px]">
                    <BedCapacityChart detailed />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Bed Types</CardTitle>
                    <CardDescription>Availability by bed type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">General Ward</span>
                          <span className="text-sm">72% (216/300)</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: "72%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">ICU Beds</span>
                          <span className="text-sm">92% (46/50)</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-red-500 rounded-full" style={{ width: "92%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Pediatric</span>
                          <span className="text-sm">65% (26/40)</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: "65%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Maternity</span>
                          <span className="text-sm">80% (24/30)</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: "80%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Isolation</span>
                          <span className="text-sm">40% (8/20)</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: "40%" }}></div>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Beds</span>
                      <span className="text-sm font-medium">78% (312/400)</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Manage Bed Allocation
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Projected Bed Needs</CardTitle>
                  <CardDescription>Forecasted bed requirements for next 24 hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Alert className="bg-blue-50 border-blue-200">
                      <Bell className="h-4 w-4 text-blue-600" />
                      <AlertTitle>Forecast Alert</AlertTitle>
                      <AlertDescription>
                        Based on current admission trends, ICU capacity is projected to reach 98% within the next 12
                        hours. Consider preparing for potential transfers or additional staffing.
                      </AlertDescription>
                    </Alert>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Bed className="h-5 w-5 text-blue-600" />
                          <h3 className="font-medium">General Ward</h3>
                        </div>
                        <div className="text-2xl font-bold mb-1">+14 beds</div>
                        <p className="text-sm text-muted-foreground">Projected additional need</p>
                      </div>

                      <div className="rounded-lg border p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Bed className="h-5 w-5 text-red-600" />
                          <h3 className="font-medium">ICU</h3>
                        </div>
                        <div className="text-2xl font-bold mb-1">+3 beds</div>
                        <p className="text-sm text-muted-foreground">Projected additional need</p>
                      </div>

                      <div className="rounded-lg border p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Bed className="h-5 w-5 text-green-600" />
                          <h3 className="font-medium">Pediatric</h3>
                        </div>
                        <div className="text-2xl font-bold mb-1">-2 beds</div>
                        <p className="text-sm text-muted-foreground">Projected decrease in need</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Prepare Contingency Plan</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="staff" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Staff Distribution</CardTitle>
                    <CardDescription>Current staffing levels by role</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <StaffingChart />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Staff Coverage</CardTitle>
                    <CardDescription>Staff-to-patient ratios by department</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Emergency Department</span>
                          <span className="text-sm">1:4 (Nurse:Patient)</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: "75%" }}></div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Recommended ratio: 1:3</p>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">ICU</span>
                          <span className="text-sm">1:2 (Nurse:Patient)</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: "100%" }}></div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Recommended ratio: 1:2</p>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">General Ward</span>
                          <span className="text-sm">1:6 (Nurse:Patient)</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: "83%" }}></div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Recommended ratio: 1:5</p>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Pediatrics</span>
                          <span className="text-sm">1:4 (Nurse:Patient)</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: "100%" }}></div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Recommended ratio: 1:4</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Specialist Availability</CardTitle>
                  <CardDescription>On-call specialists and response times</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left font-medium py-2 px-4">Specialty</th>
                          <th className="text-left font-medium py-2 px-4">On-Call Physician</th>
                          <th className="text-left font-medium py-2 px-4">Status</th>
                          <th className="text-left font-medium py-2 px-4">Response Time</th>
                          <th className="text-left font-medium py-2 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 px-4">Neurosurgery</td>
                          <td className="py-2 px-4">Dr. Sarah Chen</td>
                          <td className="py-2 px-4">
                            <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                              Available
                            </Badge>
                          </td>
                          <td className="py-2 px-4">15 min</td>
                          <td className="py-2 px-4">
                            <Button variant="ghost" size="sm">
                              Contact
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">Cardiology</td>
                          <td className="py-2 px-4">Dr. Michael Rodriguez</td>
                          <td className="py-2 px-4">
                            <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                              Available
                            </Badge>
                          </td>
                          <td className="py-2 px-4">10 min</td>
                          <td className="py-2 px-4">
                            <Button variant="ghost" size="sm">
                              Contact
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">Orthopedics</td>
                          <td className="py-2 px-4">Dr. James Wilson</td>
                          <td className="py-2 px-4">
                            <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
                              In Surgery
                            </Badge>
                          </td>
                          <td className="py-2 px-4">45 min</td>
                          <td className="py-2 px-4">
                            <Button variant="ghost" size="sm">
                              Contact
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">Pediatric Surgery</td>
                          <td className="py-2 px-4">Dr. Emily Johnson</td>
                          <td className="py-2 px-4">
                            <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                              Available
                            </Badge>
                          </td>
                          <td className="py-2 px-4">20 min</td>
                          <td className="py-2 px-4">
                            <Button variant="ghost" size="sm">
                              Contact
                            </Button>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4">Anesthesiology</td>
                          <td className="py-2 px-4">Dr. Robert Kim</td>
                          <td className="py-2 px-4">
                            <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
                              Unavailable
                            </Badge>
                          </td>
                          <td className="py-2 px-4">120 min</td>
                          <td className="py-2 px-4">
                            <Button variant="ghost" size="sm">
                              Contact Backup
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex justify-between w-full">
                    <Button variant="outline">
                      <Stethoscope className="mr-2 h-4 w-4" />
                      Update On-Call Schedule
                    </Button>
                    <Button>
                      <Users className="mr-2 h-4 w-4" />
                      Request Additional Staff
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="transfers" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Transfer Requests</CardTitle>
                  <CardDescription>Incoming and outgoing transfer requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="incoming">
                    <TabsList className="mb-4">
                      <TabsTrigger value="incoming">Incoming Transfers</TabsTrigger>
                      <TabsTrigger value="outgoing">Outgoing Transfers</TabsTrigger>
                      <TabsTrigger value="completed">Completed Transfers</TabsTrigger>
                    </TabsList>

                    <TabsContent value="incoming">
                      <TransferRequestTable direction="incoming" />
                    </TabsContent>

                    <TabsContent value="outgoing">
                      <TransferRequestTable direction="outgoing" />
                    </TabsContent>

                    <TabsContent value="completed">
                      <TransferRequestTable direction="completed" />
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter>
                  <div className="flex justify-between w-full">
                    <Button variant="outline">
                      <Ambulance className="mr-2 h-4 w-4" />
                      View Transport Status
                    </Button>
                    <Button>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      New Transfer Request
                    </Button>
                  </div>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Transfer Capacity</CardTitle>
                  <CardDescription>Current capacity to accept patient transfers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Bed className="h-5 w-5 text-blue-600" />
                          <h3 className="font-medium">General Ward</h3>
                        </div>
                        <div className="text-2xl font-bold mb-1">12 beds</div>
                        <p className="text-sm text-muted-foreground">Available for transfers</p>
                      </div>

                      <div className="rounded-lg border p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Bed className="h-5 w-5 text-red-600" />
                          <h3 className="font-medium">ICU</h3>
                        </div>
                        <div className="text-2xl font-bold mb-1">2 beds</div>
                        <p className="text-sm text-muted-foreground">Available for transfers</p>
                      </div>

                      <div className="rounded-lg border p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Bed className="h-5 w-5 text-green-600" />
                          <h3 className="font-medium">Pediatric</h3>
                        </div>
                        <div className="text-2xl font-bold mb-1">6 beds</div>
                        <p className="text-sm text-muted-foreground">Available for transfers</p>
                      </div>
                    </div>

                    <Alert className="bg-blue-50 border-blue-200">
                      <Bell className="h-4 w-4 text-blue-600" />
                      <AlertTitle>Transfer Recommendation</AlertTitle>
                      <AlertDescription>
                        Based on current capacity and staffing, we recommend limiting new ICU transfer acceptances for
                        the next 12 hours.
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Update Transfer Capacity</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="resources" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Resource Usage</CardTitle>
                    <CardDescription>Critical resource utilization over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResourceUsageChart />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Critical Supplies</CardTitle>
                    <CardDescription>Current inventory of critical supplies</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Ventilators</span>
                          <span className="text-sm">18/25 in use (72%)</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: "72%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">IV Pumps</span>
                          <span className="text-sm">142/180 in use (79%)</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: "79%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Isolation Gowns</span>
                          <span className="text-sm">1,250 units (5 day supply)</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: "60%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">N95 Respirators</span>
                          <span className="text-sm">850 units (3 day supply)</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: "40%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Blood Products (O-)</span>
                          <span className="text-sm">24 units (critical)</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-red-500 rounded-full" style={{ width: "20%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Manage Inventory
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Resource Requests</CardTitle>
                  <CardDescription>Pending resource requests from departments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="destructive">Urgent</Badge>
                            <span className="text-sm font-medium">Request #RQ-2024-0128</span>
                          </div>
                          <h4 className="font-medium">Emergency Department</h4>
                          <p className="text-sm text-muted-foreground">
                            Additional ventilators (2) needed for incoming trauma patients
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>Requested 15 minutes ago</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Deny
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
                            <span className="text-sm font-medium">Request #RQ-2024-0127</span>
                          </div>
                          <h4 className="font-medium">ICU</h4>
                          <p className="text-sm text-muted-foreground">Additional IV pumps (5) for new admissions</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>Requested 45 minutes ago</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Deny
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
                            <span className="text-sm font-medium">Request #RQ-2024-0126</span>
                          </div>
                          <h4 className="font-medium">Surgery Department</h4>
                          <p className="text-sm text-muted-foreground">
                            Additional surgical gowns (50) for upcoming procedures
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>Requested 2 hours ago</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Deny
                          </Button>
                          <Button size="sm">Approve</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Resource Requests
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </Suspense>
      </main>
    </div>
  )
}
