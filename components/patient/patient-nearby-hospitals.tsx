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

// Mock data for nearby hospitals in India
const mockHospitals = [
  {
    id: "1",
    name: "Lilavati Hospital",
    type: "hospitals",
    category: "hospital",
    distance: "0.8 miles",
    address: "A-791, Bandra Reclamation, Bandra West, Mumbai, Maharashtra 400050",
    rating: 4.2,
    waitTime: "30 min",
    services: ["Emergency Care", "Surgery", "Cardiology", "Neurology"],
    zipCode: "400050",
    phone: "022 2675 1000",
  },
  {
    id: "2",
    name: "Kokilaben Dhirubhai Ambani Hospital",
    type: "hospitals",
    category: "hospital",
    distance: "1.5 miles",
    address: "Rao Saheb Achutrao Patwardhan Marg, Four Bungalows, Andheri West, Mumbai, Maharashtra 400053",
    rating: 4.5,
    waitTime: "15 min",
    services: ["Emergency Care", "Oncology", "Orthopedics", "Pediatrics"],
    zipCode: "400053",
    phone: "022 3061 7000",
  },
  {
    id: "3",
    name: "Hinduja Hospital",
    type: "hospitals",
    category: "hospital",
    distance: "2.3 miles",
    address: "Veer Savarkar Marg, Mahim West, Mumbai, Maharashtra 400016",
    rating: 4.3,
    waitTime: "45 min",
    services: ["Emergency Care", "Neurology", "Cardiology", "Gastroenterology"],
    zipCode: "400016",
    phone: "022 2444 9199",
  },
  {
    id: "4",
    name: "Apollo Pharmacy",
    type: "pharmacies",
    category: "pharmacy",
    distance: "0.5 miles",
    address: "Shop No. 1, Ground Floor, Bandra West, Mumbai, Maharashtra 400050",
    rating: 4.0,
    waitTime: "5 min",
    services: ["Prescription Drugs", "OTC Medicines", "Medical Supplies"],
    zipCode: "400050",
    phone: "022 2640 0000",
  },
  {
    id: "5",
    name: "MedPlus Pharmacy",
    type: "pharmacies",
    category: "pharmacy",
    distance: "1.2 miles",
    address: "Shop No. 3, Link Road, Andheri West, Mumbai, Maharashtra 400053",
    rating: 3.8,
    waitTime: "10 min",
    services: ["Prescription Drugs", "OTC Medicines", "Health Products"],
    zipCode: "400053",
    phone: "022 2630 0000",
  },
  {
    id: "6",
    name: "Surgical Equipment India",
    type: "equipment",
    category: "equipment",
    distance: "3.1 miles",
    address: "Industrial Area, Andheri East, Mumbai, Maharashtra 400069",
    rating: 4.1,
    waitTime: null,
    services: ["Medical Equipment", "Surgical Supplies", "Hospital Furniture"],
    zipCode: "400069",
    phone: "022 2680 0000",
  },
]

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
  const userZipCode = user.zipCode || "400001"
  const [activeTab, setActiveTab] = useState<string>("all")

  // Simulated nearby locations based on user's ZIP code
  const [locations] = useState<Location[]>(mockHospitals)

  // Filter locations by user's ZIP code, optional filter type, and active tab
  const filteredLocations = locations.filter((location) => {
    // if (location.zipCode !== userZipCode) return false
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
