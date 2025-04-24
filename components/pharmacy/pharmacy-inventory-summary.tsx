"use client"

import type React from "react"

import { useState } from "react"
import { ArrowUpDown, MoreHorizontal, Search, Plus, Download, Filter, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function PharmacyInventorySummary() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState<"name" | "category" | "quantity" | "status">("status")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showOrderDialog, setShowOrderDialog] = useState(false)
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  const [inventory, setInventory] = useState([
    {
      id: "med-1",
      name: "Lisinopril",
      category: "Prescription",
      type: "medication",
      quantity: 120,
      threshold: 100,
      unit: "tablets",
      location: "Shelf A-1",
      expiryDate: "2025-12-31",
      status: "normal",
      delayed: false,
      manufacturer: "Pfizer",
      ndc: "12345-678-90",
      price: 15.99,
      lastOrdered: "2024-06-15",
    },
    {
      id: "med-2",
      name: "Metformin",
      category: "Prescription",
      type: "medication",
      quantity: 85,
      threshold: 100,
      unit: "tablets",
      location: "Shelf A-2",
      expiryDate: "2025-10-15",
      status: "low",
      delayed: false,
      manufacturer: "Merck",
      ndc: "12345-678-91",
      price: 12.5,
      lastOrdered: "2024-06-10",
    },
    {
      id: "med-3",
      name: "Amoxicillin",
      category: "Prescription",
      type: "medication",
      quantity: 45,
      threshold: 75,
      unit: "capsules",
      location: "Shelf B-1",
      expiryDate: "2025-08-20",
      status: "critical",
      delayed: true,
      manufacturer: "Teva",
      ndc: "12345-678-92",
      price: 9.99,
      lastOrdered: "2024-06-05",
    },
    {
      id: "med-4",
      name: "Ibuprofen",
      category: "OTC",
      type: "medication",
      quantity: 200,
      threshold: 150,
      unit: "tablets",
      location: "Shelf C-1",
      expiryDate: "2026-01-15",
      status: "normal",
      delayed: false,
      manufacturer: "Johnson & Johnson",
      ndc: "12345-678-93",
      price: 8.99,
      lastOrdered: "2024-06-20",
    },
    {
      id: "med-5",
      name: "Cetirizine",
      category: "OTC",
      type: "medication",
      quantity: 65,
      threshold: 75,
      unit: "tablets",
      location: "Shelf C-2",
      expiryDate: "2025-11-30",
      status: "low",
      delayed: false,
      manufacturer: "Johnson & Johnson",
      ndc: "12345-678-94",
      price: 12.99,
      lastOrdered: "2024-06-12",
    },
    {
      id: "sup-1",
      name: "Syringes (10ml)",
      category: "Supplies",
      type: "supply",
      quantity: 350,
      threshold: 200,
      unit: "pieces",
      location: "Storage Room A",
      expiryDate: "N/A",
      status: "normal",
      delayed: false,
      manufacturer: "BD",
      ndc: "N/A",
      price: 0.75,
      lastOrdered: "2024-06-01",
    },
    {
      id: "sup-2",
      name: "Alcohol Swabs",
      category: "Supplies",
      type: "supply",
      quantity: 500,
      threshold: 300,
      unit: "pieces",
      location: "Storage Room A",
      expiryDate: "2026-05-15",
      status: "normal",
      delayed: false,
      manufacturer: "3M",
      ndc: "N/A",
      price: 0.15,
      lastOrdered: "2024-06-08",
    },
    {
      id: "sup-3",
      name: "Prescription Bottles",
      category: "Supplies",
      type: "supply",
      quantity: 120,
      threshold: 200,
      unit: "pieces",
      location: "Storage Room B",
      expiryDate: "N/A",
      status: "critical",
      delayed: true,
      manufacturer: "PharmaSystems",
      ndc: "N/A",
      price: 0.35,
      lastOrdered: "2024-05-20",
    },
  ])

  const handleAddItem = (event: React.FormEvent) => {
    event.preventDefault()

    // In a real app, we would get the form data and add the item
    // For now, let's just add a dummy item
    const newItem = {
      id: `med-${inventory.length + 1}`,
      name: "New Medication",
      category: "Prescription",
      type: "medication",
      quantity: 100,
      threshold: 50,
      unit: "tablets",
      location: "Shelf D-1",
      expiryDate: "2026-01-01",
      status: "normal",
      delayed: false,
      manufacturer: "Generic",
      ndc: "12345-678-99",
      price: 10.99,
      lastOrdered: "2024-07-01",
    }

    setInventory([...inventory, newItem])
    setShowAddDialog(false)

    toast({
      title: "Item added",
      description: "New inventory item has been added successfully.",
    })
  }

  const handleOrderMore = (id: string) => {
    setSelectedItemId(id)
    setShowOrderDialog(true)
  }

  const submitOrder = (event: React.FormEvent) => {
    event.preventDefault()

    // In a real app, we would submit the order
    // For now, let's just show a toast
    toast({
      title: "Order placed",
      description: "Your order has been placed successfully.",
    })

    setShowOrderDialog(false)
    setSelectedItemId(null)
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

  // Check if an item is expiring soon (within 3 months)
  const isExpiringSoon = (expiryDate: string) => {
    if (expiryDate === "N/A") return false
    const expiry = new Date(expiryDate)
    const threeMonthsFromNow = new Date()
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3)
    return expiry <= threeMonthsFromNow
  }

  // Filter inventory
  let filteredInventory = inventory.filter(
    (item) =>
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (activeTab === "all" || item.type === activeTab),
  )

  // Sort inventory
  filteredInventory = filteredInventory.sort((a, b) => {
    let comparison = 0

    if (sortColumn === "name") {
      comparison = a.name.localeCompare(b.name)
    } else if (sortColumn === "category") {
      comparison = a.category.localeCompare(b.category)
    } else if (sortColumn === "quantity") {
      comparison = a.quantity - b.quantity
    } else if (sortColumn === "status") {
      const statusOrder = { critical: 0, low: 1, normal: 2 }
      comparison = statusOrder[a.status as keyof typeof statusOrder] - statusOrder[b.status as keyof typeof statusOrder]
    }

    return sortDirection === "asc" ? comparison : -comparison
  })

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Items</TabsTrigger>
          <TabsTrigger value="medication">Medications</TabsTrigger>
          <TabsTrigger value="supply">Supplies</TabsTrigger>
        </TabsList>
      </Tabs>

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
        <div className="flex gap-2">
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <form onSubmit={handleAddItem}>
                <DialogHeader>
                  <DialogTitle>Add New Inventory Item</DialogTitle>
                  <DialogDescription>Enter the details of the new inventory item.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="item-name">Item Name</Label>
                    <Input id="item-name" placeholder="e.g., Lisinopril" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="category">Category</Label>
                      <Select defaultValue="prescription">
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="prescription">Prescription</SelectItem>
                          <SelectItem value="otc">OTC</SelectItem>
                          <SelectItem value="supplies">Supplies</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="location">Storage Location</Label>
                      <Select defaultValue="shelf-a">
                        <SelectTrigger id="location">
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="shelf-a">Shelf A</SelectItem>
                          <SelectItem value="shelf-b">Shelf B</SelectItem>
                          <SelectItem value="shelf-c">Shelf C</SelectItem>
                          <SelectItem value="storage-a">Storage Room A</SelectItem>
                          <SelectItem value="storage-b">Storage Room B</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input id="quantity" type="number" min="0" defaultValue="100" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="unit">Unit</Label>
                      <Input id="unit" placeholder="e.g., tablets, capsules" defaultValue="tablets" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="threshold">Minimum Threshold</Label>
                      <Input id="threshold" type="number" min="0" defaultValue="50" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" type="date" defaultValue="2026-01-01" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="manufacturer">Manufacturer</Label>
                      <Input id="manufacturer" defaultValue="Generic" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="price">Price ($)</Label>
                      <Input id="price" type="number" step="0.01" min="0" defaultValue="10.99" required />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="ndc">NDC (National Drug Code)</Label>
                    <Input id="ndc" placeholder="e.g., 12345-678-90" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setShowAddDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Item</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>

          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
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
                <th className="py-3 px-4 text-left font-medium">Location</th>
                <th className="py-3 px-4 text-left font-medium">Expiry</th>
                <th className="py-3 px-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-3 px-4 font-medium">
                    <div>
                      {item.name}
                      {item.delayed && (
                        <Badge variant="outline" className="ml-2 text-red-500 border-red-200 bg-red-50">
                          Delayed
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">{item.ndc !== "N/A" ? `NDC: ${item.ndc}` : ""}</div>
                  </td>
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
                  <td className="py-3 px-4">{item.location}</td>
                  <td className="py-3 px-4">
                    {item.expiryDate !== "N/A" ? (
                      <div className={isExpiringSoon(item.expiryDate) ? "text-amber-600" : ""}>
                        {item.expiryDate}
                        {isExpiringSoon(item.expiryDate) && (
                          <div className="flex items-center text-xs text-amber-600">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Expiring soon
                          </div>
                        )}
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </td>
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
                  <td colSpan={7} className="py-6 text-center text-muted-foreground">
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

      {/* Order More Dialog */}
      <Dialog open={showOrderDialog} onOpenChange={setShowOrderDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={submitOrder}>
            <DialogHeader>
              <DialogTitle>Order Inventory</DialogTitle>
              <DialogDescription>
                Place an order for {inventory.find((item) => item.id === selectedItemId)?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="order-quantity">Order Quantity</Label>
                <Input id="order-quantity" type="number" min="1" defaultValue="100" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select defaultValue="normal">
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="supplier">Supplier</Label>
                <Select defaultValue="preferred">
                  <SelectTrigger id="supplier">
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="preferred">Preferred Supplier</SelectItem>
                    <SelectItem value="alternate1">Alternate Supplier 1</SelectItem>
                    <SelectItem value="alternate2">Alternate Supplier 2</SelectItem>
                    <SelectItem value="new">Add New Supplier</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Input id="notes" placeholder="Any special instructions for this order" />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowOrderDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">Place Order</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
