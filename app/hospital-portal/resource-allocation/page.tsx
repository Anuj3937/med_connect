"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HospitalResourceAllocation } from "@/components/hospital/hospital-resource-allocation"
import { Button } from "@/components/ui/button"
import { Download, FileText, Plus, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ResourceAllocationPage() {
  const { toast } = useToast()
  const [timeframe, setTimeframe] = useState("current")

  const handleRefreshData = () => {
    toast({
      title: "Data refreshed",
      description: "Resource allocation data has been updated with the latest information.",
    })
  }

  const handleOptimizeResources = () => {
    toast({
      title: "Optimization in progress",
      description: "The system is calculating optimal resource allocation based on current demand.",
    })
  }

  return (
    <div className="container py-6">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resource Allocation</h1>
          <p className="text-muted-foreground">Optimize the allocation of beds, staff, and equipment based on demand</p>
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
          <Button onClick={handleOptimizeResources}>
            <Plus className="mr-2 h-4 w-4" />
            Optimize Resources
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Resource Allocation Overview</CardTitle>
                <CardDescription>Current status and optimization recommendations</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Timeframe:</span>
                <Select value={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">Current</SelectItem>
                    <SelectItem value="24-hours">Next 24 Hours</SelectItem>
                    <SelectItem value="7-days">Next 7 Days</SelectItem>
                    <SelectItem value="30-days">Next 30 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Overall Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">78%</div>
            <p className="text-sm text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Bed Occupancy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">82%</div>
            <p className="text-sm text-muted-foreground">+3% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Staff Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">85%</div>
            <p className="text-sm text-muted-foreground">+7% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Equipment Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">72%</div>
            <p className="text-sm text-muted-foreground">+2% from last week</p>
          </CardContent>
        </Card>
      </div>

      <HospitalResourceAllocation />

      <div className="mt-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Resource Allocation Analytics</CardTitle>
                <CardDescription>Performance metrics and optimization insights</CardDescription>
              </div>
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="efficiency">
              <TabsList className="mb-4">
                <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
                <TabsTrigger value="bottlenecks">Bottlenecks</TabsTrigger>
                <TabsTrigger value="predictions">Predictions</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>

              <TabsContent value="efficiency">
                <p className="text-sm text-muted-foreground mb-4">
                  Resource efficiency metrics show how effectively your hospital is utilizing available resources.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Resource Efficiency Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">86/100</div>
                      <p className="text-sm text-muted-foreground">+4 points from last month</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Resource Waste</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">8.2%</div>
                      <p className="text-sm text-muted-foreground">-1.5% from last month</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="bottlenecks">
                <p>Bottleneck analysis would be displayed here</p>
              </TabsContent>

              <TabsContent value="predictions">
                <p>Resource demand predictions would be displayed here</p>
              </TabsContent>

              <TabsContent value="recommendations">
                <p>Resource optimization recommendations would be displayed here</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
