"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HospitalDemandForecast } from "@/components/hospital/hospital-demand-forecast"
import { Button } from "@/components/ui/button"
import { Download, FileText, Share2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export default function DemandForecastPage() {
  const { toast } = useToast()
  const [timeframe, setTimeframe] = useState("6-weeks")

  const handleExportReport = () => {
    toast({
      title: "Report exported",
      description: "The demand forecast report has been exported successfully.",
    })
  }

  const handleShareReport = () => {
    toast({
      title: "Report shared",
      description: "The demand forecast report has been shared with your team.",
    })
  }

  return (
    <div className="container py-6">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Demand Forecast</h1>
          <p className="text-muted-foreground">
            Predict future healthcare demand based on SDoH factors and historical data
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={handleExportReport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" onClick={handleShareReport}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Forecast Settings</CardTitle>
                <CardDescription>Configure your demand forecast parameters</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Timeframe:</span>
                <Select value={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2-weeks">2 Weeks</SelectItem>
                    <SelectItem value="4-weeks">4 Weeks</SelectItem>
                    <SelectItem value="6-weeks">6 Weeks</SelectItem>
                    <SelectItem value="3-months">3 Months</SelectItem>
                    <SelectItem value="6-months">6 Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      <Tabs defaultValue="by-zip-code">
        <TabsList className="mb-6">
          <TabsTrigger value="by-zip-code">By ZIP Code</TabsTrigger>
          <TabsTrigger value="by-service">By Service Type</TabsTrigger>
          <TabsTrigger value="by-sdoh">By SDoH Factors</TabsTrigger>
          <TabsTrigger value="by-resource">By Resource Needs</TabsTrigger>
        </TabsList>

        <TabsContent value="by-zip-code">
          <HospitalDemandForecast />
        </TabsContent>

        <TabsContent value="by-service">
          <HospitalDemandForecast viewType="service" />
        </TabsContent>

        <TabsContent value="by-sdoh">
          <HospitalDemandForecast viewType="sdoh" />
        </TabsContent>

        <TabsContent value="by-resource">
          <HospitalDemandForecast viewType="resource" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
