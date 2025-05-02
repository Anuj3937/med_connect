"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, XCircle, Search, FileText, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

// Mock insurance data
const mockInsuranceData = {
  active: true,
  planName: "Star Health Premium",
  memberId: "SH78923456",
  groupNumber: "GRP123456",
  effectiveDate: "2023-01-01",
  expirationDate: "2023-12-31",
  primaryCareProvider: "Dr. Rajesh Sharma",
  deductible: {
    individual: 15000,
    family: 30000,
    remaining: 7500,
  },
  outOfPocketMax: {
    individual: 50000,
    family: 100000,
    remaining: 35000,
  },
  coverageDetails: [
    { service: "Primary Care Visit", coverage: "90%", copay: "₹200" },
    { service: "Specialist Visit", coverage: "80%", copay: "₹400" },
    { service: "Emergency Room", coverage: "85%", copay: "₹1500" },
    { service: "Urgent Care", coverage: "85%", copay: "₹500" },
    { service: "Hospital Stay", coverage: "80%", copay: "₹2500 per day" },
    { service: "Prescription - Generic", coverage: "90%", copay: "₹100" },
    { service: "Prescription - Brand", coverage: "70%", copay: "₹300" },
    { service: "Prescription - Specialty", coverage: "60%", copay: "₹1000" },
    { service: "Lab Work", coverage: "90%", copay: "₹0" },
    { service: "X-Ray", coverage: "80%", copay: "₹400" },
    { service: "MRI/CT Scan", coverage: "70%", copay: "₹1000" },
    { service: "Physical Therapy", coverage: "80%", copay: "₹300" },
  ],
  recentClaims: [
    {
      id: "CLM123456",
      date: "2023-10-15",
      provider: "City Medical Center",
      service: "Annual Physical",
      billed: 3500,
      covered: 3150,
      patientResponsibility: 350,
      status: "Processed",
    },
    {
      id: "CLM123457",
      date: "2023-09-22",
      provider: "MedLab Diagnostics",
      service: "Blood Work",
      billed: 2200,
      covered: 1980,
      patientResponsibility: 220,
      status: "Processed",
    },
    {
      id: "CLM123458",
      date: "2023-08-05",
      provider: "Wellness Pharmacy",
      service: "Prescription - Lisinopril",
      billed: 450,
      covered: 405,
      patientResponsibility: 45,
      status: "Processed",
    },
    {
      id: "CLM123459",
      date: "2023-11-01",
      provider: "Specialist Care Center",
      service: "Cardiology Consultation",
      billed: 2750,
      covered: 2200,
      patientResponsibility: 550,
      status: "Pending",
    },
  ],
}

