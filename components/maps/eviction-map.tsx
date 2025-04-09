"use client"

import { useEffect, useState, useRef } from "react"
import { useTheme } from "next-themes"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, ZoomControl } from "react-leaflet"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, RefreshCw, ZoomIn } from "lucide-react"
import { useEvictionData } from "@/lib/hooks/use-eviction-data"
import { EvictionMapLegend } from "@/components/maps/eviction-map-legend"
import { EvictionMapControls } from "@/components/maps/eviction-map-controls"

// Fix for Leaflet marker icons in Next.js
useEffect(() => {
  delete L.Icon.Default.prototype._getIconUrl

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "/images/marker-icon-2x.png",
    iconUrl: "/images/marker-icon.png",
    shadowUrl: "/images/marker-shadow.png",
  })
}, [])

type EvictionMapProps = {
  fullscreen?: boolean
}

export function EvictionMap({ fullscreen = false }: EvictionMapProps) {
  const { theme } = useTheme()
  const { data, isLoading, isError, refetch } = useEvictionData()
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [mapHeight, setMapHeight] = useState(fullscreen ? 600 : 400)
  const mapRef = useRef<L.Map | null>(null)

  // Adjust map height based on screen size
  useEffect(() => {
    let initialHeight = fullscreen ? 600 : 400

    const handleResize = () => {
      if (fullscreen) {
        const height = window.innerHeight * 0.7
        initialHeight = height < 400 ? 400 : height
      } else {
        const width = window.innerWidth
        if (width < 640) {
          initialHeight = 300
        } else {
          initialHeight = 400
        }
      }
      setMapHeight(initialHeight)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [fullscreen])

  // Handle map style based on theme
  const mapStyle =
    theme === "dark"
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

  // Style function for GeoJSON
  const getStateStyle = (feature: any) => {
    const stateName = feature.properties.name
    const stateData = data?.states.find((s) => s.name === stateName)
    const evictionRate = stateData?.evictionRate || 0

    // Color scale based on eviction rate
    let fillColor = "#10b981" // Low rate (green)
    if (evictionRate > 5) fillColor = "#f59e0b" // Medium rate (amber)
    if (evictionRate > 10) fillColor = "#ef4444" // High rate (red)

    return {
      fillColor,
      weight: 2,
      opacity: 1,
      color: theme === "dark" ? "#374151" : "#d1d5db",
      fillOpacity: 0.7,
    }
  }

  // Handle click on state
  const onStateClick = (e: L.LeafletMouseEvent) => {
    const stateName = e.target.feature.properties.name
    setSelectedState(stateName)

    // Zoom to state bounds
    if (mapRef.current) {
      mapRef.current.fitBounds(e.target.getBounds())
    }
  }

  // Reset view to show all US
  const resetView = () => {
    setSelectedState(null)
    if (mapRef.current) {
      mapRef.current.setView([37.8, -96], 4)
    }
  }

  if (isError) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex items-center justify-between">
          <span>Failed to load eviction map data.</span>
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
      <MapContainer
        center={[37.8, -96]}
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

        {data?.geojson && (
          <GeoJSON
            data={data.geojson}
            style={getStateStyle}
            onEachFeature={(feature, layer) => {
              const stateName = feature.properties.name
              const stateData = data.states.find((s) => s.name === stateName)

              layer.on({
                click: onStateClick,
                mouseover: (e) => {
                  const layer = e.target
                  layer.setStyle({
                    weight: 3,
                    color: "#3b82f6",
                    fillOpacity: 0.8,
                  })
                },
                mouseout: (e) => {
                  const layer = e.target
                  layer.setStyle(getStateStyle(feature))
                },
              })

              if (stateData) {
                layer.bindTooltip(
                  `
                  <strong>${stateName}</strong><br/>
                  Eviction Rate: ${stateData.evictionRate.toFixed(1)}%<br/>
                  Filings: ${stateData.filings.toLocaleString()}
                `,
                  { sticky: true },
                )
              }
            }}
          />
        )}

        {data?.hotspots &&
          data.hotspots.map((hotspot, index) => (
            <Marker key={index} position={[hotspot.lat, hotspot.lng]}>
              <Popup>
                <div className="text-sm">
                  <h3 className="font-medium">
                    {hotspot.city}, {hotspot.state}
                  </h3>
                  <p className="text-muted-foreground">Eviction Rate: {hotspot.evictionRate.toFixed(1)}%</p>
                  <p className="text-muted-foreground">Monthly Filings: {hotspot.monthlyFilings.toLocaleString()}</p>
                  <Badge variant={hotspot.evictionRate > 10 ? "destructive" : "outline"} className="mt-2">
                    {hotspot.evictionRate > 10 ? "High Risk Area" : "Watch Area"}
                  </Badge>
                </div>
              </Popup>
            </Marker>
          ))}

        <ZoomControl position="bottomright" />
        <EvictionMapControls resetView={resetView} />
      </MapContainer>

      <EvictionMapLegend />

      {selectedState && (
        <Card className="absolute top-4 left-4 z-[1000] max-w-xs">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{selectedState}</h3>
                {data?.states.find((s) => s.name === selectedState) && (
                  <>
                    <p className="text-sm text-muted-foreground">
                      Eviction Rate: {data.states.find((s) => s.name === selectedState)?.evictionRate.toFixed(1)}%
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Total Filings: {data.states.find((s) => s.name === selectedState)?.filings.toLocaleString()}
                    </p>
                  </>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={resetView}>
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
