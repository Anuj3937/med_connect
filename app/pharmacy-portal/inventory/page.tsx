"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Plus, TrendingUp, AlertTriangle, Truck, Package, Calendar, BarChart3 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { InventoryChart } from "@/components/pharmacy/inventory-chart"
import { SupplyChainTimeline } from "@/components/pharmacy/supply-chain-timeline"
import { VendorPerformanceChart } from "@/components/pharmacy/vendor-performance-chart"
import { ExpiryTracker } from "@/components/pharmacy/expiry-tracker"

// Mock data for inventory items
const inventoryItems = [
  {
    id: "1",
    name: "Amoxicillin 500mg",
    category: "Antibiotics",
    stock: 1250,
    minStock: 500,
    maxStock: 2000,
    expiryDate: "2025-06-15",
    vendor: "PharmaCorp",
    lastOrdered: "2023-11-10",
    status: "In Stock",
    price: 0.45,
    location: "Shelf A-12",
  },
  {
    id: "2",
    name: "Lisinopril 10mg",
    category: "Cardiovascular",
    stock: 320,
    minStock: 400,
    maxStock: 1500,
    expiryDate: "2025-03-22",
    vendor: "MediSupply",
    lastOrdered: "2023-10-28",
    status: "Low Stock",
    price: 0.32,
    location: "Shelf B-05",
  },
  {
    id: "3",
    name: "Metformin 850mg",
    category: "Diabetes",
    stock: 780,
    minStock: 300,
    maxStock: 1200,
    expiryDate: "2024-12-10",
    vendor: "HealthDist",
    lastOrdered: "2023-11-05",
    status: "In Stock",
    price: 0.18,
    location: "Shelf C-08",
  },
  {
    id: "4",
    name: "Atorvastatin 20mg",
    category: "Cardiovascular",
    stock: 150,
    minStock: 200,
    maxStock: 800,
    expiryDate: "2025-01-30",
    vendor: "PharmaCorp",
    lastOrdered: "2023-10-15",
    status: "Low Stock",
    price: 0.65,
    location: "Shelf B-07",
  },
  {
    id: "5",
    name: "Albuterol Inhaler",
    category: "Respiratory",
    stock: 45,
    minStock: 50,
    maxStock: 200,
    expiryDate: "2024-08-18",
    vendor: "MediSupply",
    lastOrdered: "2023-11-01",
    status: "Low Stock",
    price: 12.5,
    location: "Shelf D-03",
  },
  {
    id: "6",
    name: "Ibuprofen 400mg",
    category: "Pain Relief",
    stock: 1800,
    minStock: 600,
    maxStock: 2500,
    expiryDate: "2025-09-05",
    vendor: "HealthDist",
    lastOrdered: "2023-11-12",
    status: "In Stock",
    price: 0.08,
    location: "Shelf A-03",
  },
  {
    id: "7",
    name: "Omeprazole 20mg",
    category: "Gastrointestinal",
    stock: 520,
    minStock: 300,
    maxStock: 1000,
    expiryDate: "2025-02-28",
    vendor: "PharmaCorp",
    lastOrdered: "2023-10-20",
    status: "In Stock",
    price: 0.25,
    location: "Shelf C-11",
  },
  {
    id: "8",
    name: "Insulin Glargine",
    category: "Diabetes",
    stock: 85,
    minStock: 100,
    maxStock: 300,
    expiryDate: "2024-07-15",
    vendor: "MediSupply",
    lastOrdered: "2023-11-08",
    status: "Low Stock",
    price: 45.75,
    location: "Refrigerator 2",
  },
]

// Mock data for vendors
const vendors = [
  { id: "1", name: "PharmaCorp", reliability: 92, leadTime: 3, costIndex: 98 },
  { id: "2", name: "MediSupply", reliability: 87, leadTime: 5, costIndex: 92 },
  { id: "3", name: "HealthDist", reliability: 95, leadTime: 4, costIndex: 105 },
  { id: "4", name: "GlobalPharma", reliability: 89, leadTime: 7, costIndex: 85 },
]

// Mock data for supply chain events
const supplyChainEvents = [
  { id: "1", product: "Amoxicillin 500mg", event: "Order Placed", date: "2023-11-10", status: "Completed" },
  { id: "2", product: "Amoxicillin 500mg", event: "Order Confirmed", date: "2023-11-11", status: "Completed" },
  { id: "3", product: "Amoxicillin 500mg", event: "Shipped", date: "2023-11-13", status: "Completed" },
  { id: "4", product: "Amoxicillin 500mg", event: "In Transit", date: "2023-11-14", status: "In Progress" },
  { id: "5", product: "Amoxicillin 500mg", event: "Delivery Expected", date: "2023-11-16", status: "Pending" },
  { id: "6", product: "Lisinopril 10mg", event: "Order Placed", date: "2023-10-28", status: "Completed" },
  { id: "7", product: "Lisinopril 10mg", event: "Order Confirmed", date: "2023-10-29", status: "Completed" },
  { id: "8", product: "Lisinopril 10mg", event: "Shipped", date: "2023-10-31", status: "Completed" },
  { id: "9", product: "Lisinopril 10mg", event: "Delivered", date: "2023-11-03", status: "Completed" },
]

