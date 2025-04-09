"use client"

import { useState } from "react"
import { ArrowUpDown, Search, Pill, TruckIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function DrugInventoryTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const inventory = [
    {
      id: "med-001",
      name: "Amoxicillin",
      category: "Antibiotics",
      stock: 125,
      unit: "bottles",
      reorderPoint: 200,
      optimalStock: 500,
      expiryDate: "2024-12-15",
      status: "low",
      location: "Memorial General Hospital",
      onOrder: 200,
    },
    {
      id: "med-002",
      name: "Lisinopril",
      category: "Cardiac",
      stock: 350,
      unit: "boxes",
      reorderPoint: 200,
      optimalStock: 600,
      expiryDate: "2025-03-22",
      status: "normal",
      location: "Memorial General Hospital",
      onOrder: 0,
    },
    {
      id: "med-003",
      name: "Albuterol",
      category: "Respiratory",
      stock: 45,
      unit: "inhalers",
      reorderPoint: 100,
      optimalStock: 300,
      expiryDate: "2024-09-10",
      status: "critical",
      location: "Riverside Community Hospital",
      onOrder: 150,
    },
    {
      id: "med-004",
      name: "Insulin",
      category: "Endocrine",
      stock: 80,
      unit: "vials",
      reorderPoint: 75,
      optimalStock: 250,
      expiryDate: "2024-08-05",
      status: "warning",
      location: "University Medical Center",
      onOrder: 100,
    },
    {
      id: "med-005",
      name: "Ibuprofen",
      category: "Analgesics",
      stock: 520,
      unit: "bottles",
      reorderPoint: 300,
      optimalStock: 800,
      expiryDate: "2025-06-18",
      status: "normal",
      location: "Central Warehouse",
      onOrder: 0,
    },
    {
      id: "med-006",
      name: "Azithromycin",
      category: "Antibiotics",
      stock: 210,
      unit: "boxes",
      reorderPoint: 150,
      optimalStock: 400,
      expiryDate: "2025-01-30",
      status: "normal",
      location: "Central Warehouse",
      onOrder: 0,
    },
    {
      id: "med-007",
      name: "Ventolin",
      category: "Respiratory",
      stock: 65,
      unit: "inhalers",
      reorderPoint: 80,
      optimalStock: 200,
      expiryDate: "2024-11-12",
      status: "warning",
      location: "Children's Hospital",
      onOrder: 50,
    },
    {
      id: "med-008",
      name: "Metformin",
      category: "Endocrine",
      stock: 180,
      unit: "bottles",
      reorderPoint: 150,
      optimalStock: 450,
      expiryDate: "2025-04-25",
      status: "normal",
      location: "University Medical Center",
      onOrder: 0,
    },
  ]

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const filteredInventory = inventory.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedInventory = [...filteredInventory].sort((a, b) => {
    let comparison = 0

    if (sortColumn === "name") {
      comparison = a.name.localeCompare(b.name)
    } else if (sortColumn === "category") {
      comparison = a.category.localeCompare(b.category)
    } else if (sortColumn === "stock") {
      comparison = a.stock - b.stock
    } else if (sortColumn === "status") {
      const statusOrder = { critical: 3, low: 2, warning: 1, normal: 0 }
      comparison = statusOrder[a.status] - statusOrder[b.status]
    } else if (sortColumn === "expiryDate") {
      comparison = new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()
    } else if (sortColumn === "location") {
      comparison = a.location.localeCompare(b.location)
    }

    return sortDirection === "asc" ? comparison : -comparison
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>
      case "low":
        return (
          <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
            Low
          </Badge>
        )
      case "warning":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
            Warning
          </Badge>
        )
      case "normal":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
            Normal
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStockPercentage = (item) => {
    return Math.min(Math.round((item.stock / item.optimalStock) * 100), 100)
  }

  const getStockColor = (item) => {
    const percentage = getStockPercentage(item)
    if (percentage < 25) return "bg-red-500"
    if (percentage < 50) return "bg-amber-500"
    return "bg-green-500"
  }

  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const diffTime = expiry.getTime() - today.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const getExpiryStatus = (expiryDate) => {
    const days = getDaysUntilExpiry(expiryDate)
    if (days < 30) return <Badge variant="destructive">{days} days</Badge>
    if (days < 90)
      return (
        <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
          {days} days
        </Badge>
      )
    return (
      <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
        {days} days
      </Badge>
    )
  }

  return (
    <div>
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search medications..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm">
            Advanced Filters
          </Button>
        </div>
      </div>

      <div className="rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("name")}>
                  Medication
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("category")}>
                  Category
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("stock")}>
                  Stock Level
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("status")}>
                  Status
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("expiryDate")}>
                  Expiry
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("location")}>
                  Location
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedInventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Pill className="h-4 w-4 text-primary" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                </TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span>
                        {item.stock} {item.unit}
                      </span>
                      <span className="text-muted-foreground">{getStockPercentage(item)}%</span>
                    </div>
                    <Progress value={getStockPercentage(item)} className={getStockColor(item)} />
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <span>Reorder: {item.reorderPoint}</span>
                      {item.onOrder > 0 && (
                        <div className="flex items-center gap-1 ml-2">
                          <TruckIcon className="h-3 w-3" />
                          <span>{item.onOrder} on order</span>
                        </div>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">{item.expiryDate}</span>
                    {getExpiryStatus(item.expiryDate)}
                  </div>
                </TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline">
                    Order
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {sortedInventory.length === 0 && (
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
