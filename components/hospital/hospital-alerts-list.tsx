"use client"

import { useState } from "react"
import { AlertTriangle, Clock, Package, Truck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function HospitalAlertsList() {
  const { toast } = useToast()
  const [alerts, setAlerts] = useState([
    {
      id: "alert-1",
      title: "Critical Inventory Alert",
      description: "IV Solution (Normal Saline) is below critical threshold (25 units remaining).",
      time: "10 minutes ago",
      severity: "critical",
      type: "inventory",
      acknowledged: false,
    },
    {
      id: "alert-2",
      title: "Shipment Delayed",
      description: "Shipment #HL98765432 from Healthcare Logistics has been delayed.",
      time: "25 minutes ago",
      severity: "warning",
      type: "shipment",
      acknowledged: false,
    },
    {
      id: "alert-3",
      title: "Expiring Medication",
      description: "15 units of Epinephrine will expire in 30 days.",
      time: "1 hour ago",
      severity: "info",
      type: "inventory",
      acknowledged: false,
    },
    {
      id: "alert-4",
      title: "Order Confirmation",
      description: "Order #ORD-2024-0128 for Surgical Masks has been confirmed.",
      time: "2 hours ago",
      severity: "success",
      type: "order",
      acknowledged: true,
    },
  ])

  const handleAcknowledge = (id: string) => {
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, acknowledged: true } : alert)))
    toast({
      title: "Alert acknowledged",
      description: "The alert has been marked as acknowledged.",
    })
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>
      case "warning":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
            Warning
          </Badge>
        )
      case "info":
        return (
          <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">
            Info
          </Badge>
        )
      case "success":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
            Success
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "inventory":
        return <Package className="h-4 w-4" />
      case "shipment":
        return <Truck className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div key={alert.id} className={`rounded-lg border p-4 ${alert.acknowledged ? "opacity-60" : ""}`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {getSeverityBadge(alert.severity)}
                <span className="text-sm font-medium">{alert.title}</span>
              </div>
              <p className="text-sm text-muted-foreground">{alert.description}</p>
              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{alert.time}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={alert.acknowledged ? "outline" : "default"}
                onClick={() => handleAcknowledge(alert.id)}
                disabled={alert.acknowledged}
              >
                {alert.acknowledged ? "Acknowledged" : "Acknowledge"}
              </Button>
              <Button size="sm" variant="outline">
                {getAlertIcon(alert.type)}
                <span className="ml-2">Take Action</span>
              </Button>
            </div>
          </div>
        </div>
      ))}

      {alerts.length === 0 && (
        <div className="text-center py-8">
          <AlertTriangle className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-muted-foreground">No active alerts at this time.</p>
        </div>
      )}
    </div>
  )
}
