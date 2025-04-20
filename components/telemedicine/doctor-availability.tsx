"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function DoctorAvailability() {
  // Mock data for available doctors
  const availableDoctors = [
    {
      id: "dr-smith",
      name: "Dr. John Smith",
      specialty: "Primary Care",
      image: "/placeholder.svg?height=40&width=40",
      waitTime: "5 min",
      status: "available",
    },
    {
      id: "dr-patel",
      name: "Dr. Priya Patel",
      specialty: "Pediatrics",
      image: "/placeholder.svg?height=40&width=40",
      waitTime: "10 min",
      status: "available",
    },
    {
      id: "dr-wong",
      name: "Dr. David Wong",
      specialty: "Psychiatry",
      image: "/placeholder.svg?height=40&width=40",
      waitTime: "15 min",
      status: "available",
    },
  ]

  return (
    <div className="space-y-4">
      {availableDoctors.map((doctor) => (
        <div key={doctor.id} className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={doctor.image || "/placeholder.svg"} alt={doctor.name} />
            <AvatarFallback>{doctor.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium">{doctor.name}</p>
            <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
          </div>
          <div className="flex flex-col items-end">
            <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50 mb-1">
              {doctor.waitTime} wait
            </Badge>
            <Button size="sm" variant="outline">
              Connect
            </Button>
          </div>
        </div>
      ))}

      {availableDoctors.length === 0 && (
        <p className="text-center text-muted-foreground py-4">No doctors available right now.</p>
      )}
    </div>
  )
}
