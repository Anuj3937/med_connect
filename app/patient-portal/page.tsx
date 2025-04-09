"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { MapPin, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { PatientAppointmentsList } from "@/components/patient/patient-appointments-list"
import { PatientMedicationsList } from "@/components/patient/patient-medications-list"
import { PatientHealthMetrics } from "@/components/patient/patient-health-metrics"
import { PatientNearbyHospitals } from "@/components/patient/patient-nearby-hospitals"
import { PatientHealthRecords } from "@/components/patient/patient-health-records"

export default function PatientPortalPage() {
  const { user } = useAuth()
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good morning")
    else if (hour < 18) setGreeting("Good afternoon")
    else setGreeting("Good evening")
  }, [])

  const userName = user.email?.split("@")[0] || "Patient"

  return (
    <div className="container py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {greeting}, {userName}
        </h1>
        <p className="text-muted-foreground">
          Here's an overview of your health information and upcoming appointments.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Tomorrow</div>
            <p className="text-xs text-muted-foreground mt-1">9:30 AM - Dr. Sarah Chen</p>
            <div className="mt-2 flex items-center text-xs">
              <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">
                Cardiology
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Medications Due</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-1">Medications due today</p>
            <div className="mt-2 flex items-center text-xs">
              <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
                Next: Lisinopril at 8:00 PM
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Prescription Refills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground mt-1">Prescriptions need refill</p>
            <div className="mt-2 flex items-center text-xs">
              <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
                Urgent: Metformin (3 days left)
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Health Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Good</div>
            <p className="text-xs text-muted-foreground mt-1">Last updated: Today</p>
            <div className="mt-2 flex items-center text-xs">
              <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                Blood pressure: 120/80
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="appointments" className="space-y-8">
        <TabsList>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="health">Health</TabsTrigger>
          <TabsTrigger value="hospitals">Nearby Hospitals</TabsTrigger>
        </TabsList>

        <TabsContent value="appointments" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Your Appointments</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Schedule New Appointment
            </Button>
          </div>
          <PatientAppointmentsList />
        </TabsContent>

        <TabsContent value="medications" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Your Medications</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Request Refill
            </Button>
          </div>
          <PatientMedicationsList />
        </TabsContent>

        <TabsContent value="health" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Health Metrics</CardTitle>
                <CardDescription>Your recent health measurements</CardDescription>
              </CardHeader>
              <CardContent>
                <PatientHealthMetrics />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Health Records</CardTitle>
                <CardDescription>Your recent medical records</CardDescription>
              </CardHeader>
              <CardContent>
                <PatientHealthRecords />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="hospitals" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Hospitals Near You</h2>
            <Button variant="outline">
              <MapPin className="mr-2 h-4 w-4" />
              View on Map
            </Button>
          </div>
          <PatientNearbyHospitals />
        </TabsContent>
      </Tabs>
    </div>
  )
}
