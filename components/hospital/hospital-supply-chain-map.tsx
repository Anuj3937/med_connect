"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Package, Truck, Building, RefreshCw } from "lucide-react"

export function HospitalSupplyChainMap() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [isLoading, setIsLoading] = useState(true)

  // Simulated supply chain data
  const [supplyChain, setSupplyChain] = useState({
    suppliers: [
      { id: "sup-1", name: "MedSupply Inc.", status: "active", items: 12, lastDelivery: "2 days ago" },
      { id: "sup-2", name: "PharmaCorp", status: "active", items: 8, lastDelivery: "1 day ago" },
      { id: "sup-3", name: "Healthcare Logistics", status: "delayed", items: 5, lastDelivery: "5 days ago" },
    ],
    warehouses: [
      { id: "wh-1", name: "Central Warehouse", status: "active", capacity: 85, items: 1250 },
      { id: "wh-2", name: "East Regional Storage", status: "active", capacity: 72, items: 980 },
      { id: "wh-3", name: "Medical Supplies Depot", status: "maintenance", capacity: 45, items: 620 },
    ],
    shipments: [
      {
        id: "ship-1",
        supplier: "MedSupply Inc.",
        destination: "Memorial General Hospital",
        items: 5,
        status: "in-transit",
        eta: "Tomorrow",
        tracking: "MS12345678",
      },
      {
        id: "ship-2",
        supplier: "PharmaCorp",
        destination: "Memorial General Hospital",
        items: 3,
        status: "processing",
        eta: "3 days",
        tracking: "PC87654321",
      },
      {
        id: "ship-3",
        supplier: "Healthcare Logistics",
        destination: "Central Warehouse",
        items: 8,
        status: "delayed",
        eta: "Unknown",
        tracking: "HL98765432",
      },
    ],
  })

  useEffect(() => {
    // Simulate loading the map data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
            Active
          </Badge>
        )
      case "delayed":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
            Delayed
          </Badge>
        )
      case "maintenance":
        return (
          <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">
            Maintenance
          </Badge>
        )
      case "in-transit":
        return (
          <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">
            In Transit
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="outline" className="text-purple-500 border-purple-200 bg-purple-50">
            Processing
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="relative rounded-lg border overflow-hidden" style={{ height: "400px" }}>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
            <div className="flex flex-col items-center gap-2">
              <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Loading supply chain map...</span>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 bg-slate-100 dark:bg-slate-900">
            {/* This would be replaced with an actual map component */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground mb-2">Interactive supply chain map would render here</p>
                <p className="text-xs text-muted-foreground">(Integration point for map visualization library)</p>
              </div>
            </div>

            {/* Supply chain nodes */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32">
              <Card className="border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800">
                <CardContent className="p-3 text-center">
                  <Building className="h-6 w-6 mx-auto mb-1 text-green-600" />
                  <p className="text-xs font-medium">Suppliers</p>
                  <p className="text-lg font-bold">{supplyChain.suppliers.length}</p>
                </CardContent>
              </Card>
            </div>

            <div className="absolute top-1/3 left-1/2 w-32 h-32">
              <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
                <CardContent className="p-3 text-center">
                  <Package className="h-6 w-6 mx-auto mb-1 text-blue-600" />
                  <p className="text-xs font-medium">Warehouses</p>
                  <p className="text-lg font-bold">{supplyChain.warehouses.length}</p>
                </CardContent>
              </Card>
            </div>

            <div className="absolute top-2/3 left-2/3 w-32 h-32">
              <Card className="border-purple-200 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-800">
                <CardContent className="p-3 text-center">
                  <Building className="h-6 w-6 mx-auto mb-1 text-purple-600" />
                  <p className="text-xs font-medium">Hospital</p>
                  <p className="text-lg font-bold">1</p>
                </CardContent>
              </Card>
            </div>

            <div className="absolute top-1/2 left-1/3 w-32 h-32">
              <Card className="border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800">
                <CardContent className="p-3 text-center">
                  <Truck className="h-6 w-6 mx-auto mb-1 text-amber-600" />
                  <p className="text-xs font-medium">Shipments</p>
                  <p className="text-lg font-bold">{supplyChain.shipments.length}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      <Tabs defaultValue="shipments">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="shipments">
            <Truck className="mr-2 h-4 w-4" />
            Shipments
          </TabsTrigger>
          <TabsTrigger value="suppliers">
            <Building className="mr-2 h-4 w-4" />
            Suppliers
          </TabsTrigger>
          <TabsTrigger value="warehouses">
            <Package className="mr-2 h-4 w-4" />
            Warehouses
          </TabsTrigger>
        </TabsList>

        <TabsContent value="shipments" className="mt-4">
          <div className="space-y-4">
            {supplyChain.shipments.map((shipment) => (
              <div key={shipment.id} className="rounded-lg border p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {getStatusBadge(shipment.status)}
                      <span className="text-sm font-medium">Tracking: {shipment.tracking}</span>
                    </div>
                    <h4 className="font-medium">
                      {shipment.supplier} → {shipment.destination}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {shipment.items} items • ETA: {shipment.eta}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      Track Shipment
                    </Button>
                    <Button size="sm">View Details</Button>
                  </div>
                </div>
              </div>
            ))}

            {supplyChain.shipments.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No active shipments at this time.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="suppliers" className="mt-4">
          <div className="space-y-4">
            {supplyChain.suppliers.map((supplier) => (
              <div key={supplier.id} className="rounded-lg border p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {getStatusBadge(supplier.status)}
                      <span className="text-sm font-medium">{supplier.name}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Supplies {supplier.items} items • Last delivery: {supplier.lastDelivery}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      View Catalog
                    </Button>
                    <Button size="sm">Place Order</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="warehouses" className="mt-4">
          <div className="space-y-4">
            {supplyChain.warehouses.map((warehouse) => (
              <div key={warehouse.id} className="rounded-lg border p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {getStatusBadge(warehouse.status)}
                      <span className="text-sm font-medium">{warehouse.name}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {warehouse.items} items in stock • {warehouse.capacity}% capacity
                    </p>
                    <div className="w-full h-2 bg-gray-100 rounded-full mt-2">
                      <div
                        className={`h-full rounded-full ${
                          warehouse.capacity > 90
                            ? "bg-red-500"
                            : warehouse.capacity > 70
                              ? "bg-amber-500"
                              : "bg-green-500"
                        }`}
                        style={{ width: `${warehouse.capacity}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      View Inventory
                    </Button>
                    <Button size="sm">Request Transfer</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {supplyChain.shipments.some((s) => s.status === "delayed") && (
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-amber-800">Supply Chain Disruption Detected</h4>
              <p className="text-sm text-amber-700 mt-1">
                One or more shipments are experiencing delays. This may affect inventory levels for critical items.
                Consider activating alternative suppliers or adjusting inventory thresholds.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
