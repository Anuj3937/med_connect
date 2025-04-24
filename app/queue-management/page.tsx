import { Suspense } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Users, Clock, Download, Filter, Plus, RefreshCw, Bell } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import { PatientQueueTable } from "@/components/queue-management/patient-queue-table"
import { QueueManagementSkeleton } from "@/components/skeletons/queue-management-skeleton"
import { QueueStatistics } from "@/components/queue-management/queue-statistics"
import { DepartmentQueueStatus } from "@/components/queue-management/department-queue-status"
import { BedAvailabilityDashboard } from "@/components/queue-management/bed-availability-dashboard"

export const metadata: Metadata = {
  title: "Queue Management | MediConnect",
  description: "Patient queue management and bed availability tracking",
}

export default function QueueManagementPage() {
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
            <h1 className="text-xl font-bold">Queue Management</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Patient
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight mb-2">Patient Queue Management</h2>
          <p className="text-muted-foreground">Manage patient queues, track wait times, and monitor bed availability</p>
        </div>

        <Alert className="mb-6 bg-blue-50 border-blue-200">
          <Bell className="h-4 w-4 text-blue-600" />
          <AlertTitle>Queue Status Update</AlertTitle>
          <AlertDescription>
            The Emergency Department is currently experiencing high volume. Average wait time is 45 minutes. Consider
            redirecting non-urgent cases to Urgent Care.
          </AlertDescription>
        </Alert>

        <Suspense fallback={<QueueManagementSkeleton />}>
          <Tabs defaultValue="queue" className="space-y-8">
            <TabsList>
              <TabsTrigger value="queue">Patient Queue</TabsTrigger>
              <TabsTrigger value="departments">Departments</TabsTrigger>
              <TabsTrigger value="beds">Bed Availability</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="queue" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-4">
                <Card className="md:col-span-3">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle>Current Queue</CardTitle>
                        <CardDescription>Patients currently waiting to be seen</CardDescription>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm">
                          <Filter className="mr-2 h-4 w-4" />
                          Filter
                        </Button>
                        <Button variant="outline" size="sm">
                          <Clock className="mr-2 h-4 w-4" />
                          Last Updated: 2 minutes ago
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <PatientQueueTable />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Queue Statistics</CardTitle>
                    <CardDescription>Current wait times and metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <QueueStatistics />
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Detailed Analytics
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="departments" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Department Queue Status</CardTitle>
                  <CardDescription>Current queue status across all departments</CardDescription>
                </CardHeader>
                <CardContent>
                  <DepartmentQueueStatus />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="beds" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Bed Availability</CardTitle>
                  <CardDescription>Real-time bed availability across all departments</CardDescription>
                </CardHeader>
                <CardContent>
                  <BedAvailabilityDashboard />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Queue Analytics</CardTitle>
                  <CardDescription>Historical queue data and trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] rounded-md border flex items-center justify-center bg-muted/20">
                    <div className="text-center">
                      <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Queue analytics visualization showing historical wait times and patient volume
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        (Chart visualization would be implemented with a library like Chart.js or Recharts)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </Suspense>
      </main>
    </div>
  )
}
