import { Suspense } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, TrendingUp, AlertTriangle, Clock, Download, Filter, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

import { InventoryLevelChart } from "@/components/supply-chain/inventory-level-chart"
import { SupplyChainMap } from "@/components/supply-chain/supply-chain-map"
import { DemandForecastChart } from "@/components/supply-chain/demand-forecast-chart"
import { InventoryAlertsList } from "@/components/supply-chain/inventory-alerts-list"
import { SupplyChainSkeleton } from "@/components/skeletons/supply-chain-skeleton"
import { DrugInventoryTable } from "@/components/supply-chain/drug-inventory-table"
import { ZipCodeDemandTable } from "@/components/supply-chain/zip-code-demand-table"

export const metadata: Metadata = {
  title: "Supply Chain Management | MediConnect",
  description: "Drug inventory and supply chain tracking system for healthcare resources",
}

export default function SupplyChainPage() {
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
            <h1 className="text-xl font-bold">Supply Chain Management</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              New Order
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight mb-2">Drug Inventory & Supply Chain Tracking</h2>
          <p className="text-muted-foreground">
            Monitor inventory levels, track supply chain activities, and predict demand based on SDoH factors
          </p>
        </div>

        <Alert className="mb-6 bg-amber-50 border-amber-200">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertTitle>Predicted Demand Spike</AlertTitle>
          <AlertDescription>
            Based on SDoH factors, we predict a 25% increase in respiratory medication demand in ZIP codes 12345, 23456,
            and 34567 over the next 14 days. Consider increasing inventory levels.
          </AlertDescription>
        </Alert>

        <Suspense fallback={<SupplyChainSkeleton />}>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Critical Inventory Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Items below reorder threshold</p>
                <div className="mt-2 flex items-center text-xs">
                  <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
                    3 Critical Shortages
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Orders awaiting fulfillment</p>
                <div className="mt-2 flex items-center text-xs">
                  <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
                    2 Delayed Shipments
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1.24M</div>
                <p className="text-xs text-muted-foreground">Total inventory valuation</p>
                <div className="mt-2 flex items-center text-xs">
                  <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                    Up 3.2% from last month
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">Items expiring within 90 days</p>
                <div className="mt-2 flex items-center text-xs">
                  <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
                    $85,420 in value
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="demand">Demand Forecast</TabsTrigger>
              <TabsTrigger value="orders">Orders & Shipments</TabsTrigger>
              <TabsTrigger value="vendors">Vendors</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Inventory Levels</CardTitle>
                    <CardDescription>Current inventory levels by category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <InventoryLevelChart />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Demand Forecast</CardTitle>
                    <CardDescription>Predicted demand based on SDoH factors</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DemandForecastChart />
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Supply Chain Map</CardTitle>
                  <CardDescription>Geographic distribution of inventory and demand</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] p-0">
                  <SupplyChainMap />
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>ZIP Code Demand Analysis</CardTitle>
                    <CardDescription>Predicted demand changes by ZIP code based on SDoH factors</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ZipCodeDemandTable />
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Detailed Analysis
                      <TrendingUp className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Inventory Alerts</CardTitle>
                    <CardDescription>Critical inventory issues requiring attention</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <InventoryAlertsList />
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Alerts
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="inventory" className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Clock className="mr-2 h-4 w-4" />
                    Last Updated: 15 minutes ago
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Item
                  </Button>
                </div>
              </div>

              <Card>
                <CardContent className="p-0">
                  <DrugInventoryTable />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="demand" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Demand Forecast</CardTitle>
                  <CardDescription>Detailed demand forecast content will appear here</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground py-8">
                    Select the Demand Forecast tab to view detailed content
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Orders & Shipments</CardTitle>
                  <CardDescription>Detailed orders and shipments content will appear here</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground py-8">
                    Select the Orders & Shipments tab to view detailed content
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vendors" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Vendors</CardTitle>
                  <CardDescription>Detailed vendors content will appear here</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground py-8">
                    Select the Vendors tab to view detailed content
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
