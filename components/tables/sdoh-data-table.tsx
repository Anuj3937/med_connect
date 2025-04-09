"use client"

import { useState } from "react"
import { ArrowUpDown, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type SdohIndicator = {
  id: string
  name: string
  value: string
  trend: string
  trendValue: number
  impact: "High" | "Medium" | "Low"
  description: string
}

export function SdohDataTable() {
  const [sortColumn, setSortColumn] = useState<"name" | "value" | "trend" | "impact">("impact")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const indicators: SdohIndicator[] = [
    {
      id: "eviction-rate",
      name: "Eviction Rate",
      value: "8.2%",
      trend: "↑ 3.1%",
      trendValue: 3.1,
      impact: "High",
      description: "Percentage of households receiving eviction notices in the last 30 days",
    },
    {
      id: "unemployment",
      name: "Unemployment",
      value: "6.5%",
      trend: "↑ 1.2%",
      trendValue: 1.2,
      impact: "High",
      description: "Percentage of working-age population without employment",
    },
    {
      id: "school-attendance",
      name: "School Attendance",
      value: "87.3%",
      trend: "↓ 4.5%",
      trendValue: -4.5,
      impact: "Medium",
      description: "Average daily attendance rate in local schools",
    },
    {
      id: "food-insecurity",
      name: "Food Insecurity",
      value: "12.8%",
      trend: "↑ 2.3%",
      trendValue: 2.3,
      impact: "Medium",
      description: "Percentage of households reporting limited access to adequate food",
    },
    {
      id: "transport-access",
      name: "Public Transport Access",
      value: "65.2%",
      trend: "↑ 1.5%",
      trendValue: 1.5,
      impact: "Low",
      description: "Percentage of population with access to public transportation within 0.5 miles",
    },
  ]

  const handleSort = (column: "name" | "value" | "trend" | "impact") => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("desc")
    }
  }

  const sortedData = [...indicators].sort((a, b) => {
    let comparison = 0

    if (sortColumn === "name") {
      comparison = a.name.localeCompare(b.name)
    } else if (sortColumn === "value") {
      // Extract percentage values and compare
      const aValue = Number.parseFloat(a.value.replace("%", ""))
      const bValue = Number.parseFloat(b.value.replace("%", ""))
      comparison = aValue - bValue
    } else if (sortColumn === "trend") {
      comparison = a.trendValue - b.trendValue
    } else if (sortColumn === "impact") {
      const impactOrder = { High: 3, Medium: 2, Low: 1 }
      comparison = impactOrder[a.impact] - impactOrder[b.impact]
    }

    return sortDirection === "asc" ? comparison : -comparison
  })

  const getTrendClass = (trend: string) => {
    if (trend.includes("↑")) return "text-red-600 dark:text-red-400"
    if (trend.includes("↓")) return "text-green-600 dark:text-green-400"
    return ""
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("name")}>
                Indicator
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("value")}>
                Current Value
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("trend")}>
                Trend
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="text-right">
              <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("impact")}>
                Impact
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((indicator) => (
            <TableRow key={indicator.id}>
              <TableCell className="font-medium">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center">
                        {indicator.name}
                        <Info className="ml-1 h-3 w-3 text-muted-foreground" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{indicator.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell>{indicator.value}</TableCell>
              <TableCell className={getTrendClass(indicator.trend)}>{indicator.trend}</TableCell>
              <TableCell className="text-right">{indicator.impact}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
