"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { useTheme } from "next-themes"

export function ResourceDistributionChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const data = [
    {
      facility: "Memorial General",
      medications: 65,
      equipment: 45,
      staff: 70,
      optimal: 100,
    },
    {
      facility: "University Medical",
      medications: 80,
      equipment: 75,
      staff: 85,
      optimal: 100,
    },
    {
      facility: "Riverside Community",
      medications: 35,
      equipment: 30,
      staff: 45,
      optimal: 100,
    },
    {
      facility: "Children's Hospital",
      medications: 75,
      equipment: 60,
      staff: 80,
      optimal: 100,
    },
    {
      facility: "Veterans Medical",
      medications: 60,
      equipment: 50,
      staff: 65,
      optimal: 100,
    },
  ]

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
        <XAxis dataKey="facility" stroke={isDark ? "#9ca3af" : "#6b7280"} tick={{ fontSize: 12 }} tickLine={false} />
        <YAxis
          stroke={isDark ? "#9ca3af" : "#6b7280"}
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          domain={[0, 100]}
          label={{
            value: "Resource Level (%)",
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
        <Bar dataKey="medications" name="Medications" fill={isDark ? "#3b82f6" : "#2563eb"} radius={[4, 4, 0, 0]} />
        <Bar dataKey="equipment" name="Equipment" fill={isDark ? "#f59e0b" : "#d97706"} radius={[4, 4, 0, 0]} />
        <Bar dataKey="staff" name="Staff" fill={isDark ? "#8b5cf6" : "#7c3aed"} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
