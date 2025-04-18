"use client"

import { useEffect, useState, useRef, useMemo } from "react"
import { useTheme } from "next-themes"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap, Circle, Polyline } from "react-leaflet"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, RefreshCw, AmbulanceIcon, Hospital } from "lucide-react"
import { useHospitalData } from "@/lib/hooks/use-hospital-data"
import { HospitalMapLegend } from "@/components/map/hospital-map-legend"
import { HospitalMapControls } from "@/components/map/hospital-map-controls"
import { useAmbulanceData } from "@/lib/hooks/use-ambulance-data"

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

// Component to ensure map is properly sized
const MapResizer = () => {
  const map = useMap()

  useEffect(() => {
    // Force a resize event to ensure the map renders properly
    setTimeout(() => {
      map.invalidateSize()
    }, 100)
  }, [map])

  return null
}

// Component to calculate and display distance between two points
const DistanceCalculator = ({ points }) => {
  const map = useMap()
  const [distance, setDistance] = useState(null)

  useEffect(() => {
    if (points.length === 2) {
      const [point1, point2] = points
      const distanceInMeters = map.distance(point1, point2)
      const distanceInKm = (distanceInMeters / 1000).toFixed(2)
      setDistance(distanceInKm)
    } else {
      setDistance(null)
    }
  }, [points, map])

  if (!distance) return null

  return (
    <div className="absolute bottom-20 left-4 z-[1000] bg-background/90 p-3 rounded-md shadow-md border animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="text-sm font-medium">Distance: {distance} km</div>
      <div className="text-xs text-muted-foreground">Estimated travel time: {Math.round(distance * 1.5)} min</div>
      <Button size="sm" variant="outline" className="mt-2 w-full" onClick={() => {}}>
        Clear Measurement
      </Button>
    </div>
  )
}

// Component to handle ambulance tracking
const AmbulanceTracker = ({ ambulances }) => {
  const map = useMap()
  const [ambulanceMarkers, setAmbulanceMarkers] = useState([])

  // Custom ambulance icon
  const ambulanceIcon = new L.Icon({
    iconUrl: "/images/ambulance-icon.png",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  })

  useEffect(() => {
    if (!ambulances) return

    // Create markers for each ambulance
    const markers = ambulances.map((ambulance) => {
      const marker = L.marker([ambulance.lat, ambulance.lng], {
        icon: ambulanceIcon,
        zIndexOffset: 1000, // Make sure ambulances appear above hospital markers
      }).bindPopup(`
        <div class="text-sm">
          <h3 class="font-medium">Ambulance ${ambulance.id}</h3>
          <p>Status: ${ambulance.status}</p>
          <p>Speed: ${ambulance.speed} km/h</p>
          <p>ETA: ${ambulance.eta} min</p>
        </div>
      `)

      return marker
    })

    // Add markers to map
    markers.forEach((marker) => marker.addTo(map))
    setAmbulanceMarkers(markers)

    // Cleanup function to remove markers when component unmounts
    return () => {
      markers.forEach((marker) => marker.remove())
    }
  }, [ambulances, map, ambulanceIcon])

  return null
}

