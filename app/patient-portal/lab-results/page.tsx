"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, FileText, TrendingUp, Download, Search } from "lucide-react"

// Mock lab results data
const mockLabResults = [
  {
    id: "lab-001",
    date: "2023-11-05",
    type: "Complete Blood Count (CBC)",
    provider: "City Medical Laboratory",
    status: "Final",
    results: [
      {
        name: "White Blood Cell (WBC)",
        value: "7.8",
        unit: "10^3/µL",
        range: "4.5-11.0",
        flag: null,
      },
      {
        name: "Red Blood Cell (RBC)",
        value: "5.2",
        unit: "10^6/µL",
        range: "4.5-5.9",
        flag: null,
      },
      {
        name: "Hemoglobin (Hgb)",
        value: "15.1",
        unit: "g/dL",
        range: "13.5-17.5",
        flag: null,
      },
      {
        name: "Hematocrit (Hct)",
        value: "45",
        unit: "%",
        range: "41-53",
        flag: null,
      },
      {
        name: "Platelet Count",
        value: "290",
        unit: "10^3/µL",
        range: "150-450",
        flag: null,
      },
    ],
  },
  {
    id: "lab-002",
    date: "2023-10-15",
    type: "Lipid Panel",
    provider: "City Medical Laboratory",
    status: "Final",
    results: [
      {
        name: "Total Cholesterol",
        value: "210",
        unit: "mg/dL",
        range: "<200",
        flag: "H",
      },
      {
        name: "HDL Cholesterol",
        value: "45",
        unit: "mg/dL",
        range: ">40",
        flag: null,
      },
      {
        name: "LDL Cholesterol",
        value: "130",
        unit: "mg/dL",
        range: "<100",
        flag: "H",
      },
      {
        name: "Triglycerides",
        value: "175",
        unit: "mg/dL",
        range: "<150",
        flag: "H",
      },
    ],
  },
  {
    id: "lab-003",
    date: "2023-09-22",
    type: "Comprehensive Metabolic Panel",
    provider: "MedLab Diagnostics",
    status: "Final",
    results: [
      {
        name: "Glucose",
        value: "95",
        unit: "mg/dL",
        range: "70-99",
        flag: null,
      },
      {
        name: "BUN (Blood Urea Nitrogen)",
        value: "15",
        unit: "mg/dL",
        range: "7-20",
        flag: null,
      },
      {
        name: "Creatinine",
        value: "0.9",
        unit: "mg/dL",
        range: "0.6-1.2",
        flag: null,
      },
      {
        name: "Sodium",
        value: "140",
        unit: "mmol/L",
        range: "136-145",
        flag: null,
      },
      {
        name: "Potassium",
        value: "4.2",
        unit: "mmol/L",
        range: "3.5-5.1",
        flag: null,
      },
      {
        name: "Chloride",
        value: "101",
        unit: "mmol/L",
        range: "98-107",
        flag: null,
      },
      {
        name: "CO2",
        value: "24",
        unit: "mmol/L",
        range: "23-29",
        flag: null,
      },
      {
        name: "Calcium",
        value: "9.5",
        unit: "mg/dL",
        range: "8.6-10.2",
        flag: null,
      },
      {
        name: "Total Protein",
        value: "7.0",
        unit: "g/dL",
        range: "6.4-8.2",
        flag: null,
      },
      {
        name: "Albumin",
        value: "4.2",
        unit: "g/dL",
        range: "3.5-5.0",
        flag: null,
      },
      {
        name: "Bilirubin, Total",
        value: "0.8",
        unit: "mg/dL",
        range: "0.3-1.0",
        flag: null,
      },
      {
        name: "Alkaline Phosphatase",
        value: "75",
        unit: "U/L",
        range: "40-129",
        flag: null,
      },
      {
        name: "AST",
        value: "25",
        unit: "U/L",
        range: "10-40",
        flag: null,
      },
      {
        name: "ALT",
        value: "30",
        unit: "U/L",
        range: "7-56",
        flag: null,
      },
    ],
  },
  {
    id: "lab-004",
    date: "2023-08-10",
    type: "Hemoglobin A1C",
    provider: "MedLab Diagnostics",
    status: "Final",
    results: [
      {
        name: "Hemoglobin A1C",
        value: "5.7",
        unit: "%",
        range: "<5.7",
        flag: "H",
      },
    ],
  },
]

