"use client"

import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell, Legend } from "recharts"
import { useTheme } from "next-themes"

export function ResourceAvailabilityChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const data = [
    { name: "Ventilators", value: 42, color: "#3b82f6" },
    { name: "ICU Beds", value: 18, color: "#ef4444" },
    { name: "Blood Supply", value: 86, color: "#f59e0b" },
    { name: "Isolation Rooms", value: 24, color: "#10b981" },
    { name: "Surgical Suites", value: 12, color: "#8b5cf6" },
  ]

  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
          dataKey="value"
          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            borderColor: isDark ? "#374151" : "#e5e7eb",
            color: isDark ? "#f9fafb" : "#111827",
          }}
          formatter={(value: any, name: string, props: any) => {
            return [`${value} units available`, name]
          }}
        />
        <Legend layout="horizontal" verticalAlign="bottom" align="center" />
      </PieChart>
    </ResponsiveContainer>
  )
}
