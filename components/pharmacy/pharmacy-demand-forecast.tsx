"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, AlertTriangle, Calendar, Filter } from "lucide-react"

export function PharmacyDemandForecast() {
  const [timeframe, setTimeframe] = useState("30days")
  const [category, setCategory] = useState("all")

  // Mock data for demand forecast
  const forecastData = [
    {
      id: "med-1",
      name: "Lisinopril 10mg",
      category: "Prescription",
      currentDemand: 120,
      forecastDemand: 150,
      trend: "increase",
      percentChange: 25,
      seasonalFactor: "High in winter",
      reorderPoint: 100,
      suggestedOrder: 200,
    },
    {
      id: "med-2",
      name: "Metformin 500mg",
      category: "Prescription",
      currentDemand: 85,
      forecastDemand: 95,
      trend: "increase",
      percentChange: 12,
      seasonalFactor: "Stable year-round",
      reorderPoint: 75,
      suggestedOrder: 150,
    },
    {
      id: "med-3",
      name: "Amoxicillin 500mg",
      category: "Prescription",
      currentDemand: 45,
      forecastDemand: 75,
      trend: "increase",
      percentChange: 67,
      seasonalFactor: "High in fall/winter",
      reorderPoint: 50,
      suggestedOrder: 100,
    },
    {
      id: "med-4",
      name: "Ibuprofen 200mg",
      category: "OTC",
      currentDemand: 200,
      forecastDemand: 180,
      trend: "decrease",
      percentChange: -10,
      seasonalFactor: "Higher in summer",
      reorderPoint: 150,
      suggestedOrder: 0,
    },
    {
      id: "med-5",
      name: "Cetirizine 10mg",
      category: "OTC",
      currentDemand: 65,
      forecastDemand: 120,
      trend: "increase",
      percentChange: 85,
      seasonalFactor: "High in spring/summer",
      reorderPoint: 75,
      suggestedOrder: 150,
    },
    {
      id: "sup-1",
      name: "Prescription Bottles",
      category: "Supplies",
      currentDemand: 350,
      forecastDemand: 400,
      trend: "increase",
      percentChange: 14,
      seasonalFactor: "Stable year-round",
      reorderPoint: 200,
      suggestedOrder: 300,
    },
  ]

  // Filter data based on category
  const filteredData = forecastData.filter(
    (item) => category === "all" || item.category.toLowerCase() === category.toLowerCase(),
  )

  // Get trend badge
  const getTrendBadge = (trend, percentChange) => {
    if (trend === "increase") {
      return (
        <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
          <TrendingUp className="h-3 w-3 mr-1" />+{percentChange}%
        </Badge>
      )
    } else {
      return (
        <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
          <TrendingDown className="h-3 w-3 mr-1" />
          {percentChange}%
        </Badge>
      )
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Demand Forecast</CardTitle>
              <CardDescription>Predicted demand for medications and supplies</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-[150px]">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Next 7 Days</SelectItem>
                  <SelectItem value="30days">Next 30 Days</SelectItem>
                  <SelectItem value="90days">Next 90 Days</SelectItem>
                  <SelectItem value="6months">Next 6 Months</SelectItem>
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
          <Tabs defaultValue="table">
            <TabsList className="mb-4">
              <TabsTrigger value="table">Table View</TabsTrigger>
              <TabsTrigger value="chart">Chart View</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>

            <TabsContent value="table">
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="py-3 px-4 text-left font-medium">Item Name</th>
                        <th className="py-3 px-4 text-left font-medium">Category</th>
                        <th className="py-3 px-4 text-left font-medium">Current Demand</th>
                        <th className="py-3 px-4 text-left font-medium">Forecast Demand</th>
                        <th className="py-3 px-4 text-left font-medium">Trend</th>
                        <th className="py-3 px-4 text-left font-medium">Seasonal Factors</th>
                        <th className="py-3 px-4 text-right font-medium">Suggested Order</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((item) => (
                        <tr key={item.id} className="border-b">
                          <td className="py-3 px-4 font-medium">{item.name}</td>
                          <td className="py-3 px-4">{item.category}</td>
                          <td className="py-3 px-4">{item.currentDemand} units</td>
                          <td className="py-3 px-4">{item.forecastDemand} units</td>
                          <td className="py-3 px-4">{getTrendBadge(item.trend, item.percentChange)}</td>
                          <td className="py-3 px-4">{item.seasonalFactor}</td>
                          <td className="py-3 px-4 text-right">
                            {item.suggestedOrder > 0 ? (
                              <Button size="sm">{item.suggestedOrder} units</Button>
                            ) : (
                              <span className="text-muted-foreground">No order needed</span>
                            )}
                          </td>
                        </tr>
                      ))}

                      {filteredData.length === 0 && (
                        <tr>
                          <td colSpan={7} className="py-6 text-center text-muted-foreground">
                            No forecast data available for the selected category.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="chart">
              <div className="h-[400px] rounded-md border flex items-center justify-center bg-muted/20">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Demand forecast chart showing predicted demand over time</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    (Chart visualization would be implemented with a library like Chart.js or Recharts)
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="recommendations">
              <div className="space-y-4">
                <div className="rounded-md border border-amber-200 bg-amber-50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                    <h3 className="font-medium text-amber-800">Demand Spike Alert</h3>
                  </div>
                  <p className="text-sm text-amber-800 mb-2">
                    Significant increase in demand predicted for the following items:
                  </p>
                  <ul className="list-disc list-inside text-sm text-amber-800 space-y-1">
                    <li>
                      <strong>Cetirizine 10mg</strong> - 85% increase expected due to seasonal allergies
                    </li>
                    <li>
                      <strong>Amoxicillin 500mg</strong> - 67% increase expected as we approach cold/flu season
                    </li>
                  </ul>
                  <Button className="mt-3" variant="outline">
                    Place Pre-emptive Orders
                  </Button>
                </div>

                <div className="rounded-md border p-4">
                  <h3 className="font-medium mb-2">Recommended Order Quantities</h3>
                  <div className="space-y-3">
                    {filteredData
                      .filter((item) => item.suggestedOrder > 0)
                      .map((item) => (
                        <div key={item.id} className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-muted-foreground">
                              Current: {item.currentDemand} units | Forecast: {item.forecastDemand} units
                            </div>
                          </div>
                          <Button size="sm">{item.suggestedOrder} units</Button>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <h3 className="font-medium mb-2">Seasonal Insights</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Summer Trends:</strong> Increased demand for allergy medications, sunburn treatments, and
                      insect bite remedies.
                    </p>
                    <p>
                      <strong>Fall/Winter Preparation:</strong> Begin stocking cold/flu medications, cough syrups, and
                      antibiotics.
                    </p>
                    <p>
                      <strong>Year-Round Stability:</strong> Chronic condition medications (diabetes, hypertension,
                      cholesterol) show consistent demand patterns.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
