"use client"

import { useState } from "react"
import { MapPin, Phone, Clock, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PatientNearbyHospitalsProps {
  filterType?: string
  onSelectHospital?: (id: string) => void
  selectedHospital?: string | null
}

export function PatientNearbyHospitals({
  filterType,
  onSelectHospital,
  selectedHospital,
}: PatientNearbyHospitalsProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const userZipCode = user.zipCode || "12345"

  // Simulated nearby hospitals based on user's ZIP code
  const [hospitals] = useState([
    {
      id: "hosp-1",
      name: "Memorial General Hospital",
      type: "Level I Trauma Center",
      category: "hospital",
      address: "1234 Medical Center Blvd, Los Angeles, CA 90033",
      phone: "(213) 555-1234",
      distance: "1.2 miles",
      waitTime: "15 min",
      bedAvailability: "High",
      zipCode: "12345",
    },
    {
      id: "hosp-2",
      name: "University Medical Center",
      type: "Academic Medical Center",
      category: "hospital",
      address: "5678 University Ave, Los Angeles, CA 90007",
      phone: "(213) 555-5678",
      distance: "2.8 miles",
      waitTime: "30 min",
      bedAvailability: "Medium",
      zipCode: "12345",
    },
    {
      id: "hosp-3",
      name: "Riverside Community Hospital",
      type: "Community Hospital",
      category: "hospital",
      address: "910 Riverside Dr, Riverside, CA 92501",
      phone: "(951) 555-9101",
      distance: "5.4 miles",
      waitTime: "45 min",
      bedAvailability: "Low",
      zipCode: "23456",
    },
    {
      id: "clinic-1",
      name: "Downtown Medical Clinic",
      type: "Primary Care Clinic",
      category: "clinic",
      address: "789 Main St, Los Angeles, CA 90014",
      phone: "(213) 555-7890",
      distance: "0.8 miles",
      waitTime: "10 min",
      bedAvailability: "High",
      zipCode: "12345",
    },
    {
      id: "spec-1",
      name: "Heart & Vascular Institute",
      type: "Cardiology Center",
      category: "specialty",
      address: "456 Specialist Blvd, Los Angeles, CA 90021",
      phone: "(213) 555-4567",
      distance: "2.1 miles",
      waitTime: "25 min",
      bedAvailability: "Medium",
      zipCode: "12345",
    },
  ])

  // Filter hospitals by user's ZIP code and optional filter type
  const filteredHospitals = hospitals.filter((hospital) => {
    if (hospital.zipCode !== userZipCode) return false
    if (filterType && hospital.category !== filterType) return false
    return true
  })

  const handleScheduleAppointment = (hospitalId: string) => {
    toast({
      title: "Appointment scheduling initiated",
      description: "You're being redirected to the appointment scheduling page.",
    })
  }

  const getBedAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case "High":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
            High Availability
          </Badge>
        )
      case "Medium":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
            Medium Availability
          </Badge>
        )
      case "Low":
        return (
          <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
            Low Availability
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-4">
      {filteredHospitals.map((hospital) => (
        <div
          key={hospital.id}
          className={`rounded-lg border p-4 transition-colors ${
            selectedHospital === hospital.id ? "border-primary bg-primary/5" : ""
          }`}
          onClick={() => onSelectHospital && onSelectHospital(hospital.id)}
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {getBedAvailabilityBadge(hospital.bedAvailability)}
                <span className="text-sm font-medium">{hospital.type}</span>
              </div>
              <h4 className="font-medium">{hospital.name}</h4>

              <div className="space-y-2 mt-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{hospital.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-3 w-3" />
                  <span>{hospital.phone}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-3 text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span>{hospital.distance}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span>ER Wait: {hospital.waitTime}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">Schedule Appointment</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Schedule Appointment at {hospital.name}</DialogTitle>
                    <DialogDescription>Fill in the details to schedule your appointment.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="department">Department</Label>
                      <Select>
                        <SelectTrigger id="department">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cardiology">Cardiology</SelectItem>
                          <SelectItem value="dermatology">Dermatology</SelectItem>
                          <SelectItem value="neurology">Neurology</SelectItem>
                          <SelectItem value="orthopedics">Orthopedics</SelectItem>
                          <SelectItem value="primary">Primary Care</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="date">Preferred Date</Label>
                      <Input id="date" type="date" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="reason">Reason for Visit</Label>
                      <Input id="reason" placeholder="Brief description of your visit" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={() => handleScheduleAppointment(hospital.id)}>Schedule Appointment</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button size="sm" variant="outline">
                <MapPin className="mr-2 h-4 w-4" />
                Get Directions
              </Button>
              <Button size="sm" variant="ghost">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Details
              </Button>
            </div>
          </div>
        </div>
      ))}

      {filteredHospitals.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No healthcare facilities found in your area (ZIP: {userZipCode}).</p>
          <Button className="mt-4">Search Other Areas</Button>
        </div>
      )}
    </div>
  )
}
