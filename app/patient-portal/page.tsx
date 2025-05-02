"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PatientHealthMetrics } from "@/components/patient/patient-health-metrics"
import { PatientHealthRecords } from "@/components/patient/patient-health-records"
import { PatientMedicationsList } from "@/components/patient/patient-medications-list"
import { DailyHealthTracker } from "@/components/patient/daily-health-tracker"
import { Activity, FileText, Pill, Calendar, User, Heart } from "lucide-react"

export default function PatientPortalPage() {
  const [activeTab, setActiveTab] = useState("health")

  return (
    <div className="container py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Patient Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Rahul. Here's your health overview.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid grid-cols-2 md:grid-cols-3 w-full">
          <TabsTrigger value="health">
            <Heart className="h-4 w-4 mr-2" />
            Health
          </TabsTrigger>
          <TabsTrigger value="records">
            <FileText className="h-4 w-4 mr-2" />
            Records
          </TabsTrigger>
          <TabsTrigger value="medications">
            <Pill className="h-4 w-4 mr-2" />
            Medications
          </TabsTrigger>
          {/* <TabsTrigger value="appointments">
            <Calendar className="h-4 w-4 mr-2" />
            Appointments
          </TabsTrigger>
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger> */}
        </TabsList>

        <TabsContent value="health" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Current Health Metrics
                </CardTitle>
                <CardDescription>Your latest health measurements</CardDescription>
              </CardHeader>
              <CardContent>
                <PatientHealthMetrics />
              </CardContent>
            </Card>

            <DailyHealthTracker />
          </div>
        </TabsContent>

        <TabsContent value="records">
          <Card>
            <CardHeader>
              <CardTitle>Medical Records</CardTitle>
              <CardDescription>Your medical history and documents</CardDescription>
            </CardHeader>
            <CardContent>
              <PatientHealthRecords />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medications">
          <Card>
            <CardHeader>
              <CardTitle>Medications</CardTitle>
              <CardDescription>Your current prescriptions and medication schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <PatientMedicationsList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>Appointments</CardTitle>
              <CardDescription>Your upcoming and past appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Loading appointments...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Your personal information and settings</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Loading profile...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
