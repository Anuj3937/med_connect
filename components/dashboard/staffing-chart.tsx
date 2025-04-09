"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { useTheme } from "next-themes"

export function StaffingChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const data = [
    { name: "Emergency", doctors: 6, nurses: 18, support: 8 },
    { name: "ICU", doctors: 4, nurses: 16, support: 6 },
    { name: "General Ward", doctors: 8, nurses: 32, support: 12 },
    { name: "Pediatrics", doctors: 3, nurses: 12, support: 4 },
    { name: "Surgery", doctors: 5, nurses: 10, support: 5 },
  ]

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }} barSize={20}>
        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
        <XAxis dataKey="name" stroke={isDark ? "#9ca3af" : "#6b7280"} tick={{ fontSize: 12 }} tickLine={false} />
        <YAxis stroke={isDark ? "#9ca3af" : "#6b7280"} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            borderColor: isDark ? "#374151" : "#e5e7eb",
            color: isDark ? "#f9fafb" : "#111827",
          }}
        />
        <Legend />
        <Bar dataKey="doctors" fill="#3b82f6" name="Doctors" radius={[4, 4, 0, 0]} />
        <Bar dataKey="nurses" fill="#10b981" name="Nurses" radius={[4, 4, 0, 0]} />
        <Bar dataKey="support" fill="#8b5cf6" name="Support Staff" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
