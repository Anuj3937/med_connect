"use client"

import { useEffect, useState, useRef } from "react"
import { useAuth } from "@/components/auth-provider"
import { Loader2 } from "lucide-react"

// This component would integrate with a mapping library like Leaflet or Google Maps
// For this example, we'll create a placeholder that simulates the functionality

interface Hospital {
  id: string
  name: string
  type: string
  address: string
  phone: string
  distance: string
  waitTime: string
  bedAvailability: string
  zipCode: string
  lat: number
  lng: number
}

interface PatientHospitalMapProps {
  selectedHospital: string | null
  onSelectHospital: (id: string) => void
}

export function PatientHospitalMap({ selectedHospital, onSelectHospital }: PatientHospitalMapProps) {
  const { user } = useAuth()
  const userZipCode = user.zipCode || "12345"
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Simulated hospital data with coordinates
  const [hospitals] = useState<Hospital[]>([
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
      lat: 34.052235,
      lng: -118.243683,
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
      lat: 34.056235,
      lng: -118.253683,
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
      lat: 34.062235,
      lng: -118.263683,
    },
  ])

  useEffect(() => {
    // Simulate loading the map
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Filter hospitals by user's ZIP code
  const nearbyHospitals = hospitals.filter((hospital) => hospital.zipCode === userZipCode)

  // In a real implementation, this would initialize the map library
  useEffect(() => {
    if (!isLoading && mapRef.current) {
      // This would be where you initialize the map library
      console.log("Map initialized")
    }
  }, [isLoading])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full bg-muted/20">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="text-sm text-muted-foreground">Loading map...</span>
        </div>
      </div>
    )
  }

  return (
    <div ref={mapRef} className="relative w-full h-full bg-slate-100">
      {/* This would be replaced with an actual map component */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-2">Interactive hospital map would render here</p>
          <p className="text-xs text-muted-foreground">(Integration point for map visualization library)</p>
        </div>
      </div>

      {/* Simulated hospital markers */}
      {nearbyHospitals.map((hospital) => (
        <div
          key={hospital.id}
          className={`absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all ${
            selectedHospital === hospital.id ? "z-10 scale-125" : "z-0"
          }`}
          style={{
            left: `${((hospital.lng + 118.27) / 0.05) * 100}%`,
            top: `${((34.07 - hospital.lat) / 0.05) * 100}%`,
          }}
          onClick={() => onSelectHospital(hospital.id)}
        >
          <div
            className={`w-full h-full rounded-full flex items-center justify-center ${
              selectedHospital === hospital.id
                ? "bg-primary text-primary-foreground"
                : hospital.bedAvailability === "High"
                  ? "bg-green-500 text-white"
                  : hospital.bedAvailability === "Medium"
                    ? "bg-amber-500 text-white"
                    : "bg-red-500 text-white"
            }`}
          >
            <span className="text-xs font-bold">H</span>
          </div>
          {selectedHospital === hospital.id && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white p-2 rounded shadow-lg z-20 w-48">
              <p className="font-medium text-sm">{hospital.name}</p>
              <p className="text-xs text-muted-foreground">{hospital.type}</p>
              <p className="text-xs mt-1">Wait time: {hospital.waitTime}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