export default function LabResultsPage() {
  const [selectedLabResult, setSelectedLabResult] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  // Filter lab results
  const filteredResults = mockLabResults.filter((result) => {
    // Search term filter
    if (searchTerm && !result.type.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }

    // Date filter
    if (dateFilter !== "all") {
      const resultDate = new Date(result.date)
      const today = new Date()

      if (dateFilter === "30days" && today.getTime() - resultDate.getTime() > 30 * 24 * 60 * 60 * 1000) {
        return false
      }

      if (dateFilter === "90days" && today.getTime() - resultDate.getTime() > 90 * 24 * 60 * 60 * 1000) {
        return false
      }
    }

    // Type filter
    if (typeFilter !== "all" && result.type !== typeFilter) {
      return false
    }

    return true
  })

  // Get unique test types
  const testTypes = ["all", ...Array.from(new Set(mockLabResults.map((result) => result.type)))]

  return (
    <div className="container py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Lab Results</h1>
        <p className="text-muted-foreground">View and manage your laboratory test results</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by test name..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateFilter">Date Range</Label>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger id="dateFilter">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="90days">Last 90 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="typeFilter">Test Type</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger id="typeFilter">
                  <SelectValue placeholder="Select test type" />
                </SelectTrigger>
                <SelectContent>
                  {testTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type === "all" ? "All Types" : type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1 space-y-4">
          <h2 className="text-xl font-semibold">Test Results</h2>

          {filteredResults.length > 0 ? (
            <div className="space-y-3">
              {filteredResults.map((result) => (
                <Card
                  key={result.id}
                  className={`cursor-pointer transition-all ${selectedLabResult?.id === result.id ? "ring-2 ring-primary" : ""}`}
                  onClick={() => setSelectedLabResult(result)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{result.type}</h3>
                        <p className="text-sm text-muted-foreground">{new Date(result.date).toLocaleDateString()}</p>
                      </div>
                      <Badge>{result.status}</Badge>
                    </div>
                    <p className="text-sm mt-2">{result.provider}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <AlertCircle className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                <p>No lab results found matching your criteria.</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="md:col-span-2">
          {selectedLabResult ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{selectedLabResult.type}</CardTitle>
                    <CardDescription>
                      {new Date(selectedLabResult.date).toLocaleDateString()} • {selectedLabResult.provider}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" /> Download
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="results">
                  <TabsList>
                    <TabsTrigger value="results">
                      <FileText className="h-4 w-4 mr-1" /> Results
                    </TabsTrigger>
                    <TabsTrigger value="trends">
                      <TrendingUp className="h-4 w-4 mr-1" /> Trends
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="results" className="mt-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Test</TableHead>
                          <TableHead>Result</TableHead>
                          <TableHead>Reference Range</TableHead>
                          <TableHead>Units</TableHead>
                          <TableHead>Flag</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedLabResult.results.map((item: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell>{item.value}</TableCell>
                            <TableCell>{item.range}</TableCell>
                            <TableCell>{item.unit}</TableCell>
                            <TableCell>
                              {item.flag && (
                                <Badge
                                  variant={
                                    item.flag === "H" ? "destructive" : item.flag === "L" ? "default" : "outline"
                                  }
                                >
                                  {item.flag}
                                </Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    <div className="mt-4 text-sm">
                      <p className="font-medium">Notes:</p>
                      <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>H = Result is above the reference range</li>
                        <li>L = Result is below the reference range</li>
                        <li>Reference ranges may vary based on age, gender, and other factors</li>
                        <li>Please consult with your healthcare provider to interpret these results</li>
                      </ul>
                    </div>
                  </TabsContent>

                  <TabsContent value="trends" className="mt-4">
                    <div className="flex items-center justify-center p-12 border rounded-md">
                      <div className="text-center">
                        <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                        <h3 className="text-lg font-medium">Trend Analysis</h3>
                        <p className="text-muted-foreground mt-1">
                          Historical trend data will be displayed here when more results are available.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <h3 className="text-lg font-medium">Select a Lab Result</h3>
                <p className="text-muted-foreground mt-1">
                  Choose a lab result from the list to view detailed information.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
