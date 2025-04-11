"use client"

import { useState } from "react"
import { MapPin, Phone, Clock, ExternalLink, Navigation, Pill, Package, Star } from "lucide-react"
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Location {
  id: string
  name: string
  type: string
  category: "hospital" | "pharmacy" | "equipment"
  address: string
  phone: string
  distance: string
  waitTime?: string
  bedAvailability?: string
  openHours?: string
  zipCode: string
  rating?: number
  services?: string[]
}

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
  const [activeTab, setActiveTab] = useState<string>("all")

  // Simulated nearby locations based on user's ZIP code
  const [locations] = useState<Location[]>([
    // Hospitals
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
      rating: 4.2,
      services: ["Emergency Care", "Surgery", "Cardiology", "Neurology", "Pediatrics"],
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
      rating: 4.5,
      services: ["Emergency Care", "Oncology", "Orthopedics", "Radiology", "Research"],
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
      rating: 3.8,
      services: ["Emergency Care", "Primary Care", "Maternity", "Geriatrics"],
    },
    // Pharmacies
    {
      id: "pharm-1",
      name: "MediCare Pharmacy",
      type: "24-Hour Pharmacy",
      category: "pharmacy",
      address: "123 Health St, Los Angeles, CA 90033",
      phone: "(213) 555-2345",
      distance: "0.8 miles",
      openHours: "24 hours",
      zipCode: "12345",
      rating: 4.0,
      services: ["Prescription Filling", "Vaccinations", "Health Consultations", "Medical Supplies"],
    },
    {
      id: "pharm-2",
      name: "Community Rx",
      type: "Retail Pharmacy",
      category: "pharmacy",
      address: "456 Wellness Ave, Los Angeles, CA 90007",
      phone: "(213) 555-3456",
      distance: "1.5 miles",
      openHours: "8:00 AM - 10:00 PM",
      zipCode: "12345",
      rating: 4.3,
      services: ["Prescription Filling", "OTC Medications", "Health Screenings", "Delivery"],
    },
    // Equipment Providers
    {
      id: "equip-1",
      name: "MediSupply Equipment",
      type: "Medical Equipment Provider",
      category: "equipment",
      address: "789 Device Blvd, Los Angeles, CA 90033",
      phone: "(213) 555-4567",
      distance: "1.2 miles",
      openHours: "9:00 AM - 6:00 PM",
      zipCode: "12345",
      rating: 4.1,
      services: ["Mobility Aids", "Home Medical Equipment", "Respiratory Equipment", "Rentals"],
    },
    {
      id: "equip-2",
      name: "Healthcare Equipment Solutions",
      type: "Specialized Equipment Provider",
      category: "equipment",
      address: "321 Support St, Los Angeles, CA 90007",
      phone: "(213) 555-5678",
      distance: "2.3 miles",
      openHours: "8:00 AM - 7:00 PM",
      zipCode: "12345",
      rating: 3.9,
      services: ["Hospital Beds", "Lift Chairs", "Wound Care Supplies", "Custom Equipment"],
    },
  ])

  // Filter locations by user's ZIP code, optional filter type, and active tab
  const filteredLocations = locations.filter((location) => {
    if (location.zipCode !== userZipCode) return false
    if (filterType && location.category !== filterType) return false
    if (activeTab === "hospitals" && location.category !== "hospital") return false
    if (activeTab === "pharmacies" && location.category !== "pharmacy") return false
    if (activeTab === "equipment" && location.category !== "equipment") return false
    return true
  })

  const handleScheduleAppointment = (locationId: string) => {
    toast({
      title: "Appointment scheduling initiated",
      description: "You're being redirected to the appointment scheduling page.",
    })
  }

  const handleGetDirections = (locationId: string) => {
    toast({
      title: "Getting directions",
      description: "Opening map with directions to the selected location.",
    })
    // In a real app, this would navigate to the map view with directions
    if (onSelectHospital) {
      onSelectHospital(locationId)
    }
  }

  const getBedAvailabilityBadge = (availability?: string) => {
    if (!availability) return null
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

  const getLocationIcon = (category: string) => {
    switch (category) {
      case "hospital":
        return <MapPin className="h-4 w-4 text-blue-600" />
      case "pharmacy":
        return <Pill className="h-4 w-4 text-purple-600" />
      case "equipment":
        return <Package className="h-4 w-4 text-teal-600" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="hospitals">Hospitals</TabsTrigger>
          <TabsTrigger value="pharmacies">Pharmacies</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
        </TabsList>
      </Tabs>

      {filteredLocations.map((location) => (
        <div
          key={location.id}
          className={`rounded-lg border p-4 transition-colors ${
            selectedHospital === location.id ? "border-primary bg-primary/5" : ""
          }`}
          onClick={() => onSelectHospital && onSelectHospital(location.id)}
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {getLocationIcon(location.category)}
                <span className="text-sm font-medium">{location.type}</span>
                {location.bedAvailability && getBedAvailabilityBadge(location.bedAvailability)}
              </div>
              <h4 className="font-medium">{location.name}</h4>

              {location.rating && (
                <div className="flex items-center mt-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < Math.floor(location.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-xs text-muted-foreground">{location.rating}</span>
                </div>
              )}

              <div className="space-y-2 mt-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{location.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-3 w-3" />
                  <span>{location.phone}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-3 text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span>{location.distance}</span>
                </div>
                {location.waitTime && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span>Wait: {location.waitTime}</span>
                  </div>
                )}
                {location.openHours && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span>Hours: {location.openHours}</span>
                  </div>
                )}
              </div>

              {location.services && location.services.length > 0 && (
                <div className="mt-3">
                  <div className="flex flex-wrap gap-1 mt-1">
                    {location.services.slice(0, 3).map((service, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                    {location.services.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{location.services.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              {location.category === "hospital" && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">Schedule Appointment</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Schedule Appointment at {location.name}</DialogTitle>
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
                      <Button onClick={() => handleScheduleAppointment(location.id)}>Schedule Appointment</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}

              <Button size="sm" variant="outline" onClick={() => handleGetDirections(location.id)}>
                <Navigation className="mr-2 h-4 w-4" />
                Get Directions
              </Button>

              <Button size="sm" variant="ghost">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Details
              </Button>

              <Button size="sm" variant="ghost">
                <Phone className="mr-2 h-4 w-4" />
                Call
              </Button>
            </div>
          </div>
        </div>
      ))}

      {filteredLocations.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No healthcare facilities found in your area (ZIP: {userZipCode}).</p>
          <Button className="mt-4">Search Other Areas</Button>
        </div>
      )}
    </div>
  )
}
