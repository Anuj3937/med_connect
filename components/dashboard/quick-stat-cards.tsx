"use client"

import { Bed, Clock, Users, AlertTriangle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function QuickStatCards() {
  const stats = [
    {
      title: "Total Bed Capacity",
      value: "76%",
      change: "+4%",
      description: "3,842 of 5,050 beds occupied",
      icon: <Bed className="h-5 w-5 text-white" />,
      iconBg: "bg-blue-500",
      status: "warning",
    },
    {
      title: "ICU Availability",
      value: "12%",
      change: "-3%",
      description: "68 of 620 ICU beds available",
      icon: <AlertTriangle className="h-5 w-5 text-white" />,
      iconBg: "bg-red-500",
      status: "critical",
    },
    {
      title: "Average Wait Time",
      value: "42 min",
      change: "+8 min",
      description: "Emergency department average",
      icon: <Clock className="h-5 w-5 text-white" />,
      iconBg: "bg-amber-500",
      status: "warning",
    },
    {
      title: "Active Transfers",
      value: "24",
      change: "+6",
      description: "Patient transfers in progress",
      icon: <Users className="h-5 w-5 text-white" />,
      iconBg: "bg-green-500",
      status: "normal",
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
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
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
  )
}
