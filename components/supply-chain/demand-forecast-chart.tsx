"use client"

import { Line, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend, Area, AreaChart } from "recharts"
import { useTheme } from "next-themes"

export function DemandForecastChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const data = [
    { month: "Jan", actual: 100, predicted: 105, baseline: 100 },
    { month: "Feb", actual: 110, predicted: 108, baseline: 100 },
    { month: "Mar", actual: 105, predicted: 112, baseline: 100 },
    { month: "Apr", actual: 115, predicted: 118, baseline: 100 },
    { month: "May", actual: 120, predicted: 125, baseline: 100 },
    { month: "Jun", actual: 125, predicted: 130, baseline: 100 },
    { month: "Jul", actual: 130, predicted: 140, baseline: 100 },
    { month: "Aug", actual: null, predicted: 150, baseline: 100 },
    { month: "Sep", actual: null, predicted: 155, baseline: 100 },
    { month: "Oct", actual: null, predicted: 165, baseline: 100 },
    { month: "Nov", actual: null, predicted: 170, baseline: 100 },
    { month: "Dec", actual: null, predicted: 160, baseline: 100 },
  ]

  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
        <XAxis dataKey="month" stroke={isDark ? "#9ca3af" : "#6b7280"} tick={{ fontSize: 12 }} tickLine={false} />
        <YAxis
          stroke={isDark ? "#9ca3af" : "#6b7280"}
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          domain={[0, "dataMax + 20"]}
          label={{
            value: "Demand Index (Baseline = 100)",
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
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="actual"
          name="Actual Demand"
          stroke={isDark ? "#3b82f6" : "#2563eb"}
          fill={isDark ? "rgba(59, 130, 246, 0.2)" : "rgba(37, 99, 235, 0.1)"}
          activeDot={{ r: 8 }}
        />
        <Area
          type="monotone"
          dataKey="predicted"
          name="Predicted Demand"
          stroke={isDark ? "#f59e0b" : "#d97706"}
          fill={isDark ? "rgba(245, 158, 11, 0.2)" : "rgba(217, 119, 6, 0.1)"}
          strokeDasharray="5 5"
        />
        <Line
          type="monotone"
          dataKey="baseline"
          name="Baseline"
          stroke={isDark ? "#6b7280" : "#4b5563"}
          strokeDasharray="3 3"
          strokeWidth={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
