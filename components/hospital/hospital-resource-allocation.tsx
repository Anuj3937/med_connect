"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, ArrowRight, Bed, Clock, Users, Stethoscope } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function HospitalResourceAllocation() {
  const { toast } = useToast()

  // Simulated resource allocation data
  const [resources, setResources] = useState({
    beds: [
      { type: "General Ward", total: 200, occupied: 152, available: 48, status: "normal" },
      { type: "ICU", total: 50, occupied: 46, available: 4, status: "critical" },
      { type: "Pediatric", total: 40, occupied: 26, available: 14, status: "normal" },
      { type: "Maternity", total: 30, occupied: 24, available: 6, status: "warning" },
      { type: "Isolation", total: 20, occupied: 8, available: 12, status: "normal" },
    ],
    staff: [
      { role: "Doctors", current: 24, required: 30, status: "warning" },
      { role: "Nurses", current: 86, required: 95, status: "warning" },
      { role: "Specialists", current: 12, required: 15, status: "normal" },
      { role: "Support Staff", current: 32, required: 35, status: "normal" },
    ],
    equipment: [
      { name: "Ventilators", total: 25, inUse: 18, available: 7, status: "warning" },
      { name: "IV Pumps", total: 180, inUse: 142, available: 38, status: "normal" },
      { name: "Patient Monitors", total: 120, inUse: 98, available: 22, status: "normal" },
      { name: "Defibrillators", total: 15, inUse: 5, available: 10, status: "normal" },
      { name: "Dialysis Machines", total: 8, inUse: 7, available: 1, status: "critical" },
    ],
  })

  const handleRequestResource = (type: string, name: string) => {
    toast({
      title: "Resource request submitted",
      description: `Request for additional ${name} has been submitted.`,
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>
      case "warning":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
            Warning
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
    <div className="space-y-6">
      <Tabs defaultValue="beds">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="beds">
            <Bed className="mr-2 h-4 w-4" />
            Beds
          </TabsTrigger>
          <TabsTrigger value="staff">
            <Users className="mr-2 h-4 w-4" />
            Staff
          </TabsTrigger>
          <TabsTrigger value="equipment">
            <Stethoscope className="mr-2 h-4 w-4" />
            Equipment
          </TabsTrigger>
        </TabsList>

        <TabsContent value="beds" className="mt-4">
          <div className="space-y-4">
            {resources.beds.map((bed, index) => (
              <div key={index} className="rounded-lg border p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium">{bed.type} Beds</h4>
                      {getStatusBadge(bed.status)}
                    </div>

                    <div className="flex justify-between text-sm mb-1">
                      <span>{bed.occupied} occupied</span>
                      <span>{bed.available} available</span>
                    </div>

                    <Progress
                      value={(bed.occupied / bed.total) * 100}
                      className="h-2"
                      indicatorClassName={
                        bed.status === "critical"
                          ? "bg-red-500"
                          : bed.status === "warning"
                            ? "bg-amber-500"
                            : "bg-green-500"
                      }
                    />

                    <p className="text-xs text-muted-foreground mt-1">
                      {bed.occupied} of {bed.total} beds occupied ({Math.round((bed.occupied / bed.total) * 100)}%)
                    </p>
                  </div>

                  {(bed.status === "critical" || bed.status === "warning") && (
                    <Button size="sm" onClick={() => handleRequestResource("beds", bed.type)}>
                      Request More
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="staff" className="mt-4">
          <div className="space-y-4">
            {resources.staff.map((staff, index) => (
              <div key={index} className="rounded-lg border p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium">{staff.role}</h4>
                      {getStatusBadge(staff.status)}
                    </div>

                    <div className="flex justify-between text-sm mb-1">
                      <span>Current: {staff.current}</span>
                      <span>Required: {staff.required}</span>
                    </div>

                    <Progress
                      value={(staff.current / staff.required) * 100}
                      className="h-2"
                      indicatorClassName={
                        staff.status === "critical"
                          ? "bg-red-500"
                          : staff.status === "warning"
                            ? "bg-amber-500"
                            : "bg-green-500"
                      }
                    />

                    <p className="text-xs text-muted-foreground mt-1">
                      {staff.current} of {staff.required} required ({Math.round((staff.current / staff.required) * 100)}
                      %)
                    </p>
                  </div>

                  {(staff.status === "critical" || staff.status === "warning") && (
                    <Button size="sm" onClick={() => handleRequestResource("staff", staff.role)}>
                      Request Staff
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="equipment" className="mt-4">
          <div className="space-y-4">
            {resources.equipment.map((equipment, index) => (
              <div key={index} className="rounded-lg border p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium">{equipment.name}</h4>
                      {getStatusBadge(equipment.status)}
                    </div>

                    <div className="flex justify-between text-sm mb-1">
                      <span>{equipment.inUse} in use</span>
                      <span>{equipment.available} available</span>
                    </div>

                    <Progress
                      value={(equipment.inUse / equipment.total) * 100}
                      className="h-2"
                      indicatorClassName={
                        equipment.status === "critical"
                          ? "bg-red-500"
                          : equipment.status === "warning"
                            ? "bg-amber-500"
                            : "bg-green-500"
                      }
                    />

                    <p className="text-xs text-muted-foreground mt-1">
                      {equipment.inUse} of {equipment.total} in use (
                      {Math.round((equipment.inUse / equipment.total) * 100)}%)
                    </p>
                  </div>

                  {(equipment.status === "critical" || equipment.status === "warning") && (
                    <Button size="sm" onClick={() => handleRequestResource("equipment", equipment.name)}>
                      Request More
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Resource Allocation Recommendations</CardTitle>
          <CardDescription>Based on predicted demand changes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-4 bg-amber-50 border-amber-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800">ICU Capacity Critical</h4>
                  <p className="text-sm text-amber-700 mt-1">
                    ICU beds are at 92% capacity with predicted 20% increase in demand. Consider:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-amber-700">
                    <li>Converting 5 general ward beds to ICU beds</li>
                    <li>Requesting 3 additional ICU nurses from staffing pool</li>
                    <li>Preparing for potential patient transfers to nearby facilities</li>
                  </ul>
                  <Button size="sm" className="mt-3">
                    Implement Recommendations
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium">Staff Scheduling Optimization</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Based on predicted demand patterns, we recommend adjusting staff schedules:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-muted-foreground">
                    <li>Increase ER staffing by 15% during evening shifts (4PM-12AM)</li>
                    <li>Add 2 additional nurses to the ICU night shift</li>
                    <li>Reschedule non-emergency procedures to optimize OR utilization</li>
                  </ul>
                  <Button size="sm" variant="outline" className="mt-3">
                    View Detailed Schedule
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
