"use client"

import { useState } from "react"
import { Calendar, Clock, MapPin, MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

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

  const [viewDetailsDialogOpen, setViewDetailsDialogOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)

  const handleViewDetails = (appointment: any) => {
    setSelectedAppointment(appointment)
    setViewDetailsDialogOpen(true)
  }

  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [appointmentToCancel, setAppointmentToCancel] = useState<string | null>(null)
  const [rescheduleDialogOpen, setRescheduleDialogOpen] = useState(false)
  const [appointmentToReschedule, setAppointmentToReschedule] = useState<string | null>(null)

  const handleCancelAppointment = () => {
    if (appointmentToCancel) {
      setAppointments(appointments.filter((apt) => apt.id !== appointmentToCancel))
      toast({
        title: "Appointment cancelled",
        description: "Your appointment has been cancelled successfully.",
      })
      setCancelDialogOpen(false)
      setAppointmentToCancel(null)
    }
  }

  const openCancelDialog = (id: string) => {
    setAppointmentToCancel(id)
    setCancelDialogOpen(true)
  }

  const handleRescheduleAppointment = () => {
    if (appointmentToReschedule) {
      // In a real app, this would open a rescheduling form
      // For now, we'll just show a toast
      toast({
        title: "Reschedule requested",
        description: "A request to reschedule your appointment has been sent.",
      })
      setRescheduleDialogOpen(false)
      setAppointmentToReschedule(null)
    }
  }

  const openRescheduleDialog = (id: string) => {
    setAppointmentToReschedule(id)
    setRescheduleDialogOpen(true)
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
        <div key={appointment.id} className="rounded-lg border p-4 hover:shadow-sm transition-shadow">
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
              <Button size="sm" variant="outline" onClick={() => handleViewDetails(appointment)}>
                View Details
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => openRescheduleDialog(appointment.id)}>Reschedule</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => openCancelDialog(appointment.id)} className="text-red-600">
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

      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this appointment? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, keep appointment</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancelAppointment} className="bg-red-600 hover:bg-red-700">
              Yes, cancel appointment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reschedule Confirmation Dialog */}
      <AlertDialog open={rescheduleDialogOpen} onOpenChange={setRescheduleDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reschedule Appointment</AlertDialogTitle>
            <AlertDialogDescription>
              Would you like to request rescheduling this appointment? Our staff will contact you to confirm a new time.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRescheduleAppointment} className="bg-blue-600 hover:bg-blue-700">
              Request Reschedule
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* View Details Dialog */}
      <Dialog open={viewDetailsDialogOpen} onOpenChange={setViewDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogDescription>Detailed information about your appointment</DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-4 py-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Status:</span>
                {getStatusBadge(selectedAppointment.status)}
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Provider Information</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-muted-foreground">Doctor:</span>
                  <span>{selectedAppointment.doctor}</span>
                  <span className="text-muted-foreground">Specialty:</span>
                  <span>{selectedAppointment.specialty}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Appointment Time</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-muted-foreground">Date:</span>
                  <span>{selectedAppointment.date}</span>
                  <span className="text-muted-foreground">Time:</span>
                  <span>{selectedAppointment.time}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Location</h3>
                <div className="text-sm">
                  <p>{selectedAppointment.location}</p>
                  <p>1234 Medical Center Blvd</p>
                  <p>Los Angeles, CA 90033</p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Appointment Notes</h3>
                <p className="text-sm text-muted-foreground">
                  Follow-up appointment for regular check-up and medication review.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Preparation</h3>
                <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                  <li>Bring current medications</li>
                  <li>Bring insurance card</li>
                  <li>Arrive 15 minutes early to complete paperwork</li>
                </ul>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDetailsDialogOpen(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                setViewDetailsDialogOpen(false)
                openRescheduleDialog(selectedAppointment?.id || "")
              }}
            >
              Reschedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
