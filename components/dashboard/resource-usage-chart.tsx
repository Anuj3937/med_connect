"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { useTheme } from "next-themes"

export function ResourceUsageChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const data = [
    { day: "Mon", ventilators: 65, ivPumps: 72, isolationGowns: 45 },
    { day: "Tue", ventilators: 68, ivPumps: 75, isolationGowns: 52 },
    { day: "Wed", ventilators: 75, ivPumps: 78, isolationGowns: 58 },
    { day: "Thu", ventilators: 72, ivPumps: 77, isolationGowns: 60 },
    { day: "Fri", ventilators: 78, ivPumps: 82, isolationGowns: 65 },
    { day: "Sat", ventilators: 74, ivPumps: 79, isolationGowns: 62 },
    { day: "Today", ventilators: 72, ivPumps: 79, isolationGowns: 60 },
  ]

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
        <XAxis dataKey="day" stroke={isDark ? "#9ca3af" : "#6b7280"} tick={{ fontSize: 12 }} tickLine={false} />
        <YAxis
          stroke={isDark ? "#9ca3af" : "#6b7280"}
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          domain={[0, 100]}
          tickFormatter={(value) => `${value}%`}
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
        <Line
          type="monotone"
          dataKey="ventilators"
          stroke="#ef4444"
          strokeWidth={2}
          activeDot={{ r: 6 }}
          name="Ventilators"
        />
        <Line type="monotone" dataKey="ivPumps" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 6 }} name="IV Pumps" />
        <Line strokeWidth={2} activeDot={{ r: 6 }} name="IV Pumps" />
        <Line
          type="monotone"
          dataKey="isolationGowns"
          stroke="#10b981"
          strokeWidth={2}
          activeDot={{ r: 6 }}
          name="Isolation Gowns"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
