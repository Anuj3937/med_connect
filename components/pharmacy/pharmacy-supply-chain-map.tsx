"use client"

import { useRef, useState } from "react"
import { useTheme } from "next-themes"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Package, Truck, MapPin, Clock } from "lucide-react"

export function PharmacySupplyChainMap() {
  const { theme } = useTheme()
  const mapRef = useRef(null)
  const [activeTab, setActiveTab] = useState("map")
  const [selectedSupplier, setSelectedSupplier] = useState(null)

  // Mock data for suppliers
  const suppliers = [
    {
      id: "sup-1",
      name: "MedSupply Inc.",
      location: "Chicago, IL",
      status: "active",
      reliability: 98,
      leadTime: "3-5 days",
      activeOrders: 2,
      products: ["Lisinopril", "Metformin", "Atorvastatin"],
    },
    {
      id: "sup-2",
      name: "PharmaCorp",
      location: "Atlanta, GA",
      status: "active",
      reliability: 95,
      leadTime: "4-6 days",
      activeOrders: 1,
      products: ["Amoxicillin", "Ibuprofen", "Cetirizine"],
    },
    {
      id: "sup-3",
      name: "Healthcare Logistics",
      location: "Dallas, TX",
      status: "issue",
      reliability: 87,
      leadTime: "5-7 days",
      activeOrders: 1,
      products: ["Prescription Bottles", "Prescription Labels", "Alcohol Swabs"],
    },
    {
      id: "sup-4",
      name: "MediPharm Distributors",
      location: "Los Angeles, CA",
      status: "active",
      reliability: 96,
      leadTime: "3-5 days",
      activeOrders: 0,
      products: ["Omeprazole", "Simvastatin", "Amlodipine"],
    },
  ]

  // Mock data for shipments
  const shipments = [
    {
      id: "ship-1",
      supplier: "MedSupply Inc.",
      origin: "Chicago, IL",
      destination: "Your Pharmacy",
      status: "in-transit",
      estimatedArrival: "July 15, 2024",
      trackingNumber: "MS12345678",
      items: ["Lisinopril 10mg", "Metformin 500mg"],
    },
    {
      id: "ship-2",
      supplier: "PharmaCorp",
      origin: "Atlanta, GA",
      destination: "Your Pharmacy",
      status: "in-transit",
      estimatedArrival: "July 12, 2024",
      trackingNumber: "PC87654321",
      items: ["Amoxicillin 500mg", "Ibuprofen 200mg"],
    },
    {
      id: "ship-3",
      supplier: "Healthcare Logistics",
      origin: "Dallas, TX",
      destination: "Your Pharmacy",
      status: "delayed",
      estimatedArrival: "July 18, 2024 (Delayed)",
      trackingNumber: "HL98765432",
      items: ["Prescription Bottles", "Prescription Labels"],
    },
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
            Active
          </Badge>
        )
      case "issue":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
            Issues Reported
          </Badge>
        )
      case "inactive":
        return (
          <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
            Inactive
          </Badge>
        )
      case "in-transit":
        return (
          <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">
            In Transit
          </Badge>
        )
      case "delayed":
        return (
          <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
            Delayed
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const handleSupplierSelect = (supplier) => {
    setSelectedSupplier(supplier)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Supply Chain Map</CardTitle>
            <CardDescription>Track your suppliers and shipments in real-time</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="map">Map View</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="shipments">Active Shipments</TabsTrigger>
              </TabsList>

              <TabsContent value="map" className="h-[400px] rounded-md border">
                <div className="flex items-center justify-center h-full bg-muted/20">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Interactive map showing supplier locations and active shipments
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      (Map visualization would be implemented with Leaflet or Google Maps API)
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="list">
                <div className="space-y-4">
                  {suppliers.map((supplier) => (
                    <div
                      key={supplier.id}
                      className={`rounded-lg border p-4 cursor-pointer hover:border-primary/50 transition-colors ${
                        selectedSupplier?.id === supplier.id ? "border-primary/50 bg-primary/5" : ""
                      }`}
                      onClick={() => handleSupplierSelect(supplier)}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {getStatusBadge(supplier.status)}
                            <span className="text-sm font-medium">{supplier.name}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>{supplier.location}</span>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <div>Reliability: {supplier.reliability}%</div>
                            <div>Lead Time: {supplier.leadTime}</div>
                            <div>Active Orders: {supplier.activeOrders}</div>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="shipments">
                <div className="space-y-4">
                  {shipments.map((shipment) => (
                    <div key={shipment.id} className="rounded-lg border p-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {getStatusBadge(shipment.status)}
                            <span className="text-sm font-medium">{shipment.supplier}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Tracking: </span>
                            {shipment.trackingNumber}
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-xs">
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              <span>
                                {shipment.origin} → {shipment.destination}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>ETA: {shipment.estimatedArrival}</span>
                            </div>
                          </div>
                          <div className="mt-2 text-xs">
                            <span className="text-muted-foreground">Items: </span>
                            {shipment.items.join(", ")}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Track
                          </Button>
                          <Button size="sm">Details</Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {shipments.length === 0 && (
                    <div className="text-center py-8">
                      <Truck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No active shipments at this time.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Supply Chain Insights</CardTitle>
            <CardDescription>Key metrics and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Active Shipments</h3>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-md border p-2">
                    <div className="text-2xl font-bold">{shipments.length}</div>
                    <div className="text-xs text-muted-foreground">Total</div>
                  </div>
                  <div className="rounded-md border p-2">
                    <div className="text-2xl font-bold text-blue-600">
                      {shipments.filter((s) => s.status === "in-transit").length}
                    </div>
                    <div className="text-xs text-muted-foreground">In Transit</div>
                  </div>
                  <div className="rounded-md border p-2">
                    <div className="text-2xl font-bold text-amber-600">
                      {shipments.filter((s) => s.status === "delayed").length}
                    </div>
                    <div className="text-xs text-muted-foreground">Delayed</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Supplier Performance</h3>
                <div className="space-y-2">
                  {suppliers.map((supplier) => (
                    <div key={supplier.id} className="flex items-center justify-between">
                      <div className="text-sm truncate max-w-[150px]">{supplier.name}</div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              supplier.reliability > 95
                                ? "bg-green-500"
                                : supplier.reliability > 90
                                  ? "bg-amber-500"
                                  : "bg-red-500"
                            }`}
                            style={{ width: `${supplier.reliability}%` }}
                          ></div>
                        </div>
                        <span className="text-xs">{supplier.reliability}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Supply Chain Alerts</h3>
                <div className="space-y-2">
                  <div className="rounded-md border border-amber-200 bg-amber-50 p-3">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                      <span className="text-sm font-medium text-amber-800">Shipment Delay</span>
                    </div>
                    <p className="text-xs text-amber-800 mt-1">
                      Shipment from Healthcare Logistics (HL98765432) is delayed by 3 days.
                    </p>
                  </div>
                  <div className="rounded-md border border-blue-200 bg-blue-50 p-3">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Order Confirmation</span>
                    </div>
                    <p className="text-xs text-blue-800 mt-1">
                      New order #ORD-2024-0129 with MedSupply Inc. has been confirmed.
                    </p>
                  </div>
                </div>
              </div>

              <Button className="w-full">View All Supply Chain Data</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
