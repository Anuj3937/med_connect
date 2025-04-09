"use client"

import { useState } from "react"
import { Clock, Package, Truck, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function HospitalOrdersList() {
  const [orders, setOrders] = useState([
    {
      id: "ORD-2024-0128",
      supplier: "MedSupply Inc.",
      items: [
        { name: "Surgical Masks", quantity: 1000, unit: "pieces" },
        { name: "Disposable Gloves", quantity: 500, unit: "pairs" },
      ],
      total: "$2,450.00",
      status: "processing",
      date: "July 10, 2024",
      estimatedDelivery: "July 15, 2024",
    },
    {
      id: "ORD-2024-0127",
      supplier: "PharmaCorp",
      items: [
        { name: "Antibiotics (Amoxicillin)", quantity: 100, unit: "bottles" },
        { name: "Pain Relievers", quantity: 200, unit: "boxes" },
      ],
      total: "$3,850.00",
      status: "shipped",
      date: "July 8, 2024",
      estimatedDelivery: "July 12, 2024",
    },
    {
      id: "ORD-2024-0126",
      supplier: "Healthcare Logistics",
      items: [
        { name: "IV Solution (Normal Saline)", quantity: 100, unit: "bags" },
        { name: "Syringes (10ml)", quantity: 500, unit: "pieces" },
      ],
      total: "$1,750.00",
      status: "delivered",
      date: "July 5, 2024",
      estimatedDelivery: "July 10, 2024",
    },
  ])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processing":
        return (
          <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">
            Processing
          </Badge>
        )
      case "shipped":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
            Shipped
          </Badge>
        )
      case "delivered":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
            Delivered
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="rounded-lg border p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {getStatusBadge(order.status)}
                <span className="text-sm font-medium">{order.id}</span>
              </div>
              <h4 className="font-medium">{order.supplier}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {order.items.length} items • Total: {order.total}
              </p>
              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>Ordered: {order.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Truck className="h-3 w-3" />
                  <span>Est. Delivery: {order.estimatedDelivery}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                View Details
              </Button>
              {order.status === "processing" && (
                <Button size="sm">
                  <Package className="mr-2 h-4 w-4" />
                  Track Order
                </Button>
              )}
              {order.status === "shipped" && (
                <Button size="sm">
                  <Truck className="mr-2 h-4 w-4" />
                  Track Shipment
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
