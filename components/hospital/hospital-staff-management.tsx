"use client"

import type React from "react"

import { useState } from "react"
import { UserCheck, UserX, Clock, Calendar, Phone, Mail, Search, MoreHorizontal, Plus, Download } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export function HospitalStaffManagement() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterDepartment, setFilterDepartment] = useState("all")
  const [showAddStaffDialog, setShowAddStaffDialog] = useState(false)
  const [showScheduleDialog, setShowScheduleDialog] = useState(false)
  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null)

  // Mock staff data
  const [staffData, setStaffData] = useState([
    {
      id: "staff-001",
      name: "Dr. Aditya Sharma",
      role: "Senior Consultant",
      department: "Cardiology",
      status: "on-duty",
      contactNumber: "+91 98765 43210",
      email: "aditya.sharma@hospital.com",
      shift: "Morning (8AM-4PM)",
      image: "/placeholder.svg?height=40&width=40",
      specialization: "Interventional Cardiology",
      experience: "15 years",
      lastActive: "10 minutes ago",
    },
    {
      id: "staff-002",
      name: "Dr. Priya Patel",
      role: "Consultant",
      department: "Neurology",
      status: "on-call",
      contactNumber: "+91 98765 43211",
      email: "priya.patel@hospital.com",
      shift: "Evening (4PM-12AM)",
      image: "/placeholder.svg?height=40&width=40",
      specialization: "Neurosurgery",
      experience: "12 years",
      lastActive: "2 hours ago",
    },
    {
      id: "staff-003",
      name: "Dr. Vikram Mehta",
      role: "HOD",
      department: "Orthopedics",
      status: "off-duty",
      contactNumber: "+91 98765 43212",
      email: "vikram.mehta@hospital.com",
      shift: "Night (12AM-8AM)",
      image: "/placeholder.svg?height=40&width=40",
      specialization: "Joint Replacement",
      experience: "20 years",
      lastActive: "1 day ago",
    },
    {
      id: "staff-004",
      name: "Dr. Neha Gupta",
      role: "Resident Doctor",
      department: "Pediatrics",
      status: "on-duty",
      contactNumber: "+91 98765 43213",
      email: "neha.gupta@hospital.com",
      shift: "Morning (8AM-4PM)",
      image: "/placeholder.svg?height=40&width=40",
      specialization: "Neonatology",
      experience: "5 years",
      lastActive: "30 minutes ago",
    },
    {
      id: "staff-005",
      name: "Nurse Rajesh Kumar",
      role: "Head Nurse",
      department: "ICU",
      status: "on-duty",
      contactNumber: "+91 98765 43214",
      email: "rajesh.kumar@hospital.com",
      shift: "Morning (8AM-4PM)",
      image: "/placeholder.svg?height=40&width=40",
      specialization: "Critical Care",
      experience: "10 years",
      lastActive: "5 minutes ago",
    },
    {
      id: "staff-006",
      name: "Nurse Anjali Singh",
      role: "Staff Nurse",
      department: "Emergency",
      status: "on-call",
      contactNumber: "+91 98765 43215",
      email: "anjali.singh@hospital.com",
      shift: "Evening (4PM-12AM)",
      image: "/placeholder.svg?height=40&width=40",
      specialization: "Trauma Care",
      experience: "7 years",
      lastActive: "1 hour ago",
    },
    {
      id: "staff-007",
      name: "Dr. Sanjay Desai",
      role: "Consultant",
      department: "Gastroenterology",
      status: "leave",
      contactNumber: "+91 98765 43216",
      email: "sanjay.desai@hospital.com",
      shift: "Morning (8AM-4PM)",
      image: "/placeholder.svg?height=40&width=40",
      specialization: "Hepatology",
      experience: "14 years",
      lastActive: "3 days ago",
    },
    {
      id: "staff-008",
      name: "Dr. Meera Reddy",
      role: "Consultant",
      department: "Oncology",
      status: "on-duty",
      contactNumber: "+91 98765 43217",
      email: "meera.reddy@hospital.com",
      shift: "Evening (4PM-12AM)",
      image: "/placeholder.svg?height=40&width=40",
      specialization: "Medical Oncology",
      experience: "11 years",
      lastActive: "45 minutes ago",
    },
  ])

  const handleAddStaff = (event: React.FormEvent) => {
    event.preventDefault()
    // In a real app, we would get the form data and add the staff
    setShowAddStaffDialog(false)
    toast({
      title: "Staff added",
      description: "New staff member has been added successfully.",
    })
  }

  const handleScheduleStaff = (event: React.FormEvent) => {
    event.preventDefault()
    // In a real app, we would update the staff schedule
    setShowScheduleDialog(false)
    setSelectedStaffId(null)
    toast({
      title: "Schedule updated",
      description: "Staff schedule has been updated successfully.",
    })
  }

  const handleStatusChange = (staffId: string, newStatus: string) => {
    setStaffData(staffData.map((staff) => (staff.id === staffId ? { ...staff, status: newStatus } : staff)))
    toast({
      title: "Status updated",
      description: `Staff status has been updated to ${newStatus}.`,
    })
  }

  // Filter staff based on search term and filters
  const filteredStaff = staffData.filter(
    (staff) =>
      (staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.department.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === "all" || staff.status === filterStatus) &&
      (filterDepartment === "all" || staff.department === filterDepartment),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "on-duty":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
            <UserCheck className="mr-1 h-3 w-3" />
            On Duty
          </Badge>
        )
      case "off-duty":
        return (
          <Badge variant="outline" className="text-gray-500 border-gray-200 bg-gray-50">
            <UserX className="mr-1 h-3 w-3" />
            Off Duty
          </Badge>
        )
      case "on-call":
        return (
          <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">
            <Phone className="mr-1 h-3 w-3" />
            On Call
          </Badge>
        )
      case "leave":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
            <Calendar className="mr-1 h-3 w-3" />
            On Leave
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Staff Management</CardTitle>
              <CardDescription>Manage hospital staff and schedules</CardDescription>
            </div>
            <div className="flex gap-2">
              <Dialog open={showAddStaffDialog} onOpenChange={setShowAddStaffDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Staff
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <form onSubmit={handleAddStaff}>
                    <DialogHeader>
                      <DialogTitle>Add New Staff Member</DialogTitle>
                      <DialogDescription>Enter the details of the new staff member.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="staff-name">Full Name</Label>
                        <Input id="staff-name" placeholder="Dr. Full Name" required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="role">Role</Label>
                          <Select defaultValue="consultant">
                            <SelectTrigger id="role">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hod">HOD</SelectItem>
                              <SelectItem value="consultant">Consultant</SelectItem>
                              <SelectItem value="resident">Resident Doctor</SelectItem>
                              <SelectItem value="head-nurse">Head Nurse</SelectItem>
                              <SelectItem value="staff-nurse">Staff Nurse</SelectItem>
                              <SelectItem value="technician">Technician</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="department">Department</Label>
                          <Select defaultValue="cardiology">
                            <SelectTrigger id="department">
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cardiology">Cardiology</SelectItem>
                              <SelectItem value="neurology">Neurology</SelectItem>
                              <SelectItem value="orthopedics">Orthopedics</SelectItem>
                              <SelectItem value="pediatrics">Pediatrics</SelectItem>
                              <SelectItem value="oncology">Oncology</SelectItem>
                              <SelectItem value="emergency">Emergency</SelectItem>
                              <SelectItem value="icu">ICU</SelectItem>
                              <SelectItem value="gastroenterology">Gastroenterology</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="contact">Contact Number</Label>
                          <Input id="contact" placeholder="+91 98765 43210" required />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="name@hospital.com" required />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="specialization">Specialization</Label>
                          <Input id="specialization" placeholder="e.g., Interventional Cardiology" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="experience">Experience (years)</Label>
                          <Input id="experience" type="number" min="0" defaultValue="5" />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="shift">Default Shift</Label>
                        <Select defaultValue="morning">
                          <SelectTrigger id="shift">
                            <SelectValue placeholder="Select shift" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="morning">Morning (8AM-4PM)</SelectItem>
                            <SelectItem value="evening">Evening (4PM-12AM)</SelectItem>
                            <SelectItem value="night">Night (12AM-8AM)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setShowAddStaffDialog(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Add Staff</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all-staff" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all-staff">All Staff</TabsTrigger>
              <TabsTrigger value="on-duty">On Duty</TabsTrigger>
              <TabsTrigger value="on-call">On Call</TabsTrigger>
              <TabsTrigger value="off-duty">Off Duty</TabsTrigger>
            </TabsList>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search staff..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Cardiology">Cardiology</SelectItem>
                  <SelectItem value="Neurology">Neurology</SelectItem>
                  <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                  <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="ICU">ICU</SelectItem>
                  <SelectItem value="Emergency">Emergency</SelectItem>
                  <SelectItem value="Gastroenterology">Gastroenterology</SelectItem>
                  <SelectItem value="Oncology">Oncology</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <TabsContent value="all-staff" className="space-y-4">
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="py-3 px-4 text-left font-medium">Staff</th>
                        <th className="py-3 px-4 text-left font-medium">Department</th>
                        <th className="py-3 px-4 text-left font-medium">Status</th>
                        <th className="py-3 px-4 text-left font-medium">Contact</th>
                        <th className="py-3 px-4 text-right font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStaff.map((staff) => (
                        <tr key={staff.id} className="border-b">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full overflow-hidden">
                                <img
                                  src={staff.image || "/placeholder.svg"}
                                  alt={staff.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <div className="font-medium">{staff.name}</div>
                                <div className="text-xs text-muted-foreground">{staff.role}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">{staff.department}</td>
                          <td className="py-3 px-4">{getStatusBadge(staff.status)}</td>
                          <td className="py-3 px-4">
                            <div className="flex flex-col">
                              <div className="flex items-center text-xs">
                                <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                                {staff.contactNumber}
                              </div>
                              <div className="flex items-center text-xs mt-1">
                                <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                                {staff.email}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex justify-end gap-2">
                              <Dialog
                                open={showScheduleDialog && selectedStaffId === staff.id}
                                onOpenChange={(open) => {
                                  setShowScheduleDialog(open)
                                  if (!open) setSelectedStaffId(null)
                                }}
                              >
                                <DialogTrigger asChild>
                                  <Button size="sm" variant="outline" onClick={() => setSelectedStaffId(staff.id)}>
                                    <Clock className="mr-2 h-4 w-4" />
                                    Schedule
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[500px]">
                                  <form onSubmit={handleScheduleStaff}>
                                    <DialogHeader>
                                      <DialogTitle>Update Staff Schedule</DialogTitle>
                                      <DialogDescription>Update schedule for {staff.name}</DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="grid gap-2">
                                        <Label htmlFor="status">Status</Label>
                                        <Select defaultValue={staff.status}>
                                          <SelectTrigger id="status">
                                            <SelectValue placeholder="Select status" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="on-duty">On Duty</SelectItem>
                                            <SelectItem value="off-duty">Off Duty</SelectItem>
                                            <SelectItem value="on-call">On Call</SelectItem>
                                            <SelectItem value="leave">On Leave</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div className="grid gap-2">
                                        <Label htmlFor="shift">Shift</Label>
                                        <Select defaultValue="morning">
                                          <SelectTrigger id="shift">
                                            <SelectValue placeholder="Select shift" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="morning">Morning (8AM-4PM)</SelectItem>
                                            <SelectItem value="evening">Evening (4PM-12AM)</SelectItem>
                                            <SelectItem value="night">Night (12AM-8AM)</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div className="grid gap-2">
                                        <Label htmlFor="date-range">Date Range</Label>
                                        <div className="grid grid-cols-2 gap-4">
                                          <Input type="date" id="start-date" />
                                          <Input type="date" id="end-date" />
                                        </div>
                                      </div>
                                      <div className="grid gap-2">
                                        <Label htmlFor="notes">Notes</Label>
                                        <Input id="notes" placeholder="Any special instructions" />
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                          setShowScheduleDialog(false)
                                          setSelectedStaffId(null)
                                        }}
                                      >
                                        Cancel
                                      </Button>
                                      <Button type="submit">Update Schedule</Button>
                                    </DialogFooter>
                                  </form>
                                </DialogContent>
                              </Dialog>

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                                  <DropdownMenuItem>Edit Details</DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleStatusChange(staff.id, "on-duty")}>
                                    Set as On Duty
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleStatusChange(staff.id, "off-duty")}>
                                    Set as Off Duty
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleStatusChange(staff.id, "on-call")}>
                                    Set as On Call
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {filteredStaff.length === 0 && (
                        <tr>
                          <td colSpan={5} className="py-6 text-center text-muted-foreground">
                            No staff members found matching your search.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="on-duty" className="space-y-4">
              {/* Similar table but filtered for on-duty staff */}
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="py-3 px-4 text-left font-medium">Staff</th>
                        <th className="py-3 px-4 text-left font-medium">Department</th>
                        <th className="py-3 px-4 text-left font-medium">Shift</th>
                        <th className="py-3 px-4 text-left font-medium">Contact</th>
                        <th className="py-3 px-4 text-right font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {staffData
                        .filter((staff) => staff.status === "on-duty")
                        .map((staff) => (
                          <tr key={staff.id} className="border-b">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full overflow-hidden">
                                  <img
                                    src={staff.image || "/placeholder.svg"}
                                    alt={staff.name}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div>
                                  <div className="font-medium">{staff.name}</div>
                                  <div className="text-xs text-muted-foreground">{staff.role}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">{staff.department}</td>
                            <td className="py-3 px-4">{staff.shift}</td>
                            <td className="py-3 px-4">
                              <div className="flex flex-col">
                                <div className="flex items-center text-xs">
                                  <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                                  {staff.contactNumber}
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <Button size="sm" variant="outline">
                                <Clock className="mr-2 h-4 w-4" />
                                Schedule
                              </Button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Similar content for other tabs */}
            <TabsContent value="on-call" className="space-y-4">
              {/* On-call staff table */}
            </TabsContent>

            <TabsContent value="off-duty" className="space-y-4">
              {/* Off-duty staff table */}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
