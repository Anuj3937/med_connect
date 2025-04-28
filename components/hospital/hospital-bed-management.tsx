"use client"

import type React from "react"

import { useState } from "react"
import { Bed, User, Clock, Search, Plus, MoreHorizontal, CheckCircle, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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

export function HospitalBedManagement() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterWard, setFilterWard] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showAssignDialog, setShowAssignDialog] = useState(false)
  const [showDischargeDialog, setShowDischargeDialog] = useState(false)
  const [selectedBedId, setSelectedBedId] = useState<string | null>(null)

  // Mock bed data
  const [bedData, setBedData] = useState([
    {
      id: "bed-101",
      number: "101",
      ward: "General Ward",
      floor: "1st Floor",
      status: "occupied",
      patient: {
        id: "P-1001",
        name: "Rahul Sharma",
        age: 45,
        gender: "Male",
        admissionDate: "2023-04-15",
        diagnosis: "Pneumonia",
        doctor: "Dr. Aditya Sharma",
        insurance: {
          provider: "Star Health",
          policyNumber: "SH-12345678",
          coverageType: "Comprehensive",
          approvalStatus: "approved",
          pendingAmount: 0,
        },
      },
    },
    {
      id: "bed-102",
      number: "102",
      ward: "General Ward",
      floor: "1st Floor",
      status: "occupied",
      patient: {
        id: "P-1002",
        name: "Priya Patel",
        age: 32,
        gender: "Female",
        admissionDate: "2023-04-16",
        diagnosis: "Appendicitis",
        doctor: "Dr. Vikram Mehta",
        insurance: {
          provider: "HDFC ERGO",
          policyNumber: "HE-87654321",
          coverageType: "Basic",
          approvalStatus: "pending",
          pendingAmount: 25000,
        },
      },
    },
    {
      id: "bed-103",
      number: "103",
      ward: "General Ward",
      floor: "1st Floor",
      status: "available",
      patient: null,
    },
    {
      id: "bed-104",
      number: "104",
      ward: "General Ward",
      floor: "1st Floor",
      status: "maintenance",
      patient: null,
    },
    {
      id: "bed-201",
      number: "201",
      ward: "ICU",
      floor: "2nd Floor",
      status: "occupied",
      patient: {
        id: "P-1003",
        name: "Amit Singh",
        age: 58,
        gender: "Male",
        admissionDate: "2023-04-14",
        diagnosis: "Myocardial Infarction",
        doctor: "Dr. Neha Gupta",
        insurance: {
          provider: "LIC Health",
          policyNumber: "LIC-56781234",
          coverageType: "Premium",
          approvalStatus: "approved",
          pendingAmount: 0,
        },
      },
    },
    {
      id: "bed-202",
      number: "202",
      ward: "ICU",
      floor: "2nd Floor",
      status: "occupied",
      patient: {
        id: "P-1004",
        name: "Sunita Verma",
        age: 62,
        gender: "Female",
        admissionDate: "2023-04-17",
        diagnosis: "Stroke",
        doctor: "Dr. Priya Patel",
        insurance: {
          provider: "Bajaj Allianz",
          policyNumber: "BA-43218765",
          coverageType: "Comprehensive",
          approvalStatus: "rejected",
          pendingAmount: 150000,
        },
      },
    },
    {
      id: "bed-203",
      number: "203",
      ward: "ICU",
      floor: "2nd Floor",
      status: "available",
      patient: null,
    },
    {
      id: "bed-301",
      number: "301",
      ward: "Pediatric",
      floor: "3rd Floor",
      status: "occupied",
      patient: {
        id: "P-1005",
        name: "Arjun Kumar",
        age: 7,
        gender: "Male",
        admissionDate: "2023-04-18",
        diagnosis: "Asthma",
        doctor: "Dr. Meera Reddy",
        insurance: {
          provider: "Apollo Munich",
          policyNumber: "AM-98761234",
          coverageType: "Family Floater",
          approvalStatus: "approved",
          pendingAmount: 5000,
        },
      },
    },
    {
      id: "bed-302",
      number: "302",
      ward: "Pediatric",
      floor: "3rd Floor",
      status: "available",
      patient: null,
    },
    {
      id: "bed-401",
      number: "401",
      ward: "Maternity",
      floor: "4th Floor",
      status: "occupied",
      patient: {
        id: "P-1006",
        name: "Anjali Desai",
        age: 28,
        gender: "Female",
        admissionDate: "2023-04-19",
        diagnosis: "Pre-term Labor",
        doctor: "Dr. Sanjay Desai",
        insurance: {
          provider: "Max Bupa",
          policyNumber: "MB-23456789",
          coverageType: "Maternity Cover",
          approvalStatus: "approved",
          pendingAmount: 0,
        },
      },
    },
  ])

  const handleAssignBed = (event: React.FormEvent) => {
    event.preventDefault()
    // In a real app, we would get the form data and assign the bed
    setShowAssignDialog(false)
    toast({
      title: "Bed assigned",
      description: "Patient has been assigned to the bed successfully.",
    })
  }

  const handleDischargeBed = (event: React.FormEvent) => {
    event.preventDefault()
    // In a real app, we would discharge the patient
    setShowDischargeDialog(false)
    setSelectedBedId(null)
    toast({
      title: "Patient discharged",
      description: "Patient has been discharged successfully.",
    })
  }

  // Filter beds based on search term and filters
  const filteredBeds = bedData.filter(
    (bed) =>
      (bed.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bed.patient?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        false ||
        bed.patient?.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
        false) &&
      (filterWard === "all" || bed.ward === filterWard) &&
      (filterStatus === "all" || bed.status === filterStatus),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "occupied":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
            <User className="mr-1 h-3 w-3" />
            Occupied
          </Badge>
        )
      case "available":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
            <CheckCircle className="mr-1 h-3 w-3" />
            Available
          </Badge>
        )
      case "maintenance":
        return (
          <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">
            <AlertTriangle className="mr-1 h-3 w-3" />
            Maintenance
          </Badge>
        )
      case "reserved":
        return (
          <Badge variant="outline" className="text-purple-500 border-purple-200 bg-purple-50">
            <Clock className="mr-1 h-3 w-3" />
            Reserved
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getInsuranceStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
            Approved
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
            Pending
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // Calculate ward statistics
  const wardStats = {
    "General Ward": {
      total: bedData.filter((bed) => bed.ward === "General Ward").length,
      occupied: bedData.filter((bed) => bed.ward === "General Ward" && bed.status === "occupied").length,
      available: bedData.filter((bed) => bed.ward === "General Ward" && bed.status === "available").length,
    },
    ICU: {
      total: bedData.filter((bed) => bed.ward === "ICU").length,
      occupied: bedData.filter((bed) => bed.ward === "ICU" && bed.status === "occupied").length,
      available: bedData.filter((bed) => bed.ward === "ICU" && bed.status === "available").length,
    },
    Pediatric: {
      total: bedData.filter((bed) => bed.ward === "Pediatric").length,
      occupied: bedData.filter((bed) => bed.ward === "Pediatric" && bed.status === "occupied").length,
      available: bedData.filter((bed) => bed.ward === "Pediatric" && bed.status === "available").length,
    },
    Maternity: {
      total: bedData.filter((bed) => bed.ward === "Maternity").length,
      occupied: bedData.filter((bed) => bed.ward === "Maternity" && bed.status === "occupied").length,
      available: bedData.filter((bed) => bed.ward === "Maternity" && bed.status === "available").length,
    },
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Object.entries(wardStats).map(([ward, stats]) => (
          <Card key={ward}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">{ward}</p>
                  <h3 className="text-2xl font-bold">
                    {stats.available} <span className="text-sm font-normal text-muted-foreground">available</span>
                  </h3>
                </div>
                <div className="rounded-full bg-blue-500 p-2">
                  <Bed className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Occupancy</span>
                  <span>{Math.round((stats.occupied / stats.total) * 100)}%</span>
                </div>
                <Progress
                  value={(stats.occupied / stats.total) * 100}
                  className="h-1"
                  indicatorClassName={
                    stats.occupied / stats.total > 0.9
                      ? "bg-red-500"
                      : stats.occupied / stats.total > 0.7
                        ? "bg-amber-500"
                        : "bg-green-500"
                  }
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{stats.occupied} occupied</span>
                  <span>{stats.total} total</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Bed Management</CardTitle>
              <CardDescription>Manage hospital beds and patient assignments</CardDescription>
            </div>
            <div className="flex gap-2">
              <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Assign Bed
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <form onSubmit={handleAssignBed}>
                    <DialogHeader>
                      <DialogTitle>Assign Bed to Patient</DialogTitle>
                      <DialogDescription>Select a bed and patient for assignment.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="bed-select">Select Bed</Label>
                        <Select defaultValue="">
                          <SelectTrigger id="bed-select">
                            <SelectValue placeholder="Select bed" />
                          </SelectTrigger>
                          <SelectContent>
                            {bedData
                              .filter((bed) => bed.status === "available")
                              .map((bed) => (
                                <SelectItem key={bed.id} value={bed.id}>
                                  {bed.number} - {bed.ward} ({bed.floor})
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="patient-id">Patient ID</Label>
                        <Input id="patient-id" placeholder="Enter patient ID" required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="patient-name">Patient Name</Label>
                          <Input id="patient-name" placeholder="Full name" required />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="patient-age">Age</Label>
                          <Input id="patient-age" type="number" min="0" required />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="patient-gender">Gender</Label>
                          <Select defaultValue="male">
                            <SelectTrigger id="patient-gender">
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="admission-date">Admission Date</Label>
                          <Input id="admission-date" type="date" required />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="diagnosis">Diagnosis</Label>
                        <Input id="diagnosis" placeholder="Primary diagnosis" required />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="doctor">Attending Doctor</Label>
                        <Select defaultValue="">
                          <SelectTrigger id="doctor">
                            <SelectValue placeholder="Select doctor" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dr-sharma">Dr. Aditya Sharma</SelectItem>
                            <SelectItem value="dr-patel">Dr. Priya Patel</SelectItem>
                            <SelectItem value="dr-mehta">Dr. Vikram Mehta</SelectItem>
                            <SelectItem value="dr-gupta">Dr. Neha Gupta</SelectItem>
                            <SelectItem value="dr-reddy">Dr. Meera Reddy</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label>Insurance Information</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="insurance-provider">Provider</Label>
                            <Input id="insurance-provider" placeholder="Insurance provider" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="policy-number">Policy Number</Label>
                            <Input id="policy-number" placeholder="Policy number" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setShowAssignDialog(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Assign Bed</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all-beds" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all-beds">All Beds</TabsTrigger>
              <TabsTrigger value="occupied">Occupied</TabsTrigger>
              <TabsTrigger value="available">Available</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            </TabsList>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search beds or patients..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterWard} onValueChange={setFilterWard}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Ward" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Wards</SelectItem>
                  <SelectItem value="General Ward">General Ward</SelectItem>
                  <SelectItem value="ICU">ICU</SelectItem>
                  <SelectItem value="Pediatric">Pediatric</SelectItem>
                  <SelectItem value="Maternity">Maternity</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <TabsContent value="all-beds" className="space-y-4">
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="py-3 px-4 text-left font-medium">Bed</th>
                        <th className="py-3 px-4 text-left font-medium">Ward</th>
                        <th className="py-3 px-4 text-left font-medium">Status</th>
                        <th className="py-3 px-4 text-left font-medium">Patient</th>
                        <th className="py-3 px-4 text-left font-medium">Insurance</th>
                        <th className="py-3 px-4 text-right font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBeds.map((bed) => (
                        <tr key={bed.id} className="border-b">
                          <td className="py-3 px-4">
                            <div className="font-medium">{bed.number}</div>
                            <div className="text-xs text-muted-foreground">{bed.floor}</div>
                          </td>
                          <td className="py-3 px-4">{bed.ward}</td>
                          <td className="py-3 px-4">{getStatusBadge(bed.status)}</td>
                          <td className="py-3 px-4">
                            {bed.patient ? (
                              <div>
                                <div className="font-medium">{bed.patient.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  {bed.patient.age} yrs, {bed.patient.gender}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">{bed.patient.diagnosis}</div>
                              </div>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            {bed.patient?.insurance ? (
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs">{bed.patient.insurance.provider}</span>
                                  {getInsuranceStatusBadge(bed.patient.insurance.approvalStatus)}
                                </div>
                                {bed.patient.insurance.pendingAmount > 0 && (
                                  <div className="text-xs text-red-500 mt-1">
                                    Pending: ₹{bed.patient.insurance.pendingAmount.toLocaleString()}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex justify-end gap-2">
                              {bed.status === "occupied" && (
                                <Dialog
                                  open={showDischargeDialog && selectedBedId === bed.id}
                                  onOpenChange={(open) => {
                                    setShowDischargeDialog(open)
                                    if (!open) setSelectedBedId(null)
                                  }}
                                >
                                  <DialogTrigger asChild>
                                    <Button size="sm" variant="outline" onClick={() => setSelectedBedId(bed.id)}>
                                      Discharge
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[500px]">
                                    <form onSubmit={handleDischargeBed}>
                                      <DialogHeader>
                                        <DialogTitle>Discharge Patient</DialogTitle>
                                        <DialogDescription>
                                          Discharge {bed.patient?.name} from bed {bed.number}
                                        </DialogDescription>
                                      </DialogHeader>
                                      <div className="grid gap-4 py-4">
                                        <div className="grid gap-2">
                                          <Label htmlFor="discharge-date">Discharge Date</Label>
                                          <Input id="discharge-date" type="date" required />
                                        </div>
                                        <div className="grid gap-2">
                                          <Label htmlFor="discharge-time">Discharge Time</Label>
                                          <Input id="discharge-time" type="time" required />
                                        </div>
                                        <div className="grid gap-2">
                                          <Label htmlFor="discharge-notes">Discharge Notes</Label>
                                          <Input id="discharge-notes" placeholder="Any special instructions" />
                                        </div>
                                        {bed.patient?.insurance?.pendingAmount > 0 && (
                                          <div className="rounded-md bg-amber-50 p-4 border border-amber-200">
                                            <div className="flex items-start gap-3">
                                              <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                              <div>
                                                <h4 className="font-medium text-amber-800">Outstanding Payment</h4>
                                                <p className="text-sm text-amber-700 mt-1">
                                                  There is a pending amount of ₹
                                                  {bed.patient.insurance.pendingAmount.toLocaleString()}
                                                  that needs to be settled before discharge.
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                      <DialogFooter>
                                        <Button
                                          type="button"
                                          variant="outline"
                                          onClick={() => {
                                            setShowDischargeDialog(false)
                                            setSelectedBedId(null)
                                          }}
                                        >
                                          Cancel
                                        </Button>
                                        <Button type="submit">Confirm Discharge</Button>
                                      </DialogFooter>
                                    </form>
                                  </DialogContent>
                                </Dialog>
                              )}

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  {bed.status === "occupied" ? (
                                    <>
                                      <DropdownMenuItem>View Patient Details</DropdownMenuItem>
                                      <DropdownMenuItem>Update Patient Info</DropdownMenuItem>
                                      <DropdownMenuItem>Transfer Patient</DropdownMenuItem>
                                    </>
                                  ) : (
                                    <>
                                      <DropdownMenuItem>Assign Patient</DropdownMenuItem>
                                      <DropdownMenuItem>
                                        Mark as {bed.status === "available" ? "Maintenance" : "Available"}
                                      </DropdownMenuItem>
                                    </>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {filteredBeds.length === 0 && (
                        <tr>
                          <td colSpan={6} className="py-6 text-center text-muted-foreground">
                            No beds found matching your search.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Similar content for other tabs */}
            <TabsContent value="occupied" className="space-y-4">
              {/* Occupied beds table */}
            </TabsContent>

            <TabsContent value="available" className="space-y-4">
              {/* Available beds table */}
            </TabsContent>

            <TabsContent value="maintenance" className="space-y-4">
              {/* Maintenance beds table */}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
