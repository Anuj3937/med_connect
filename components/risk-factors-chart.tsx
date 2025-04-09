"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { factor: "Eviction Rate", impact: 85 },
  { factor: "Unemployment", impact: 78 },
  { factor: "Food Insecurity", impact: 65 },
  { factor: "School Attendance", impact: 62 },
  { factor: "Transportation", impact: 45 },
  { factor: "Health Insurance", impact: 40 },
]

export function RiskFactorsChart() {
  return (
    <ChartContainer
      config={{
        impact: {
          label: "Impact Score",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 5,
            right: 10,
            left: 80,
            bottom: 5,
          }}
        >
          <XAxis type="number" domain={[0, 100]} />
          <YAxis dataKey="factor" type="category" scale="band" tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="impact" fill="var(--color-impact)" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
