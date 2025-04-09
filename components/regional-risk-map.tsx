"use client"

import { useEffect, useRef } from "react"

export function RegionalRiskMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Draw a simple map representation
    ctx.fillStyle = "#f3f4f6"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw county/region boundaries
    ctx.strokeStyle = "#d1d5db"
    ctx.lineWidth = 1

    // Draw some random county shapes
    const drawCounty = (x: number, y: number, width: number, height: number, risk: string) => {
      ctx.beginPath()

      // Add some randomness to make it look more like a map
      const offsetX = Math.random() * 10 - 5
      const offsetY = Math.random() * 10 - 5

      ctx.moveTo(x + offsetX, y + offsetY)
      ctx.lineTo(x + width + offsetX, y + offsetY)
      ctx.lineTo(x + width + offsetX, y + height + offsetY)
      ctx.lineTo(x + offsetX, y + height + offsetY)
      ctx.closePath()

      // Color based on risk level
      let fillColor
      switch (risk) {
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

      ctx.fillStyle = fillColor
      ctx.fill()
      ctx.stroke()

      // Add ZIP code label
      ctx.fillStyle = "#6b7280"
      ctx.font = "10px sans-serif"
      ctx.fillText(`ZIP ${Math.floor(10000 + Math.random() * 90000)}`, x + width / 2 - 20, y + height / 2 + 5)
    }

    // Draw a grid of counties with different risk levels
    const gridSize = 5
    const cellWidth = canvas.width / gridSize
    const cellHeight = canvas.height / gridSize

    const riskLevels = ["high", "medium", "low"]

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        // Assign risk levels with more high risk in certain areas to show clusters
        let risk
        if (i < 2 && j < 2) {
          risk = Math.random() < 0.7 ? "high" : "medium"
        } else if (i > 3 && j > 3) {
          risk = Math.random() < 0.7 ? "low" : "medium"
        } else {
          risk = riskLevels[Math.floor(Math.random() * riskLevels.length)]
        }

        drawCounty(i * cellWidth + 5, j * cellHeight + 5, cellWidth - 10, cellHeight - 10, risk)
      }
    }

    // Add legend
    const legendY = canvas.height - 60
    ctx.font = "12px sans-serif"
    ctx.fillStyle = "#000000"
    ctx.fillText("Risk Level:", 10, legendY)

    // High risk
    ctx.fillStyle = "rgba(239, 68, 68, 0.2)"
    ctx.fillRect(10, legendY + 10, 20, 10)
    ctx.strokeRect(10, legendY + 10, 20, 10)
    ctx.fillStyle = "#000000"
    ctx.fillText("High", 35, legendY + 20)

    // Medium risk
    ctx.fillStyle = "rgba(245, 158, 11, 0.2)"
    ctx.fillRect(80, legendY + 10, 20, 10)
    ctx.strokeRect(80, legendY + 10, 20, 10)
    ctx.fillStyle = "#000000"
    ctx.fillText("Medium", 105, legendY + 20)

    // Low risk
    ctx.fillStyle = "rgba(16, 185, 129, 0.2)"
    ctx.fillRect(170, legendY + 10, 20, 10)
    ctx.strokeRect(170, legendY + 10, 20, 10)
    ctx.fillStyle = "#000000"
    ctx.fillText("Low", 195, legendY + 20)
  }, [])

  return (
    <div className="relative h-[300px] w-full">
      <canvas ref={canvasRef} className="h-full w-full rounded-md" />
    </div>
  )
}
