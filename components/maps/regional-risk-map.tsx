"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

type RiskLevel = "high" | "medium" | "low"

type RegionData = {
  zipCode: string
  riskLevel: RiskLevel
  riskScore: number
}

export function RegionalRiskMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { theme } = useTheme()
  const [regions, setRegions] = useState<RegionData[]>([])

  // Simulate fetching region data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Generate mock data
        const mockRegions: RegionData[] = []
        const gridSize = 5
        const riskLevels: RiskLevel[] = ["high", "medium", "low"]

        for (let i = 0; i < gridSize; i++) {
          for (let j = 0; j < gridSize; j++) {
            let riskLevel: RiskLevel

            if (i < 2 && j < 2) {
              riskLevel = Math.random() < 0.7 ? "high" : "medium"
            } else if (i > 3 && j > 3) {
              riskLevel = Math.random() < 0.7 ? "low" : "medium"
            } else {
              riskLevel = riskLevels[Math.floor(Math.random() * riskLevels.length)]
            }

            const riskScore =
              riskLevel === "high"
                ? Math.floor(70 + Math.random() * 30)
                : riskLevel === "medium"
                  ? Math.floor(40 + Math.random() * 30)
                  : Math.floor(10 + Math.random() * 30)

            mockRegions.push({
              zipCode: `${Math.floor(10000 + Math.random() * 90000)}`,
              riskLevel,
              riskScore,
            })
          }
        }

        setRegions(mockRegions)
        setIsLoading(false)
      } catch (err) {
        setError("Failed to load map data")
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Draw the map once data is loaded
  useEffect(() => {
    if (isLoading || error || !regions.length) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw background
    const isDarkMode = theme === "dark"
    ctx.fillStyle = isDarkMode ? "#1f2937" : "#f3f4f6"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw county/region boundaries
    ctx.strokeStyle = isDarkMode ? "#374151" : "#d1d5db"
    ctx.lineWidth = 1

    // Draw regions
    const gridSize = 5
    const cellWidth = canvas.width / gridSize
    const cellHeight = canvas.height / gridSize

    regions.forEach((region, index) => {
      const i = Math.floor(index / gridSize)
      const j = index % gridSize

      // Add some randomness to make it look more like a map
      const offsetX = Math.random() * 10 - 5
      const offsetY = Math.random() * 10 - 5

      ctx.beginPath()
      ctx.moveTo(i * cellWidth + offsetX, j * cellHeight + offsetY)
      ctx.lineTo((i + 1) * cellWidth + offsetX, j * cellHeight + offsetY)
      ctx.lineTo((i + 1) * cellWidth + offsetX, (j + 1) * cellHeight + offsetY)
      ctx.lineTo(i * cellWidth + offsetX, (j + 1) * cellHeight + offsetY)
      ctx.closePath()

      // Color based on risk level
      let fillColor
      if (isDarkMode) {
        switch (region.riskLevel) {
          case "high":
            fillColor = "rgba(239, 68, 68, 0.3)"
            break
          case "medium":
            fillColor = "rgba(245, 158, 11, 0.3)"
            break
          case "low":
            fillColor = "rgba(16, 185, 129, 0.3)"
            break
          default:
            fillColor = "rgba(107, 114, 128, 0.3)"
        }
      } else {
        switch (region.riskLevel) {
          case "high":
            fillColor = "rgba(239, 68, 68, 0.2)"
            break
          case "medium":
            fillColor = "rgba(245, 158, 11, 0.2)"
            break
          case "low":
            fillColor = "rgba(16, 185, 129, 0.2)"
            break
          default:
            fillColor = "rgba(209, 213, 219, 0.2)"
        }
      }

      ctx.fillStyle = fillColor
      ctx.fill()
      ctx.stroke()

      // Add ZIP code label
      ctx.fillStyle = isDarkMode ? "#d1d5db" : "#6b7280"
      ctx.font = "10px sans-serif"
      ctx.fillText(`ZIP ${region.zipCode}`, i * cellWidth + cellWidth / 2 - 20, j * cellHeight + cellHeight / 2 + 5)
    })

    // Add legend
    const legendY = canvas.height - 60
    ctx.font = "12px sans-serif"
    ctx.fillStyle = isDarkMode ? "#f3f4f6" : "#000000"
    ctx.fillText("Risk Level:", 10, legendY)

    // High risk
    ctx.fillStyle = isDarkMode ? "rgba(239, 68, 68, 0.3)" : "rgba(239, 68, 68, 0.2)"
    ctx.fillRect(10, legendY + 10, 20, 10)
    ctx.strokeRect(10, legendY + 10, 20, 10)
    ctx.fillStyle = isDarkMode ? "#f3f4f6" : "#000000"
    ctx.fillText("High", 35, legendY + 20)

    // Medium risk
    ctx.fillStyle = isDarkMode ? "rgba(245, 158, 11, 0.3)" : "rgba(245, 158, 11, 0.2)"
    ctx.fillRect(80, legendY + 10, 20, 10)
    ctx.strokeRect(80, legendY + 10, 20, 10)
    ctx.fillStyle = isDarkMode ? "#f3f4f6" : "#000000"
    ctx.fillText("Medium", 105, legendY + 20)

    // Low risk
    ctx.fillStyle = isDarkMode ? "rgba(16, 185, 129, 0.3)" : "rgba(16, 185, 129, 0.2)"
    ctx.fillRect(170, legendY + 10, 20, 10)
    ctx.strokeRect(170, legendY + 10, 20, 10)
    ctx.fillStyle = isDarkMode ? "#f3f4f6" : "#000000"
    ctx.fillText("Low", 195, legendY + 20)
  }, [isLoading, error, regions, theme])

  const handleRetry = () => {
    setIsLoading(true)
    setError(null)
    // Simulate refetching data
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex items-center justify-between">
          <span>{error}</span>
          <Button variant="outline" size="sm" onClick={handleRetry} className="ml-2">
            <RefreshCw className="mr-2 h-3 w-3" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if (isLoading) {
    return <Skeleton className="h-[300px] w-full" />
  }

  return (
    <div className="relative h-[300px] w-full">
      <canvas
        ref={canvasRef}
        className="h-full w-full rounded-md"
        aria-label="Regional risk map showing healthcare demand risk by ZIP code"
      />
    </div>
  )
}
