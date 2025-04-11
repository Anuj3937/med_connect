"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HospitalSupplyChainMap } from "@/components/hospital/hospital-supply-chain-map"
import { Button } from "@/components/ui/button"
import { Download, FileText, Plus, RefreshCw, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HospitalInventorySummary } from "@/components/hospital/hospital-inventory-summary"

export default function SupplyChainPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [supplyChainView, setSupplyChainView] = useState("map")

  const handleRefreshData = () => {
    toast({
      title: "Data refreshed",
      description: "Supply chain data has been updated with the latest information.",
    })
  }

  const handleAddSupplier = () => {
    toast({
      title: "Add supplier",
      description: "You can now add a new supplier to your supply chain network.",
    })
  }

  return (
    <div className="container py-6">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Supply Chain Management</h1>
          <p className="text-muted-foreground">
            Track and manage your hospital's supply chain network and inventory flow
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={handleRefreshData}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={handleAddSupplier}>
            <Plus className="mr-2 h-4 w-4" />
            Add Supplier
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Supply Chain Overview</CardTitle>
                <CardDescription>Visualize your entire supply chain network</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">View:</span>
                <Select value={supplyChainView} onValueChange={setSupplyChainView}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select view" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="map">Map View</SelectItem>
                    <SelectItem value="list">List View</SelectItem>
                    <SelectItem value="flow">Flow Diagram</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Supply Chain Network</CardTitle>
              <CardDescription>Interactive visualization of your supply chain</CardDescription>
            </CardHeader>
            <CardContent className="p-0 h-[500px]">
              <HospitalSupplyChainMap />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Critical Supplies</CardTitle>
              <CardDescription>Items requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search supplies..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Tabs defaultValue="critical">
                <TabsList className="w-full">
                  <TabsTrigger value="critical" className="flex-1">
                    Critical
                  </TabsTrigger>
                  <TabsTrigger value="low" className="flex-1">
                    Low Stock
                  </TabsTrigger>
                  <TabsTrigger value="delayed" className="flex-1">
                    Delayed
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="critical" className="mt-4">
                  <HospitalInventorySummary filterStatus="critical" compact={true} />
                </TabsContent>

                <TabsContent value="low" className="mt-4">
                  <HospitalInventorySummary filterStatus="low" compact={true} />
                </TabsContent>

                <TabsContent value="delayed" className="mt-4">
                  <HospitalInventorySummary filterDelayed={true} compact={true} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Supply Chain Analytics</CardTitle>
                <CardDescription>Performance metrics and insights</CardDescription>
              </div>
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="performance">
              <TabsList className="mb-4">
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
                <TabsTrigger value="logistics">Logistics</TabsTrigger>
                <TabsTrigger value="costs">Costs</TabsTrigger>
              </TabsList>

              <TabsContent value="performance">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">On-Time Delivery</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">92%</div>
                      <p className="text-sm text-muted-foreground">+2% from last month</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Order Accuracy</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">98%</div>
                      <p className="text-sm text-muted-foreground">+1% from last month</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Inventory Turnover</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">12.4</div>
                      <p className="text-sm text-muted-foreground">-0.3 from last month</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="suppliers">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">Supplier performance metrics and ratings</p>
                  <div className="rounded-md border">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="py-3 px-4 text-left font-medium">Supplier</th>
                            <th className="py-3 px-4 text-left font-medium">On-Time %</th>
                            <th className="py-3 px-4 text-left font-medium">Quality Score</th>
                            <th className="py-3 px-4 text-left font-medium">Response Time</th>
                            <th className="py-3 px-4 text-left font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-3 px-4 font-medium">MedSupply Inc.</td>
                            <td className="py-3 px-4">98%</td>
                            <td className="py-3 px-4">4.8/5</td>
                            <td className="py-3 px-4">4 hours</td>
                            <td className="py-3 px-4 text-green-500">Active</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-3 px-4 font-medium">PharmaCorp</td>
                            <td className="py-3 px-4">95%</td>
                            <td className="py-3 px-4">4.6/5</td>
                            <td className="py-3 px-4">6 hours</td>
                            <td className="py-3 px-4 text-green-500">Active</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-3 px-4 font-medium">Healthcare Logistics</td>
                            <td className="py-3 px-4">82%</td>
                            <td className="py-3 px-4">3.9/5</td>
                            <td className="py-3 px-4">12 hours</td>
                            <td className="py-3 px-4 text-amber-500">Warning</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="logistics">
                <p>Logistics performance data would be displayed here</p>
              </TabsContent>

              <TabsContent value="costs">
                <p>Cost analysis data would be displayed here</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
