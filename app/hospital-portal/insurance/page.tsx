"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, CheckCircle, XCircle, Download, Filter, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock insurance verification data
const mockVerificationResults = [
  {
    patientName: "Rahul Sharma",
    patientId: "PT123456",
    insuranceProvider: "Star Health Insurance",
    policyNumber: "SH78923456",
    coverageStatus: "Active",
    validUntil: "2023-12-31",
    coverageType: "Family Floater",
    sumInsured: 500000,
    copay: "10%",
    roomRentLimit: "₹5,000 per day",
    preExistingDiseases: "Covered after 2 years",
    maternity: "Covered after 3 years",
    cashless: true,
    networkHospitals: ["Lilavati Hospital", "Kokilaben Hospital", "Hinduja Hospital"],
  },
  {
    patientName: "Priya Patel",
    patientId: "PT123457",
    insuranceProvider: "HDFC ERGO Health Insurance",
    policyNumber: "HD45678901",
    coverageStatus: "Active",
    validUntil: "2023-10-15",
    coverageType: "Individual",
    sumInsured: 300000,
    copay: "20%",
    roomRentLimit: "₹3,000 per day",
    preExistingDiseases: "Covered after 3 years",
    maternity: "Not Covered",
    cashless: true,
    networkHospitals: ["Lilavati Hospital", "Fortis Hospital", "Apollo Hospital"],
  },
  {
    patientName: "Amit Kumar",
    patientId: "PT123458",
    insuranceProvider: "ICICI Lombard Health Insurance",
    policyNumber: "IC98765432",
    coverageStatus: "Inactive",
    validUntil: "2023-05-30",
    coverageType: "Individual",
    sumInsured: 200000,
    copay: "10%",
    roomRentLimit: "₹2,500 per day",
    preExistingDiseases: "Covered after 2 years",
    maternity: "Not Covered",
    cashless: false,
    networkHospitals: ["Apollo Hospital", "Max Hospital", "Medanta Hospital"],
  },
]

// Mock claims data
const mockClaimsData = [
  {
    id: "CLM123456",
    patientName: "Rahul Sharma",
    patientId: "PT123456",
    admissionDate: "2023-10-15",
    dischargeDate: "2023-10-18",
    diagnosis: "Acute Appendicitis",
    procedure: "Appendectomy",
    totalBill: 85000,
    insuranceCovered: 76500,
    patientResponsibility: 8500,
    status: "Approved",
    claimDate: "2023-10-20",
    settlementDate: "2023-11-05",
  },
  {
    id: "CLM123457",
    patientName: "Priya Patel",
    patientId: "PT123457",
    admissionDate: "2023-09-22",
    dischargeDate: "2023-09-25",
    diagnosis: "Cholecystitis",
    procedure: "Laparoscopic Cholecystectomy",
    totalBill: 95000,
    insuranceCovered: 76000,
    patientResponsibility: 19000,
    status: "Pending",
    claimDate: "2023-09-28",
    settlementDate: null,
  },
  {
    id: "CLM123458",
    patientName: "Amit Kumar",
    patientId: "PT123458",
    admissionDate: "2023-08-05",
    dischargeDate: "2023-08-10",
    diagnosis: "Fracture - Tibia",
    procedure: "Open Reduction Internal Fixation",
    totalBill: 120000,
    insuranceCovered: 0,
    patientResponsibility: 120000,
    status: "Rejected",
    claimDate: "2023-08-15",
    settlementDate: "2023-08-30",
    rejectionReason: "Policy expired",
  },
]

