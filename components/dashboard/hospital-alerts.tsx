"use client"

import { useState } from "react"
import { AlertTriangle, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function HospitalAlerts() {
  const [alerts, setAlerts] = useState([
    {
      id: "alert-1",
      title: "ICU Capacity Critical",
      description: "ICU capacity at 92%. Consider transferring non-critical ICU patients.",
      time: "15 minutes ago",
      severity: "high",
      acknowledged: false,
    },
    {
      id: "alert-2",
      title: "Emergency Department High Volume",
      description: "ED experiencing high patient volume. Average wait time 48 minutes.",
      time: "30 minutes ago",
      severity: "medium",
      acknowledged: false,
    },
    {
      id: "alert-3",
      title: "Ventilator Shortage",
      description: "Only 4 ventilators remaining in inventory. Request additional if needed.",
      time: "1 hour ago",
      severity: "medium",
      acknowledged: false,
    },
    {
      id: "alert-4",
      title: "Blood Supply (O-) Low",
      description: "O- blood supply critically low. Only 24 units available.",
      time: "2 hours ago",
      severity: "high",
      acknowledged: false,
    },
  ])

  const handleAcknowledge = (id: string) => {
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, acknowledged: true } : alert)))
  }

  const getSeverityBadge = (severity: string) => {
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
              <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
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
                Details
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
