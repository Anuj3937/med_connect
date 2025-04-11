"use client"

import { useEffect, useState, useRef } from "react"
import { useAuth } from "@/components/auth-provider"
import { Loader2, Navigation, MapPin, Pill, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// For a real implementation, we would use the actual Leaflet library
// This is a simulation for demonstration purposes
interface MapLocation {
  id: string
  name: string
  type: "hospital" | "pharmacy" | "equipment"
  address: string
  phone: string
  lat: number
  lng: number
  distance?: string
  waitTime?: string
  bedAvailability?: string
  openHours?: string
}

interface PatientHospitalMapProps {
  selectedHospital: string | null
  onSelectHospital: (id: string) => void
}

export function PatientHospitalMap({ selectedHospital, onSelectHospital }: PatientHospitalMapProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const userZipCode = user.zipCode || "12345"
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showRoute, setShowRoute] = useState(false)
  const [locationType, setLocationType] = useState<string>("hospitals")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  // Simulated location data with coordinates
  const [locations, setLocations] = useState<MapLocation[]>([
    // Hospitals
    {
      id: "hosp-1",
      name: "Memorial General Hospital",
      type: "hospital",
      address: "1234 Medical Center Blvd, Los Angeles, CA 90033",
      phone: "(213) 555-1234",
      distance: "1.2 miles",
      waitTime: "15 min",
      bedAvailability: "High",
      lat: 34.052235,
      lng: -118.243683,
    },
    {
      id: "hosp-2",
      name: "University Medical Center",
      type: "hospital",
      address: "5678 University Ave, Los Angeles, CA 90007",
      phone: "(213) 555-5678",
      distance: "2.8 miles",
      waitTime: "30 min",
      bedAvailability: "Medium",
      lat: 34.056235,
      lng: -118.253683,
    },
    {
      id: "hosp-3",
      name: "Riverside Community Hospital",
      type: "hospital",
      address: "910 Riverside Dr, Riverside, CA 92501",
      phone: "(951) 555-9101",
      distance: "5.4 miles",
      waitTime: "45 min",
      bedAvailability: "Low",
      lat: 34.062235,
      lng: -118.263683,
    },
    // Pharmacies
    {
      id: "pharm-1",
      name: "MediCare Pharmacy",
      type: "pharmacy",
      address: "123 Health St, Los Angeles, CA 90033",
      phone: "(213) 555-2345",
      openHours: "8:00 AM - 10:00 PM",
      lat: 34.053235,
      lng: -118.245683,
    },
    {
      id: "pharm-2",
      name: "Community Rx",
      type: "pharmacy",
      address: "456 Wellness Ave, Los Angeles, CA 90007",
      phone: "(213) 555-3456",
      openHours: "24 hours",
      lat: 34.057235,
      lng: -118.255683,
    },
    // Equipment Providers
    {
      id: "equip-1",
      name: "MediSupply Equipment",
      type: "equipment",
      address: "789 Device Blvd, Los Angeles, CA 90033",
      phone: "(213) 555-4567",
      openHours: "9:00 AM - 6:00 PM",
      lat: 34.054235,
      lng: -118.247683,
    },
    {
      id: "equip-2",
      name: "Healthcare Equipment Solutions",
      type: "equipment",
      address: "321 Support St, Los Angeles, CA 90007",
      phone: "(213) 555-5678",
      openHours: "8:00 AM - 7:00 PM",
      lat: 34.058235,
      lng: -118.257683,
    },
  ])

  useEffect(() => {
    // Simulate loading the map and getting user location
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Simulate getting user location
      setUserLocation({
        lat: 34.050235,
        lng: -118.240683,
      })
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Filter locations by type
  const filteredLocations = locations.filter((location) => {
    if (locationType === "hospitals") return location.type === "hospital"
    if (locationType === "pharmacies") return location.type === "pharmacy"
    if (locationType === "equipment") return location.type === "equipment"
    return true
  })

  const handleGetDirections = (locationId: string) => {
    setShowRoute(true)
    toast({
      title: "Directions loaded",
      description: "Turn-by-turn directions to your destination are ready.",
    })
  }

  const getLocationIcon = (type: string) => {
    switch (type) {
      case "hospital":
        return <MapPin className="h-4 w-4 text-white" />
      case "pharmacy":
        return <Pill className="h-4 w-4 text-white" />
      case "equipment":
        return <Package className="h-4 w-4 text-white" />
      default:
        return <MapPin className="h-4 w-4 text-white" />
    }
  }

  const getLocationColor = (type: string, bedAvailability?: string) => {
    if (type === "hospital") {
      if (bedAvailability === "High") return "bg-green-500"
      if (bedAvailability === "Medium") return "bg-amber-500"
      if (bedAvailability === "Low") return "bg-red-500"
      return "bg-blue-500"
    }
    if (type === "pharmacy") return "bg-purple-500"
    if (type === "equipment") return "bg-teal-500"
    return "bg-gray-500"
  }

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
    <div className="flex flex-col h-full">
      <div className="p-2 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Select value={locationType} onValueChange={setLocationType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Show on map" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hospitals">Hospitals</SelectItem>
              <SelectItem value="pharmacies">Pharmacies</SelectItem>
              <SelectItem value="equipment">Equipment Providers</SelectItem>
              <SelectItem value="all">Show All</SelectItem>
            </SelectContent>
          </Select>

          {userLocation && (
            <Badge variant="outline" className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>Your Location</span>
            </Badge>
          )}
        </div>

        {selectedHospital && (
          <Button
            size="sm"
            variant={showRoute ? "default" : "outline"}
            onClick={() => handleGetDirections(selectedHospital)}
          >
            <Navigation className="mr-2 h-4 w-4" />
            {showRoute ? "Hide Route" : "Get Directions"}
          </Button>
        )}
      </div>

      <div ref={mapRef} className="relative flex-1 w-full h-full">
        {/* Simulated OpenStreetMap */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Map tiles background */}
          <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
            {Array.from({ length: 64 }).map((_, i) => (
              <div
                key={i}
                className="border border-gray-200 bg-gray-50"
                style={{
                  backgroundImage: "url('/placeholder.svg?height=100&width=100')",
                  backgroundSize: "cover",
                  opacity: 0.7,
                }}
              ></div>
            ))}
          </div>

          {/* Map features */}
          <div className="absolute inset-0">
            {/* Roads */}
            <div className="absolute top-1/4 left-0 right-0 h-1 bg-gray-400"></div>
            <div className="absolute top-2/4 left-0 right-0 h-2 bg-gray-500"></div>
            <div className="absolute top-3/4 left-0 right-0 h-1 bg-gray-400"></div>
            <div className="absolute left-1/4 top-0 bottom-0 w-1 bg-gray-400"></div>
            <div className="absolute left-2/4 top-0 bottom-0 w-2 bg-gray-500"></div>
            <div className="absolute left-3/4 top-0 bottom-0 w-1 bg-gray-400"></div>

            {/* Parks/Green areas */}
            <div className="absolute top-1/8 left-1/8 w-1/4 h-1/4 bg-green-200 rounded-full opacity-60"></div>
            <div className="absolute bottom-1/8 right-1/8 w-1/5 h-1/5 bg-green-200 rounded-full opacity-60"></div>

            {/* Water */}
            <div className="absolute bottom-1/4 left-1/4 w-1/4 h-1/6 bg-blue-200 rounded-lg opacity-60"></div>
          </div>

          {/* Map attribution */}
          <div className="absolute bottom-1 right-1 bg-white bg-opacity-70 text-xs p-1 rounded">
            © OpenStreetMap contributors
          </div>
        </div>

        {/* User location marker */}
        {userLocation && (
          <div
            className="absolute w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 z-20"
            style={{
              left: `${((userLocation.lng + 118.27) / 0.05) * 100}%`,
              top: `${((34.07 - userLocation.lat) / 0.05) * 100}%`,
            }}
          >
            <div className="w-full h-full rounded-full bg-blue-600 border-2 border-white flex items-center justify-center animate-pulse">
              <span className="text-xs font-bold text-white">You</span>
            </div>
          </div>
        )}

        {/* Route line (simulated) */}
        {showRoute && selectedHospital && userLocation && (
          <div
            className="absolute z-10"
            style={{
              left: `${((userLocation.lng + 118.27) / 0.05) * 100}%`,
              top: `${((34.07 - userLocation.lat) / 0.05) * 100}%`,
              width: "100px",
              height: "2px",
              background: "blue",
              transform: "rotate(45deg)",
              transformOrigin: "0 0",
            }}
          ></div>
        )}

        {/* Location markers */}
        {filteredLocations.map((location) => (
          <div
            key={location.id}
            className={`absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all ${
              selectedHospital === location.id ? "z-10 scale-125" : "z-0"
            }`}
            style={{
              left: `${((location.lng + 118.27) / 0.05) * 100}%`,
              top: `${((34.07 - location.lat) / 0.05) * 100}%`,
            }}
            onClick={() => onSelectHospital(location.id)}
          >
            <div
              className={`w-full h-full rounded-full flex items-center justify-center ${
                selectedHospital === location.id
                  ? "bg-primary text-primary-foreground"
                  : getLocationColor(location.type, location.bedAvailability)
              }`}
            >
              {getLocationIcon(location.type)}
            </div>
            {selectedHospital === location.id && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white p-2 rounded shadow-lg z-20 w-48">
                <p className="font-medium text-sm">{location.name}</p>
                <p className="text-xs text-muted-foreground">
                  {location.type === "hospital"
                    ? "Hospital"
                    : location.type === "pharmacy"
                      ? "Pharmacy"
                      : "Equipment Provider"}
                </p>
                {location.waitTime && <p className="text-xs mt-1">Wait time: {location.waitTime}</p>}
                {location.openHours && <p className="text-xs mt-1">Hours: {location.openHours}</p>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
