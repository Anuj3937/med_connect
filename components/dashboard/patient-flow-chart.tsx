"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { useTheme } from "next-themes"

export function PatientFlowChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const data = [
    { time: "00:00", admissions: 4, discharges: 2, transfers: 1 },
    { time: "04:00", admissions: 3, discharges: 1, transfers: 2 },
    { time: "08:00", admissions: 8, discharges: 5, transfers: 3 },
    { time: "12:00", admissions: 12, discharges: 8, transfers: 4 },
    { time: "16:00", admissions: 10, discharges: 7, transfers: 3 },
    { time: "20:00", admissions: 6, discharges: 4, transfers: 2 },
    { time: "Now", admissions: 5, discharges: 3, transfers: 1 },
  ]

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
        <XAxis dataKey="time" stroke={isDark ? "#9ca3af" : "#6b7280"} tick={{ fontSize: 12 }} tickLine={false} />
        <YAxis stroke={isDark ? "#9ca3af" : "#6b7280"} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            borderColor: isDark ? "#374151" : "#e5e7eb",
            color: isDark ? "#f9fafb" : "#111827",
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="admissions"
          stroke="#3b82f6"
          strokeWidth={2}
          activeDot={{ r: 6 }}
          name="Admissions"
        />
        <Line
          type="monotone"
          dataKey="discharges"
          stroke="#10b981"
          strokeWidth={2}
          activeDot={{ r: 6 }}
          name="Discharges"
        />
        <Line
          type="monotone"
          dataKey="transfers"
          stroke="#8b5cf6"
          strokeWidth={2}
          activeDot={{ r: 6 }}
          name="Transfers"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
