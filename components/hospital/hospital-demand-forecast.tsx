"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { useTheme } from "next-themes"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, TrendingUp } from "lucide-react"

export function HospitalDemandForecast() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Simulated demand forecast data
  const forecastData = [
    { zipCode: "12345", currentDemand: 100, predictedDemand: 120, change: 20 },
    { zipCode: "23456", currentDemand: 85, predictedDemand: 90, change: 5 },
    { zipCode: "34567", currentDemand: 70, predictedDemand: 65, change: -5 },
    { zipCode: "45678", currentDemand: 110, predictedDemand: 130, change: 20 },
    { zipCode: "56789", currentDemand: 95, predictedDemand: 105, change: 10 },
  ]

  // Simulated demand by service type
  const serviceData = [
    { name: "Emergency", current: 100, predicted: 120 },
    { name: "Outpatient", current: 150, predicted: 165 },
    { name: "Inpatient", current: 80, predicted: 95 },
    { name: "Surgery", current: 40, predicted: 45 },
    { name: "Radiology", current: 60, predicted: 70 },
    { name: "Laboratory", current: 120, predicted: 135 },
  ]

  // SDoH factors affecting demand
  const sdohFactors = [
    {
      factor: "Unemployment Rate",
      impact: "High",
      trend: "Increasing",
      description: "5.2% increase in local unemployment",
    },
    {
      factor: "Housing Instability",
      impact: "High",
      trend: "Increasing",
      description: "15% increase in eviction notices",
    },
    { factor: "Food Insecurity", impact: "Medium", trend: "Stable", description: "No significant change detected" },
    {
      factor: "Transportation Access",
      impact: "Low",
      trend: "Improving",
      description: "New public transit routes added",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Demand Forecast by ZIP Code</CardTitle>
            <CardDescription>Predicted changes in demand over next 6 weeks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={forecastData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
                  <XAxis dataKey="zipCode" stroke={isDark ? "#9ca3af" : "#6b7280"} />
                  <YAxis stroke={isDark ? "#9ca3af" : "#6b7280"} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? "#1f2937" : "#ffffff",
                      borderColor: isDark ? "#374151" : "#e5e7eb",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="currentDemand" name="Current Demand" fill="#3b82f6" />
                  <Bar dataKey="predictedDemand" name="Predicted Demand" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Demand by Service Type</CardTitle>
            <CardDescription>Predicted changes by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={serviceData} layout="vertical" margin={{ top: 20, right: 30, left: 60, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
                  <XAxis type="number" stroke={isDark ? "#9ca3af" : "#6b7280"} />
                  <YAxis dataKey="name" type="category" stroke={isDark ? "#9ca3af" : "#6b7280"} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? "#1f2937" : "#ffffff",
                      borderColor: isDark ? "#374151" : "#e5e7eb",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="current" name="Current Demand" fill="#3b82f6" />
                  <Bar dataKey="predicted" name="Predicted Demand" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>SDoH Factors Affecting Demand</CardTitle>
          <CardDescription>Social determinants driving demand changes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sdohFactors.map((factor, index) => (
              <div key={index} className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0">
                <div>
                  <h4 className="font-medium">{factor.factor}</h4>
                  <p className="text-sm text-muted-foreground">{factor.description}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge
                    variant="outline"
                    className={
                      factor.impact === "High"
                        ? "text-red-500 border-red-200 bg-red-50"
                        : factor.impact === "Medium"
                          ? "text-amber-500 border-amber-200 bg-amber-50"
                          : "text-green-500 border-green-200 bg-green-50"
                    }
                  >
                    {factor.impact} Impact
                  </Badge>
                  <div className="flex items-center text-xs">
                    <span className="mr-1">{factor.trend}</span>
                    {factor.trend === "Increasing" && <TrendingUp className="h-3 w-3 text-red-500" />}
                    {factor.trend === "Decreasing" && <TrendingUp className="h-3 w-3 text-green-500 rotate-180" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-amber-50 border-amber-200">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <CardTitle className="text-amber-800">Resource Planning Recommendation</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-amber-800">
            Based on the predicted 20% increase in demand in ZIP code 12345, we recommend:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-amber-800">
            <li>Increase emergency department staffing by 15% over the next 4 weeks</li>
            <li>Increase inventory of IV fluids and critical medications by 20%</li>
            <li>Prepare additional 10 beds for potential inpatient admissions</li>
            <li>Coordinate with nearby hospitals for potential patient transfers</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
