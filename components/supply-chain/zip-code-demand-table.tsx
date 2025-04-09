"use client"

import { useState } from "react"
import { ArrowUpDown, TrendingUp, TrendingDown, Search, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function ZipCodeDemandTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState("demandChange")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const zipCodeData = [
    {
      zipCode: "12345",
      location: "Los Angeles, CA",
      demandChange: 25,
      primaryFactors: ["Eviction Rate", "Unemployment"],
      riskLevel: "high",
      timeframe: "14 days",
      affectedCategories: ["Respiratory", "Antibiotics"],
    },
    {
      zipCode: "23456",
      location: "Chicago, IL",
      demandChange: 18,
      primaryFactors: ["Food Insecurity", "School Attendance"],
      riskLevel: "medium",
      timeframe: "21 days",
      affectedCategories: ["Cardiac", "Endocrine"],
    },
    {
      zipCode: "34567",
      location: "Houston, TX",
      demandChange: 32,
      primaryFactors: ["Unemployment", "Eviction Rate"],
      riskLevel: "high",
      timeframe: "7 days",
      affectedCategories: ["Antibiotics", "Analgesics"],
    },
    {
      zipCode: "45678",
      location: "Miami, FL",
      demandChange: 15,
      primaryFactors: ["School Attendance", "Public Transport"],
      riskLevel: "medium",
      timeframe: "30 days",
      affectedCategories: ["Pediatric", "Vaccines"],
    },
    {
      zipCode: "56789",
      location: "New York, NY",
      demandChange: 22,
      primaryFactors: ["Housing Instability", "Food Insecurity"],
      riskLevel: "high",
      timeframe: "14 days",
      affectedCategories: ["Respiratory", "Mental Health"],
    },
    {
      zipCode: "67890",
      location: "Phoenix, AZ",
      demandChange: -8,
      primaryFactors: ["Improved Employment", "Housing Stability"],
      riskLevel: "low",
      timeframe: "30 days",
      affectedCategories: ["Analgesics", "Antibiotics"],
    },
    {
      zipCode: "78901",
      location: "Seattle, WA",
      demandChange: -5,
      primaryFactors: ["Improved Food Access", "Healthcare Access"],
      riskLevel: "low",
      timeframe: "21 days",
      affectedCategories: ["Cardiac", "Endocrine"],
    },
  ]

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("desc")
    }
  }

  const filteredData = zipCodeData.filter(
    (item) =>
      item.zipCode.includes(searchTerm) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.primaryFactors.some((factor) => factor.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.affectedCategories.some((category) => category.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const sortedData = [...filteredData].sort((a, b) => {
    let comparison = 0

    if (sortColumn === "zipCode") {
      comparison = a.zipCode.localeCompare(b.zipCode)
    } else if (sortColumn === "location") {
      comparison = a.location.localeCompare(b.location)
    } else if (sortColumn === "demandChange") {
      comparison = Math.abs(a.demandChange) - Math.abs(b.demandChange)
    } else if (sortColumn === "riskLevel") {
      const riskOrder = { high: 3, medium: 2, low: 1 }
      comparison = riskOrder[a.riskLevel] - riskOrder[b.riskLevel]
    } else if (sortColumn === "timeframe") {
      const getTimeframeInDays = (tf) => Number.parseInt(tf.split(" ")[0])
      comparison = getTimeframeInDays(a.timeframe) - getTimeframeInDays(b.timeframe)
    }

    return sortDirection === "asc" ? comparison : -comparison
  })

  const getRiskBadge = (risk) => {
    switch (risk) {
      case "high":
        return (
          <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
            High
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
            Medium
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
            Low
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div>
      <div className="mb-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by ZIP code, location, or factor..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("zipCode")}>
                  ZIP Code
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("location")}>
                  Location
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("demandChange")}>
                  Demand Change
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Primary SDoH Factors</TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("riskLevel")}>
                  Risk Level
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("timeframe")}>
                  Timeframe
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Affected Categories</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((item) => (
              <TableRow key={item.zipCode}>
                <TableCell className="font-medium">{item.zipCode}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span>{item.location}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {item.demandChange > 0 ? (
                      <>
                        <TrendingUp className="h-4 w-4 text-red-500" />
                        <span className="text-red-500">+{item.demandChange}%</span>
                      </>
                    ) : (
                      <>
                        <TrendingDown className="h-4 w-4 text-green-500" />
                        <span className="text-green-500">{item.demandChange}%</span>
                      </>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {item.primaryFactors.map((factor, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{getRiskBadge(item.riskLevel)}</TableCell>
                <TableCell>Next {item.timeframe}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {item.affectedCategories.map((category, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {sortedData.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
