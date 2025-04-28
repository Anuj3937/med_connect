"use client"

import { useState } from "react"
import { Bed, Clock, Users, AlertTriangle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

export function HospitalDashboardCards() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null)

  const stats = [
    {
      id: "bed-capacity",
      title: "Total Bed Capacity",
      value: "76%",
      change: "+4%",
      description: "3,842 of 5,050 beds occupied",
      icon: <Bed className="h-5 w-5 text-white" />,
      iconBg: "bg-blue-500",
      status: "warning",
      details: {
        title: "Bed Capacity Details",
        description: "Current bed occupancy across all departments",
        content: [
          { name: "General Ward", total: 2500, occupied: 1850, status: "normal" },
          { name: "Semi-Private", total: 1200, occupied: 950, status: "warning" },
          { name: "Private", total: 800, occupied: 620, status: "normal" },
          { name: "ICU", total: 300, occupied: 275, status: "critical" },
          { name: "NICU", total: 100, occupied: 62, status: "normal" },
          { name: "Emergency", total: 150, occupied: 85, status: "normal" },
        ],
      },
    },
    {
      id: "icu-availability",
      title: "ICU Availability",
      value: "12%",
      change: "-3%",
      description: "68 of 620 ICU beds available",
      icon: <AlertTriangle className="h-5 w-5 text-white" />,
      iconBg: "bg-red-500",
      status: "critical",
      details: {
        title: "ICU Availability Details",
        description: "Current ICU bed availability by type",
        content: [
          { name: "Medical ICU", total: 200, available: 18, status: "critical" },
          { name: "Surgical ICU", total: 150, available: 12, status: "critical" },
          { name: "Cardiac ICU", total: 100, available: 15, status: "warning" },
          { name: "Neuro ICU", total: 80, available: 8, status: "warning" },
          { name: "Pediatric ICU", total: 50, available: 10, status: "normal" },
          { name: "Neonatal ICU", total: 40, available: 5, status: "warning" },
        ],
      },
    },
    {
      id: "wait-time",
      title: "Average Wait Time",
      value: "42 min",
      change: "+8 min",
      description: "Emergency department average",
      icon: <Clock className="h-5 w-5 text-white" />,
      iconBg: "bg-amber-500",
      status: "warning",
      details: {
        title: "Wait Time Analysis",
        description: "Current wait times across departments",
        content: [
          { name: "Emergency Triage", waitTime: 15, status: "normal" },
          { name: "Emergency Treatment", waitTime: 42, status: "warning" },
          { name: "Outpatient Clinic", waitTime: 35, status: "normal" },
          { name: "Radiology", waitTime: 55, status: "warning" },
          { name: "Laboratory", waitTime: 30, status: "normal" },
          { name: "Pharmacy", waitTime: 25, status: "normal" },
        ],
      },
    },
    {
      id: "active-transfers",
      title: "Active Transfers",
      value: "24",
      change: "+6",
      description: "Patient transfers in progress",
      icon: <Users className="h-5 w-5 text-white" />,
      iconBg: "bg-green-500",
      status: "normal",
      details: {
        title: "Active Transfers Details",
        description: "Current patient transfers by type and status",
        content: [
          { id: "T-1001", patient: "Raj Sharma", from: "Emergency", to: "Medical ICU", status: "in-transit" },
          { id: "T-1002", patient: "Priya Patel", from: "Surgery", to: "Recovery", status: "preparing" },
          { id: "T-1003", patient: "Amit Singh", from: "ICU", to: "General Ward", status: "in-transit" },
          { id: "T-1004", patient: "Neha Gupta", from: "Radiology", to: "Neurology", status: "scheduled" },
          { id: "T-1005", patient: "Vikram Mehta", from: "ER", to: "Cardiac ICU", status: "in-transit" },
        ],
      },
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "critical":
        return (
          <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
            Critical
          </Badge>
        )
      case "warning":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
            Warning
          </Badge>
        )
      case "normal":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
            Normal
          </Badge>
        )
      case "in-transit":
        return (
          <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">
            In Transit
          </Badge>
        )
      case "preparing":
        return (
          <Badge variant="outline" className="text-purple-500 border-purple-200 bg-purple-50">
            Preparing
          </Badge>
        )
      case "scheduled":
        return (
          <Badge variant="outline" className="text-gray-500 border-gray-200 bg-gray-50">
            Scheduled
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const renderDetailContent = (stat) => {
    if (stat.id === "bed-capacity" || stat.id === "icu-availability") {
      return (
        <div className="space-y-4">
          {stat.details.content.map((item, i) => (
            <div key={i} className="rounded-lg border p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{item.name}</h3>
                {getStatusBadge(item.status)}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>
                    {stat.id === "bed-capacity"
                      ? `${item.occupied} of ${item.total} occupied`
                      : `${item.available} of ${item.total} available`}
                  </span>
                  <span>
                    {stat.id === "bed-capacity"
                      ? `${Math.round((item.occupied / item.total) * 100)}%`
                      : `${Math.round((item.available / item.total) * 100)}%`}
                  </span>
                </div>
                <Progress
                  value={
                    stat.id === "bed-capacity"
                      ? (item.occupied / item.total) * 100
                      : (item.available / item.total) * 100
                  }
                  className="h-2"
                  indicatorClassName={
                    item.status === "critical"
                      ? "bg-red-500"
                      : item.status === "warning"
                        ? "bg-amber-500"
                        : "bg-green-500"
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )
    } else if (stat.id === "wait-time") {
      return (
        <div className="space-y-4">
          {stat.details.content.map((item, i) => (
            <div key={i} className="rounded-lg border p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{item.name}</h3>
                {getStatusBadge(item.status)}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{item.waitTime} minutes</span>
              </div>
            </div>
          ))}
        </div>
      )
    } else if (stat.id === "active-transfers") {
      return (
        <div className="space-y-4">
          {stat.details.content.map((item, i) => (
            <div key={i} className="rounded-lg border p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{item.patient}</h3>
                <span className="text-xs text-muted-foreground">ID: {item.id}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                <div>
                  <span className="text-muted-foreground">From:</span> {item.from}
                </div>
                <div>
                  <span className="text-muted-foreground">To:</span> {item.to}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Status:</span>
                {getStatusBadge(item.status)}
              </div>
            </div>
          ))}
        </div>
      )
    }

    return <div>No details available</div>
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedCard(stat.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                </div>
                <div className={`rounded-full ${stat.iconBg} p-2`}>{stat.icon}</div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-medium">
                  {stat.change.startsWith("+") ? (
                    <span className="text-red-600 dark:text-red-400">{stat.change}</span>
                  ) : (
                    <span className="text-green-600 dark:text-green-400">{stat.change}</span>
                  )}
                  <span className="text-muted-foreground ml-1">vs. last week</span>
                </span>
                {getStatusBadge(stat.status)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detail Dialog */}
      {selectedCard && (
        <Dialog open={!!selectedCard} onOpenChange={() => setSelectedCard(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{stats.find((s) => s.id === selectedCard)?.details.title}</DialogTitle>
              <DialogDescription>{stats.find((s) => s.id === selectedCard)?.details.description}</DialogDescription>
            </DialogHeader>
            <div className="mt-4">{renderDetailContent(stats.find((s) => s.id === selectedCard))}</div>
            <div className="flex justify-end mt-4">
              <Button variant="outline" onClick={() => setSelectedCard(null)}>
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
