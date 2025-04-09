"use client"

import { useState } from "react"
import { MapPin, Phone, Clock, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"

export function PatientNearbyHospitals() {
  const { user } = useAuth()
  const userZipCode = user.zipCode || "12345"

  // Simulated nearby hospitals based on user's ZIP code
  const [hospitals] = useState([
    {
      id: "hosp-1",
      name: "Memorial General Hospital",
      type: "Level I Trauma Center",
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
      address: "910 Riverside Dr, Riverside, CA 92501",
      phone: "(951) 555-9101",
      distance: "5.4 miles",
      waitTime: "45 min",
      bedAvailability: "Low",
      zipCode: "23456",
    },
  ])

  // Filter hospitals by user's ZIP code
  const nearbyHospitals = hospitals.filter((hospital) => hospital.zipCode === userZipCode)

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
      {nearbyHospitals.map((hospital) => (
        <div key={hospital.id} className="rounded-lg border p-4">
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
              <Button size="sm">Schedule Appointment</Button>
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

      {nearbyHospitals.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No hospitals found in your area (ZIP: {userZipCode}).</p>
          <Button className="mt-4">Search Other Areas</Button>
        </div>
      )}
    </div>
  )
}
