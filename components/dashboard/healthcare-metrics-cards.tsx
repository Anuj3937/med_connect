import type React from "react"
import { ArrowDown, ArrowUp, Clock, Users, Activity } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type MetricCardProps = {
  title: string
  value: string
  description: string
  change: number
  previousValue: string
  riskLevel: "high" | "medium" | "low"
  icon: React.ReactNode
}

function MetricCard({ title, value, description, change, previousValue, riskLevel, icon }: MetricCardProps) {
  const isPositive = change > 0
  const riskColors = {
    high: {
      bg: "bg-red-100 dark:bg-red-900",
      text: "text-red-600 dark:text-red-200",
    },
    medium: {
      bg: "bg-yellow-100 dark:bg-yellow-900",
      text: "text-yellow-600 dark:text-yellow-200",
    },
    low: {
      bg: "bg-green-100 dark:bg-green-900",
      text: "text-green-600 dark:text-green-200",
    },
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>{icon}</div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Metric details for {title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{isPositive ? `+${value}` : value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        <div className="mt-4 flex items-center gap-2 text-xs">
          <div
            className={`flex items-center rounded-full ${riskColors[riskLevel].bg} px-2 py-1 ${riskColors[riskLevel].text}`}
          >
            {isPositive ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
            <span>{riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk</span>
          </div>
          <span className="text-muted-foreground">vs. {previousValue} last month</span>
        </div>
      </CardContent>
    </Card>
  )
}

export function HealthcareMetricsCards() {
  const metrics = [
    {
      title: "Predicted ER Visits",
      value: "18.2%",
      description: "Expected increase in next 30 days",
      change: 18.2,
      previousValue: "12.5%",
      riskLevel: "high" as const,
      icon: <Activity className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Hospital Admissions",
      value: "7.4%",
      description: "Expected increase in next 30 days",
      change: 7.4,
      previousValue: "5.2%",
      riskLevel: "medium" as const,
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Chronic Care Needs",
      value: "12.8%",
      description: "Expected increase in next 30 days",
      change: 12.8,
      previousValue: "10.1%",
      riskLevel: "medium" as const,
      icon: <Clock className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Preventive Care",
      value: "-3.1%",
      description: "Expected decrease in next 30 days",
      change: -3.1,
      previousValue: "-2.5%",
      riskLevel: "low" as const,
      icon: <Activity className="h-4 w-4 text-muted-foreground" />,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  )
}
