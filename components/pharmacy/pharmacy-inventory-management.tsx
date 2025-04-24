"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Search, Filter, Plus, AlertTriangle, ArrowUpDown } from "lucide-react"

// Mock data for inventory items
const initialInventory = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    category: "Pain Relief",
    stock: 1250,
    minStock: 500,
    batchNumber: "PCM-2023-05-A",
    expiryDate: "2025-05-30",
    supplier: "MediPharm Ltd",
    lastUpdated: "2023-11-15",
    status: "Adequate",
  },
  {
    id: 2,
    name: "Amoxicillin 250mg",
    category: "Antibiotics",
    stock: 320,
    minStock: 400,
    batchNumber: "AMX-2023-06-B",
    expiryDate: "2024-12-15",
    supplier: "PharmaCare Inc",
    lastUpdated: "2023-11-10",
    status: "Low",
  },
  {
    id: 3,
    name: "Insulin Glargine",
    category: "Diabetes",
    stock: 150,
    minStock: 100,
    batchNumber: "INS-2023-04-C",
    expiryDate: "2024-08-20",
    supplier: "DiabeCare Solutions",
    lastUpdated: "2023-11-12",
    status: "Adequate",
  },
  {
    id: 4,
    name: "Atorvastatin 20mg",
    category: "Cardiovascular",
    stock: 80,
    minStock: 200,
    batchNumber: "ATV-2023-07-D",
    expiryDate: "2025-02-10",
    supplier: "HeartCare Pharma",
    lastUpdated: "2023-11-08",
    status: "Critical",
  },
  {
    id: 5,
    name: "Salbutamol Inhaler",
    category: "Respiratory",
    stock: 95,
    minStock: 100,
    batchNumber: "SLB-2023-06-E",
    expiryDate: "2024-10-25",
    supplier: "RespiCare Ltd",
    lastUpdated: "2023-11-14",
    status: "Low",
  },
]

