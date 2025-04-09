"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "Emergency Services", value: 35, color: "#ef4444" },
  { name: "Preventive Care", value: 25, color: "#3b82f6" },
  { name: "Chronic Care", value: 20, color: "#f59e0b" },
  { name: "Mental Health", value: 15, color: "#10b981" },
  { name: "Community Outreach", value: 5, color: "#8b5cf6" },
]

export function ResourceAllocationChart() {
  return (
    <ChartContainer
      config={{
        value: {
          label: "Resource Allocation",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltipContent />} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
