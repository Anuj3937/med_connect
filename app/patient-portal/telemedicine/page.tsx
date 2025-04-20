"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Clock, Video } from "lucide-react"
import { UpcomingConsultations } from "@/components/telemedicine/upcoming-consultations"
import { ConsultationHistory } from "@/components/telemedicine/consultation-history"
import { VirtualConsultationScheduler } from "@/components/telemedicine/virtual-consultation-scheduler"
import { DoctorAvailability } from "@/components/telemedicine/doctor-availability"
import { TechnicalCheck } from "@/components/telemedicine/technical-check"
import { useState } from "react"

export default function TelemedicinePage() {
  const [showTechCheck, setShowTechCheck] = useState(false)

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Virtual Consultations</h1>
          <p className="text-muted-foreground">Connect with healthcare providers from the comfort of your home</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setShowTechCheck(true)} className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            Test Your Setup
          </Button>
          <Button className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            Schedule Consultation
          </Button>
        </div>
      </div>

      {showTechCheck && (
        <Card>
          <CardHeader>
            <CardTitle>Technical Check</CardTitle>
            <CardDescription>Ensure your device is ready for virtual consultations</CardDescription>
          </CardHeader>
          <CardContent>
            <TechnicalCheck onClose={() => setShowTechCheck(false)} />
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your virtual consultations</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Video className="h-5 w-5 text-primary" />
                  Join Consultation
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground mb-4">
                  Enter your consultation ID to join your scheduled appointment
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Consultation ID"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <Button>Join</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Next Appointment
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-2">
                  <p className="font-medium">Dr. Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">General Practitioner</p>
                  <p className="text-sm">Today, 2:30 PM (in 45 minutes)</p>
                  <Button variant="outline" className="w-full">
                    Prepare
                  </Button>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Available Doctors</CardTitle>
            <CardDescription>Doctors available for immediate consultation</CardDescription>
          </CardHeader>
          <CardContent>
            <DoctorAvailability />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="schedule">Schedule New</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-4">
          <UpcomingConsultations />
        </TabsContent>
        <TabsContent value="history" className="mt-4">
          <ConsultationHistory />
        </TabsContent>
        <TabsContent value="schedule" className="mt-4">
          <VirtualConsultationScheduler />
        </TabsContent>
      </Tabs>
    </div>
  )
}
