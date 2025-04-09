"use client"

import { AlertTriangle, ArrowRight, Clock, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function HospitalInventoryAlerts() {
  const alerts = [
    {
      id: "alert-1",
      type: "critical",
      item: "Oxygen Tanks",
      message: "Stock critically low (5 remaining)",
      time: "10 minutes ago",
    },
    {
      id: "alert-2",
      type: "low",
      item: "IV Solution (Normal Saline)",
      message: "Stock below threshold (25 remaining)",
      time: "1 hour ago",
    },
    {
      id: "alert-3",
      type: "expiring",
      item: "Antibiotics (Amoxicillin)",
      message: "Expires in 30 days",
      time: "2 hours ago",
    },
    {
      id: "alert-4",
      type: "critical",
      item: "Dialysis Machines",
      message: "Only 1 available",
      time: "3 hours ago",
    },
  ]

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div key={alert.id} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
          <div
            className={`rounded-full p-1.5 ${
              alert.type === "critical" ? "bg-red-100" : alert.type === "low" ? "bg-amber-100" : "bg-blue-100"
            }`}
          >
            {alert.type === "critical" || alert.type === "low" ? (
              <AlertTriangle
                className={`h-3.5 w-3.5 ${alert.type === "critical" ? "text-red-600" : "text-amber-600"}`}
              />
            ) : (
              <Clock className="h-3.5 w-3.5 text-blue-600" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">{alert.item}</h4>
              <Badge
                variant="outline"
                className={`text-xs ${
                  alert.type === "critical"
                    ? "text-red-500 border-red-200 bg-red-50"
                    : alert.type === "low"
                      ? "text-amber-500 border-amber-200 bg-amber-50"
                      : "text-blue-500 border-blue-200 bg-blue-50"
                }`}
              >
                {alert.type === "critical" ? "Critical" : alert.type === "low" ? "Low Stock" : "Expiring Soon"}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{alert.message}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-muted-foreground">{alert.time}</span>
              <Button variant="ghost" size="sm" className="h-6 px-2">
                <span className="text-xs">View</span>
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      ))}

      {alerts.length === 0 && (
        <div className="text-center py-4">
          <Package className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No alerts at this time</p>
        </div>
      )}

      <Button variant="outline" size="sm" className="w-full mt-2">
        View All Alerts
      </Button>
    </div>
  )
}
