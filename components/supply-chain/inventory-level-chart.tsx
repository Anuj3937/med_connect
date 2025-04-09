"use client"

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ReferenceLine,
} from "recharts"
import { useTheme } from "next-themes"

export function InventoryLevelChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const data = [
    {
      category: "Antibiotics",
      current: 85,
      reorderPoint: 40,
      optimal: 100,
    },
    {
      category: "Analgesics",
      current: 32,
      reorderPoint: 35,
      optimal: 100,
    },
    {
      category: "Antivirals",
      current: 68,
      reorderPoint: 45,
      optimal: 100,
    },
    {
      category: "Cardiac",
      current: 42,
      reorderPoint: 40,
      optimal: 100,
    },
    {
      category: "Respiratory",
      current: 25,
      reorderPoint: 50,
      optimal: 100,
    },
    {
      category: "Vaccines",
      current: 75,
      reorderPoint: 60,
      optimal: 100,
    },
  ]

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
        <XAxis dataKey="category" stroke={isDark ? "#9ca3af" : "#6b7280"} tick={{ fontSize: 12 }} tickLine={false} />
        <YAxis
          stroke={isDark ? "#9ca3af" : "#6b7280"}
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          domain={[0, 100]}
          label={{
            value: "Inventory Level (%)",
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
          formatter={(value: any) => [`${value}%`, ""]}
        />
        <Legend />
        <Bar dataKey="current" name="Current Level" fill={isDark ? "#3b82f6" : "#2563eb"} radius={[4, 4, 0, 0]} />
        <ReferenceLine
          y={100}
          stroke={isDark ? "#10b981" : "#059669"}
          strokeDasharray="3 3"
          label={{
            value: "Optimal",
            position: "right",
            fill: isDark ? "#10b981" : "#059669",
            fontSize: 12,
          }}
        />
        {data.map((entry, index) => (
          <ReferenceLine
            key={`ref-${index}`}
            y={entry.reorderPoint}
            stroke={isDark ? "#f59e0b" : "#d97706"}
            strokeDasharray="3 3"
            segment={[
              { x: index - 0.4, y: entry.reorderPoint },
              { x: index + 0.4, y: entry.reorderPoint },
            ]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}
