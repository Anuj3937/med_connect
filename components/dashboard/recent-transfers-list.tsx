"use client"

import { Ambulance, ArrowRight, Clock, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function RecentTransfersList() {
  const transfers = [
    {
      id: "TR-2024-0642",
      from: "Riverside Community Hospital",
      to: "University Medical Center",
      patient: "Cardiac patient",
      status: "In Transit",
      time: "10 minutes ago",
      priority: "Urgent",
    },
    {
      id: "TR-2024-0641",
      from: "Memorial General Hospital",
      to: "University Medical Center",
      patient: "Trauma patient",
      status: "Completed",
      time: "45 minutes ago",
      priority: "Emergency",
    },
    {
      id: "TR-2024-0640",
      from: "Children's Hospital",
      to: "Memorial General Hospital",
      patient: "Pediatric ICU patient",
      status: "Preparing",
      time: "1 hour ago",
      priority: "Urgent",
    },
    {
      id: "TR-2024-0639",
      from: "University Medical Center",
      to: "Riverside Community Hospital",
      patient: "Post-surgical patient",
      status: "Completed",
      time: "2 hours ago",
      priority: "Standard",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Transit":
        return (
          <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">
            In Transit
          </Badge>
        )
      case "Completed":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
            Completed
          </Badge>
        )
      case "Preparing":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
            Preparing
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Emergency":
        return <Badge variant="destructive">Emergency</Badge>
      case "Urgent":
        return (
          <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">
            Urgent
          </Badge>
        )
      case "Standard":
        return <Badge variant="outline">Standard</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-4">
      {transfers.map((transfer) => (
        <div key={transfer.id} className="rounded-lg border p-4">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getPriorityBadge(transfer.priority)}
                <span className="text-sm font-medium">{transfer.id}</span>
              </div>
              {getStatusBadge(transfer.status)}
            </div>

            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1 min-w-0">
                <MapPin className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                <span className="truncate">{transfer.from}</span>
              </div>
              <ArrowRight className="h-3 w-3 text-muted-foreground flex-shrink-0" />
              <div className="flex items-center gap-1 min-w-0">
                <MapPin className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                <span className="truncate">{transfer.to}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Ambulance className="h-3 w-3" />
                <span>{transfer.patient}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{transfer.time}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
