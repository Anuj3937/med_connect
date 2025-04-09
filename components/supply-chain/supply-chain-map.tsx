"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, Circle, useMap } from "react-leaflet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Boxes, TruckIcon, Building, AlertTriangle } from "lucide-react"

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

export function SupplyChainMap() {
  const { theme } = useTheme()
  const mapRef = useRef(null)

  // Map style based on theme
  const mapStyle =
    theme === "dark"
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

  // Create custom icons
  const warehouseIcon = new L.Icon({
    iconUrl:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpath d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'%3E%3C/path%3E%3Cpolyline points='9 22 9 12 15 12 15 22'%3E%3C/polyline%3E%3C/svg%3E",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    className: "bg-blue-600 rounded-full p-1",
  })

  const hospitalIcon = new L.Icon({
    iconUrl:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpath d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z'%3E%3C/path%3E%3Cpath d='M9 12h6'%3E%3C/path%3E%3Cpath d='M12 9v6'%3E%3C/path%3E%3C/svg%3E",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    className: "bg-green-600 rounded-full p-1",
  })

  const distributorIcon = new L.Icon({
    iconUrl:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Crect x='1' y='3' width='15' height='13'%3E%3C/rect%3E%3Cpolygon points='16 8 20 8 23 11 23 16 16 16 16 8'%3E%3C/polygon%3E%3Ccircle cx='5.5' cy='18.5' r='2.5'%3E%3C/circle%3E%3Ccircle cx='18.5' cy='18.5' r='2.5'%3E%3C/circle%3E%3C/svg%3E",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    className: "bg-amber-600 rounded-full p-1",
  })

  const alertIcon = new L.Icon({
    iconUrl:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpath d='m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z'/%3E%3Cpath d='M12 9v4'/%3E%3Cpath d='M12 17h.01'/%3E%3C/svg%3E",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    className: "bg-red-600 rounded-full p-1",
  })

  // Sample data for the map
  const locations = [
    {
      type: "warehouse",
      name: "Central Pharmaceutical Warehouse",
      position: [39.8283, -98.5795],
      inventory: "High",
      icon: warehouseIcon,
      details: "Main distribution center with 85% inventory capacity",
    },
    {
      type: "hospital",
      name: "Memorial General Hospital",
      position: [34.0522, -118.2437],
      inventory: "Low",
      icon: hospitalIcon,
      details: "Critical shortage of respiratory medications",
    },
    {
      type: "hospital",
      name: "University Medical Center",
      position: [40.7128, -74.006],
      inventory: "Medium",
      icon: hospitalIcon,
      details: "Adequate supplies for current demand",
    },
    {
      type: "distributor",
      name: "Regional Distributor East",
      position: [41.8781, -87.6298],
      inventory: "High",
      icon: distributorIcon,
      details: "Currently processing 8 shipments",
    },
    {
      type: "alert",
      name: "Supply Chain Disruption",
      position: [32.7767, -96.797],
      icon: alertIcon,
      details: "Delivery delays due to weather conditions",
    },
    {
      type: "hospital",
      name: "Riverside Community Hospital",
      position: [33.9806, -117.3755],
      inventory: "Critical",
      icon: hospitalIcon,
      details: "Urgent need for antibiotics and cardiac medications",
    },
  ]

  // Demand hotspots based on SDoH factors
  const demandHotspots = [
    {
      position: [34.0522, -118.2437],
      radius: 30000,
      intensity: 0.8,
      zipCodes: ["90001", "90002", "90003"],
    },
    {
      position: [40.7128, -74.006],
      radius: 25000,
      intensity: 0.6,
      zipCodes: ["10001", "10002", "10003"],
    },
    {
      position: [29.7604, -95.3698],
      radius: 40000,
      intensity: 0.9,
      zipCodes: ["77001", "77002", "77003"],
    },
  ]

  const getInventoryBadge = (level) => {
    switch (level) {
      case "Critical":
        return <Badge variant="destructive">Critical</Badge>
      case "Low":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
            Low
          </Badge>
        )
      case "Medium":
        return (
          <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">
            Medium
          </Badge>
        )
      case "High":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
            High
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getIconByType = (type) => {
    switch (type) {
      case "warehouse":
        return <Boxes className="h-4 w-4 text-blue-600" />
      case "hospital":
        return <Building className="h-4 w-4 text-green-600" />
      case "distributor":
        return <TruckIcon className="h-4 w-4 text-amber-600" />
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
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
                <h3 className="font-medium">Demand Hotspot</h3>
                <p className="text-muted-foreground">Predicted 25% increase in demand</p>
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
              </div>
            </Popup>
          </Circle>
        ))}

        {/* Supply chain locations */}
        {locations.map((location, index) => (
          <Marker key={`location-${index}`} position={location.position} icon={location.icon}>
            <Popup>
              <div className="text-sm">
                <div className="flex items-center gap-2 mb-1">
                  {getIconByType(location.type)}
                  <h3 className="font-medium">{location.name}</h3>
                </div>
                {location.inventory && (
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs">Inventory Level:</span>
                    {getInventoryBadge(location.inventory)}
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-2">{location.details}</p>
                <div className="mt-3">
                  <Button size="sm" className="w-full">
                    View Details
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
