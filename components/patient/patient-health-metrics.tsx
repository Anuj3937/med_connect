"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { useTheme } from "next-themes"

export function PatientHealthMetrics() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const data = [
    { date: "Jun 10", bloodPressure: 130, bloodSugar: 110, weight: 180 },
    { date: "Jun 17", bloodPressure: 128, bloodSugar: 105, weight: 178 },
    { date: "Jun 24", bloodPressure: 125, bloodSugar: 102, weight: 176 },
    { date: "Jul 1", bloodPressure: 122, bloodSugar: 100, weight: 175 },
    { date: "Jul 8", bloodPressure: 120, bloodSugar: 98, weight: 174 },
  ]

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <span className="text-sm font-medium">Blood Pressure</span>
          <span className="text-sm">120/80 mmHg</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm font-medium">Blood Sugar</span>
          <span className="text-sm">98 mg/dL</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm font-medium">Weight</span>
          <span className="text-sm">174 lbs</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm font-medium">Heart Rate</span>
          <span className="text-sm">72 bpm</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm font-medium">Cholesterol</span>
          <span className="text-sm">185 mg/dL</span>
        </div>
      </div>

      <div className="h-[200px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
            <XAxis dataKey="date" stroke={isDark ? "#9ca3af" : "#6b7280"} />
            <YAxis stroke={isDark ? "#9ca3af" : "#6b7280"} />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#1f2937" : "#ffffff",
                borderColor: isDark ? "#374151" : "#e5e7eb",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="bloodPressure"
              stroke="#ef4444"
              strokeWidth={2}
              activeDot={{ r: 8 }}
              name="Blood Pressure"
            />
            <Line
              type="monotone"
              dataKey="bloodSugar"
              stroke="#3b82f6"
              strokeWidth={2}
              activeDot={{ r: 8 }}
              name="Blood Sugar"
            />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#10b981"
              strokeWidth={2}
              activeDot={{ r: 8 }}
              name="Weight"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
