"use client"

import { useState } from "react"
import { Calendar, Clock, Video, FileText, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function UpcomingConsultations() {
  const router = useRouter()
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [consultationToCancel, setConsultationToCancel] = useState<string | null>(null)

  // Mock data for upcoming consultations
  const upcomingConsultations = [
    {
      id: "cons-1234",
      doctorName: "Dr. Sarah Johnson",
      doctorSpecialty: "General Practitioner",
      doctorImage: "/placeholder.svg?height=40&width=40",
      date: "Today",
      time: "2:30 PM",
      status: "upcoming",
      minutesUntil: 45,
    },
    {
      id: "cons-5678",
      doctorName: "Dr. Michael Chen",
      doctorSpecialty: "Cardiologist",
      doctorImage: "/placeholder.svg?height=40&width=40",
      date: "Tomorrow",
      time: "10:00 AM",
      status: "upcoming",
      minutesUntil: 1440,
    },
    {
      id: "cons-9012",
      doctorName: "Dr. Emily Rodriguez",
      doctorSpecialty: "Dermatologist",
      doctorImage: "/placeholder.svg?height=40&width=40",
      date: "July 15, 2024",
      time: "3:15 PM",
      status: "upcoming",
      minutesUntil: 4320,
    },
  ]

  const handleJoin = (consultationId: string) => {
    router.push(`/patient-portal/telemedicine/consultation/${consultationId}`)
  }

  const handleCancel = (consultationId: string) => {
    setConsultationToCancel(consultationId)
    setCancelDialogOpen(true)
  }

  const confirmCancel = () => {
    // In a real app, this would call an API to cancel the consultation
    console.log(`Cancelled consultation ${consultationToCancel}`)
    setCancelDialogOpen(false)
  }

  return (
    <div className="space-y-4">
      {upcomingConsultations.map((consultation) => (
        <Card key={consultation.id}>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={consultation.doctorImage || "/placeholder.svg"} alt={consultation.doctorName} />
                  <AvatarFallback>{consultation.doctorName.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {consultation.minutesUntil <= 60 ? (
                      <Badge variant="destructive">Starting Soon</Badge>
                    ) : (
                      <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">
                        Scheduled
                      </Badge>
                    )}
                    <span className="text-sm font-medium">{consultation.doctorSpecialty} Consultation</span>
                  </div>
                  <h4 className="font-medium">{consultation.doctorName}</h4>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{consultation.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{consultation.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Video className="h-3 w-3" />
                      <span>Video Consultation</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {consultation.minutesUntil <= 60 && (
                  <Button onClick={() => handleJoin(consultation.id)}>
                    <Video className="mr-2 h-4 w-4" />
                    Join Now
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  Prepare
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleCancel(consultation.id)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {upcomingConsultations.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No upcoming consultations.</p>
          <Button className="mt-4">Schedule a Consultation</Button>
        </div>
      )}

      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Consultation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this consultation? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Appointment</AlertDialogCancel>
            <AlertDialogAction onClick={confirmCancel}>Yes, Cancel</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
