"use client"

import { useState } from "react"
import { ArrowUpDown, Search, MapPin, Clock, Building, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function ResourceAllocationTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState("priority")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const allocationPlans = [
    {
      id: "plan-001",
      name: "Emergency Respiratory Resources",
      source: "Central Medical Supply Depot",
      destination: "Memorial General Hospital",
      resources: ["Ventilators (5)", "Respiratory Medications (200 units)"],
      priority: "high",
      status: "in-progress",
      eta: "12 hours",
      createdAt: "2024-07-10",
    },
    {
      id: "plan-002",
      name: "Antibiotics Redistribution",
      source: "Eastern Regional Warehouse",
      destination: "Riverside Community Hospital",
      resources: ["Antibiotics (350 units)", "IV Supplies (100 units)"],
      priority: "high",
      status: "scheduled",
      eta: "24 hours",
      createdAt: "2024-07-10",
    },
    {
      id: "plan-003",
      name: "Staff Reallocation",
      source: "University Medical Center",
      destination: "Memorial General Hospital",
      resources: ["Nurses (8)", "Respiratory Therapists (3)"],
      priority: "medium",
      status: "pending-approval",
      eta: "48 hours",
      createdAt: "2024-07-09",
    },
    {
      id: "plan-004",
      name: "ICU Equipment Transfer",
      source: "Veterans Medical Center",
      destination: "Riverside Community Hospital",
      resources: ["ICU Beds (4)", "Monitoring Equipment (6 units)"],
      priority: "medium",
      status: "scheduled",
      eta: "36 hours",
      createdAt: "2024-07-09",
    },
    {
      id: "plan-005",
      name: "Pediatric Supplies",
      source: "Central Medical Supply Depot",
      destination: "Children's Hospital",
      resources: ["Pediatric Medications (150 units)", "Pediatric Equipment (10 units)"],
      priority: "low",
      status: "completed",
      eta: "0 hours",
      createdAt: "2024-07-08",
    },
  ]

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("desc")
    }
  }

  const filteredPlans = allocationPlans.filter(
    (plan) =>
      plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.resources.some((resource) => resource.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const sortedPlans = [...filteredPlans].sort((a, b) => {
    let comparison = 0

    if (sortColumn === "name") {
      comparison = a.name.localeCompare(b.name)
    } else if (sortColumn === "source") {
      comparison = a.source.localeCompare(b.source)
    } else if (sortColumn === "destination") {
      comparison = a.destination.localeCompare(b.destination)
    } else if (sortColumn === "priority") {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      comparison = priorityOrder[a.priority] - priorityOrder[b.priority]
    } else if (sortColumn === "status") {
      const statusOrder = {
        "pending-approval": 4,
        scheduled: 3,
        "in-progress": 2,
        completed: 1,
      }
      comparison = statusOrder[a.status] - statusOrder[b.status]
    } else if (sortColumn === "createdAt") {
      comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    }

    return sortDirection === "asc" ? comparison : -comparison
  })

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
            Medium
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
            Low
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending-approval":
        return (
          <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">
            Pending Approval
          </Badge>
        )
      case "scheduled":
        return (
          <Badge variant="outline" className="text-purple-500 border-purple-200 bg-purple-50">
            Scheduled
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
            In Progress
          </Badge>
        )
      case "completed":
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
    <div>
      <div className="p-4 border-b">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search allocation plans..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("name")}>
                  Plan Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("source")}>
                  Source
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("destination")}>
                  Destination
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Resources</TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("priority")}>
                  Priority
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("status")}>
                  Status
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPlans.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell>
                  <div className="font-medium">{plan.name}</div>
                  <div className="text-xs text-muted-foreground">ID: {plan.id}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Building className="h-3 w-3 text-muted-foreground" />
                    <span>{plan.source}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span>{plan.destination}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    {plan.resources.map((resource, index) => (
                      <div key={index} className="flex items-center gap-1 text-xs">
                        <Package className="h-3 w-3 text-muted-foreground" />
                        <span>{resource}</span>
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{getPriorityBadge(plan.priority)}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    {getStatusBadge(plan.status)}
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>ETA: {plan.eta}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {sortedPlans.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No allocation plans found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