export default function HospitalInsurancePage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("verification")
  const [searchQuery, setSearchQuery] = useState("")
  const [verificationResults, setVerificationResults] = useState<any[]>([])
  const [selectedPatient, setSelectedPatient] = useState<string>("")
  const [policyNumber, setPolicyNumber] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [claimsFilter, setClaimsFilter] = useState("all")

  const handleVerify = () => {
    if (!selectedPatient || !policyNumber) {
      toast({
        title: "Missing information",
        description: "Please enter patient ID and policy number",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      const result = mockVerificationResults.find(
        (result) => result.patientId === selectedPatient || result.policyNumber === policyNumber,
      )

      if (result) {
        setVerificationResults([result])
        toast({
          title: "Verification complete",
          description: "Insurance details have been retrieved successfully.",
        })
      } else {
        toast({
          title: "No results found",
          description: "Could not find insurance information for the provided details.",
          variant: "destructive",
        })
      }

      setLoading(false)
    }, 1500)
  }

  const filteredClaims = mockClaimsData.filter((claim) => {
    if (claimsFilter === "all") return true
    if (claimsFilter === "approved") return claim.status === "Approved"
    if (claimsFilter === "pending") return claim.status === "Pending"
    if (claimsFilter === "rejected") return claim.status === "Rejected"
    return true
  })

  return (
    <div className="container py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Insurance Management</h1>
        <p className="text-muted-foreground">Verify patient insurance coverage and manage claims</p>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="verification">Insurance Verification</TabsTrigger>
          <TabsTrigger value="claims">Claims Management</TabsTrigger>
        </TabsList>

        <TabsContent value="verification" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Verify Patient Insurance</CardTitle>
              <CardDescription>Enter patient and policy details to verify coverage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="patientId">Patient ID</Label>
                  <Input
                    id="patientId"
                    placeholder="Enter patient ID"
                    value={selectedPatient}
                    onChange={(e) => setSelectedPatient(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="policyNumber">Policy Number</Label>
                  <Input
                    id="policyNumber"
                    placeholder="Enter policy number"
                    value={policyNumber}
                    onChange={(e) => setPolicyNumber(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                  <Select>
                    <SelectTrigger id="insuranceProvider">
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="star">Star Health Insurance</SelectItem>
                      <SelectItem value="hdfc">HDFC ERGO Health Insurance</SelectItem>
                      <SelectItem value="icici">ICICI Lombard Health Insurance</SelectItem>
                      <SelectItem value="bajaj">Bajaj Allianz Health Insurance</SelectItem>
                      <SelectItem value="max">Max Bupa Health Insurance</SelectItem>
                      <SelectItem value="apollo">Apollo Munich Health Insurance</SelectItem>
                      <SelectItem value="reliance">Reliance Health Insurance</SelectItem>
                      <SelectItem value="sbi">SBI Health Insurance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleVerify} disabled={loading}>
                {loading ? "Verifying..." : "Verify Coverage"}
              </Button>
            </CardFooter>
          </Card>

          {verificationResults.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Insurance Details</CardTitle>
                    <CardDescription>
                      {verificationResults[0].patientName} - {verificationResults[0].patientId}
                    </CardDescription>
                  </div>
                  <Badge
                    className={
                      verificationResults[0].coverageStatus === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {verificationResults[0].coverageStatus === "Active" ? (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1" /> Active
                      </>
                    ) : (
                      <>
                        <XCircle className="h-3 w-3 mr-1" /> Inactive
                      </>
                    )}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Insurance Provider</TableCell>
                          <TableCell>{verificationResults[0].insuranceProvider}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Policy Number</TableCell>
                          <TableCell>{verificationResults[0].policyNumber}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Valid Until</TableCell>
                          <TableCell>{verificationResults[0].validUntil}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Coverage Type</TableCell>
                          <TableCell>{verificationResults[0].coverageType}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Sum Insured</TableCell>
                          <TableCell>₹{verificationResults[0].sumInsured.toLocaleString()}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Co-pay</TableCell>
                          <TableCell>{verificationResults[0].copay}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  <div>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Room Rent Limit</TableCell>
                          <TableCell>{verificationResults[0].roomRentLimit}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Pre-existing Diseases</TableCell>
                          <TableCell>{verificationResults[0].preExistingDiseases}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Maternity</TableCell>
                          <TableCell>{verificationResults[0].maternity}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Cashless Facility</TableCell>
                          <TableCell>{verificationResults[0].cashless ? "Available" : "Not Available"}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Network Hospitals</TableCell>
                          <TableCell>{verificationResults[0].networkHospitals.join(", ")}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download Details
                </Button>
                <Button>Initiate Pre-authorization</Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="claims" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Insurance Claims</CardTitle>
                  <CardDescription>Manage and track patient insurance claims</CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Claim
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by patient name, ID, or claim number..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={claimsFilter} onValueChange={setClaimsFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter claims" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Claims</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Claim ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Admission Date</TableHead>
                      <TableHead>Diagnosis</TableHead>
                      <TableHead className="text-right">Total Bill</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredClaims.map((claim) => (
                      <TableRow key={claim.id}>
                        <TableCell className="font-medium">{claim.id}</TableCell>
                        <TableCell>{claim.patientName}</TableCell>
                        <TableCell>{new Date(claim.admissionDate).toLocaleDateString()}</TableCell>
                        <TableCell>{claim.diagnosis}</TableCell>
                        <TableCell className="text-right">₹{claim.totalBill.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              claim.status === "Approved"
                                ? "bg-green-100 text-green-800 border-green-200"
                                : claim.status === "Pending"
                                  ? "bg-amber-100 text-amber-800 border-amber-200"
                                  : "bg-red-100 text-red-800 border-red-200"
                            }
                          >
                            {claim.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
