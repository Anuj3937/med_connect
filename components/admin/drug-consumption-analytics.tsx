"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, AlertTriangle, Calendar, Filter, Download } from "lucide-react"

export function DrugConsumptionAnalytics() {
  const [timeframe, setTimeframe] = useState("30days")
  const [category, setCategory] = useState("all")

  // Mock data for drug consumption
  const drugData = [
    {
      id: "drug-1",
      name: "Lisinopril",
      category: "Cardiovascular",
      consumption: 12500,
      trend: "increase",
      percentChange: 15,
      cost: 18750,
      inventory: 4500,
      reorderPoint: 2000,
    },
    {
      id: "drug-2",
      name: "Metformin",
      category: "Diabetes",
      consumption: 10800,
      trend: "increase",
      percentChange: 8,
      cost: 15120,
      inventory: 3800,
      reorderPoint: 1800,
    },
    {
      id: "drug-3",
      name: "Amoxicillin",
      category: "Antibiotics",
      consumption: 8500,
      trend: "decrease",
      percentChange: -5,
      cost: 12750,
      inventory: 2200,
      reorderPoint: 1500,
    },
    {
      id: "drug-4",
      name: "Atorvastatin",
      category: "Cardiovascular",
      consumption: 9200,
      trend: "increase",
      percentChange: 12,
      cost: 27600,
      inventory: 3100,
      reorderPoint: 1700,
    },
    {
      id: "drug-5",
      name: "Albuterol",
      category: "Respiratory",
      consumption: 7500,
      trend: "increase",
      percentChange: 20,
      cost: 22500,
      inventory: 1800,
      reorderPoint: 1200,
    },
    {
      id: "drug-6",
      name: "Omeprazole",
      category: "Gastrointestinal",
      consumption: 6800,
      trend: "decrease",
      percentChange: -3,
      cost: 13600,
      inventory: 2500,
      reorderPoint: 1400,
    },
    {
      id: "drug-7",
      name: "Levothyroxine",
      category: "Endocrine",
      consumption: 5900,
      trend: "increase",
      percentChange: 5,
      cost: 11800,
      inventory: 2200,
      reorderPoint: 1300,
    },
    {
      id: "drug-8",
      name: "Ibuprofen",
      category: "Pain Relief",
      consumption: 15000,
      trend: "increase",
      percentChange: 10,
      cost: 9000,
      inventory: 5500,
      reorderPoint: 3000,
    },
  ]

  // Filter data based on category
  const filteredData = drugData.filter(
    (drug) => category === "all" || drug.category.toLowerCase() === category.toLowerCase(),
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

  // Get unique categories for filter
  const categories = ["all", ...new Set(drugData.map((drug) => drug.category))]

  // Calculate total consumption and cost
  const totalConsumption = filteredData.reduce((sum, drug) => sum + drug.consumption, 0)
  const totalCost = filteredData.reduce((sum, drug) => sum + drug.cost, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
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
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="text-sm text-muted-foreground">Total Consumption</div>
              <div className="text-3xl font-bold">{totalConsumption.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mt-1">units dispensed</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="text-sm text-muted-foreground">Total Cost</div>
              <div className="text-3xl font-bold">${totalCost.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mt-1">medication expenses</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="text-sm text-muted-foreground">Average Cost Per Unit</div>
              <div className="text-3xl font-bold">${(totalCost / totalConsumption || 0).toFixed(2)}</div>
              <div className="text-xs text-muted-foreground mt-1">across all medications</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="table">
        <TabsList className="mb-4">
          <TabsTrigger value="table">Table View</TabsTrigger>
          <TabsTrigger value="chart">Chart View</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="table">
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="py-3 px-4 text-left font-medium">Medication</th>
                    <th className="py-3 px-4 text-left font-medium">Category</th>
                    <th className="py-3 px-4 text-left font-medium">Consumption</th>
                    <th className="py-3 px-4 text-left font-medium">Trend</th>
                    <th className="py-3 px-4 text-left font-medium">Cost</th>
                    <th className="py-3 px-4 text-left font-medium">Inventory</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((drug) => (
                    <tr key={drug.id} className="border-b">
                      <td className="py-3 px-4 font-medium">{drug.name}</td>
                      <td className="py-3 px-4">{drug.category}</td>
                      <td className="py-3 px-4">{drug.consumption.toLocaleString()} units</td>
                      <td className="py-3 px-4">{getTrendBadge(drug.trend, drug.percentChange)}</td>
                      <td className="py-3 px-4">${drug.cost.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span>{drug.inventory.toLocaleString()} units</span>
                          {drug.inventory < drug.reorderPoint && <AlertTriangle className="h-4 w-4 text-amber-500" />}
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredData.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-muted-foreground">
                        No data available for the selected category.
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
              <p className="text-muted-foreground">Drug consumption chart showing usage patterns over time</p>
              <p className="text-xs text-muted-foreground mt-2">
                (Chart visualization would be implemented with a library like Chart.js or Recharts)
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="insights">
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Key Insights</h3>
                <div className="space-y-4">
                  <div className="rounded-md border border-amber-200 bg-amber-50 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                      <h3 className="font-medium text-amber-800">Consumption Trends</h3>
                    </div>
                    <p className="text-sm text-amber-800 mb-2">
                      Significant increases in consumption for the following medications:
                    </p>
                    <ul className="list-disc list-inside text-sm text-amber-800 space-y-1">
                      <li>
                        <strong>Albuterol</strong> - 20% increase, likely due to seasonal respiratory conditions
                      </li>
                      <li>
                        <strong>Lisinopril</strong> - 15% increase, consistent with rising hypertension diagnoses
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-md border p-4">
                    <h3 className="font-medium mb-2">Cost Analysis</h3>
                    <p className="text-sm mb-2">
                      Cardiovascular medications represent the highest cost category, accounting for
                      {Math.round(
                        (drugData
                          .filter((drug) => drug.category === "Cardiovascular")
                          .reduce((sum, drug) => sum + drug.cost, 0) /
                          totalCost) *
                          100,
                      )}
                      % of total medication expenses.
                    </p>
                    <div className="space-y-2">
                      {categories
                        .filter((cat) => cat !== "all")
                        .map((cat) => {
                          const catCost = drugData
                            .filter((drug) => drug.category === cat)
                            .reduce((sum, drug) => sum + drug.cost, 0)
                          const percentage = Math.round((catCost / totalCost) * 100)
                          return (
                            <div key={cat}>
                              <div className="flex justify-between mb-1">
                                <span className="text-xs font-medium">{cat}</span>
                                <span className="text-xs">
                                  ${catCost.toLocaleString()} ({percentage}%)
                                </span>
                              </div>
                              <Progress value={percentage} className="h-2" />
                            </div>
                          )
                        })}
                    </div>
                  </div>

                  <div className="rounded-md border p-4">
                    <h3 className="font-medium mb-2">Inventory Alerts</h3>
                    <div className="space-y-2">
                      {drugData
                        .filter((drug) => drug.inventory < drug.reorderPoint)
                        .map((drug) => (
                          <div key={drug.id} className="flex justify-between items-center">
                            <div>
                              <div className="font-medium">{drug.name}</div>
                              <div className="text-sm text-muted-foreground">
                                Current: {drug.inventory} units | Reorder Point: {drug.reorderPoint} units
                              </div>
                            </div>
                            <Button size="sm">Reorder</Button>
                          </div>
                        ))}

                      {drugData.filter((drug) => drug.inventory < drug.reorderPoint).length === 0 && (
                        <p className="text-sm text-muted-foreground">No inventory alerts at this time.</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
