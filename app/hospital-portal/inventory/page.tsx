"use client"

import type React from "react"

import { useState } from "react"
import { Download, Filter, Package, Plus, Search, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { HospitalInventorySummary } from "@/components/hospital/hospital-inventory-summary"
import { HospitalInventoryAlerts } from "@/components/hospital/hospital-inventory-alerts"
import { HospitalInventoryAnalytics } from "@/components/hospital/hospital-inventory-analytics"
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
import { useToast } from "@/hooks/use-toast"

export default function InventoryPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")

  const handleAddInventory = (event: React.FormEvent) => {
    event.preventDefault()
    toast({
      title: "Inventory item added",
      description: "The new inventory item has been added successfully.",
    })
  }

  return (
    <div className="container py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
        <p className="text-muted-foreground">Track, manage, and optimize your hospital's inventory and supplies</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-3/4">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Inventory Items</CardTitle>
                  <CardDescription>Manage your hospital's inventory and supplies</CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Item
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <form onSubmit={handleAddInventory}>
                        <DialogHeader>
                          <DialogTitle>Add New Inventory Item</DialogTitle>
                          <DialogDescription>Enter the details of the new inventory item.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="item-name">Item Name</Label>
                            <Input id="item-name" placeholder="e.g., IV Solution (Normal Saline)" required />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="category">Category</Label>
                              <Select required>
                                <SelectTrigger id="category">
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="medication">Medication</SelectItem>
                                  <SelectItem value="supplies">Supplies</SelectItem>
                                  <SelectItem value="equipment">Equipment</SelectItem>
                                  <SelectItem value="ppe">PPE</SelectItem>
                                  <SelectItem value="fluids">IV Fluids</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="location">Storage Location</Label>
                              <Select required>
                                <SelectTrigger id="location">
                                  <SelectValue placeholder="Select location" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pharmacy">Pharmacy</SelectItem>
                                  <SelectItem value="storage-a">Storage Room A</SelectItem>
                                  <SelectItem value="storage-b">Storage Room B</SelectItem>
                                  <SelectItem value="icu">ICU Storage</SelectItem>
                                  <SelectItem value="er">ER Storage</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="quantity">Quantity</Label>
                              <Input id="quantity" type="number" min="0" required />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="unit">Unit</Label>
                              <Input id="unit" placeholder="e.g., bags, vials, pieces" required />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="threshold">Minimum Threshold</Label>
                              <Input id="threshold" type="number" min="0" required />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="expiry">Expiry Date</Label>
                              <Input id="expiry" type="date" />
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Add Item</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Import
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search inventory..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>

              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Items</TabsTrigger>
                  <TabsTrigger value="low">Low Stock</TabsTrigger>
                  <TabsTrigger value="critical">Critical</TabsTrigger>
                  <TabsTrigger value="expiring">Expiring Soon</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                  <HospitalInventorySummary />
                </TabsContent>

                <TabsContent value="low">
                  <HospitalInventorySummary filterStatus="low" />
                </TabsContent>

                <TabsContent value="critical">
                  <HospitalInventorySummary filterStatus="critical" />
                </TabsContent>

                <TabsContent value="expiring">
                  <HospitalInventorySummary filterExpiring={true} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-1/4">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Inventory Summary</CardTitle>
              <CardDescription>Quick overview of inventory status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-4 rounded-full bg-blue-100 p-2">
                      <Package className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Total Items</p>
                      <p className="text-2xl font-bold">2,458</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-4 rounded-full bg-amber-100 p-2">
                      <Package className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Low Stock</p>
                      <p className="text-2xl font-bold">24</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-4 rounded-full bg-red-100 p-2">
                      <Package className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Critical</p>
                      <p className="text-2xl font-bold">8</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-4 rounded-full bg-green-100 p-2">
                      <Package className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Optimal</p>
                      <p className="text-2xl font-bold">2,426</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Inventory Alerts</CardTitle>
              <CardDescription>Recent inventory alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <HospitalInventoryAlerts />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inventory Analytics</CardTitle>
              <CardDescription>Usage trends and patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <HospitalInventoryAnalytics />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
