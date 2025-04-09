"use client"

import { useState } from "react"
import { Calendar, Clock, MapPin, MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

export function PatientAppointmentsList() {
  const { toast } = useToast()
  const [appointments, setAppointments] = useState([
    {
      id: "apt-1",
      doctor: "Dr. Sarah Chen",
      specialty: "Cardiology",
      date: "Tomorrow",
      time: "9:30 AM",
      location: "Memorial General Hospital",
      status: "confirmed",
    },
    {
      id: "apt-2",
      doctor: "Dr. Michael Rodriguez",
      specialty: "Endocrinology",
      date: "July 18, 2024",
      time: "2:00 PM",
      location: "University Medical Center",
      status: "confirmed",
    },
    {
      id: "apt-3",
      doctor: "Dr. Emily Johnson",
      specialty: "Dermatology",
      date: "July 25, 2024",
      time: "11:15 AM",
      location: "Riverside Community Hospital",
      status: "pending",
    },
  ])

  const handleCancelAppointment = (id: string) => {
    setAppointments(appointments.filter((apt) => apt.id !== id))
    toast({
      title: "Appointment cancelled",
      description: "Your appointment has been cancelled successfully.",
    })
  }

  const handleRescheduleAppointment = (id: string) => {
    toast({
      title: "Reschedule requested",
      description: "A request to reschedule your appointment has been sent.",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
            Confirmed
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
            Pending
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div key={appointment.id} className="rounded-lg border p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {getStatusBadge(appointment.status)}
                <span className="text-sm font-medium">{appointment.specialty} Appointment</span>
              </div>
              <h4 className="font-medium">{appointment.doctor}</h4>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{appointment.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{appointment.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{appointment.location}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline">
                View Details
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleRescheduleAppointment(appointment.id)}>
                    Reschedule
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleCancelAppointment(appointment.id)} className="text-red-600">
                    Cancel
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      ))}

      {appointments.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">You have no upcoming appointments.</p>
          <Button className="mt-4">Schedule an Appointment</Button>
        </div>
      )}
    </div>
  )
}
