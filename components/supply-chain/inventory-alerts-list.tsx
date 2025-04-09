"use client"

import { useState } from "react"
import { AlertTriangle, Clock, Pill, Truck, Building } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function InventoryAlertsList() {
  const [alerts, setAlerts] = useState([
    {
      id: "alert-1",
      title: "Critical Shortage: Amoxicillin",
      description: "Inventory below 10% of minimum threshold at Memorial General Hospital",
      location: "Memorial General Hospital",
      time: "15 minutes ago",
      severity: "critical",
      acknowledged: false,
      type: "shortage",
    },
    {
      id: "alert-2",
      title: "Expiring Soon: Insulin",
      description: "50 units expiring in 30 days at University Medical Center",
      location: "University Medical Center",
      time: "45 minutes ago",
      severity: "high",
      acknowledged: false,
      type: "expiring",
    },
    {
      id: "alert-3",
      title: "Shipment Delayed: Respiratory Medications",
      description: "Delivery to Riverside Community Hospital delayed by 48 hours",
      location: "Riverside Community Hospital",
      time: "2 hours ago",
      severity: "medium",
      acknowledged: false,
      type: "shipment",
    },
    {
      id: "alert-4",
      title: "Demand Spike: Antibiotics",
      description: "Predicted 35% increase in demand in ZIP 12345 over next 7 days",
      location: "ZIP 12345",
      time: "3 hours ago",
      severity: "medium",
      acknowledged: false,
      type: "demand",
    },
  ])

  const handleAcknowledge = (id) => {
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, acknowledged: true } : alert)))
  }

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>
      case "high":
        return (
          <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
            High
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
            Medium
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">
            Low
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getAlertIcon = (type) => {
    switch (type) {
      case "shortage":
        return <Pill className="h-4 w-4 text-red-600" />
      case "expiring":
        return <Clock className="h-4 w-4 text-amber-600" />
      case "shipment":
        return <Truck className="h-4 w-4 text-blue-600" />
      case "demand":
        return <Building className="h-4 w-4 text-purple-600" />
      default:
        return <AlertTriangle className="h-4 w-4 text-red-600" />
    }
  }

  return (
    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
      {alerts.map((alert) => (
        <div key={alert.id} className={`rounded-lg border p-3 ${alert.acknowledged ? "opacity-60" : ""}`}>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getAlertIcon(alert.type)}
                <span className="text-sm font-medium">{alert.title}</span>
              </div>
              {getSeverityBadge(alert.severity)}
            </div>

            <p className="text-xs text-muted-foreground">{alert.description}</p>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Building className="h-3 w-3" />
                <span>{alert.location}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{alert.time}</span>
              </div>
            </div>

            <Button
              size="sm"
              variant={alert.acknowledged ? "outline" : "default"}
              className="w-full mt-1"
              onClick={() => handleAcknowledge(alert.id)}
              disabled={alert.acknowledged}
            >
              {alert.acknowledged ? "Acknowledged" : "Acknowledge"}
            </Button>
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
