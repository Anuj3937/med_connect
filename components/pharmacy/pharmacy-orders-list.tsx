"use client"

import { useState } from "react"
import { Clock, Package, Truck, FileText, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function PharmacyOrdersList() {
  const { toast } = useToast()
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null)

  const [orders, setOrders] = useState([
    {
      id: "ORD-2024-0128",
      supplier: "MedSupply Inc.",
      items: [
        { name: "Lisinopril 10mg", quantity: 1000, unit: "tablets" },
        { name: "Metformin 500mg", quantity: 500, unit: "tablets" },
      ],
      total: "$2,450.00",
      status: "processing",
      date: "July 10, 2024",
      estimatedDelivery: "July 15, 2024",
      trackingNumber: "MS12345678",
      poNumber: "PO-2024-0128",
      notes: "Regular monthly order",
    },
    {
      id: "ORD-2024-0127",
      supplier: "PharmaCorp",
      items: [
        { name: "Amoxicillin 500mg", quantity: 200, unit: "capsules" },
        { name: "Ibuprofen 200mg", quantity: 300, unit: "tablets" },
      ],
      total: "$1,850.00",
      status: "shipped",
      date: "July 8, 2024",
      estimatedDelivery: "July 12, 2024",
      trackingNumber: "PC87654321",
      poNumber: "PO-2024-0127",
      notes: "Expedited shipping requested",
    },
    {
      id: "ORD-2024-0126",
      supplier: "Healthcare Logistics",
      items: [
        { name: "Prescription Bottles", quantity: 500, unit: "pieces" },
        { name: "Prescription Labels", quantity: 1000, unit: "pieces" },
      ],
      total: "$750.00",
      status: "delivered",
      date: "July 5, 2024",
      estimatedDelivery: "July 10, 2024",
      deliveredDate: "July 9, 2024",
      trackingNumber: "HL98765432",
      poNumber: "PO-2024-0126",
      notes: "",
    },
    {
      id: "ORD-2024-0125",
      supplier: "MedSupply Inc.",
      items: [
        { name: "Atorvastatin 20mg", quantity: 500, unit: "tablets" },
        { name: "Omeprazole 20mg", quantity: 300, unit: "capsules" },
      ],
      total: "$1,950.00",
      status: "delivered",
      date: "July 1, 2024",
      estimatedDelivery: "July 6, 2024",
      deliveredDate: "July 5, 2024",
      trackingNumber: "MS12345679",
      poNumber: "PO-2024-0125",
      notes: "",
    },
  ])

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order)
    setShowDetailsDialog(true)
  }

  const handleReportIssue = () => {
    toast({
      title: "Issue reported",
      description: "Your issue has been reported to the supplier.",
    })
    setShowDetailsDialog(false)
  }

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
                  <span>
                    {order.status === "delivered"
                      ? `Delivered: ${order.deliveredDate}`
                      : `Est. Delivery: ${order.estimatedDelivery}`}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={() => handleViewDetails(order)}>
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

      {orders.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No orders found.</p>
        </div>
      )}

      {/* Order Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              {selectedOrder?.id} - {selectedOrder?.supplier}
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <div>{getStatusBadge(selectedOrder.status)}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Order Date</Label>
                  <div>{selectedOrder.date}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">PO Number</Label>
                  <div>{selectedOrder.poNumber}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Tracking Number</Label>
                  <div>{selectedOrder.trackingNumber}</div>
                </div>
              </div>

              <div>
                <Label className="text-muted-foreground">Items</Label>
                <div className="mt-2 space-y-2">
                  {selectedOrder.items.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between border-b pb-2">
                      <span>{item.name}</span>
                      <span>
                        {item.quantity} {item.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>{selectedOrder.total}</span>
              </div>

              {selectedOrder.notes && (
                <div>
                  <Label className="text-muted-foreground">Notes</Label>
                  <div className="mt-1 text-sm">{selectedOrder.notes}</div>
                </div>
              )}

              {selectedOrder.status === "shipped" && (
                <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-700">Shipment in Transit</span>
                  </div>
                  <p className="text-sm text-blue-700 mt-1">Estimated delivery: {selectedOrder.estimatedDelivery}</p>
                </div>
              )}

              {selectedOrder.status === "delivered" && (
                <div className="bg-green-50 border border-green-200 rounded-md p-3">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-700">Delivered</span>
                  </div>
                  <p className="text-sm text-green-700 mt-1">Delivered on: {selectedOrder.deliveredDate}</p>
                </div>
              )}

              {(selectedOrder.status === "processing" || selectedOrder.status === "shipped") && (
                <div>
                  <Label htmlFor="issue">Report an Issue</Label>
                  <Textarea id="issue" placeholder="Describe any issues with this order..." className="mt-1" />
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowDetailsDialog(false)}>
              Close
            </Button>
            {(selectedOrder?.status === "processing" || selectedOrder?.status === "shipped") && (
              <Button type="button" onClick={handleReportIssue}>
                <AlertCircle className="mr-2 h-4 w-4" />
                Report Issue
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
