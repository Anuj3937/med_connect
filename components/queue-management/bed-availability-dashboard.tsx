"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, BedDouble, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function BedAvailabilityDashboard() {
  const { selectedHospital } = useAuth()
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  // Mock data for bed availability
  const bedAvailability = {
    "hosp-1": [
      {
        id: "ward-1",
        name: "General Ward",
        totalBeds: 50,
        occupiedBeds: 42,
        type: "general",
        status: "available",
      },
      {
        id: "ward-2",
        name: "ICU",
        totalBeds: 15,
        occupiedBeds: 14,
        type: "icu",
        status: "critical",
      },
      {
        id: "ward-3",
        name: "Pediatric Ward",
        totalBeds: 30,
        occupiedBeds: 18,
        type: "pediatric",
        status: "available",
      },
      {
        id: "ward-4",
        name: "Maternity Ward",
        totalBeds: 25,
        occupiedBeds: 20,
        type: "maternity",
        status: "limited",
      },
      {
        id: "ward-5",
        name: "Cardiac Care Unit",
        totalBeds: 12,
        occupiedBeds: 10,
        type: "specialized",
        status: "limited",
      },
    ],
    "hosp-2": [
      {
        id: "ward-1",
        name: "General Ward",
        totalBeds: 40,
        occupiedBeds: 30,
        type: "general",
        status: "available",
      },
      {
        id: "ward-2",
        name: "ICU",
        totalBeds: 10,
        occupiedBeds: 8,
        type: "icu",
        status: "limited",
      },
      {
        id: "ward-3",
        name: "Pediatric Ward",
        totalBeds: 20,
        occupiedBeds: 12,
        type: "pediatric",
        status: "available",
      },
      {
        id: "ward-4",
        name: "Maternity Ward",
        totalBeds: 15,
        occupiedBeds: 10,
        type: "maternity",
        status: "available",
      },
      {
        id: "ward-5",
        name: "Cardiac Care Unit",
        totalBeds: 8,
        occupiedBeds: 5,
        type: "specialized",
        status: "available",
      },
    ],
    "hosp-3": [
      {
        id: "ward-1",
        name: "General Ward",
        totalBeds: 60,
        occupiedBeds: 58,
        type: "general",
        status: "critical",
      },
      {
        id: "ward-2",
        name: "ICU",
        totalBeds: 20,
        occupiedBeds: 20,
        type: "icu",
        status: "full",
      },
      {
        id: "ward-3",
        name: "Pediatric Ward",
        totalBeds: 35,
        occupiedBeds: 30,
        type: "pediatric",
        status: "limited",
      },
      {
        id: "ward-4",
        name: "Maternity Ward",
        totalBeds: 30,
        occupiedBeds: 28,
        type: "maternity",
        status: "critical",
      },
      {
        id: "ward-5",
        name: "Cardiac Care Unit",
        totalBeds: 15,
        occupiedBeds: 14,
        type: "specialized",
        status: "critical",
      },
    ],
    "hosp-4": [
      {
        id: "ward-1",
        name: "General Ward",
        totalBeds: 30,
        occupiedBeds: 20,
        type: "general",
        status: "available",
      },
      {
        id: "ward-2",
        name: "ICU",
        totalBeds: 8,
        occupiedBeds: 5,
        type: "icu",
        status: "available",
      },
      {
        id: "ward-3",
        name: "Pediatric Ward",
        totalBeds: 15,
        occupiedBeds: 8,
        type: "pediatric",
        status: "available",
      },
      {
        id: "ward-4",
        name: "Maternity Ward",
        totalBeds: 12,
        occupiedBeds: 6,
        type: "maternity",
        status: "available",
      },
      {
        id: "ward-5",
        name: "Cardiac Care Unit",
        totalBeds: 6,
        occupiedBeds: 3,
        type: "specialized",
        status: "available",
      },
    ],
  }

  // Get wards for selected hospital or default to first hospital
  const wards = selectedHospital
    ? bedAvailability[selectedHospital.id as keyof typeof bedAvailability]
    : bedAvailability["hosp-1"]

  // Filter wards based on active tab, search term, and filter type
  const filteredWards = wards.filter((ward) => {
    const matchesTab = activeTab === "all" || ward.status === activeTab
    const matchesSearch = ward.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || ward.type === filterType
    return matchesTab && matchesSearch && matchesType
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "full":
        return <Badge variant="destructive">Full</Badge>
      case "critical":
        return (
          <Badge variant="destructive" className="bg-red-400">
            Critical
          </Badge>
        )
      case "limited":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
            Limited
          </Badge>
        )
      case "available":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
            Available
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // Calculate total beds and availability
  const totalBeds = wards.reduce((sum, ward) => sum + ward.totalBeds, 0)
  const occupiedBeds = wards.reduce((sum, ward) => sum + ward.occupiedBeds, 0)
  const availableBeds = totalBeds - occupiedBeds
  const occupancyRate = Math.round((occupiedBeds / totalBeds) * 100)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3 rounded-lg border p-4">
          <h3 className="font-medium mb-2">Bed Occupancy Overview</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Overall Occupancy</span>
                <span className="flex items-center">
                  {occupiedBeds}/{totalBeds} beds ({occupancyRate}%)
                  {occupancyRate >= 90 && <AlertTriangle className="h-3 w-3 text-red-500 ml-1" />}
                </span>
              </div>
              <Progress
                value={occupancyRate}
                className={`h-2 ${
                  occupancyRate >= 90 ? "bg-red-100" : occupancyRate >= 75 ? "bg-amber-100" : "bg-blue-100"
                }`}
                indicatorClassName={
                  occupancyRate >= 90 ? "bg-red-500" : occupancyRate >= 75 ? "bg-amber-500" : "bg-blue-500"
                }
              />
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="rounded-md border p-3">
                <div className="text-2xl font-bold">{totalBeds}</div>
                <div className="text-xs text-muted-foreground">Total Beds</div>
              </div>
              <div className="rounded-md border p-3">
                <div className="text-2xl font-bold text-amber-600">{occupiedBeds}</div>
                <div className="text-xs text-muted-foreground">Occupied</div>
              </div>
              <div className="rounded-md border p-3">
                <div className="text-2xl font-bold text-green-600">{availableBeds}</div>
                <div className="text-xs text-muted-foreground">Available</div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="font-medium mb-2">Critical Status</h3>
          <div className="space-y-2">
            {wards
              .filter((ward) => ward.status === "critical" || ward.status === "full")
              .map((ward) => (
                <div key={ward.id} className="flex items-center justify-between">
                  <div className="text-sm">{ward.name}</div>
                  {getStatusBadge(ward.status)}
                </div>
              ))}

            {wards.filter((ward) => ward.status === "critical" || ward.status === "full").length === 0 && (
              <div className="text-sm text-muted-foreground text-center py-4">No critical wards</div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search wards..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="icu">ICU</SelectItem>
                <SelectItem value="pediatric">Pediatric</SelectItem>
                <SelectItem value="maternity">Maternity</SelectItem>
                <SelectItem value="specialized">Specialized</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Wards</TabsTrigger>
            <TabsTrigger value="available">Available</TabsTrigger>
            <TabsTrigger value="limited">Limited</TabsTrigger>
            <TabsTrigger value="critical">Critical</TabsTrigger>
            <TabsTrigger value="full">Full</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWards.map((ward) => (
            <div key={ward.id} className="rounded-lg border p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">{ward.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusBadge(ward.status)}
                    <span className="text-xs text-muted-foreground capitalize">{ward.type} Ward</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <BedDouble className="h-4 w-4 mr-2" />
                  Details
                </Button>
              </div>

              <div className="space-y-3 mt-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Bed Occupancy</span>
                    <span>
                      {ward.occupiedBeds}/{ward.totalBeds} ({Math.round((ward.occupiedBeds / ward.totalBeds) * 100)}%)
                    </span>
                  </div>
                  <Progress
                    value={(ward.occupiedBeds / ward.totalBeds) * 100}
                    className={`h-2 ${
                      (ward.occupiedBeds / ward.totalBeds) >= 0.9
                        ? "bg-red-100"
                        : ward.occupiedBeds / ward.totalBeds >= 0.75
                          ? "bg-amber-100"
                          : "bg-blue-100"
                    }`}
                    indicatorClassName={
                      ward.occupiedBeds / ward.totalBeds >= 0.9
                        ? "bg-red-500"
                        : ward.occupiedBeds / ward.totalBeds >= 0.75
                          ? "bg-amber-500"
                          : "bg-blue-500"
                    }
                  />
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Available beds:</span>
                  <span className="font-medium">{ward.totalBeds - ward.occupiedBeds}</span>
                </div>
              </div>
            </div>
          ))}

          {filteredWards.length === 0 && (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              No wards match the selected filters
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
