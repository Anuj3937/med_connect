"use client"

import { useState } from "react"
import { ArrowUpDown, MapPin, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

type HospitalListProps = {
  filterType?: string
}

export function HospitalList({ filterType }: HospitalListProps) {
  const [sortColumn, setSortColumn] = useState<"name" | "type" | "bedCapacity" | "erStatus">("bedCapacity")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [searchTerm, setSearchTerm] = useState("")

  const hospitals = [
    {
      id: "hosp-1",
      name: "Memorial General Hospital",
      type: "Level I Trauma Center",
      bedCapacity: 78,
      icuAvailable: 2,
      erStatus: "high",
      lat: 34.0522,
      lng: -118.2437,
    },
    {
      id: "hosp-2",
      name: "University Medical Center",
      type: "Academic Medical Center",
      bedCapacity: 65,
      icuAvailable: 8,
      erStatus: "normal",
      lat: 40.7128,
      lng: -74.006,
    },
    {
      id: "hosp-3",
      name: "Riverside Community Hospital",
      type: "Community Hospital",
      bedCapacity: 92,
      icuAvailable: 0,
      erStatus: "diverting",
      lat: 33.9806,
      lng: -117.3755,
    },
    {
      id: "hosp-4",
      name: "Children's Hospital",
      type: "Pediatric Hospital",
      bedCapacity: 62,
      icuAvailable: 5,
      erStatus: "normal",
      lat: 41.8781,
      lng: -87.6298,
    },
    {
      id: "hosp-5",
      name: "Veterans Medical Center",
      type: "Veterans Hospital",
      bedCapacity: 70,
      icuAvailable: 3,
      erStatus: "high",
      lat: 38.9072,
      lng: -77.0369,
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
      hospital.type.toLowerCase().includes(searchTerm.toLowerCase())

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
      <div className="relative">
        <Input
          placeholder="Search hospitals..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
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
                <th className="py-3 px-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedHospitals.map((hospital) => (
                <tr key={hospital.id} className="border-b">
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
                  <td colSpan={5} className="py-6 text-center text-muted-foreground">
                    No hospitals found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-xs text-muted-foreground">
        Showing {sortedHospitals.length} of {hospitals.length} hospitals
      </div>
    </div>
  )
}
