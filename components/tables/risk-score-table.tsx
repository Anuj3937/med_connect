"use client"

import { useState } from "react"
import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type RiskScore = {
  zipCode: string
  riskScore: number
  timeframe: string
  change: number
}

export function RiskScoreTable() {
  const [sortColumn, setSortColumn] = useState<"zipCode" | "riskScore" | "timeframe" | "change">("riskScore")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const riskScores: RiskScore[] = [
    { zipCode: "12345", riskScore: 85, timeframe: "6 weeks", change: 20 },
    { zipCode: "23456", riskScore: 68, timeframe: "8 weeks", change: 15 },
    { zipCode: "34567", riskScore: 62, timeframe: "4 weeks", change: 12 },
    { zipCode: "45678", riskScore: 35, timeframe: "12 weeks", change: 5 },
    { zipCode: "56789", riskScore: 28, timeframe: "10 weeks", change: 3 },
  ]

  const handleSort = (column: "zipCode" | "riskScore" | "timeframe" | "change") => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("desc")
    }
  }

  const sortedData = [...riskScores].sort((a, b) => {
    let comparison = 0

    if (sortColumn === "zipCode") {
      comparison = a.zipCode.localeCompare(b.zipCode)
    } else if (sortColumn === "riskScore") {
      comparison = a.riskScore - b.riskScore
    } else if (sortColumn === "timeframe") {
      // Extract number from timeframe string and compare
      const aWeeks = Number.parseInt(a.timeframe.split(" ")[0])
      const bWeeks = Number.parseInt(b.timeframe.split(" ")[0])
      comparison = aWeeks - bWeeks
    } else if (sortColumn === "change") {
      comparison = a.change - b.change
    }

    return sortDirection === "asc" ? comparison : -comparison
  })

  const getRiskClass = (score: number) => {
    if (score >= 70) return "bg-red-50 dark:bg-red-950/20"
    if (score >= 40) return "bg-yellow-50 dark:bg-yellow-950/20"
    return "bg-green-50 dark:bg-green-950/20"
  }

  const getChangeClass = (change: number) => {
    if (change >= 15) return "text-red-600 dark:text-red-400"
    if (change >= 10) return "text-yellow-600 dark:text-yellow-400"
    return "text-green-600 dark:text-green-400"
  }

  const getRiskBarColor = (score: number) => {
    if (score >= 70) return "bg-red-500"
    if (score >= 40) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getRiskBarBgColor = (score: number) => {
    if (score >= 70) return "bg-red-100 dark:bg-red-950/50"
    if (score >= 40) return "bg-yellow-100 dark:bg-yellow-950/50"
    return "bg-green-100 dark:bg-green-950/50"
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("zipCode")}>
                ZIP Code
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("riskScore")}>
                Risk Score
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("timeframe")}>
                Timeframe
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="text-right">
              <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("change")}>
                Change
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((item) => (
            <TableRow key={item.zipCode} className={getRiskClass(item.riskScore)}>
              <TableCell className="font-medium">{item.zipCode}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <div className={`h-2 w-full rounded-full ${getRiskBarBgColor(item.riskScore)}`}>
                    <div
                      className={`h-2 w-[${item.riskScore}%] rounded-full ${getRiskBarColor(item.riskScore)}`}
                      style={{ width: `${item.riskScore}%` }}
                      aria-label={`Risk score: ${item.riskScore}%`}
                    />
                  </div>
                  <span className="ml-2 text-xs font-medium">{item.riskScore}%</span>
                </div>
              </TableCell>
              <TableCell>{item.timeframe}</TableCell>
              <TableCell className={`text-right ${getChangeClass(item.change)}`}>+{item.change}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
