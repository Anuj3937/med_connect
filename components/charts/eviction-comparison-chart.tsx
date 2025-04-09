"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

type EvictionComparisonChartProps = {
  timeframe: "monthly" | "quarterly" | "yearly"
}

export function EvictionComparisonChart({ timeframe }: EvictionComparisonChartProps) {
  const { theme } = useTheme()
  const [chartData, setChartData] = useState<any[]>([])
  const [chartHeight, setChartHeight] = useState(400)

  // Responsive chart height
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setChartHeight(300)
      } else {
        setChartHeight(400)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Generate data based on timeframe
  useEffect(() => {
    if (timeframe === "monthly") {
      setChartData([
        { name: "Northeast", current: 2.8, previous: 2.5 },
        { name: "Midwest", current: 3.2, previous: 2.9 },
        { name: "South", current: 4.7, previous: 4.2 },
        { name: "West", current: 3.9, previous: 3.6 },
      ])
    } else if (timeframe === "quarterly") {
      setChartData([
        { name: "Northeast", current: 3.0, previous: 2.7 },
        { name: "Midwest", current: 3.4, previous: 3.1 },
        { name: "South", current: 4.9, previous: 4.5 },
        { name: "West", current: 4.1, previous: 3.8 },
      ])
    } else {
      setChartData([
        { name: "Northeast", current: 3.2, previous: 2.8 },
        { name: "Midwest", current: 3.6, previous: 3.2 },
        { name: "South", current: 5.1, previous: 4.6 },
        { name: "West", current: 4.3, previous: 3.9 },
      ])
    }
  }, [timeframe])

  const isDark = theme === "dark"

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={chartHeight}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
          <XAxis dataKey="name" stroke={isDark ? "#9ca3af" : "#6b7280"} tick={{ fontSize: 12 }} />
          <YAxis
            stroke={isDark ? "#9ca3af" : "#6b7280"}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${value}%`}
            domain={[0, "dataMax + 1"]}
            label={{
              value: "Eviction Rate (%)",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle", fill: isDark ? "#d1d5db" : "#4b5563", fontSize: 12 },
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "#1f2937" : "#ffffff",
              borderColor: isDark ? "#374151" : "#e5e7eb",
              color: isDark ? "#f9fafb" : "#111827",
            }}
            formatter={(value: any, name: string) => {
              if (name === "current") return [`${value}%`, "Current Period"]
              if (name === "previous") return [`${value}%`, "Previous Period"]
              return [value, name]
            }}
          />
          <Legend
            formatter={(value) => {
              if (value === "current") return "Current Period"
              if (value === "previous") return "Previous Period"
              return value
            }}
          />
          <Bar dataKey="previous" fill="#94a3b8" name="Previous Period" radius={[4, 4, 0, 0]} />
          <Bar dataKey="current" fill="#3b82f6" name="Current Period" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
