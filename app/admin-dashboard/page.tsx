import { Suspense } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, BarChart3, Download, Filter, Plus, Settings, Activity } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import { SystemOverview } from "@/components/admin/system-overview"
import { AdminDashboardSkeleton } from "@/components/skeletons/admin-dashboard-skeleton"
import { DrugConsumptionAnalytics } from "@/components/admin/drug-consumption-analytics"
import { SystemAlerts } from "@/components/admin/system-alerts"
import { UserActivityLog } from "@/components/admin/user-activity-log"

export const metadata: Metadata = {
  title: "Administrator Dashboard | MediConnect",
  description: "System-wide oversight and management for MediConnect platform",
}

export default function AdminDashboardPage() {
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
            <h1 className="text-xl font-bold">Administrator Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export Reports
            </Button>
            <Button size="sm">
              <Settings className="mr-2 h-4 w-4" />
              System Settings
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight mb-2">System Overview</h2>
          <p className="text-muted-foreground">Monitor system performance, user activity, and resource utilization</p>
        </div>

        <Alert className="mb-6 bg-blue-50 border-blue-200">
          <Activity className="h-4 w-4 text-blue-600" />
          <AlertTitle>System Status</AlertTitle>
          <AlertDescription>
            All systems are operating normally. Last maintenance was performed on July 1, 2024.
          </AlertDescription>
        </Alert>

        <Suspense fallback={<AdminDashboardSkeleton />}>
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList>
              <TabsTrigger value="overview">System Overview</TabsTrigger>
              <TabsTrigger value="drug-analytics">Drug Analytics</TabsTrigger>
              <TabsTrigger value="users">User Management</TabsTrigger>
              <TabsTrigger value="alerts">System Alerts</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <SystemOverview />
            </TabsContent>

            <TabsContent value="drug-analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle>Drug Consumption Analytics</CardTitle>
                      <CardDescription>Track medication usage patterns across the system</CardDescription>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Advanced Analytics
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <DrugConsumptionAnalytics />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle>User Management</CardTitle>
                      <CardDescription>Manage users and their permissions</CardDescription>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                      </Button>
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add User
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <UserActivityLog />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="alerts" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Alerts</CardTitle>
                  <CardDescription>View and manage system alerts and notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <SystemAlerts />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </Suspense>
      </main>
    </div>
  )
}