// Main hospital map component
export function HospitalMap() {
  const { theme } = useTheme()
  const { data, isLoading, isError, refetch } = useHospitalData()
  const { ambulances, isLoading: isLoadingAmbulances } = useAmbulanceData()
  const [selectedHospital, setSelectedHospital] = useState(null)
  const [selectedPoints, setSelectedPoints] = useState([])
  const [mapHeight, setMapHeight] = useState(600)
  const [showAmbulances, setShowAmbulances] = useState(true)
  const [showHeatmap, setShowHeatmap] = useState(false)
  const mapRef = useRef(null)

  // Adjust map height based on screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setMapHeight(400)
      } else {
        setMapHeight(600)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Handle map style based on theme
  const mapStyle =
    theme === "dark"
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

  // Create custom marker icons based on hospital status
  const createMarkerIcon = (status, type) => {
    let color = "#10b981" // green for normal

    if (status === "high") {
      color = "#f59e0b" // amber for high
    } else if (status === "critical") {
      color = "#ef4444" // red for critical
    }

    // Create a custom SVG icon
    const svgIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="${color}" stroke="white" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
        ${type.includes("Trauma") ? '<circle cx="12" cy="8" r="2" fill="white"></circle>' : ""}
      </svg>
    `

    return L.divIcon({
      html: svgIcon,
      className: "",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    })
  }

  // Reset view to show all hospitals
  const resetView = () => {
    setSelectedHospital(null)
    setSelectedPoints([])
    if (mapRef.current) {
      mapRef.current.setView([39.8283, -98.5795], 4)
    }
  }

  // Handle hospital selection for distance calculation
  const handleHospitalSelect = (hospital) => {
    const point = [hospital.lat, hospital.lng]

    if (selectedPoints.length === 0) {
      setSelectedPoints([point])
      setSelectedHospital(hospital)
    } else if (selectedPoints.length === 1) {
      setSelectedPoints([...selectedPoints, point])
    } else {
      setSelectedPoints([point])
      setSelectedHospital(hospital)
    }
  }

  // Clear selected points
  const clearSelectedPoints = () => {
    setSelectedPoints([])
  }

  // Toggle ambulance visibility
  const toggleAmbulances = () => {
    setShowAmbulances(!showAmbulances)
  }

  // Toggle heatmap visibility
  const toggleHeatmap = () => {
    setShowHeatmap(!showHeatmap)
  }

  // Generate capacity heatmap data
  const heatmapData = useMemo(() => {
    if (!data?.hospitals || !showHeatmap) return []

    return data.hospitals.map((hospital) => {
      let intensity = 0.5 // base intensity

      if (hospital.bedCapacity > 90) {
        intensity = 1.0 // high intensity for critical capacity
      } else if (hospital.bedCapacity > 70) {
        intensity = 0.7 // medium intensity for high capacity
      }

      return {
        lat: hospital.lat,
        lng: hospital.lng,
        intensity,
        radius: hospital.type.includes("Trauma") ? 2000 : 1000, // larger radius for trauma centers
      }
    })
  }, [data?.hospitals, showHeatmap])

  if (isError) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex items-center justify-between">
          <span>Failed to load hospital map data.</span>
          <Button variant="outline" size="sm" onClick={() => refetch()} className="ml-2">
            <RefreshCw className="mr-2 h-3 w-3" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if (isLoading) {
    return (
      <div
        className="animate-pulse bg-muted rounded-md flex items-center justify-center"
        style={{ height: `${mapHeight}px` }}
      >
        <p className="text-muted-foreground">Loading map data...</p>
      </div>
    )
  }

  return (
    <div className="relative" style={{ height: `${mapHeight}px` }}>
      <FixLeafletIcons />

      <MapContainer
        center={[39.8283, -98.5795]}
        zoom={4}
        style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
        zoomControl={false}
        whenCreated={(map) => {
          mapRef.current = map
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={mapStyle}
        />

        <MapResizer />

        {/* Hospital markers */}
        {data?.hospitals &&
          data.hospitals.map((hospital) => (
            <Marker
              key={hospital.id}
              position={[hospital.lat, hospital.lng]}
              icon={createMarkerIcon(hospital.status, hospital.type)}
              eventHandlers={{
                click: () => handleHospitalSelect(hospital),
              }}
            >
              <Popup>
                <div className="text-sm">
                  <h3 className="font-medium">{hospital.name}</h3>
                  <p className="text-muted-foreground">{hospital.type}</p>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between">
                      <span>Bed Capacity:</span>
                      <span>{hospital.bedCapacity}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ICU Beds:</span>
                      <span>{hospital.icuAvailable} available</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ER Status:</span>
                      <span>
                        {hospital.erStatus === "diverting" ? (
                          <Badge variant="destructive">Diverting</Badge>
                        ) : hospital.erStatus === "high" ? (
                          <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
                            High Volume
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                            Normal
                          </Badge>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Specialties:</span>
                      <span>{hospital.specialties?.join(", ") || "General"}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-between">
                    <Button size="sm" variant="outline" onClick={() => handleHospitalSelect(hospital)}>
                      {selectedPoints.length === 1 ? "Calculate Distance" : "Select"}
                    </Button>
                    <Button size="sm">Request Transfer</Button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

        {/* Capacity heatmap circles */}
        {heatmapData.map((point, index) => (
          <Circle
            key={`heatmap-${index}`}
            center={[point.lat, point.lng]}
            radius={point.radius}
            pathOptions={{
              fillColor: point.intensity > 0.8 ? "#ef4444" : point.intensity > 0.6 ? "#f59e0b" : "#10b981",
              fillOpacity: point.intensity * 0.3,
              stroke: false,
            }}
          />
        ))}

        {/* Line between selected points for distance calculation */}
        {selectedPoints.length === 2 && (
          <Polyline positions={selectedPoints} pathOptions={{ color: "#3b82f6", weight: 3, dashArray: "5, 5" }} />
        )}

        {/* Distance calculator */}
        <DistanceCalculator points={selectedPoints} />

        {/* Ambulance tracker */}
        {showAmbulances && ambulances && !isLoadingAmbulances && <AmbulanceTracker ambulances={ambulances} />}

        <ZoomControl position="bottomright" />
        <HospitalMapControls
          resetView={resetView}
          clearSelectedPoints={clearSelectedPoints}
          toggleAmbulances={toggleAmbulances}
          showAmbulances={showAmbulances}
          toggleHeatmap={toggleHeatmap}
          showHeatmap={showHeatmap}
        />
      </MapContainer>

      <HospitalMapLegend showAmbulances={showAmbulances} showHeatmap={showHeatmap} />

      {/* Selected hospital details card */}
      {selectedHospital && (
        <div className="absolute top-4 left-4 z-[1000] max-w-xs">
          <Card className="animate-in fade-in slide-in-from-left-5 duration-300">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{selectedHospital.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedHospital.type}</p>
                  <div className="mt-2 space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Hospital className="h-3 w-3 text-muted-foreground" />
                      <div className="flex items-center">
                        <span>Bed Capacity:</span>
                        <div className="ml-2 w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              selectedHospital.bedCapacity > 90
                                ? "bg-red-500"
                                : selectedHospital.bedCapacity > 70
                                  ? "bg-amber-500"
                                  : "bg-green-500"
                            }`}
                            style={{ width: `${selectedHospital.bedCapacity}%` }}
                          ></div>
                        </div>
                        <span className="ml-1">{selectedHospital.bedCapacity}%</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <AmbulanceIcon className="h-3 w-3 text-muted-foreground" />
                      <span>ER Status: </span>
                      {selectedHospital.erStatus === "diverting" ? (
                        <Badge variant="destructive" className="ml-1">
                          Diverting
                        </Badge>
                      ) : selectedHospital.erStatus === "high" ? (
                        <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50 ml-1">
                          High Volume
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50 ml-1">
                          Normal
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Specialties:</span>
                      <div className="flex flex-wrap gap-1">
                        {selectedHospital.specialties?.map((specialty) => (
                          <Badge key={specialty} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {selectedPoints.length === 1 && (
                      <div className="mt-2">
                        <p className="text-xs text-blue-600">Select another hospital to calculate distance</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="default">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setSelectedHospital(null)}>
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Ambulance tracking info */}
      {showAmbulances && (
        <div className="absolute top-4 right-16 z-[1000]">
          <Card className="animate-in fade-in slide-in-from-right-5 duration-300">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <AmbulanceIcon className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">
                  {isLoadingAmbulances ? "Loading ambulances..." : `${ambulances?.length || 0} ambulances active`}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