export default function PharmacyInventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter inventory items based on search term and filters
  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.vendor.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
    const matchesStatus = statusFilter === "all" || item.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  // Get unique categories for filter
  const categories = ["all", ...new Set(inventoryItems.map((item) => item.category))]
  const statuses = ["all", ...new Set(inventoryItems.map((item) => item.status))]

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Drug Inventory Management</h1>
          <p className="text-muted-foreground">Track, manage, and optimize your pharmaceutical inventory</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          Add New Item
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Inventory Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$124,568.50</div>
            <p className="text-xs text-muted-foreground">+2.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Requires immediate attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Within next 90 days</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="inventory" className="w-full">
        <TabsList className="grid grid-cols-4 md:w-[600px] mb-4">
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="supply-chain">Supply Chain</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Management</CardTitle>
              <CardDescription>View and manage your pharmaceutical inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search medications..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status === "all" ? "All Statuses" : status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter size={16} />
                  More Filters
                </Button>
              </div>

              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-3 px-4 text-left">Medication</th>
                      <th className="py-3 px-4 text-left">Category</th>
                      <th className="py-3 px-4 text-left">Stock Level</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-left">Expiry Date</th>
                      <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-3 px-4">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-muted-foreground">{item.vendor}</div>
                        </td>
                        <td className="py-3 px-4">{item.category}</td>
                        <td className="py-3 px-4">
                          <div className="flex flex-col gap-1">
                            <div className="flex justify-between text-xs">
                              <span>{item.stock} units</span>
                              <span>{Math.round((item.stock / item.maxStock) * 100)}%</span>
                            </div>
                            <Progress
                              value={(item.stock / item.maxStock) * 100}
                              className={item.stock < item.minStock ? "h-2 bg-muted" : "h-2"}
                              indicatorClassName={item.stock < item.minStock ? "bg-destructive" : ""}
                            />
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={item.status === "In Stock" ? "outline" : "destructive"}>{item.status}</Badge>
                        </td>
                        <td className="py-3 px-4">{item.expiryDate}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              Order
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Distribution</CardTitle>
                <CardDescription>By category</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <InventoryChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Expiry Tracking</CardTitle>
                <CardDescription>Items expiring in next 180 days</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ExpiryTracker />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="supply-chain" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Supply Chain Management</CardTitle>
              <CardDescription>Track orders and shipments in real-time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search orders..." className="pl-8" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="flex items-center gap-2">
                  <Calendar size={16} />
                  Date Range
                </Button>
              </div>

              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-3 px-4 text-left">Product</th>
                      <th className="py-3 px-4 text-left">Event</th>
                      <th className="py-3 px-4 text-left">Date</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {supplyChainEvents.map((event) => (
                      <tr key={event.id} className="border-b">
                        <td className="py-3 px-4">{event.product}</td>
                        <td className="py-3 px-4">{event.event}</td>
                        <td className="py-3 px-4">{event.date}</td>
                        <td className="py-3 px-4">
                          <Badge
                            variant={
                              event.status === "Completed"
                                ? "outline"
                                : event.status === "In Progress"
                                  ? "secondary"
                                  : "default"
                            }
                          >
                            {event.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="outline" size="sm">
                            Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Supply Chain Timeline</h3>
                <SupplyChainTimeline />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vendors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vendor Management</CardTitle>
              <CardDescription>Manage and evaluate your suppliers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search vendors..." className="pl-8" />
                </div>
                <Button className="flex items-center gap-2">
                  <Plus size={16} />
                  Add Vendor
                </Button>
              </div>

              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-3 px-4 text-left">Vendor</th>
                      <th className="py-3 px-4 text-left">Reliability Score</th>
                      <th className="py-3 px-4 text-left">Avg. Lead Time</th>
                      <th className="py-3 px-4 text-left">Cost Index</th>
                      <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendors.map((vendor) => (
                      <tr key={vendor.id} className="border-b">
                        <td className="py-3 px-4 font-medium">{vendor.name}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Progress
                              value={vendor.reliability}
                              className="h-2 w-[100px]"
                              indicatorClassName={
                                vendor.reliability > 90
                                  ? "bg-green-500"
                                  : vendor.reliability > 80
                                    ? "bg-amber-500"
                                    : "bg-red-500"
                              }
                            />
                            <span>{vendor.reliability}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">{vendor.leadTime} days</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            {vendor.costIndex < 100 ? (
                              <span className="text-green-500 flex items-center">
                                <TrendingUp size={16} />
                                {vendor.costIndex}
                              </span>
                            ) : (
                              <span className="text-amber-500">{vendor.costIndex}</span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Details
                            </Button>
                            <Button variant="outline" size="sm">
                              Orders
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Vendor Performance Comparison</h3>
                <VendorPerformanceChart />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Consumption Patterns</CardTitle>
                <CardDescription>Monthly usage by category</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <BarChart3 size={48} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Stockout Risk Analysis</CardTitle>
                <CardDescription>Probability of stockouts in next 30 days</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <AlertTriangle size={48} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Supply Chain Performance</CardTitle>
                <CardDescription>Order fulfillment metrics</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <Truck size={48} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Inventory Turnover</CardTitle>
                <CardDescription>Rate of inventory consumption</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <Package size={48} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
