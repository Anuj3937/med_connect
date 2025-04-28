"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { AlertTriangle, BarChart3, Download, Plus, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { HospitalInventorySummary } from "@/components/hospital/hospital-inventory-summary"
import { HospitalDemandForecast } from "@/components/hospital/hospital-demand-forecast"
import { HospitalSupplyChainMap } from "@/components/hospital/hospital-supply-chain-map"
import { HospitalResourceAllocation } from "@/components/hospital/hospital-resource-allocation"
import { HospitalAlertsList } from "@/components/hospital/hospital-alerts-list"
import { HospitalOrdersList } from "@/components/hospital/hospital-orders-list"
import { HospitalDashboardCards } from "@/components/hospital/hospital-dashboard-cards"
import { HospitalStaffManagement } from "@/components/hospital/hospital-staff-management"
import { HospitalBedManagement } from "@/components/hospital/hospital-bed-management"

export default function HospitalPortalPage() {
  const { user } = useAuth()
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good morning")
    else if (hour < 18) setGreeting("Good afternoon")
    else setGreeting("Good evening")
  }, [])

  const hospitalName = user?.hospitalName || "Lilavati Hospital"
  const hospitalAddress = "A-791, Bandra Reclamation, Bandra West, Mumbai, Maharashtra 400050"
  const hospitalPincode = "400050"

  return (
    <div className="container py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {greeting}, {hospitalName}
        </h1>
        <p className="text-muted-foreground">
          Here's an overview of your hospital's supply chain and resource management.
          <span className="ml-2 text-sm font-medium">PIN Code: {hospitalPincode}</span>
        </p>
      </div>

      <Alert className="mb-6 bg-amber-50 border-amber-200">
        <AlertTriangle className="h-4 w-4 text-amber-600" />
        <AlertTitle>Demand Spike Predicted</AlertTitle>
        <AlertDescription>
          A 20% increase in ER visits is predicted in Bandra West (PIN 400050) within the next 6 weeks due to rising
          dengue cases. Consider increasing staffing and inventory levels.
        </AlertDescription>
      </Alert>

      <HospitalDashboardCards />

      <Tabs defaultValue="inventory" className="space-y-8 mt-8">
        <TabsList>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="staff">Staff Management</TabsTrigger>
          <TabsTrigger value="beds">Bed Management</TabsTrigger>
          <TabsTrigger value="forecast">Demand Forecast</TabsTrigger>
          <TabsTrigger value="supply-chain">Supply Chain</TabsTrigger>
          <TabsTrigger value="resources">Resource Allocation</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Inventory Management</h2>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Inventory
              </Button>
            </div>
          </div>
          <HospitalInventorySummary />
        </TabsContent>

        <TabsContent value="staff" className="space-y-6">
          <HospitalStaffManagement />
        </TabsContent>

        <TabsContent value="beds" className="space-y-6">
          <HospitalBedManagement />
        </TabsContent>

        <TabsContent value="forecast" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Demand Forecast</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Last updated: Today, 2:30 PM</span>
              <Button variant="outline" size="sm">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Details
              </Button>
            </div>
          </div>
          <HospitalDemandForecast />
        </TabsContent>

        <TabsContent value="supply-chain" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Supply Chain Overview</h2>
            <Button variant="outline">
              <Truck className="mr-2 h-4 w-4" />
              Track Shipments
            </Button>
          </div>
          <HospitalSupplyChainMap />
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Resource Allocation</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Request Resources
            </Button>
          </div>
          <HospitalResourceAllocation />
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Track your recent supply orders</CardDescription>
              </CardHeader>
              <CardContent>
                <HospitalOrdersList />
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Orders
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alerts & Notifications</CardTitle>
                <CardDescription>Supply chain alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <HospitalAlertsList />
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Alerts
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
