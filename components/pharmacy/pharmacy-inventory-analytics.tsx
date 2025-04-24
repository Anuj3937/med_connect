"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/components/auth-provider"
import { Calendar, Filter } from "lucide-react"

export function PharmacyInventoryAnalytics() {
  const { selectedHospital } = useAuth()
  const [timeframe, setTimeframe] = useState("30days")
  const [category, setCategory] = useState("all")

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Inventory Analytics</CardTitle>
            <CardDescription>
              Analyze inventory trends and consumption patterns for {selectedHospital?.name || "your hospital"}
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[150px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="90days">Last 90 Days</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
              </SelectContent>
            </Select>

            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="prescription">Prescription</SelectItem>
                <SelectItem value="otc">OTC</SelectItem>
                <SelectItem value="supplies">Supplies</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="consumption">
          <TabsList className="mb-4">
            <TabsTrigger value="consumption">Consumption</TabsTrigger>
            <TabsTrigger value="stockLevels">Stock Levels</TabsTrigger>
            <TabsTrigger value="expiryTracking">Expiry Tracking</TabsTrigger>
            <TabsTrigger value="costAnalysis">Cost Analysis</TabsTrigger>
          </TabsList>

          <TabsContent
            value="consumption"
            className="h-[400px] rounded-md border flex items-center justify-center bg-muted/20"
          >
            <div className="text-center">
              <p className="text-muted-foreground">
                Consumption trends chart showing medication usage patterns over time
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                (Chart visualization would be implemented with a library like Chart.js or Recharts)
              </p>
            </div>
          </TabsContent>

          <TabsContent
            value="stockLevels"
            className="h-[400px] rounded-md border flex items-center justify-center bg-muted/20"
          >
            <div className="text-center">
              <p className="text-muted-foreground">Stock level trends showing inventory fluctuations over time</p>
              <p className="text-xs text-muted-foreground mt-2">
                (Chart visualization would be implemented with a library like Chart.js or Recharts)
              </p>
            </div>
          </TabsContent>

          <TabsContent
            value="expiryTracking"
            className="h-[400px] rounded-md border flex items-center justify-center bg-muted/20"
          >
            <div className="text-center">
              <p className="text-muted-foreground">
                Expiry tracking visualization showing medications approaching expiration
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                (Chart visualization would be implemented with a library like Chart.js or Recharts)
              </p>
            </div>
          </TabsContent>

          <TabsContent
            value="costAnalysis"
            className="h-[400px] rounded-md border flex items-center justify-center bg-muted/20"
          >
            <div className="text-center">
              <p className="text-muted-foreground">Cost analysis chart showing spending patterns by category</p>
              <p className="text-xs text-muted-foreground mt-2">
                (Chart visualization would be implemented with a library like Chart.js or Recharts)
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
