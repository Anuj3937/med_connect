"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

type EvictionTrendChartProps = {
  timeframe: "monthly" | "quarterly" | "yearly"
}

export function EvictionTrendChart({ timeframe }: EvictionTrendChartProps) {
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
        { name: "Jan", evictionRate: 3.2, filings: 52000 },
        { name: "Feb", evictionRate: 3.3, filings: 53500 },
        { name: "Mar", evictionRate: 3.4, filings: 55000 },
        { name: "Apr", evictionRate: 3.5, filings: 57000 },
        { name: "May", evictionRate: 3.6, filings: 59000 },
        { name: "Jun", evictionRate: 3.7, filings: 62000 },
        { name: "Jul", evictionRate: 3.8, filings: 67842 },
        { name: "Aug", evictionRate: null, filings: null },
        { name: "Sep", evictionRate: null, filings: null },
        { name: "Oct", evictionRate: null, filings: null },
        { name: "Nov", evictionRate: null, filings: null },
        { name: "Dec", evictionRate: null, filings: null },
      ])
    } else if (timeframe === "quarterly") {
      setChartData([
        { name: "Q1 2023", evictionRate: 3.0, filings: 150000 },
        { name: "Q2 2023", evictionRate: 3.2, filings: 160000 },
        { name: "Q3 2023", evictionRate: 3.4, filings: 170000 },
        { name: "Q4 2023", evictionRate: 3.5, filings: 175000 },
        { name: "Q1 2024", evictionRate: 3.6, filings: 180000 },
        { name: "Q2 2024", evictionRate: 3.8, filings: 188842 },
        { name: "Q3 2024", evictionRate: null, filings: null },
        { name: "Q4 2024", evictionRate: null, filings: null },
      ])
    } else {
      setChartData([
        { name: "2019", evictionRate: 2.3, filings: 580000 },
        { name: "2020", evictionRate: 1.9, filings: 480000 },
        { name: "2021", evictionRate: 2.5, filings: 620000 },
        { name: "2022", evictionRate: 3.0, filings: 700000 },
        { name: "2023", evictionRate: 3.5, filings: 750000 },
        { name: "2024 YTD", evictionRate: 3.8, filings: 368842 },
      ])
    }
  }, [timeframe])

  const isDark = theme === "dark"

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={chartHeight}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
          <XAxis dataKey="name" stroke={isDark ? "#9ca3af" : "#6b7280"} tick={{ fontSize: 12 }} />
          <YAxis
            yAxisId="left"
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
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke={isDark ? "#9ca3af" : "#6b7280"}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => value.toLocaleString()}
            domain={[0, "dataMax + 50000"]}
            label={{
              value: "Eviction Filings",
              angle: 90,
              position: "insideRight",
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
              if (name === "evictionRate") return [`${value}%`, "Eviction Rate"]
              if (name === "filings") return [value.toLocaleString(), "Eviction Filings"]
              return [value, name]
            }}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="evictionRate"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name="Eviction Rate"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="filings"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name="Eviction Filings"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
