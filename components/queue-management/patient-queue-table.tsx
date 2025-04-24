"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { ArrowUpDown, MoreHorizontal, Search } from "lucide-react"

export function PatientQueueTable() {
  const { selectedHospital } = useAuth()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  // Mock data for patient queue
  const initialPatients = [
    {
      id: "P001",
      name: "John Smith",
      age: 45,
      department: "Cardiology",
      waitTime: 15,
      priority: "normal",
      status: "waiting",
      hospitalId: "hosp-1",
    },
    {
      id: "P002",
      name: "Sarah Johnson",
      age: 32,
      department: "Orthopedics",
      waitTime: 25,
      priority: "normal",
      status: "waiting",
      hospitalId: "hosp-1",
    },
    {
      id: "P003",
      name: "Michael Brown",
      age: 67,
      department: "Neurology",
      waitTime: 5,
      priority: "urgent",
      status: "in-progress",
      hospitalId: "hosp-1",
    },
    {
      id: "P004",
      name: "Emily Davis",
      age: 28,
      department: "General Medicine",
      waitTime: 40,
      priority: "normal",
      status: "waiting",
      hospitalId: "hosp-2",
    },
    {
      id: "P005",
      name: "Robert Wilson",
      age: 54,
      department: "Cardiology",
      waitTime: 10,
      priority: "high",
      status: "waiting",
      hospitalId: "hosp-2",
    },
    {
      id: "P006",
      name: "Jennifer Lee",
      age: 39,
      department: "Dermatology",
      waitTime: 30,
      priority: "normal",
      status: "waiting",
      hospitalId: "hosp-3",
    },
    {
      id: "P007",
      name: "David Martinez",
      age: 62,
      department: "Ophthalmology",
      waitTime: 20,
      priority: "normal",
      status: "waiting",
      hospitalId: "hosp-3",
    },
    {
      id: "P008",
      name: "Lisa Taylor",
      age: 41,
      department: "Emergency",
      waitTime: 0,
      priority: "critical",
      status: "in-progress",
      hospitalId: "hosp-1",
    },
  ]

  // Filter patients based on selected hospital
  const filteredPatients = initialPatients.filter(
    (patient) =>
      (!selectedHospital || patient.hospitalId === selectedHospital.id) &&
      (patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.department.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Sort patients
  const sortedPatients = [...filteredPatients].sort((a, b) => {
    if (!sortColumn) return 0

    let comparison = 0
    if (sortColumn === "name") {
      comparison = a.name.localeCompare(b.name)
    } else if (sortColumn === "waitTime") {
      comparison = a.waitTime - b.waitTime
    } else if (sortColumn === "priority") {
      const priorityOrder = { critical: 0, urgent: 1, high: 2, normal: 3 }
      comparison =
        priorityOrder[a.priority as keyof typeof priorityOrder] -
        priorityOrder[b.priority as keyof typeof priorityOrder]
    } else if (sortColumn === "department") {
      comparison = a.department.localeCompare(b.department)
    }

    return sortDirection === "asc" ? comparison : -comparison
  })

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const handleStatusChange = (patientId: string, newStatus: string) => {
    // In a real app, this would update the patient status in the database
    toast({
      title: "Status updated",
      description: `Patient ${patientId} status changed to ${newStatus}`,
    })
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>
      case "urgent":
        return (
          <Badge variant="destructive" className="bg-red-400">
            Urgent
          </Badge>
        )
      case "high":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
            High
          </Badge>
        )
      default:
        return <Badge variant="outline">Normal</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "waiting":
        return (
          <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">
            Waiting
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
            In Progress
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="text-gray-500 border-gray-200 bg-gray-50">
            Completed
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search patients..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {selectedHospital && (
          <div className="text-sm text-muted-foreground">
            Showing queue for: <span className="font-medium text-foreground">{selectedHospital.name}</span>
          </div>
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                <Checkbox />
              </TableHead>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                <div className="flex items-center">
                  Patient Name
                  {sortColumn === "name" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                </div>
              </TableHead>
              <TableHead>Age</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("department")}>
                <div className="flex items-center">
                  Department
                  {sortColumn === "department" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("waitTime")}>
                <div className="flex items-center">
                  Wait Time
                  {sortColumn === "waitTime" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("priority")}>
                <div className="flex items-center">
                  Priority
                  {sortColumn === "priority" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPatients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  No patients in queue
                </TableCell>
              </TableRow>
            ) : (
              sortedPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell className="font-medium">{patient.id}</TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.department}</TableCell>
                  <TableCell>{patient.waitTime === 0 ? "Now" : `${patient.waitTime} min`}</TableCell>
                  <TableCell>{getPriorityBadge(patient.priority)}</TableCell>
                  <TableCell>{getStatusBadge(patient.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(patient.id)}>
                          Copy patient ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleStatusChange(patient.id, "in-progress")}>
                          Mark as in progress
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(patient.id, "completed")}>
                          Mark as completed
                        </DropdownMenuItem>
                        <DropdownMenuItem>View patient details</DropdownMenuItem>
                        <DropdownMenuItem>Update priority</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
