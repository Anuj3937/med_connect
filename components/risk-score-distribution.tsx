"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { range: "0-10", count: 5 },
  { range: "11-20", count: 8 },
  { range: "21-30", count: 12 },
  { range: "31-40", count: 18 },
  { range: "41-50", count: 25 },
  { range: "51-60", count: 30 },
  { range: "61-70", count: 22 },
  { range: "71-80", count: 15 },
  { range: "81-90", count: 10 },
  { range: "91-100", count: 5 },
]

export function RiskScoreDistribution() {
  return (
    <ChartContainer
      config={{
        count: {
          label: "Number of Communities",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 20,
          }}
        >
          <XAxis
            dataKey="range"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            label={{ value: "Risk Score Range (%)", position: "insideBottom", offset: -10 }}
          />
          <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="count" fill="var(--color-count)" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
