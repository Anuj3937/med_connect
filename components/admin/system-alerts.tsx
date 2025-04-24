"use client"

import { useState } from "react"
import { AlertTriangle, Clock, Server, Database, CheckCircle, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SystemAlerts() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("active")

  const [alerts, setAlerts] = useState([
    {
      id: "alert-1",
      title: "Database Performance Degradation",
      description: "Database query response time has increased by 25% in the last hour.",
      time: "15 minutes ago",
      severity: "warning",
      type: "database",
      acknowledged: false,
      resolved: false,
    },
    {
      id: "alert-2",
      title: "High CPU Usage",
      description: "Server CPU usage has exceeded 80% for more than 10 minutes.",
      time: "30 minutes ago",
      severity: "warning",
      type: "server",
      acknowledged: true,
      resolved: false,
    },
    {
      id: "alert-3",
      title: "Storage Space Low",
      description: "Storage space is below 15% on the primary file server.",
      time: "1 hour ago",
      severity: "critical",
      type: "storage",
      acknowledged: false,
      resolved: false,
    },
    {
      id: "alert-4",
      title: "API Rate Limit Approaching",
      description: "External API rate limit is at 85% of maximum allocation.",
      time: "2 hours ago",
      severity: "info",
      type: "api",
      acknowledged: true,
      resolved: false,
    },
    {
      id: "alert-5",
      title: "Scheduled Maintenance Completed",
      description: "Database maintenance has been completed successfully.",
      time: "1 day ago",
      severity: "success",
      type: "maintenance",
      acknowledged: true,
      resolved: true,
    },
  ])

  const handleAcknowledge = (id) => {
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, acknowledged: true } : alert)))
    toast({
      title: "Alert acknowledged",
      description: "The alert has been marked as acknowledged.",
    })
  }

  const handleResolve = (id) => {
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, resolved: true } : alert)))
    toast({
      title: "Alert resolved",
      description: "The alert has been marked as resolved.",
    })
  }

  const handleDismiss = (id) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
    toast({
      title: "Alert dismissed",
      description: "The alert has been dismissed from the list.",
    })
  }

  const getSeverityBadge = (severity) => {
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

  const getAlertIcon = (type) => {
    switch (type) {
      case "database":
        return <Database className="h-4 w-4" />
      case "server":
        return <Server className="h-4 w-4" />
      case "storage":
        return <Database className="h-4 w-4" />
      case "api":
        return <Server className="h-4 w-4" />
      case "maintenance":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  // Filter alerts based on active tab
  const filteredAlerts = alerts.filter(
    (alert) =>
      (activeTab === "active" && !alert.resolved) ||
      (activeTab === "resolved" && alert.resolved) ||
      activeTab === "all",
  )

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active">Active Alerts</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
          <TabsTrigger value="all">All Alerts</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`rounded-lg border p-4 ${
              alert.severity === "critical" ? "border-red-200 bg-red-50/50" : ""
            } ${alert.resolved ? "opacity-60" : ""}`}
          >
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
                  {alert.acknowledged && !alert.resolved && (
                    <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">
                      Acknowledged
                    </Badge>
                  )}
                  {alert.resolved && (
                    <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                      Resolved
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                {!alert.acknowledged && !alert.resolved && (
                  <Button size="sm" variant="outline" onClick={() => handleAcknowledge(alert.id)}>
                    Acknowledge
                  </Button>
                )}
                {!alert.resolved && (
                  <Button size="sm" onClick={() => handleResolve(alert.id)}>
                    Resolve
                  </Button>
                )}
                <Button size="sm" variant="ghost" onClick={() => handleDismiss(alert.id)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {filteredAlerts.length === 0 && (
          <div className="text-center py-8">
            <AlertTriangle className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No {activeTab} alerts at this time.</p>
          </div>
        )}
      </div>
    </div>
  )
}
