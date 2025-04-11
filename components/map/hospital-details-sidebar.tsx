"use client"

import { useState } from "react"
import { Phone, MapPin, AlertTriangle, Clock, Users, Stethoscope, Activity, Bed } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export function HospitalDetailsSidebar() {
  const [selectedHospital] = useState({
    id: "hosp-1",
    name: "Memorial General Hospital",
    type: "Level I Trauma Center",
    address: "1234 Medical Center Blvd, Los Angeles, CA 90033",
    phone: "(213) 555-1234",
    bedCapacity: 78,
    icuAvailable: 2,
    erStatus: "high",
    specialties: ["Trauma", "Cardiac", "Neurology", "Orthopedics"],
    resources: {
      ventilators: { total: 25, available: 7 },
      ivPumps: { total: 180, available: 38 },
      isolationRooms: { total: 20, available: 4 },
      surgicalSuites: { total: 12, available: 3 },
    },
    staff: {
      doctors: { total: 120, onDuty: 42 },
      nurses: { total: 280, onDuty: 95 },
      support: { total: 150, onDuty: 48 },
    },
    waitTime: {
      er: "45 min",
      urgent: "30 min",
      nonUrgent: "2 hrs",
    },
  })

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
    <div className="p-4">
      {selectedHospital ? (
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{selectedHospital.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedHospital.type}</p>
              </div>
              {getStatusBadge(selectedHospital.erStatus)}
            </div>

            <div className="flex flex-col gap-2 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{selectedHospital.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{selectedHospital.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>
                  ER Wait Time: <span className="font-medium text-amber-600">{selectedHospital.waitTime.er}</span>
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mt-2">
              {selectedHospital.specialties.map((specialty) => (
                <Badge
                  key={specialty}
                  variant="secondary"
                  className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                >
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Card>
              <CardContent className="p-3">
                <div className="flex flex-col items-center">
                  <Bed className="h-5 w-5 text-blue-600 mb-1" />
                  <div className="text-xs text-muted-foreground">Bed Capacity</div>
                  <div className="text-lg font-bold">{selectedHospital.bedCapacity}%</div>
                  <Progress
                    value={selectedHospital.bedCapacity}
                    className="h-1.5 mt-1"
                    indicatorClassName={
                      selectedHospital.bedCapacity > 90
                        ? "bg-red-500"
                        : selectedHospital.bedCapacity > 70
                          ? "bg-amber-500"
                          : "bg-green-500"
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3">
                <div className="flex flex-col items-center">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mb-1" />
                  <div className="text-xs text-muted-foreground">ICU Beds</div>
                  <div className="text-lg font-bold">
                    {selectedHospital.icuAvailable} <span className="text-xs font-normal">available</span>
                  </div>
                  <Progress
                    value={selectedHospital.icuAvailable * 10}
                    className="h-1.5 mt-1"
                    indicatorClassName={
                      selectedHospital.icuAvailable < 3
                        ? "bg-red-500"
                        : selectedHospital.icuAvailable < 6
                          ? "bg-amber-500"
                          : "bg-green-500"
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="capacity" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-blue-50/50 dark:bg-blue-950/20">
              <TabsTrigger
                value="capacity"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-background"
              >
                Capacity
              </TabsTrigger>
              <TabsTrigger
                value="resources"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-background"
              >
                Resources
              </TabsTrigger>
              <TabsTrigger
                value="staff"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-background"
              >
                Staff
              </TabsTrigger>
            </TabsList>

            <TabsContent value="capacity" className="space-y-4 pt-4 animate-in fade-in-50 duration-300">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">General Beds</span>
                  <span className="text-sm">{selectedHospital.bedCapacity}% Occupied</span>
                </div>
                <Progress
                  value={selectedHospital.bedCapacity}
                  className="h-2"
                  indicatorClassName={
                    selectedHospital.bedCapacity > 90
                      ? "bg-red-500"
                      : selectedHospital.bedCapacity > 70
                        ? "bg-amber-500"
                        : "bg-green-500"
                  }
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">ICU Beds</span>
                  <span className="text-sm">{selectedHospital.icuAvailable} Available</span>
                </div>
                <Progress
                  value={selectedHospital.icuAvailable * 10}
                  className="h-2"
                  indicatorClassName={
                    selectedHospital.icuAvailable < 3
                      ? "bg-red-500"
                      : selectedHospital.icuAvailable < 6
                        ? "bg-amber-500"
                        : "bg-green-500"
                  }
                />
              </div>

              <div className="rounded-md border p-3 bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800/30">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-medium text-amber-700 dark:text-amber-400">Capacity Alert</span>
                </div>
                <p className="text-xs text-amber-700 dark:text-amber-400">
                  This hospital is experiencing high patient volume. Consider alternative facilities for non-critical
                  cases.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-md border p-2">
                  <div className="text-xs text-muted-foreground">ER Wait</div>
                  <div className="text-lg font-semibold text-amber-600">{selectedHospital.waitTime.er}</div>
                </div>
                <div className="rounded-md border p-2">
                  <div className="text-xs text-muted-foreground">Urgent</div>
                  <div className="text-lg font-semibold text-amber-600">{selectedHospital.waitTime.urgent}</div>
                </div>
                <div className="rounded-md border p-2">
                  <div className="text-xs text-muted-foreground">Non-Urgent</div>
                  <div className="text-lg font-semibold">{selectedHospital.waitTime.nonUrgent}</div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="resources" className="space-y-4 pt-4 animate-in fade-in-50 duration-300">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium flex items-center">
                      <Activity className="h-3 w-3 mr-1 text-blue-600" />
                      Ventilators
                    </span>
                    <span className="text-sm">
                      {selectedHospital.resources.ventilators.available}/{selectedHospital.resources.ventilators.total}{" "}
                      Available
                    </span>
                  </div>
                  <Progress
                    value={
                      (selectedHospital.resources.ventilators.available /
                        selectedHospital.resources.ventilators.total) *
                      100
                    }
                    className="h-2"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium flex items-center">
                      <Activity className="h-3 w-3 mr-1 text-blue-600" />
                      IV Pumps
                    </span>
                    <span className="text-sm">
                      {selectedHospital.resources.ivPumps.available}/{selectedHospital.resources.ivPumps.total}{" "}
                      Available
                    </span>
                  </div>
                  <Progress
                    value={
                      (selectedHospital.resources.ivPumps.available / selectedHospital.resources.ivPumps.total) * 100
                    }
                    className="h-2"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium flex items-center">
                      <Activity className="h-3 w-3 mr-1 text-blue-600" />
                      Isolation Rooms
                    </span>
                    <span className="text-sm">
                      {selectedHospital.resources.isolationRooms.available}/
                      {selectedHospital.resources.isolationRooms.total} Available
                    </span>
                  </div>
                  <Progress
                    value={
                      (selectedHospital.resources.isolationRooms.available /
                        selectedHospital.resources.isolationRooms.total) *
                      100
                    }
                    className="h-2"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium flex items-center">
                      <Activity className="h-3 w-3 mr-1 text-blue-600" />
                      Surgical Suites
                    </span>
                    <span className="text-sm">
                      {selectedHospital.resources.surgicalSuites.available}/
                      {selectedHospital.resources.surgicalSuites.total} Available
                    </span>
                  </div>
                  <Progress
                    value={
                      (selectedHospital.resources.surgicalSuites.available /
                        selectedHospital.resources.surgicalSuites.total) *
                      100
                    }
                    className="h-2"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="staff" className="space-y-4 pt-4 animate-in fade-in-50 duration-300">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium flex items-center">
                      <Stethoscope className="h-3 w-3 mr-1 text-blue-600" />
                      Doctors
                    </span>
                    <span className="text-sm">
                      {selectedHospital.staff.doctors.onDuty}/{selectedHospital.staff.doctors.total} On Duty
                    </span>
                  </div>
                  <Progress
                    value={(selectedHospital.staff.doctors.onDuty / selectedHospital.staff.doctors.total) * 100}
                    className="h-2"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium flex items-center">
                      <Users className="h-3 w-3 mr-1 text-blue-600" />
                      Nurses
                    </span>
                    <span className="text-sm">
                      {selectedHospital.staff.nurses.onDuty}/{selectedHospital.staff.nurses.total} On Duty
                    </span>
                  </div>
                  <Progress
                    value={(selectedHospital.staff.nurses.onDuty / selectedHospital.staff.nurses.total) * 100}
                    className="h-2"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium flex items-center">
                      <Users className="h-3 w-3 mr-1 text-blue-600" />
                      Support Staff
                    </span>
                    <span className="text-sm">
                      {selectedHospital.staff.support.onDuty}/{selectedHospital.staff.support.total} On Duty
                    </span>
                  </div>
                  <Progress
                    value={(selectedHospital.staff.support.onDuty / selectedHospital.staff.support.total) * 100}
                    className="h-2"
                  />
                </div>
              </div>

              <div className="rounded-md border p-3 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800/30">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-400">Shift Information</span>
                </div>
                <p className="text-xs text-blue-700 dark:text-blue-400">
                  Current shift: Day (7:00 AM - 7:00 PM)
                  <br />
                  Next shift change in: 4 hours 23 minutes
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex gap-2">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">Contact Hospital</Button>
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <MapPin className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
          <h3 className="text-lg font-medium mb-1">No Hospital Selected</h3>
          <p className="text-sm text-muted-foreground">Select a hospital on the map to view detailed information</p>
        </div>
      )}
    </div>
  )
}
