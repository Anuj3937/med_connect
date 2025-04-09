"use client"

import { Button } from "@/components/ui/button"
import { Home, ZoomIn, ZoomOut, RefreshCw } from "lucide-react"
import { useMap } from "react-leaflet"

type EvictionMapControlsProps = {
  resetView: () => void
}

export function EvictionMapControls({ resetView }: EvictionMapControlsProps) {
  const map = useMap()

  const handleZoomIn = () => {
    map.zoomIn()
  }

  const handleZoomOut = () => {
    map.zoomOut()
  }

  return (
    <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
      <Button variant="secondary" size="icon" className="h-8 w-8 shadow-md" onClick={resetView} aria-label="Reset view">
        <Home className="h-4 w-4" />
      </Button>
      <Button variant="secondary" size="icon" className="h-8 w-8 shadow-md" onClick={handleZoomIn} aria-label="Zoom in">
        <ZoomIn className="h-4 w-4" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="h-8 w-8 shadow-md"
        onClick={handleZoomOut}
        aria-label="Zoom out"
      >
        <ZoomOut className="h-4 w-4" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="h-8 w-8 shadow-md"
        onClick={() => map.invalidateSize()}
        aria-label="Refresh map"
      >
        <RefreshCw className="h-4 w-4" />
      </Button>
    </div>
  )
}
