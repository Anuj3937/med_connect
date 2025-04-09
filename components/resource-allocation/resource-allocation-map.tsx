"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, Circle, useMap } from "react-leaflet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Boxes, TruckIcon, Building, ArrowRight, Clock } from "lucide-react"

// Fix for Leaflet marker icons in Next.js
const FixLeafletIcons = () => {
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/images/marker-icon-2x.png",
      iconUrl: "/images/marker-icon.png",
      shadowUrl: "/images/marker-shadow.png",
    })
  }, [])

  return null
}

// Custom component to handle map initialization
const MapInitializer = () => {
  const map = useMap()

  useEffect(() => {
    // Set initial view to continental US
    map.setView([39.8283, -98.5795], 4)
  }, [map])

  return null
}

export function ResourceAllocationMap() {
  const { theme } = useTheme()
  const mapRef = useRef(null)

  // Map style based on theme
  const mapStyle =
    theme === "dark"
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

  // Create custom icons
  const hospitalIcon = new L.Icon({
    iconUrl:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpath d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z'%3E%3C/path%3E%3Cpath d='M9 12h6'%3E%3C/path%3E%3Cpath d='M12 9v6'%3E%3C/path%3E%3C/svg%3E",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    className: "bg-green-600 rounded-full p-1",
  })

  const resourceIcon = new L.Icon({
    iconUrl:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpath d='M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z'%3E%3C/path%3E%3Cpolyline points='3.29 7 12 12 20.71 7'%3E%3C/polyline%3E%3Cline x1='12' y1='22' x2='12' y2='12'%3E%3C/line%3E%3C/svg%3E",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    className: "bg-blue-600 rounded-full p-1",
  })

  const allocationIcon = new L.Icon({
    iconUrl:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpath d='M12 2L2 7l10 5 10-5-10-5z'%3E%3C/path%3E%3Cpath d='M2 17l10 5 10-5'%3E%3C/path%3E%3Cpath d='M2 12l10 5 10-5'%3E%3C/path%3E%3C/svg%3E",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    className: "bg-purple-600 rounded-full p-1",
  })

  // Sample data for the map
  const locations = [
    {
      type: "hospital",
      name: "Memorial General Hospital",
      position: [34.0522, -118.2437],
      resourceNeeds: ["Respiratory Medications", "Nursing Staff", "Ventilators"],
      icon: hospitalIcon,
      details: "High priority allocation needed due to 25% predicted demand increase",
      priority: "high",
    },
    {
      type: "hospital",
      name: "University Medical Center",
      position: [40.7128, -74.006],
      resourceNeeds: ["Antibiotics", "ICU Beds"],
      icon: hospitalIcon,
      details: "Medium priority allocation based on 15% predicted demand increase",
      priority: "medium",
    },
    {
      type: "hospital",
      name: "Riverside Community Hospital",
      position: [33.9806, -117.3755],
      resourceNeeds: ["Antibiotics", "Nursing Staff", "Isolation Rooms"],
      icon: hospitalIcon,
      details: "High priority allocation needed due to 32% predicted demand increase",
      priority: "high",
    },
    {
      type: "resource",
      name: "Central Medical Supply Depot",
      position: [39.8283, -98.5795],
      resources: ["Respiratory Medications", "Antibiotics", "Ventilators", "PPE"],
      icon: resourceIcon,
      details: "Main distribution center for medical supplies",
    },
    {
      type: "resource",
      name: "Eastern Regional Warehouse",
      position: [41.8781, -87.6298],
      resources: ["Antibiotics", "Cardiac Medications", "IV Supplies"],
      icon: resourceIcon,
      details: "Regional distribution center for eastern facilities",
    },
    {
      type: "allocation",
      name: "Active Resource Transfer",
      position: [37.7749, -122.4194],
      resources: ["Ventilators", "Respiratory Medications"],
      destination: "Memorial General Hospital",
      icon: allocationIcon,
      details: "Transferring critical resources to high-demand area",
      eta: "12 hours",
    },
  ]

  // Demand hotspots based on SDoH factors
  const demandHotspots = [
    {
      position: [34.0522, -118.2437],
      radius: 30000,
      intensity: 0.8,
      zipCodes: ["12345", "12346", "12347"],
      factors: ["Eviction Rate", "Unemployment"],
    },
    {
      position: [33.9806, -117.3755],
      radius: 25000,
      intensity: 0.9,
      zipCodes: ["34567", "34568", "34569"],
      factors: ["Unemployment", "Food Insecurity"],
    },
    {
      position: [40.7128, -74.006],
      radius: 20000,
      intensity: 0.6,
      zipCodes: ["56789", "56790", "56791"],
      factors: ["Housing Instability", "School Attendance"],
    },
  ]

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High Priority</Badge>
      case "medium":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
            Medium Priority
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
            Low Priority
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getIconByType = (type) => {
    switch (type) {
      case "hospital":
        return <Building className="h-4 w-4 text-green-600" />
      case "resource":
        return <Boxes className="h-4 w-4 text-blue-600" />
      case "allocation":
        return <TruckIcon className="h-4 w-4 text-purple-600" />
      default:
        return <Boxes className="h-4 w-4" />
    }
  }

  return (
    <div className="h-full w-full">
      <MapContainer
        style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
        zoom={4}
        zoomControl={false}
        ref={mapRef}
      >
        <FixLeafletIcons />
        <MapInitializer />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={mapStyle}
        />

        {/* Demand hotspots */}
        {demandHotspots.map((hotspot, index) => (
          <Circle
            key={`hotspot-${index}`}
            center={hotspot.position}
            radius={hotspot.radius}
            pathOptions={{
              fillColor: "#ef4444",
              fillOpacity: 0.2 * hotspot.intensity,
              color: "#ef4444",
              weight: 1,
              opacity: 0.3,
            }}
          >
            <Popup>
              <div className="text-sm">
                <h3 className="font-medium">High Demand Area</h3>
                <p className="text-muted-foreground">Based on SDoH factors</p>
                <div className="mt-2">
                  <p className="text-xs font-medium">Affected ZIP Codes:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {hotspot.zipCodes.map((zip, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {zip}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-xs font-medium">Primary Factors:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {hotspot.factors.map((factor, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Popup>
          </Circle>
        ))}

        {/* Resource allocation locations */}
        {locations.map((location, index) => (
          <Marker key={`location-${index}`} position={location.position} icon={location.icon}>
            <Popup>
              <div className="text-sm">
                <div className="flex items-center gap-2 mb-1">
                  {getIconByType(location.type)}
                  <h3 className="font-medium">{location.name}</h3>
                </div>

                {location.type === "hospital" && (
                  <>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs">Allocation Priority:</span>
                      {getPriorityBadge(location.priority)}
                    </div>
                    <div className="mt-2">
                      <p className="text-xs font-medium">Resource Needs:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {location.resourceNeeds.map((resource, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {resource}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {location.type === "resource" && (
                  <div className="mt-2">
                    <p className="text-xs font-medium">Available Resources:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {location.resources.map((resource, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {resource}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {location.type === "allocation" && (
                  <>
                    <div className="mt-2">
                      <p className="text-xs font-medium">Resources Being Transferred:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {location.resources.map((resource, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {resource}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                      <TruckIcon className="h-3 w-3" />
                      <span>Destination: {location.destination}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>ETA: {location.eta}</span>
                    </div>
                  </>
                )}

                <p className="text-xs text-muted-foreground mt-2">{location.details}</p>

                <div className="mt-3">
                  <Button size="sm" className="w-full">
                    {location.type === "hospital"
                      ? "Allocate Resources"
                      : location.type === "resource"
                        ? "Manage Inventory"
                        : "Track Transfer"}
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        <ZoomControl position="bottomright" />
      </MapContainer>
    </div>
  )
}
