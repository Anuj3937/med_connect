"use client"

import { Clock, FileText, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type TransferRequestTableProps = {
  direction: "incoming" | "outgoing" | "completed"
}

export function TransferRequestTable({ direction }: TransferRequestTableProps) {
  const incomingTransfers = [
    {
      id: "TR-2024-0645",
      from: "Riverside Community Hospital",
      patient: "Cardiac patient requiring specialized care",
      priority: "Urgent",
      time: "10 minutes ago",
      status: "Pending Approval",
    },
    {
      id: "TR-2024-0644",
      from: "Children's Hospital",
      patient: "Pediatric trauma patient",
      priority: "Emergency",
      time: "15 minutes ago",
      status: "Pending Approval",
    },
  ]

  const outgoingTransfers = [
    {
      id: "TR-2024-0643",
      to: "University Medical Center",
      patient: "Neurosurgical case requiring specialized care",
      priority: "Urgent",
      time: "25 minutes ago",
      status: "Awaiting Acceptance",
    },
    {
      id: "TR-2024-0642",
      to: "Riverside Community Hospital",
      patient: "Post-surgical patient returning to local facility",
      priority: "Standard",
      time: "45 minutes ago",
      status: "Accepted",
    },
  ]

  const completedTransfers = [
    {
      id: "TR-2024-0641",
      from: "Riverside Community Hospital",
      to: "Memorial General Hospital",
      patient: "Cardiac patient",
      priority: "Urgent",
      time: "2 hours ago",
      status: "Completed",
    },
    {
      id: "TR-2024-0640",
      from: "Memorial General Hospital",
      to: "University Medical Center",
      patient: "Trauma patient",
      priority: "Emergency",
      time: "3 hours ago",
      status: "Completed",
    },
    {
      id: "TR-2024-0639",
      from: "University Medical Center",
      to: "Memorial General Hospital",
      patient: "Burn patient",
      priority: "Urgent",
      time: "5 hours ago",
      status: "Completed",
    },
  ]

  const transfers =
    direction === "incoming" ? incomingTransfers : direction === "outgoing" ? outgoingTransfers : completedTransfers

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending Approval":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
            Pending Approval
          </Badge>
        )
      case "Awaiting Acceptance":
        return (
          <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">
            Awaiting Acceptance
          </Badge>
        )
      case "Accepted":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
            Accepted
          </Badge>
        )
      case "Completed":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
            Completed
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-4">
      {transfers.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No transfer requests at this time.</p>
        </div>
      ) : (
        transfers.map((transfer) => (
          <div key={transfer.id} className="rounded-lg border p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {getPriorityBadge(transfer.priority)}
                  <span className="text-sm font-medium">{transfer.id}</span>
                  {getStatusBadge(transfer.status)}
                </div>

                <div className="flex items-center gap-2 text-sm">
                  {direction === "incoming" && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span>From: {transfer.from}</span>
                    </div>
                  )}

                  {direction === "outgoing" && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span>To: {transfer.to}</span>
                    </div>
                  )}

                  {direction === "completed" && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span>
                        {transfer.from} → {transfer.to}
                      </span>
                    </div>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mt-1">{transfer.patient}</p>

                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{transfer.time}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Details
                </Button>

                {direction === "incoming" && transfer.status === "Pending Approval" && (
                  <>
                    <Button size="sm" variant="outline">
                      Deny
                    </Button>
                    <Button size="sm">Approve</Button>
                  </>
                )}

                {direction === "outgoing" && transfer.status === "Awaiting Acceptance" && (
                  <Button size="sm" variant="outline">
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
