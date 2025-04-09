"use client"

import { useState } from "react"
import { Search, Filter, Phone, Clock, Star, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { PatientNearbyHospitals } from "@/components/patient/patient-nearby-hospitals"
import { PatientHospitalMap } from "@/components/patient/patient-hospital-map"
import { useAuth } from "@/components/auth-provider"

export default function HospitalsPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedHospital, setSelectedHospital] = useState<string | null>(null)
  const [mapView, setMapView] = useState(false)

  return (
    <div className="container py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Find Hospitals & Care Centers</h1>
        <p className="text-muted-foreground">Locate hospitals, clinics, and specialized care centers near you</p>
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
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>

              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="hospitals">Hospitals</TabsTrigger>
                  <TabsTrigger value="clinics">Clinics</TabsTrigger>
                  <TabsTrigger value="specialty">Specialty Centers</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                  <PatientNearbyHospitals onSelectHospital={setSelectedHospital} selectedHospital={selectedHospital} />
                </TabsContent>

                <TabsContent value="hospitals">
                  <PatientNearbyHospitals
                    filterType="hospital"
                    onSelectHospital={setSelectedHospital}
                    selectedHospital={selectedHospital}
                  />
                </TabsContent>

                <TabsContent value="clinics">
                  <PatientNearbyHospitals
                    filterType="clinic"
                    onSelectHospital={setSelectedHospital}
                    selectedHospital={selectedHospital}
                  />
                </TabsContent>

                <TabsContent value="specialty">
                  <PatientNearbyHospitals
                    filterType="specialty"
                    onSelectHospital={setSelectedHospital}
                    selectedHospital={selectedHospital}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className={mapView ? "w-full md:w-2/3" : "w-full md:w-1/2"}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Hospital Map</CardTitle>
              <CardDescription>Interactive map of healthcare facilities</CardDescription>
            </CardHeader>
            <CardContent className="p-0 h-[600px]">
              <PatientHospitalMap selectedHospital={selectedHospital} onSelectHospital={setSelectedHospital} />
            </CardContent>
          </Card>
        </div>
      </div>

      {selectedHospital && (
        <Card className="mt-6">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <CardTitle>Memorial General Hospital</CardTitle>
                <CardDescription>Level I Trauma Center</CardDescription>
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
                <Button>Schedule Appointment</Button>
                <Button variant="outline">
                  <Phone className="mr-2 h-4 w-4" />
                  Call
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Address</h3>
                  <p className="text-sm text-muted-foreground">1234 Medical Center Blvd, Los Angeles, CA 90033</p>
                  <Button variant="link" className="p-0 h-auto text-sm mt-1">
                    Get Directions
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Phone</h3>
                  <p className="text-sm text-muted-foreground">(213) 555-1234</p>
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
