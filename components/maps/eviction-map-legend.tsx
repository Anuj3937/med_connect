"use client"

import { useTheme } from "next-themes"

export function EvictionMapLegend() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className="absolute bottom-8 right-4 z-[1000] bg-background/90 p-3 rounded-md shadow-md border">
      <h4 className="text-xs font-medium mb-2">Eviction Rate</h4>
      <div className="flex items-center gap-2 text-xs mb-1">
        <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: "#10b981" }}></div>
        <span className={isDark ? "text-gray-300" : "text-gray-700"}>Low (&lt;5%)</span>
      </div>
      <div className="flex items-center gap-2 text-xs mb-1">
        <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: "#f59e0b" }}></div>
        <span className={isDark ? "text-gray-300" : "text-gray-700"}>Medium (5-10%)</span>
      </div>
      <div className="flex items-center gap-2 text-xs">
        <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: "#ef4444" }}></div>
        <span className={isDark ? "text-gray-300" : "text-gray-700"}>High (&gt;10%)</span>
      </div>
    </div>
  )
}
