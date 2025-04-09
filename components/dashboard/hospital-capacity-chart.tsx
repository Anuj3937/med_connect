"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { useTheme } from "next-themes"

type HospitalCapacityChartProps = {
  detailed?: boolean
}

export function HospitalCapacityChart({ detailed = false }: HospitalCapacityChartProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const simpleData = [
    { name: "Memorial General", total: 400, occupied: 312, available: 88 },
    { name: "University Medical", total: 650, occupied: 422, available: 228 },
    { name: "Riverside Community", total: 250, occupied: 230, available: 20 },
    { name: "Children's Hospital", total: 200, occupied: 124, available: 76 },
    { name: "Veterans Medical", total: 300, occupied: 186, available: 114 },
  ]

  const detailedData = [
    { name: "Emergency", total: 50, occupied: 42, available: 8 },
    { name: "ICU", total: 50, occupied: 46, available: 4 },
    { name: "General Ward", total: 200, occupied: 152, available: 48 },
    { name: "Pediatrics", total: 40, occupied: 26, available: 14 },
    { name: "Maternity", total: 30, occupied: 24, available: 6 },
    { name: "Surgery", total: 30, occupied: 22, available: 8 },
  ]

  const data = detailed ? detailedData : simpleData

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }} barSize={detailed ? 30 : 40}>
        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
        <XAxis dataKey="name" stroke={isDark ? "#9ca3af" : "#6b7280"} tick={{ fontSize: 12 }} tickLine={false} />
        <YAxis stroke={isDark ? "#9ca3af" : "#6b7280"} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            borderColor: isDark ? "#374151" : "#e5e7eb",
            color: isDark ? "#f9fafb" : "#111827",
          }}
          formatter={(value: any, name: string) => {
            if (name === "occupied") return [value, "Occupied Beds"]
            if (name === "available") return [value, "Available Beds"]
            return [value, name]
          }}
        />
        <Legend
          formatter={(value) => {
            if (value === "occupied") return "Occupied Beds"
            if (value === "available") return "Available Beds"
            return value
          }}
        />
        <Bar dataKey="occupied" stackId="a" fill="#ef4444" name="occupied" radius={[4, 4, 0, 0]} />
        <Bar dataKey="available" stackId="a" fill="#10b981" name="available" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
