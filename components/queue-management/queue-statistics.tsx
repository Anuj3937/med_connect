"use client"

import { useAuth } from "@/components/auth-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Clock, Users, AlertTriangle } from "lucide-react"

export function QueueStatistics() {
  const { selectedHospital } = useAuth()

  // Mock data for queue statistics
  const queueStats = {
    "hosp-1": {
      totalPatients: 24,
      avgWaitTime: 22,
      maxWaitTime: 45,
      departmentLoad: {
        Cardiology: 85,
        Orthopedics: 60,
        Neurology: 40,
        "General Medicine": 75,
        Emergency: 90,
      },
    },
    "hosp-2": {
      totalPatients: 18,
      avgWaitTime: 15,
      maxWaitTime: 30,
      departmentLoad: {
        Cardiology: 70,
        Orthopedics: 45,
        Neurology: 30,
        "General Medicine": 60,
        Emergency: 75,
      },
    },
    "hosp-3": {
      totalPatients: 32,
      avgWaitTime: 28,
      maxWaitTime: 55,
      departmentLoad: {
        Cardiology: 95,
        Orthopedics: 80,
        Neurology: 65,
        "General Medicine": 85,
        Emergency: 100,
      },
    },
    "hosp-4": {
      totalPatients: 15,
      avgWaitTime: 12,
      maxWaitTime: 25,
      departmentLoad: {
        Cardiology: 50,
        Orthopedics: 35,
        Neurology: 20,
        "General Medicine": 45,
        Emergency: 60,
      },
    },
  }

  // Get stats for selected hospital or default to first hospital
  const stats = selectedHospital ? queueStats[selectedHospital.id as keyof typeof queueStats] : queueStats["hosp-1"]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Users className="h-8 w-8 text-blue-500 mb-2" />
            <div className="text-2xl font-bold">{stats.totalPatients}</div>
            <p className="text-xs text-muted-foreground">Patients in Queue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Clock className="h-8 w-8 text-amber-500 mb-2" />
            <div className="text-2xl font-bold">{stats.avgWaitTime} min</div>
            <p className="text-xs text-muted-foreground">Average Wait Time</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Department Load</h4>
        <div className="space-y-3">
          {Object.entries(stats.departmentLoad).map(([dept, load]) => (
            <div key={dept} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>{dept}</span>
                <span className="flex items-center">
                  {load}%{load >= 90 && <AlertTriangle className="h-3 w-3 text-red-500 ml-1" />}
                </span>
              </div>
              <Progress
                value={load}
                className={`h-2 ${load >= 90 ? "bg-red-100" : load >= 75 ? "bg-amber-100" : "bg-blue-100"}`}
                indicatorClassName={load >= 90 ? "bg-red-500" : load >= 75 ? "bg-amber-500" : "bg-blue-500"}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="text-xs text-muted-foreground">
        <p>Peak hours: 9:00 AM - 11:00 AM</p>
        <p>Last updated: {new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  )
}
