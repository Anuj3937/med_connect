"use client"

import { useState } from "react"
import { ArrowUpDown, MoreHorizontal, Package, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"

export function HospitalInventorySummary() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState<"name" | "category" | "quantity" | "status">("status")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const [inventory, setInventory] = useState([
    {
      id: "inv-1",
      name: "IV Solution (Normal Saline)",
      category: "IV Fluids",
      quantity: 25,
      threshold: 50,
      unit: "bags",
      location: "Storage Room A",
      expiryDate: "2025-12-31",
      status: "low",
    },
    {
      id: "inv-2",
      name: "Surgical Masks",
      category: "PPE",
      quantity: 1200,
      threshold: 500,
      unit: "pieces",
      location: "Storage Room B",
      expiryDate: "2026-06-30",
      status: "normal",
    },
    {
      id: "inv-3",
      name: "Insulin",
      category: "Medication",
      quantity: 45,
      threshold: 30,
      unit: "vials",
      location: "Pharmacy",
      expiryDate: "2025-03-15",
      status: "normal",
    },
    {
      id: "inv-4",
      name: "Ventilator Circuits",
      category: "Equipment",
      quantity: 8,
      threshold: 10,
      unit: "sets",
      location: "ICU Storage",
      expiryDate: "2026-01-20",
      status: "low",
    },
    {
      id: "inv-5",
      name: "Antibiotics (Amoxicillin)",
      category: "Medication",
      quantity: 120,
      threshold: 50,
      unit: "bottles",
      location: "Pharmacy",
      expiryDate: "2024-11-30",
      status: "normal",
    },
    {
      id: "inv-6",
      name: "Syringes (10ml)",
      category: "Supplies",
      quantity: 350,
      threshold: 200,
      unit: "pieces",
      location: "Storage Room A",
      expiryDate: "2026-08-15",
      status: "normal",
    },
    {
      id: "inv-7",
      name: "Blood Pressure Cuffs",
      category: "Equipment",
      quantity: 15,
      threshold: 10,
      unit: "pieces",
      location: "Equipment Room",
      expiryDate: "N/A",
      status: "normal",
    },
    {
      id: "inv-8",
      name: "Oxygen Tanks",
      category: "Supplies",
      quantity: 5,
      threshold: 10,
      unit: "tanks",
      location: "Oxygen Storage",
      expiryDate: "N/A",
      status: "critical",
    },
  ])

  const handleOrderMore = (id: string) => {
    toast({
      title: "Order placed",
      description: "Your order has been placed successfully.",
    })
  }

  const handleSort = (column: "name" | "category" | "quantity" | "status") => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>
      case "low":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
            Low
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

  // Filter and sort inventory
  const filteredInventory = inventory
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      let comparison = 0

      if (sortColumn === "name") {
        comparison = a.name.localeCompare(b.name)
      } else if (sortColumn === "category") {
        comparison = a.category.localeCompare(b.category)
      } else if (sortColumn === "quantity") {
        comparison = a.quantity - b.quantity
      } else if (sortColumn === "status") {
        const statusOrder = { critical: 0, low: 1, normal: 2 }
        comparison =
          statusOrder[a.status as keyof typeof statusOrder] - statusOrder[b.status as keyof typeof statusOrder]
      }

      return sortDirection === "asc" ? comparison : -comparison
    })

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search inventory..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button>
          <Package className="mr-2 h-4 w-4" />
          Add New Item
        </Button>
      </div>

      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="py-3 px-4 text-left font-medium">
                  <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("name")}>
                    Item Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </th>
                <th className="py-3 px-4 text-left font-medium">
                  <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("category")}>
                    Category
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </th>
                <th className="py-3 px-4 text-left font-medium">
                  <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("quantity")}>
                    Quantity
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </th>
                <th className="py-3 px-4 text-left font-medium">
                  <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("status")}>
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </th>
                <th className="py-3 px-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-3 px-4 font-medium">{item.name}</td>
                  <td className="py-3 px-4">{item.category}</td>
                  <td className="py-3 px-4">
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>
                          {item.quantity} {item.unit}
                        </span>
                        <span className="text-xs text-muted-foreground">Min: {item.threshold}</span>
                      </div>
                      <Progress
                        value={(item.quantity / item.threshold) * 100}
                        className="h-2"
                        indicatorClassName={
                          item.quantity < item.threshold * 0.5
                            ? "bg-red-500"
                            : item.quantity < item.threshold
                              ? "bg-amber-500"
                              : "bg-green-500"
                        }
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4">{getStatusBadge(item.status)}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      {(item.status === "critical" || item.status === "low") && (
                        <Button size="sm" onClick={() => handleOrderMore(item.id)}>
                          Order More
                        </Button>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Item</DropdownMenuItem>
                          <DropdownMenuItem>Adjust Quantity</DropdownMenuItem>
                          <DropdownMenuItem>View History</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredInventory.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-muted-foreground">
                    No inventory items found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-xs text-muted-foreground">
        Showing {filteredInventory.length} of {inventory.length} items
      </div>
    </div>
  )
}