export function PharmacyInventoryManagement() {
  const [inventory, setInventory] = useState(initialInventory)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" })
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    stock: 0,
    minStock: 0,
    batchNumber: "",
    expiryDate: "",
    supplier: "",
  })
  const [orderQuantity, setOrderQuantity] = useState(0)

  // Filter inventory based on search term, category, and status
  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "All" || item.category === categoryFilter
    const matchesStatus = statusFilter === "All" || item.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  // Sort inventory based on sort config
  const sortedInventory = [...filteredInventory].sort((a, b) => {
    if (!sortConfig.key) return 0

    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1
    }
    return 0
  })

  // Handle sorting when a column header is clicked
  const handleSort = (key) => {
    let direction = "ascending"
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  // Handle adding a new inventory item
  const handleAddItem = () => {
    const id = Math.max(...inventory.map((item) => item.id)) + 1
    const status =
      newItem.stock >= newItem.minStock ? "Adequate" : newItem.stock < newItem.minStock * 0.5 ? "Critical" : "Low"

    const currentDate = new Date().toISOString().split("T")[0]

    const newInventoryItem = {
      id,
      ...newItem,
      lastUpdated: currentDate,
      status,
    }

    setInventory([...inventory, newInventoryItem])
    setNewItem({
      name: "",
      category: "",
      stock: 0,
      minStock: 0,
      batchNumber: "",
      expiryDate: "",
      supplier: "",
    })
    setIsAddDialogOpen(false)
  }

  // Handle ordering more of an item
  const handleOrderMore = () => {
    if (!selectedItem) return

    const updatedInventory = inventory.map((item) => {
      if (item.id === selectedItem.id) {
        const newStock = item.stock + Number.parseInt(orderQuantity)
        const status = newStock >= item.minStock ? "Adequate" : newStock < item.minStock * 0.5 ? "Critical" : "Low"

        return {
          ...item,
          stock: newStock,
          status,
          lastUpdated: new Date().toISOString().split("T")[0],
        }
      }
      return item
    })

    setInventory(updatedInventory)
    setOrderQuantity(0)
    setIsOrderDialogOpen(false)
  }

  // Get unique categories for the filter
  const categories = ["All", ...new Set(inventory.map((item) => item.category))]

  // Get unique statuses for the filter
  const statuses = ["All", "Adequate", "Low", "Critical"]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Pharmacy Inventory Management</CardTitle>
        <CardDescription>Manage your drug inventory, track stock levels, and place orders</CardDescription>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, batch number, or supplier..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <span className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Category</span>
                </span>
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <span className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Status</span>
                </span>
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New Inventory Item</DialogTitle>
                  <DialogDescription>Enter the details of the new drug or medical supply</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="name" className="text-right">
                      Name
                    </label>
                    <Input
                      id="name"
                      value={newItem.name}
                      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="category" className="text-right">
                      Category
                    </label>
                    <Input
                      id="category"
                      value={newItem.category}
                      onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="stock" className="text-right">
                      Initial Stock
                    </label>
                    <Input
                      id="stock"
                      type="number"
                      value={newItem.stock}
                      onChange={(e) => setNewItem({ ...newItem, stock: Number.parseInt(e.target.value) || 0 })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="minStock" className="text-right">
                      Min Stock Level
                    </label>
                    <Input
                      id="minStock"
                      type="number"
                      value={newItem.minStock}
                      onChange={(e) => setNewItem({ ...newItem, minStock: Number.parseInt(e.target.value) || 0 })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="batchNumber" className="text-right">
                      Batch Number
                    </label>
                    <Input
                      id="batchNumber"
                      value={newItem.batchNumber}
                      onChange={(e) => setNewItem({ ...newItem, batchNumber: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="expiryDate" className="text-right">
                      Expiry Date
                    </label>
                    <Input
                      id="expiryDate"
                      type="date"
                      value={newItem.expiryDate}
                      onChange={(e) => setNewItem({ ...newItem, expiryDate: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="supplier" className="text-right">
                      Supplier
                    </label>
                    <Input
                      id="supplier"
                      value={newItem.supplier}
                      onChange={(e) => setNewItem({ ...newItem, supplier: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddItem}>Add Item</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px] cursor-pointer" onClick={() => handleSort("name")}>
                  <div className="flex items-center">
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("category")}>
                  <div className="flex items-center">
                    Category
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("stock")}>
                  <div className="flex items-center">
                    Stock Level
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="hidden md:table-cell">Batch Number</TableHead>
                <TableHead className="hidden md:table-cell">Expiry Date</TableHead>
                <TableHead className="hidden lg:table-cell">Supplier</TableHead>
                <TableHead className="hidden lg:table-cell">Last Updated</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedInventory.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center">
                    No inventory items found.
                  </TableCell>
                </TableRow>
              ) : (
                sortedInventory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between">
                          <span>{item.stock} units</span>
                          <span className="text-xs text-muted-foreground">Min: {item.minStock}</span>
                        </div>
                        <Progress
                          value={(item.stock / item.minStock) * 100}
                          max={200}
                          className={`h-2 ${
                            item.status === "Critical"
                              ? "bg-red-100"
                              : item.status === "Low"
                                ? "bg-amber-100"
                                : "bg-green-100"
                          }`}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{item.batchNumber}</TableCell>
                    <TableCell className="hidden md:table-cell">{item.expiryDate}</TableCell>
                    <TableCell className="hidden lg:table-cell">{item.supplier}</TableCell>
                    <TableCell className="hidden lg:table-cell">{item.lastUpdated}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          item.status === "Critical" ? "destructive" : item.status === "Low" ? "warning" : "success"
                        }
                        className="whitespace-nowrap"
                      >
                        {item.status === "Critical" && <AlertTriangle className="h-3 w-3 mr-1" />}
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Dialog
                        open={isOrderDialogOpen && selectedItem?.id === item.id}
                        onOpenChange={(open) => {
                          setIsOrderDialogOpen(open)
                          if (open) setSelectedItem(item)
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className={
                              item.status !== "Adequate" ? "border-amber-500 text-amber-500 hover:bg-amber-50" : ""
                            }
                          >
                            Order More
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Order More Stock</DialogTitle>
                            <DialogDescription>Place an order for additional units of {item.name}</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label htmlFor="orderQuantity" className="text-right">
                                Quantity
                              </label>
                              <Input
                                id="orderQuantity"
                                type="number"
                                value={orderQuantity}
                                onChange={(e) => setOrderQuantity(e.target.value)}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label className="text-right">Supplier</label>
                              <div className="col-span-3">{item.supplier}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label className="text-right">Current Stock</label>
                              <div className="col-span-3">{item.stock} units</div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsOrderDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleOrderMore}>Place Order</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {sortedInventory.length} of {inventory.length} items
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            Adequate
          </Badge>
          <Badge variant="outline" className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-amber-500"></span>
            Low
          </Badge>
          <Badge variant="outline" className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-red-500"></span>
            Critical
          </Badge>
        </div>
      </CardFooter>
    </Card>
  )
}
