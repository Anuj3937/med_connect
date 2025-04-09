"use client"

import { useState } from "react"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function ZipCodeRiskAnalysis() {
  const [searchTerm, setSearchTerm] = useState("")

  const zipCodes = [
    {
      zipCode: "12345",
      riskScore: 85,
      population: 24560,
      topFactors: "Eviction Rate, Unemployment",
      trend: "Increasing",
    },
    {
      zipCode: "23456",
      riskScore: 68,
      population: 18750,
      topFactors: "Food Insecurity, School Attendance",
      trend: "Stable",
    },
    {
      zipCode: "34567",
      riskScore: 62,
      population: 32100,
      topFactors: "Unemployment, Transportation",
      trend: "Increasing",
    },
    {
      zipCode: "45678",
      riskScore: 35,
      population: 15800,
      topFactors: "Health Insurance, Food Insecurity",
      trend: "Decreasing",
    },
    {
      zipCode: "56789",
      riskScore: 28,
      population: 21450,
      topFactors: "Transportation, School Attendance",
      trend: "Stable",
    },
    {
      zipCode: "67890",
      riskScore: 52,
      population: 19200,
      topFactors: "Eviction Rate, Health Insurance",
      trend: "Increasing",
    },
    {
      zipCode: "78901",
      riskScore: 45,
      population: 27300,
      topFactors: "School Attendance, Unemployment",
      trend: "Stable",
    },
  ]

  const filteredZipCodes = zipCodes.filter(
    (zip) => zip.zipCode.includes(searchTerm) || zip.topFactors.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by ZIP code or risk factor..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ZIP Code</TableHead>
              <TableHead>Risk Score</TableHead>
              <TableHead>Population</TableHead>
              <TableHead>Top Risk Factors</TableHead>
              <TableHead>Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredZipCodes.map((zip) => (
              <TableRow key={zip.zipCode}>
                <TableCell className="font-medium">{zip.zipCode}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="h-2 w-24 rounded-full bg-gray-100 dark:bg-gray-800">
                      <div
                        className={`h-2 rounded-full ${
                          zip.riskScore > 70 ? "bg-red-500" : zip.riskScore > 50 ? "bg-yellow-500" : "bg-green-500"
                        }`}
                        style={{ width: `${zip.riskScore}%` }}
                      />
                    </div>
                    <span className="ml-2">{zip.riskScore}%</span>
                  </div>
                </TableCell>
                <TableCell>{zip.population.toLocaleString()}</TableCell>
                <TableCell>{zip.topFactors}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      zip.trend === "Increasing"
                        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        : zip.trend === "Decreasing"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    }`}
                  >
                    {zip.trend}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
