"use client"

import { useState } from "react"
import { Search, Filter, Clock, Star, ArrowRight, Navigation } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PatientNearbyHospitals } from "@/components/patient/patient-nearby-hospitals"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { HospitalMap } from "@/components/map/hospital-map"

export default function HospitalsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedHospital, setSelectedHospital] = useState<string | null>(null)
  const [mapView, setMapView] = useState(true)
  const [distance, setDistance] = useState([5])
  const [filterType, setFilterType] = useState<string>("all")

  const handleScheduleAppointment = () => {
    toast({
      title: "Appointment scheduled",
      description: "Your appointment has been scheduled successfully.",
    })
  }

  const handleGetDirections = () => {
    toast({
      title: "Directions loaded",
      description: "Turn-by-turn directions to your destination are ready.",
    })
  }

  return (
    <div className="container py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Find Hospitals & Care Centers</h1>
        <p className="text-muted-foreground">Locate hospitals, clinics, pharmacies, and equipment providers near you</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className={mapView ? "hidden md:block md:w-1/3" : "w-full md:w-1/2"}>
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Healthcare Facilities</CardTitle>
                  <CardDescription>Find facilities in your area</CardDescription>
                </div>
                <Button variant={mapView ? "default" : "outline"} onClick={() => setMapView(!mapView)}>
                  {mapView ? "Hide Map" : "Show Map"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search hospitals, clinics..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Filter Options</h4>
                        <p className="text-sm text-muted-foreground">Refine your search results</p>
                      </div>

                      <div className="space-y-2">
                        <Label>Distance (miles)</Label>
                        <Slider defaultValue={[5]} max={20} step={1} value={distance} onValueChange={setDistance} />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>0 mi</span>
                          <span>{distance[0]} mi</span>
                          <span>20 mi</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Facility Type</Label>
                        <Select value={filterType} onValueChange={setFilterType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Facilities</SelectItem>
                            <SelectItem value="hospitals">Hospitals Only</SelectItem>
                            <SelectItem value="pharmacies">Pharmacies Only</SelectItem>
                            <SelectItem value="equipment">Equipment Providers</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Services</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="emergency" />
                            <label htmlFor="emergency" className="text-sm">
                              Emergency Care
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="pediatric" />
                            <label htmlFor="pediatric" className="text-sm">
                              Pediatric
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="cardiology" />
                            <label htmlFor="cardiology" className="text-sm">
                              Cardiology
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="orthopedics" />
                            <label htmlFor="orthopedics" className="text-sm">
                              Orthopedics
                            </label>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full">Apply Filters</Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <PatientNearbyHospitals
                filterType={filterType === "all" ? undefined : filterType}
                onSelectHospital={setSelectedHospital}
                selectedHospital={selectedHospital}
              />
            </CardContent>
          </Card>
        </div>

        <div className={mapView ? "w-full md:w-2/3" : "w-full md:w-1/2"}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Healthcare Facilities Map</CardTitle>
              <CardDescription>Interactive map with OpenStreetMap integration</CardDescription>
            </CardHeader>
            <CardContent className="p-0 h-[600px]">
              <div className="h-full w-full">
                <HospitalMap selectedHospital={selectedHospital} onSelectHospital={setSelectedHospital} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {selectedHospital && (
        <Card className="mt-6">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <CardTitle>Lilavati Hospital</CardTitle>
                <CardDescription>Multi-Specialty Hospital</CardDescription>
                <div className="flex items-center mt-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-muted-foreground">4.2 (128 reviews)</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleScheduleAppointment}>Schedule Appointment</Button>
                <Button variant="outline" onClick={handleGetDirections}>
                  <Navigation className="mr-2 h-4 w-4" />
                  Directions
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Address</h3>
                  <p className="text-sm text-muted-foreground">
                    A-791, Bandra Reclamation, Bandra West, Mumbai, Maharashtra 400050
                  </p>
                  <Button variant="link" className="p-0 h-auto text-sm mt-1">
                    Get Directions
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Phone</h3>
                  <p className="text-sm text-muted-foreground">+91 22 2675 1000</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Hours</h3>
                  <p className="text-sm text-muted-foreground">Open 24 hours</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Services</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline">Emergency Care</Badge>
                    <Badge variant="outline">Surgery</Badge>
                    <Badge variant="outline">Cardiology</Badge>
                    <Badge variant="outline">Neurology</Badge>
                    <Badge variant="outline">Pediatrics</Badge>
                    <Badge variant="outline">Oncology</Badge>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Insurance</h3>
                  <p className="text-sm text-muted-foreground">Accepts most major insurance plans</p>
                  <Button variant="link" className="p-0 h-auto text-sm mt-1">
                    View All Accepted Plans
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Current Wait Times</h3>
                  <div className="space-y-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Emergency Room</span>
                      <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
                        <Clock className="mr-1 h-3 w-3" />
                        30 min
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Urgent Care</span>
                      <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                        <Clock className="mr-1 h-3 w-3" />
                        15 min
                      </Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Bed Availability</h3>
                  <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                    High Availability
                  </Badge>
                </div>
                <div className="pt-2">
                  <Button className="w-full">View Hospital Details</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
