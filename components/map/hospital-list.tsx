"use client"

import { useState } from "react"
import { ArrowUpDown, MapPin, ExternalLink, Search, Filter, AlertTriangle, Clock, Bed } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

type HospitalListProps = {
  filterType?: string
}

export function HospitalList({ filterType }: HospitalListProps) {
  const [sortColumn, setSortColumn] = useState<"name" | "type" | "bedCapacity" | "erStatus">("bedCapacity")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"table" | "grid">("table")

  const hospitals = [
    {
      id: "hosp-1",
      name: "Memorial General Hospital",
      type: "Level I Trauma Center",
      bedCapacity: 78,
      icuAvailable: 2,
      erStatus: "high",
      waitTime: "45 min",
      lat: 34.0522,
      lng: -118.2437,
      specialties: ["Trauma", "Cardiac", "Neurology"],
    },
    {
      id: "hosp-2",
      name: "University Medical Center",
      type: "Academic Medical Center",
      bedCapacity: 65,
      icuAvailable: 8,
      erStatus: "normal",
      waitTime: "20 min",
      lat: 40.7128,
      lng: -74.006,
      specialties: ["Research", "Oncology", "Transplant"],
    },
    {
      id: "hosp-3",
      name: "Riverside Community Hospital",
      type: "Community Hospital",
      bedCapacity: 92,
      icuAvailable: 0,
      erStatus: "diverting",
      waitTime: "120+ min",
      lat: 33.9806,
      lng: -117.3755,
      specialties: ["General", "Pediatrics"],
    },
    {
      id: "hosp-4",
      name: "Children's Hospital",
      type: "Pediatric Hospital",
      bedCapacity: 62,
      icuAvailable: 5,
      erStatus: "normal",
      waitTime: "15 min",
      lat: 41.8781,
      lng: -87.6298,
      specialties: ["Pediatrics", "Neonatal"],
    },
    {
      id: "hosp-5",
      name: "Veterans Medical Center",
      type: "Veterans Hospital",
      bedCapacity: 70,
      icuAvailable: 3,
      erStatus: "high",
      waitTime: "35 min",
      lat: 38.9072,
      lng: -77.0369,
      specialties: ["Geriatrics", "Rehabilitation"],
    },
  ]

  // Filter hospitals based on filterType and searchTerm
  const filteredHospitals = hospitals.filter((hospital) => {
    const matchesType =
      !filterType ||
      (filterType === "trauma" && hospital.type.includes("Trauma")) ||
      (filterType === "pediatric" && hospital.type.includes("Pediatric")) ||
      (filterType === "specialty" && (hospital.type.includes("Specialty") || hospital.type.includes("Veterans")))

    const matchesSearch =
      !searchTerm ||
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.specialties.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))

    return matchesType && matchesSearch
  })

  // Sort hospitals
  const sortedHospitals = [...filteredHospitals].sort((a, b) => {
    let comparison = 0

    if (sortColumn === "name") {
      comparison = a.name.localeCompare(b.name)
    } else if (sortColumn === "type") {
      comparison = a.type.localeCompare(b.type)
    } else if (sortColumn === "bedCapacity") {
      comparison = a.bedCapacity - b.bedCapacity
    } else if (sortColumn === "erStatus") {
      const statusOrder = { diverting: 3, high: 2, normal: 1 }
      comparison =
        statusOrder[a.erStatus as keyof typeof statusOrder] - statusOrder[b.erStatus as keyof typeof statusOrder]
    }

    return sortDirection === "asc" ? comparison : -comparison
  })

  const handleSort = (column: "name" | "type" | "bedCapacity" | "erStatus") => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("desc")
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "diverting":
        return <Badge variant="destructive">Diverting</Badge>
      case "high":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
            High Volume
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
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search hospitals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "table" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("table")}
            className={viewMode === "table" ? "bg-blue-600 hover:bg-blue-700" : ""}
          >
            Table
          </Button>
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className={viewMode === "grid" ? "bg-blue-600 hover:bg-blue-700" : ""}
          >
            Grid
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {viewMode === "table" ? (
        <div className="rounded-md border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-blue-50/50 dark:bg-blue-950/20">
                  <th className="py-3 px-4 text-left font-medium">
                    <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("name")}>
                      Hospital Name
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </th>
                  <th className="py-3 px-4 text-left font-medium">
                    <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("type")}>
                      Type
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </th>
                  <th className="py-3 px-4 text-left font-medium">
                    <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("bedCapacity")}>
                      Bed Capacity
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </th>
                  <th className="py-3 px-4 text-left font-medium">
                    <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("erStatus")}>
                      ER Status
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </th>
                  <th className="py-3 px-4 text-left font-medium">Wait Time</th>
                  <th className="py-3 px-4 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedHospitals.map((hospital) => (
                  <tr key={hospital.id} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4 font-medium">{hospital.name}</td>
                    <td className="py-3 px-4">{hospital.type}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden mr-2">
                          <div
                            className={`h-full rounded-full ${
                              hospital.bedCapacity > 90
                                ? "bg-red-500"
                                : hospital.bedCapacity > 70
                                  ? "bg-amber-500"
                                  : "bg-green-500"
                            }`}
                            style={{ width: `${hospital.bedCapacity}%` }}
                          ></div>
                        </div>
                        <span>{hospital.bedCapacity}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{getStatusBadge(hospital.erStatus)}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span
                          className={
                            hospital.erStatus === "diverting"
                              ? "text-red-600"
                              : hospital.erStatus === "high"
                                ? "text-amber-600"
                                : ""
                          }
                        >
                          {hospital.waitTime}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MapPin className="h-4 w-4" />
                          <span className="sr-only">View on Map</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">View Details</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}

                {sortedHospitals.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-muted-foreground">
                      No hospitals found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedHospitals.map((hospital) => (
            <Card key={hospital.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="p-4 border-b bg-blue-50/50 dark:bg-blue-950/20">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{hospital.name}</h3>
                      <p className="text-sm text-muted-foreground">{hospital.type}</p>
                    </div>
                    {getStatusBadge(hospital.erStatus)}
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1">
                      <Bed className="h-4 w-4 text-muted-foreground" />
                      <span>Bed Capacity:</span>
                    </div>
                    <span className="font-medium">{hospital.bedCapacity}%</span>
                  </div>
                  <Progress
                    value={hospital.bedCapacity}
                    className="h-2"
                    indicatorClassName={
                      hospital.bedCapacity > 90
                        ? "bg-red-500"
                        : hospital.bedCapacity > 70
                          ? "bg-amber-500"
                          : "bg-green-500"
                    }
                  />

                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                      <span>ICU Beds:</span>
                    </div>
                    <span className="font-medium">{hospital.icuAvailable} available</span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Wait Time:</span>
                    </div>
                    <span
                      className={
                        hospital.erStatus === "diverting"
                          ? "font-medium text-red-600"
                          : hospital.erStatus === "high"
                            ? "font-medium text-amber-600"
                            : "font-medium"
                      }
                    >
                      {hospital.waitTime}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {hospital.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="p-3 border-t bg-muted/20 flex justify-between">
                  <Button variant="ghost" size="sm" className="h-8">
                    <MapPin className="h-4 w-4 mr-1" />
                    View on Map
                  </Button>
                  <Button variant="outline" size="sm" className="h-8">
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {sortedHospitals.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground">
              No hospitals found matching your criteria.
            </div>
          )}
        </div>
      )}

      <div className="text-xs text-muted-foreground">
        Showing {sortedHospitals.length} of {hospitals.length} hospitals
      </div>
    </div>
  )
}
