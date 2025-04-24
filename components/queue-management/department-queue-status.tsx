"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, ArrowRight, Users } from "lucide-react"

export function DepartmentQueueStatus() {
  const { selectedHospital } = useAuth()
  const [activeTab, setActiveTab] = useState("all")

  // Mock data for department queues
  const departmentQueues = {
    "hosp-1": [
      {
        id: "dept-1",
        name: "Cardiology",
        currentPatients: 12,
        maxCapacity: 15,
        avgWaitTime: 25,
        doctors: 3,
        status: "busy",
      },
      {
        id: "dept-2",
        name: "Orthopedics",
        currentPatients: 8,
        maxCapacity: 12,
        avgWaitTime: 20,
        doctors: 2,
        status: "normal",
      },
      {
        id: "dept-3",
        name: "Neurology",
        currentPatients: 5,
        maxCapacity: 10,
        avgWaitTime: 15,
        doctors: 2,
        status: "normal",
      },
      {
        id: "dept-4",
        name: "General Medicine",
        currentPatients: 15,
        maxCapacity: 20,
        avgWaitTime: 30,
        doctors: 4,
        status: "normal",
      },
      {
        id: "dept-5",
        name: "Emergency",
        currentPatients: 8,
        maxCapacity: 8,
        avgWaitTime: 5,
        doctors: 5,
        status: "critical",
      },
    ],
    "hosp-2": [
      {
        id: "dept-1",
        name: "Cardiology",
        currentPatients: 8,
        maxCapacity: 15,
        avgWaitTime: 15,
        doctors: 3,
        status: "normal",
      },
      {
        id: "dept-2",
        name: "Orthopedics",
        currentPatients: 6,
        maxCapacity: 12,
        avgWaitTime: 15,
        doctors: 2,
        status: "normal",
      },
      {
        id: "dept-3",
        name: "Neurology",
        currentPatients: 3,
        maxCapacity: 10,
        avgWaitTime: 10,
        doctors: 2,
        status: "normal",
      },
      {
        id: "dept-4",
        name: "General Medicine",
        currentPatients: 12,
        maxCapacity: 20,
        avgWaitTime: 20,
        doctors: 4,
        status: "normal",
      },
      {
        id: "dept-5",
        name: "Emergency",
        currentPatients: 5,
        maxCapacity: 8,
        avgWaitTime: 5,
        doctors: 5,
        status: "busy",
      },
    ],
    "hosp-3": [
      {
        id: "dept-1",
        name: "Cardiology",
        currentPatients: 14,
        maxCapacity: 15,
        avgWaitTime: 35,
        doctors: 3,
        status: "critical",
      },
      {
        id: "dept-2",
        name: "Orthopedics",
        currentPatients: 10,
        maxCapacity: 12,
        avgWaitTime: 25,
        doctors: 2,
        status: "busy",
      },
      {
        id: "dept-3",
        name: "Neurology",
        currentPatients: 8,
        maxCapacity: 10,
        avgWaitTime: 20,
        doctors: 2,
        status: "busy",
      },
      {
        id: "dept-4",
        name: "General Medicine",
        currentPatients: 18,
        maxCapacity: 20,
        avgWaitTime: 40,
        doctors: 4,
        status: "busy",
      },
      {
        id: "dept-5",
        name: "Emergency",
        currentPatients: 8,
        maxCapacity: 8,
        avgWaitTime: 10,
        doctors: 5,
        status: "critical",
      },
    ],
    "hosp-4": [
      {
        id: "dept-1",
        name: "Cardiology",
        currentPatients: 6,
        maxCapacity: 15,
        avgWaitTime: 10,
        doctors: 3,
        status: "normal",
      },
      {
        id: "dept-2",
        name: "Orthopedics",
        currentPatients: 4,
        maxCapacity: 12,
        avgWaitTime: 10,
        doctors: 2,
        status: "normal",
      },
      {
        id: "dept-3",
        name: "Neurology",
        currentPatients: 2,
        maxCapacity: 10,
        avgWaitTime: 5,
        doctors: 2,
        status: "normal",
      },
      {
        id: "dept-4",
        name: "General Medicine",
        currentPatients: 8,
        maxCapacity: 20,
        avgWaitTime: 15,
        doctors: 4,
        status: "normal",
      },
      {
        id: "dept-5",
        name: "Emergency",
        currentPatients: 3,
        maxCapacity: 8,
        avgWaitTime: 5,
        doctors: 5,
        status: "normal",
      },
    ],
  }

  // Get departments for selected hospital or default to first hospital
  const departments = selectedHospital
    ? departmentQueues[selectedHospital.id as keyof typeof departmentQueues]
    : departmentQueues["hosp-1"]

  // Filter departments based on active tab
  const filteredDepartments =
    activeTab === "all"
      ? departments
      : departments.filter((dept) => {
          if (activeTab === "critical") return dept.status === "critical"
          if (activeTab === "busy") return dept.status === "busy"
          return dept.status === "normal"
        })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>
      case "busy":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
            Busy
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
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Departments</TabsTrigger>
          <TabsTrigger value="critical">Critical</TabsTrigger>
          <TabsTrigger value="busy">Busy</TabsTrigger>
          <TabsTrigger value="normal">Normal</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDepartments.map((dept) => (
          <div key={dept.id} className="rounded-lg border p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">{dept.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  {getStatusBadge(dept.status)}
                  <span className="text-xs text-muted-foreground">{dept.doctors} doctors on duty</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3 mt-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Queue Capacity</span>
                  <span className="flex items-center">
                    {dept.currentPatients}/{dept.maxCapacity}
                    {dept.currentPatients === dept.maxCapacity && (
                      <AlertTriangle className="h-3 w-3 text-red-500 ml-1" />
                    )}
                  </span>
                </div>
                <Progress
                  value={(dept.currentPatients / dept.maxCapacity) * 100}
                  className={`h-2 ${
                    (dept.currentPatients / dept.maxCapacity) >= 1
                      ? "bg-red-100"
                      : dept.currentPatients / dept.maxCapacity >= 0.75
                        ? "bg-amber-100"
                        : "bg-blue-100"
                  }`}
                  indicatorClassName={
                    dept.currentPatients / dept.maxCapacity >= 1
                      ? "bg-red-500"
                      : dept.currentPatients / dept.maxCapacity >= 0.75
                        ? "bg-amber-500"
                        : "bg-blue-500"
                  }
                />
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{dept.currentPatients} patients waiting</span>
                </div>
                <span className="text-sm font-medium">~{dept.avgWaitTime} min wait</span>
              </div>
            </div>
          </div>
        ))}

        {filteredDepartments.length === 0 && (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            No departments match the selected filter
          </div>
        )}
      </div>
    </div>
  )
}
