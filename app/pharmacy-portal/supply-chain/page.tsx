"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, MapPin, Truck, Package, AlertTriangle, Calendar } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SupplyChainMap } from "@/components/pharmacy/supply-chain-map"
import { DeliveryPerformanceChart } from "@/components/pharmacy/delivery-performance-chart"

// Mock data for shipments
const shipments = [
  {
    id: "1",
    orderNumber: "ORD-2023-1142",
    product: "Amoxicillin 500mg",
    quantity: "5000 units",
    origin: "PharmaCorp Warehouse, Chicago",
    destination: "Memorial Hospital",
    status: "In Transit",
    departureDate: "2023-11-13",
    estimatedArrival: "2023-11-16",
    carrier: "MedExpress",
    trackingNumber: "ME789456123",
  },
  {
    id: "2",
    orderNumber: "ORD-2023-1138",
    product: "Lisinopril 10mg",
    quantity: "3000 units",
    origin: "MediSupply Distribution, Atlanta",
    destination: "Memorial Hospital",
    status: "Delivered",
    departureDate: "2023-10-31",
    estimatedArrival: "2023-11-03",
    actualArrival: "2023-11-03",
    carrier: "PharmaLogistics",
    trackingNumber: "PL456789012",
  },
  {
    id: "3",
    orderNumber: "ORD-2023-1145",
    product: "Insulin Glargine",
    quantity: "200 units",
    origin: "MediSupply Distribution, Atlanta",
    destination: "Memorial Hospital",
    status: "Pending",
  },
]

export default function SupplyChainPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("")

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleFilterChange = (value: string) => {
    setFilterStatus(value)
  }

  const filteredShipments = shipments.filter((shipment) => {
    const searchRegex = new RegExp(searchQuery, "i")
    const statusFilter = filterStatus ? shipment.status === filterStatus : true

    return searchRegex.test(shipment.product) && statusFilter
  })

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Supply Chain Management</CardTitle>
          <CardDescription>Track and manage your pharmaceutical supply chain efficiently.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search for products..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <Select onValueChange={handleFilterChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="In Transit">In Transit</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>

            <Tabs defaultvalue="shipments" className="space-y-4">
              <TabsList>
                <TabsTrigger value="shipments">Shipments</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="map">Map</TabsTrigger>
              </TabsList>
              <TabsContent value="shipments" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredShipments.map((shipment) => (
                    <Card key={shipment.id}>
                      <CardHeader>
                        <CardTitle>{shipment.product}</CardTitle>
                        <CardDescription>Order: {shipment.orderNumber}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Package className="h-4 w-4 text-gray-500" />
                          <span>Quantity: {shipment.quantity}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>Origin: {shipment.origin}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Truck className="h-4 w-4 text-gray-500" />
                          <span>Destination: {shipment.destination}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span>Departure: {shipment.departureDate}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span>Arrival: {shipment.estimatedArrival}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="h-4 w-4 text-gray-500" />
                          <span>
                            Status: <Badge variant="secondary">{shipment.status}</Badge>
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="analytics">
                <DeliveryPerformanceChart />
              </TabsContent>
              <TabsContent value="map">
                <SupplyChainMap />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
