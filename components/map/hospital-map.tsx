"use client"

import { useEffect, useState, useRef, useMemo } from "react"
import { useTheme } from "next-themes"
import { useMap } from "react-leaflet"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, RefreshCw, AmbulanceIcon, Hospital } from "lucide-react"

// Component to handle map initialization
const MapInitializer = () => {
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
const DistanceCalculator = ({ points }: { points: [number, number][] }) => {
  const map = useMap()
  const [distance, setDistance] = useState<string | null>(null)

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
    <div className="absolute bottom-20 left-4 z-[1000] bg-background/90 p-3 rounded-md shadow-md border">
      <div className="text-sm font-medium">Distance: {distance} km</div>
      <div className="text-xs text-muted-foreground">
        Estimated travel time: {Math.round(Number(distance) * 1.5)} min
      </div>
    </div>
  )
}

// Main hospital map component
export function HospitalMap() {
  const { theme } = useTheme()
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [selectedHospital, setSelectedHospital] = useState<any>(null)
  const [selectedPoints, setSelectedPoints] = useState<[number, number][]>([])
  const [mapHeight, setMapHeight] = useState(600)
  const [showAmbulances, setShowAmbulances] = useState(true)
  const [showHeatmap, setShowHeatmap] = useState(false)
  const mapRef = useRef<any>(null)

  // Sample hospital data
  const hospitals = [
    {
      id: "hosp-1",
      name: "Memorial General Hospital",
      type: "Level I Trauma Center",
      bedCapacity: 78,
      icuAvailable: 2,
      erStatus: "high",
      status: "high",
      lat: 34.0522,
      lng: -118.2437,
      specialties: ["Trauma", "Cardiac", "Neurology"],
    },
    {
      id: "hosp-2",
      name: "University Medical Center",
      type: "Academic Medical Center",
      bedCapacity: 65,
      icuAvailable: 8,
      erStatus: "normal",
      status: "normal",
      lat: 34.0622,
      lng: -118.2237,
      specialties: ["Research", "Oncology", "Transplant"],
    },
    {
      id: "hosp-3",
      name: "Riverside Community Hospital",
      type: "Community Hospital",
      bedCapacity: 92,
      icuAvailable: 0,
      erStatus: "diverting",
      status: "critical",
      lat: 34.0422,
      lng: -118.2637,
      specialties: ["General", "Pediatrics"],
    },
    {
      id: "hosp-4",
      name: "Children's Hospital",
      type: "Pediatric Hospital",
      bedCapacity: 62,
      icuAvailable: 5,
      erStatus: "normal",
      status: "normal",
      lat: 34.0722,
      lng: -118.2837,
      specialties: ["Pediatrics", "Neonatal"],
    },
    {
      id: "hosp-5",
      name: "Veterans Medical Center",
      type: "Veterans Hospital",
      bedCapacity: 70,
      icuAvailable: 3,
      erStatus: "high",
      status: "high",
      lat: 34.0322,
      lng: -118.2137,
      specialties: ["Geriatrics", "Rehabilitation"],
    },
  ]

  // Sample ambulance data
  const ambulances = [
    { id: "amb-1", lat: 34.0622, lng: -118.2537, status: "In Transit", speed: 45, eta: 8 },
    { id: "amb-2", lat: 34.0522, lng: -118.2737, status: "Responding", speed: 60, eta: 5 },
    { id: "amb-3", lat: 34.0422, lng: -118.2337, status: "Returning", speed: 35, eta: 12 },
  ]

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

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(timer)
    }
  }, [])

  // Handle map style based on theme
  const mapStyle =
    theme === "dark"
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

  // Reset view to show all hospitals
  const resetView = () => {
    setSelectedHospital(null)
    setSelectedPoints([])
    if (mapRef.current) {
      mapRef.current.setView([34.0522, -118.2437], 12)
    }
  }

  // Handle hospital selection for distance calculation
  const handleHospitalSelect = (hospital: any) => {
    const point: [number, number] = [hospital.lat, hospital.lng]

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
    if (!showHeatmap) return []

    return hospitals.map((hospital) => {
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
  }, [hospitals, showHeatmap])

  const refetch = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsError(false)
    }, 1000)
  }

  if (isError) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex items-center justify-between">
          <span>Failed to load hospital map data.</span>
          <Button variant="outline" size="sm" onClick={refetch} className="ml-2">
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

  // Create a simulated map view since we can't use actual Leaflet in this environment
  return (
    <div className="relative rounded-md border overflow-hidden" style={{ height: `${mapHeight}px` }}>
      {/* Simulated map background */}
      <div className="absolute inset-0 bg-[#f2f2f2] dark:bg-[#242424]">
        {/* Simulated map grid */}
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="border border-[#e0e0e0] dark:border-[#333333]"></div>
          ))}
        </div>

        {/* Simulated roads */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-0 right-0 h-2 bg-[#d0d0d0] dark:bg-[#444444]"></div>
          <div className="absolute top-0 bottom-0 left-1/2 w-2 bg-[#d0d0d0] dark:bg-[#444444]"></div>
          <div className="absolute top-1/4 left-0 right-0 h-1 bg-[#d0d0d0] dark:bg-[#444444]"></div>
          <div className="absolute top-3/4 left-0 right-0 h-1 bg-[#d0d0d0] dark:bg-[#444444]"></div>
          <div className="absolute top-0 bottom-0 left-1/4 w-1 bg-[#d0d0d0] dark:bg-[#444444]"></div>
          <div className="absolute top-0 bottom-0 left-3/4 w-1 bg-[#d0d0d0] dark:bg-[#444444]"></div>
        </div>

        {/* Hospital markers */}
        {hospitals.map((hospital) => {
          const left = `${(hospital.lng + 118.3) * 500}%`
          const top = `${(34.08 - hospital.lat) * 500}%`

          let markerColor = "#10b981" // green for normal
          if (hospital.status === "high") {
            markerColor = "#f59e0b" // amber for high
          } else if (hospital.status === "critical") {
            markerColor = "#ef4444" // red for critical
          }

          return (
            <div
              key={hospital.id}
              className="absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-110"
              style={{ left, top }}
              onClick={() => handleHospitalSelect(hospital)}
            >
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill={markerColor}
                  stroke="white"
                  strokeWidth="2"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  {hospital.type.includes("Trauma") && <circle cx="12" cy="8" r="2" fill="white"></circle>}
                </svg>

                {/* Pulse animation for high/critical status */}
                {hospital.status !== "normal" && (
                  <div
                    className="absolute inset-0 rounded-full animate-ping opacity-30"
                    style={{ backgroundColor: markerColor }}
                  ></div>
                )}
              </div>
            </div>
          )
        })}

        {/* Ambulance markers */}
        {showAmbulances &&
          ambulances.map((ambulance) => {
            const left = `${(ambulance.lng + 118.3) * 500}%`
            const top = `${(34.08 - ambulance.lat) * 500}%`

            return (
              <div
                key={ambulance.id}
                className="absolute w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-110 animate-pulse"
                style={{ left, top }}
              >
                <div className="bg-blue-500 rounded-full p-1">
                  <AmbulanceIcon className="h-4 w-4 text-white" />
                </div>
              </div>
            )
          })}

        {/* Capacity heatmap circles */}
        {heatmapData.map((point, index) => {
          const left = `${(point.lng + 118.3) * 500}%`
          const top = `${(34.08 - point.lat) * 500}%`

          let circleColor = "#10b981"
          if (point.intensity > 0.8) {
            circleColor = "#ef4444"
          } else if (point.intensity > 0.6) {
            circleColor = "#f59e0b"
          }

          return (
            <div
              key={`heatmap-${index}`}
              className="absolute rounded-full opacity-30"
              style={{
                left,
                top,
                width: `${point.radius / 50}px`,
                height: `${point.radius / 50}px`,
                backgroundColor: circleColor,
                transform: "translate(-50%, -50%)",
              }}
            ></div>
          )
        })}

        {/* Line between selected points for distance calculation */}
        {selectedPoints.length === 2 && (
          <svg className="absolute inset-0 z-10 pointer-events-none">
            <line
              x1={`${(selectedPoints[0][1] + 118.3) * 500}%`}
              y1={`${(34.08 - selectedPoints[0][0]) * 500}%`}
              x2={`${(selectedPoints[1][1] + 118.3) * 500}%`}
              y2={`${(34.08 - selectedPoints[1][0]) * 500}%`}
              stroke="#3b82f6"
              strokeWidth="3"
              strokeDasharray="5,5"
            />
          </svg>
        )}
      </div>

      {/* Map controls */}
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8 shadow-md"
          onClick={resetView}
          aria-label="Reset view"
        >
          <Hospital className="h-4 w-4" />
        </Button>

        <Button
          variant={showAmbulances ? "default" : "secondary"}
          size="icon"
          className="h-8 w-8 shadow-md"
          onClick={toggleAmbulances}
          aria-label="Toggle ambulances"
        >
          <AmbulanceIcon className="h-4 w-4" />
        </Button>

        <Button
          variant={showHeatmap ? "default" : "secondary"}
          size="icon"
          className="h-8 w-8 shadow-md"
          onClick={toggleHeatmap}
          aria-label="Toggle capacity heatmap"
        >
          <AlertCircle className="h-4 w-4" />
        </Button>
      </div>

      {/* Map legend */}
      <div className="absolute bottom-4 right-4 z-[1000] bg-background/90 p-3 rounded-md shadow-md border">
        <h4 className="text-xs font-medium mb-2">Hospital Status</h4>
        <div className="flex items-center gap-2 text-xs mb-1">
          <div className="w-4 h-4 rounded-full bg-green-500"></div>
          <span>Normal Capacity (&lt;70%)</span>
        </div>
        <div className="flex items-center gap-2 text-xs mb-1">
          <div className="w-4 h-4 rounded-full bg-amber-500"></div>
          <span>High Capacity (70-90%)</span>
        </div>
        <div className="flex items-center gap-2 text-xs mb-1">
          <div className="w-4 h-4 rounded-full bg-red-500"></div>
          <span>Critical Capacity (&gt;90%)</span>
        </div>
      </div>

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
                        {selectedHospital.specialties.map((specialty: string) => (
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

      {/* Distance calculator */}
      {selectedPoints.length === 2 && (
        <div className="absolute bottom-20 left-4 z-[1000] bg-background/90 p-3 rounded-md shadow-md border animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="text-sm font-medium">Distance: 3.24 km</div>
          <div className="text-xs text-muted-foreground">Estimated travel time: 5 min</div>
          <Button size="sm" variant="outline" className="mt-2 w-full" onClick={clearSelectedPoints}>
            Clear Measurement
          </Button>
        </div>
      )}

      {/* Ambulance tracking info */}
      {showAmbulances && (
        <div className="absolute top-4 right-16 z-[1000]">
          <Card className="animate-in fade-in slide-in-from-right-5 duration-300">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <AmbulanceIcon className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">{ambulances.length} ambulances active</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
