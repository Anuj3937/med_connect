"use client"

import { useTheme } from "next-themes"
import { Ambulance } from "lucide-react"

type HospitalMapLegendProps = {
  showAmbulances?: boolean
  showHeatmap?: boolean
}

export function HospitalMapLegend({ showAmbulances = false, showHeatmap = false }: HospitalMapLegendProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className="absolute bottom-8 right-4 z-[1000] bg-background/90 p-3 rounded-md shadow-md border">
      <h4 className="text-xs font-medium mb-2">Hospital Status</h4>
      <div className="flex items-center gap-2 text-xs mb-1">
        <div className="w-4 h-4 rounded-full bg-green-500"></div>
        <span className={isDark ? "text-gray-300" : "text-gray-700"}>Normal Capacity (&lt;70%)</span>
      </div>
      <div className="flex items-center gap-2 text-xs mb-1">
        <div className="w-4 h-4 rounded-full bg-amber-500"></div>
        <span className={isDark ? "text-gray-300" : "text-gray-700"}>High Capacity (70-90%)</span>
      </div>
      <div className="flex items-center gap-2 text-xs mb-1">
        <div className="w-4 h-4 rounded-full bg-red-500"></div>
        <span className={isDark ? "text-gray-300" : "text-gray-700"}>Critical Capacity (&gt;90%)</span>
      </div>

      {showAmbulances && (
        <>
          <div className="border-t my-2"></div>
          <div className="flex items-center gap-2 text-xs">
            <Ambulance className="h-4 w-4 text-blue-500" />
            <span className={isDark ? "text-gray-300" : "text-gray-700"}>Active Ambulances</span>
          </div>
        </>
      )}

      {showHeatmap && (
        <>
          <div className="border-t my-2"></div>
          <h4 className="text-xs font-medium mb-2">Capacity Heatmap</h4>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 rounded-full bg-red-500 opacity-30"></div>
            <span className={isDark ? "text-gray-300" : "text-gray-700"}>High Demand Areas</span>
          </div>
        </>
      )}
    </div>
  )
}
