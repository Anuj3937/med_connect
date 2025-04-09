"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { AlertTriangle, BarChart3, Download, Plus, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { HospitalInventorySummary } from "@/components/hospital/hospital-inventory-summary"
import { HospitalDemandForecast } from "@/components/hospital/hospital-demand-forecast"
import { HospitalSupplyChainMap } from "@/components/hospital/hospital-supply-chain-map"
import { HospitalResourceAllocation } from "@/components/hospital/hospital-resource-allocation"
import { HospitalAlertsList } from "@/components/hospital/hospital-alerts-list"
import { HospitalOrdersList } from "@/components/hospital/hospital-orders-list"

export default function HospitalPortalPage() {
  const { user } = useAuth()
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good morning")
    else if (hour < 18) setGreeting("Good afternoon")
    else setGreeting("Good evening")
  }, [])

  const hospitalName = user.hospitalName || "Hospital"

  return (
    <div className="container py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {greeting}, {hospitalName}
        </h1>
        <p className="text-muted-foreground">
          Here's an overview of your hospital's supply chain and resource management.
        </p>
      </div>

      <Alert className="mb-6 bg-amber-50 border-amber-200">
        <AlertTriangle className="h-4 w-4 text-amber-600" />
        <AlertTitle>Demand Spike Predicted</AlertTitle>
        <AlertDescription>
          A 20% increase in ER visits is predicted in ZIP code 12345 within the next 6 weeks due to rising unemployment
          rates. Consider increasing staffing and inventory levels.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Inventory Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86%</div>
            <p className="text-xs text-muted-foreground mt-1">Overall inventory level</p>
            <div className="mt-2 flex items-center text-xs">
              <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
                3 items below threshold
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">Orders awaiting delivery</p>
            <div className="mt-2 flex items-center text-xs">
              <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">
                Next delivery: Tomorrow
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Critical Supplies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground mt-1">Items at critical level</p>
            <div className="mt-2 flex items-center text-xs">
              <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
                Urgent: IV Solution (2 days left)
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Resource Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72%</div>
            <p className="text-xs text-muted-foreground mt-1">Overall resource utilization</p>
            <div className="mt-2 flex items-center text-xs">
              <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                Optimal efficiency
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="inventory" className="space-y-8">
        <TabsList>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
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