export default function InsuranceVerificationPage() {
  const [loading, setLoading] = useState(false)
  const [verificationResult, setVerificationResult] = useState<any>(null)
  const [insuranceProvider, setInsuranceProvider] = useState("")
  const [memberId, setMemberId] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [activeTab, setActiveTab] = useState("coverage")

  const handleVerify = () => {
    if (!insuranceProvider || !memberId || !dateOfBirth) {
      alert("Please fill in all required fields")
      return
    }

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setVerificationResult(mockInsuranceData)
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="container py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Insurance Verification</h1>
        <p className="text-muted-foreground">Verify your insurance coverage and check eligibility for services</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Verify Insurance</CardTitle>
          <CardDescription>Enter your insurance information to verify coverage and eligibility</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="insuranceProvider">Insurance Provider</Label>
              <Select value={insuranceProvider} onValueChange={setInsuranceProvider}>
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
            <div className="space-y-2">
              <Label htmlFor="memberId">Member ID / Policy Number</Label>
              <Input id="memberId" value={memberId} onChange={(e) => setMemberId(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleVerify} disabled={loading}>
            {loading ? "Verifying..." : "Verify Coverage"}
          </Button>
        </CardFooter>
      </Card>

      {loading && (
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </CardContent>
        </Card>
      )}

      {verificationResult && (
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Insurance Status</CardTitle>
                  <CardDescription>
                    {verificationResult.planName} - Member ID: {verificationResult.memberId}
                  </CardDescription>
                </div>
                {verificationResult.active ? (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                    <CheckCircle className="h-3 w-3 mr-1" /> Active
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    <XCircle className="h-3 w-3 mr-1" /> Inactive
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <dt className="text-sm font-medium text-muted-foreground">Group Number</dt>
                  <dd>{verificationResult.groupNumber}</dd>
                </div>
                <div className="space-y-1">
                  <dt className="text-sm font-medium text-muted-foreground">Effective Date</dt>
                  <dd>{new Date(verificationResult.effectiveDate).toLocaleDateString()}</dd>
                </div>
                <div className="space-y-1">
                  <dt className="text-sm font-medium text-muted-foreground">Expiration Date</dt>
                  <dd>{new Date(verificationResult.expirationDate).toLocaleDateString()}</dd>
                </div>
                <div className="space-y-1 md:col-span-3">
                  <dt className="text-sm font-medium text-muted-foreground">Primary Care Provider</dt>
                  <dd>{verificationResult.primaryCareProvider}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Tabs defaultValue="coverage" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="coverage">Coverage</TabsTrigger>
              <TabsTrigger value="deductible">Deductible</TabsTrigger>
              <TabsTrigger value="claims">Claims</TabsTrigger>
            </TabsList>

            <TabsContent value="coverage" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <FileText className="h-5 w-5 mr-2" /> Coverage Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Service</TableHead>
                        <TableHead>Coverage</TableHead>
                        <TableHead>Copay/Coinsurance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {verificationResult.coverageDetails.map((detail: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{detail.service}</TableCell>
                          <TableCell>{detail.coverage}</TableCell>
                          <TableCell>{detail.copay}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="deductible" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Calendar className="h-5 w-5 mr-2" /> Deductible & Out-of-Pocket
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Deductible</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <dl className="space-y-4">
                          <div>
                            <dt className="text-sm font-medium text-muted-foreground">Individual</dt>
                            <dd className="text-2xl font-bold">
                              ₹{verificationResult.deductible.individual.toLocaleString()}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-muted-foreground">Family</dt>
                            <dd className="text-2xl font-bold">
                              ₹{verificationResult.deductible.family.toLocaleString()}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-muted-foreground">Remaining</dt>
                            <dd className="text-2xl font-bold text-amber-600">
                              ₹{verificationResult.deductible.remaining.toLocaleString()}
                            </dd>
                          </div>
                        </dl>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Out-of-Pocket Maximum</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <dl className="space-y-4">
                          <div>
                            <dt className="text-sm font-medium text-muted-foreground">Individual</dt>
                            <dd className="text-2xl font-bold">
                              ₹{verificationResult.outOfPocketMax.individual.toLocaleString()}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-muted-foreground">Family</dt>
                            <dd className="text-2xl font-bold">
                              ₹{verificationResult.outOfPocketMax.family.toLocaleString()}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-muted-foreground">Remaining</dt>
                            <dd className="text-2xl font-bold text-amber-600">
                              ₹{verificationResult.outOfPocketMax.remaining.toLocaleString()}
                            </dd>
                          </div>
                        </dl>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="claims" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Search className="h-5 w-5 mr-2" /> Recent Claims
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Provider</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead className="text-right">Billed</TableHead>
                        <TableHead className="text-right">Covered</TableHead>
                        <TableHead className="text-right">Your Cost</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {verificationResult.recentClaims.map((claim: any) => (
                        <TableRow key={claim.id}>
                          <TableCell>{new Date(claim.date).toLocaleDateString()}</TableCell>
                          <TableCell>{claim.provider}</TableCell>
                          <TableCell>{claim.service}</TableCell>
                          <TableCell className="text-right">₹{claim.billed.toFixed(2)}</TableCell>
                          <TableCell className="text-right">₹{claim.covered.toFixed(2)}</TableCell>
                          <TableCell className="text-right">₹{claim.patientResponsibility.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge variant={claim.status === "Processed" ? "outline" : "secondary"}>
                              {claim.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
