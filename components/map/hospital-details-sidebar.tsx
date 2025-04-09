"use client"

import { useState } from "react"
import { Phone, MapPin, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function HospitalDetailsSidebar() {
  const [selectedHospital] = useState({
    id: "hosp-1",
    name: "Memorial General Hospital",
    type: "Level I Trauma Center",
    address: "1234 Medical Center Blvd, Los Angeles, CA 90033",
    phone: "(213) 555-1234",
    bedCapacity: 78,
    icuAvailable: 2,
    erStatus: "high",
    specialties: ["Trauma", "Cardiac", "Neurology", "Orthopedics"],
    resources: {
      ventilators: { total: 25, available: 7 },
      ivPumps: { total: 180, available: 38 },
      isolationRooms: { total: 20, available: 4 },
      surgicalSuites: { total: 12, available: 3 }
    }
  })
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "diverting":
        return <Badge variant="destructive">Diverting</Badge>
      case "high":
        return <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">High Volume</Badge>
      case "normal":
        return <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">Normal</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{selectedHospital.name}</CardTitle>
            <CardDescription>{selectedHospital.type}</CardDescription>
          </div>
          {getStatusBadge(selectedHospital.erStatus)}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{selectedHospital.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{selectedHospital.phone}</span>
          </div>
        </div>
        
        <Tabs defaultValue="capacity">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="capacity">Capacity</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
          </TabsList>
          
          <TabsContent value="capacity" className="space-y-4 pt-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">General Beds</span>
                <span className="text-sm">{selectedHospital.bedCapacity}% Occupied</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    selectedHospital.bedCapacity > 90 ? "bg-red-500" : 
                    selectedHospital.bedCapacity > 70 ? "bg-amber-500" : 
                    "bg-green-500"
                  }`} 
                  style={{ width: `${selectedHospital.bedCapacity}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">ICU Beds</span>
                <span className="text-sm">{selectedHospital.icuAvailable} Available</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    selectedHospital.icuAvailable < 3 ? "bg-red-500" : 
                    selectedHospital.icuAvailable < 6 ? "bg-amber-500" : 
                    "bg-green-500"
                  }`} 
                  style={{ width: `${(selectedHospital.icuAvailable / 10) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">ER Status</span>
                <span className="text-sm">{getStatusBadge(selectedHospital.erStatus)}</span>
              </div>
            </div>
            
            <div className="rounded-md border p-3">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-medium">Capacity Alert</span>
              </div>
              <p className="text-xs text-muted-foreground">
                This hospital is experiencing high patient volume. Consider alternative facilities for non-critical cases.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="resources" className="space-y-4 pt-4">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Ventilators</span>
                  <span className="text-sm">{selectedHospital.resources.ventilators.available}/{selectedHospital.resources.ventilators.total} Available</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-blue-500" 
                    style={{ width: `${(selectedHospital.resources.ventilators.available / selectedHospital.resources.ventilators.total) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">IV Pumps</span>
                  <span className="text-sm">{selectedHospital.resources.ivPumps.available}/{selectedHospital.resources.ivPumps.total} Available</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-blue-500" 
                    style={{ width: `${(selectedHospital.resources.ivPumps.available / selectedHospital.resources.ivPumps.total) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Isolation Rooms</span>
                  <span className="text-sm">{selectedHospital.resources.isolationRooms.available}/{selectedHospital.resources.isolationRooms.total} Available</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-blue-500" 
                    style={{ width: `${(selectedHospital.resources.isolationRooms.available / selectedHospital.resources.isolationRooms.total) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Surgical Suites</span>
                  <span className="text-sm">{selectedHospital.resources.surgicalSuites.available}/{selectedHospital.resources.surgicalSuites.total} Available</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-blue-500" 
                    style={{ width: `${(selectedHospital.resources.surgicalSuites.available / selectedHospital.resources.surgicalSuites.total) * 100}%` }}
                  ></div>
                </div\
