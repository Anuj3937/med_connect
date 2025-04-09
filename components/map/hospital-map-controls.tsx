"use client"

import { Button } from "@/components/ui/button"
import { Home, ZoomIn, ZoomOut, RefreshCw, Filter, Ambulance, Map, Ruler } from "lucide-react"
import { useMap } from "react-leaflet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type HospitalMapControlsProps = {
  resetView: () => void
  clearSelectedPoints: () => void
  toggleAmbulances: () => void
  showAmbulances: boolean
  toggleHeatmap: () => void
  showHeatmap: boolean
}

export function HospitalMapControls({
  resetView,
  clearSelectedPoints,
  toggleAmbulances,
  showAmbulances,
  toggleHeatmap,
  showHeatmap,
}: HospitalMapControlsProps) {
  const map = useMap()

  const handleZoomIn = () => {
    map.zoomIn()
  }

  const handleZoomOut = () => {
    map.zoomOut()
  }

  return (
    <TooltipProvider>
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 shadow-md"
              onClick={resetView}
              aria-label="Reset view"
            >
              <Home className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Reset view</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 shadow-md"
              onClick={handleZoomIn}
              aria-label="Zoom in"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Zoom in</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 shadow-md"
              onClick={handleZoomOut}
              aria-label="Zoom out"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Zoom out</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 shadow-md"
              onClick={() => map.invalidateSize()}
              aria-label="Refresh map"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Refresh map</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={showAmbulances ? "default" : "secondary"}
              size="icon"
              className="h-8 w-8 shadow-md"
              onClick={toggleAmbulances}
              aria-label="Toggle ambulances"
            >
              <Ambulance className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>{showAmbulances ? "Hide ambulances" : "Show ambulances"}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={showHeatmap ? "default" : "secondary"}
              size="icon"
              className="h-8 w-8 shadow-md"
              onClick={toggleHeatmap}
              aria-label="Toggle capacity heatmap"
            >
              <Map className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>{showHeatmap ? "Hide capacity heatmap" : "Show capacity heatmap"}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 shadow-md"
              onClick={clearSelectedPoints}
              aria-label="Clear distance measurement"
            >
              <Ruler className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Clear distance measurement</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="secondary" size="icon" className="h-8 w-8 shadow-md" aria-label="Filter hospitals">
              <Filter className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Filter hospitals</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
