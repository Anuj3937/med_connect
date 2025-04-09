import { ArrowRight, Calendar, Download, Filter, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResourceAllocationChart } from "@/components/resource-allocation-chart"
import { ResourcePlanningTable } from "@/components/resource-planning-table"
import { StaffingForecastChart } from "@/components/staffing-forecast-chart"

export default function ResourcePlanningPage() {
  return (
    <div className="container py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resource Planning</h1>
          <p className="text-muted-foreground">Optimize staffing and resource allocation based on SDoH predictions</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Next 90 Days
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Plan
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="staffing">Staffing</TabsTrigger>
          <TabsTrigger value="supplies">Supplies</TabsTrigger>
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Resource Allocation</CardTitle>
                <CardDescription>Recommended resource distribution based on risk analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ResourceAllocationChart />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Staffing Forecast</CardTitle>
                <CardDescription>Projected staffing needs for the next 90 days</CardDescription>
              </CardHeader>
              <CardContent>
                <StaffingForecastChart />
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Detailed Staffing Plan
                </Button>
              </CardFooter>
            </Card>
          </div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Resource Planning Recommendations</CardTitle>
                <CardDescription>Actionable recommendations based on risk analysis</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ResourcePlanningTable />
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                Generate Comprehensive Plan
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="staffing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Staffing Plan</CardTitle>
              <CardDescription>Detailed staffing allocation and scheduling</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">Select the Staffing tab to view detailed content</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="supplies" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Supplies Management</CardTitle>
              <CardDescription>Inventory and supply chain planning</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">Select the Supplies tab to view detailed content</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="facilities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Facilities Planning</CardTitle>
              <CardDescription>Space allocation and facility management</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">Select the Facilities tab to view detailed content</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
