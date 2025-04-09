"use client"

import type React from "react"

import { useState } from "react"
import { ArrowDown, ArrowUp, Home, AlertTriangle, TrendingUp, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EvictionTrendChart } from "@/components/charts/eviction-trend-chart"
import { EvictionComparisonChart } from "@/components/charts/eviction-comparison-chart"

type MetricCardProps = {
  title: string
  value: string
  change: number
  previousPeriod: string
  icon: React.ReactNode
  iconColor: string
}

function MetricCard({ title, value, change, previousPeriod, icon, iconColor }: MetricCardProps) {
  const isPositive = change > 0

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
          </div>
          <div className={`rounded-full ${iconColor} p-2`}>{icon}</div>
        </div>
        <div className="mt-4 flex items-center text-xs">
          <span className={isPositive ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}>
            {isPositive ? <ArrowUp className="inline mr-1 h-3 w-3" /> : <ArrowDown className="inline mr-1 h-3 w-3" />}
            {Math.abs(change)}%
          </span>
          <span className="text-muted-foreground ml-1">vs. {previousPeriod}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export function EvictionStats() {
  const [timeframe, setTimeframe] = useState<"monthly" | "quarterly" | "yearly">("monthly")

  const metrics = [
    {
      title: "National Eviction Rate",
      value: "3.8%",
      change: 12.5,
      previousPeriod: "previous month",
      icon: <Home className="h-4 w-4 text-white" />,
      iconColor: "bg-blue-500 text-white",
    },
    {
      title: "Total Eviction Filings",
      value: "67,842",
      change: 8.3,
      previousPeriod: "previous month",
      icon: <TrendingUp className="h-4 w-4 text-white" />,
      iconColor: "bg-red-500 text-white",
    },
    {
      title: "High-Risk Areas",
      value: "28",
      change: 16.7,
      previousPeriod: "previous month",
      icon: <AlertTriangle className="h-4 w-4 text-white" />,
      iconColor: "bg-amber-500 text-white",
    },
    {
      title: "People Affected",
      value: "189,957",
      change: 9.2,
      previousPeriod: "previous month",
      icon: <Users className="h-4 w-4 text-white" />,
      iconColor: "bg-purple-500 text-white",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="trends" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="trends">Eviction Trends</TabsTrigger>
                <TabsTrigger value="comparison">Regional Comparison</TabsTrigger>
              </TabsList>

              <div className="flex items-center space-x-2">
                <TabsList>
                  <TabsTrigger
                    value="monthly"
                    onClick={() => setTimeframe("monthly")}
                    data-state={timeframe === "monthly" ? "active" : "inactive"}
                  >
                    Monthly
                  </TabsTrigger>
                  <TabsTrigger
                    value="quarterly"
                    onClick={() => setTimeframe("quarterly")}
                    data-state={timeframe === "quarterly" ? "active" : "inactive"}
                  >
                    Quarterly
                  </TabsTrigger>
                  <TabsTrigger
                    value="yearly"
                    onClick={() => setTimeframe("yearly")}
                    data-state={timeframe === "yearly" ? "active" : "inactive"}
                  >
                    Yearly
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            <TabsContent value="trends" className="mt-0">
              <EvictionTrendChart timeframe={timeframe} />
            </TabsContent>

            <TabsContent value="comparison" className="mt-0">
              <EvictionComparisonChart timeframe={timeframe} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
