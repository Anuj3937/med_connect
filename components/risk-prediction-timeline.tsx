"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "Jan", zip12345: 65, zip23456: 45, zip34567: 40 },
  { month: "Feb", zip12345: 68, zip23456: 48, zip34567: 42 },
  { month: "Mar", zip12345: 72, zip23456: 52, zip34567: 45 },
  { month: "Apr", zip12345: 75, zip23456: 58, zip34567: 50 },
  { month: "May", zip12345: 80, zip23456: 62, zip34567: 55 },
  { month: "Jun", zip12345: 85, zip23456: 68, zip34567: 62 },
  { month: "Jul", zip12345: 82, zip23456: 65, zip34567: 60 },
  { month: "Aug", zip12345: 78, zip23456: 60, zip34567: 55 },
]

export function RiskPredictionTimeline() {
  return (
    <ChartContainer
      config={{
        zip12345: {
          label: "ZIP 12345",
          color: "hsl(var(--chart-1))",
        },
        zip23456: {
          label: "ZIP 23456",
          color: "hsl(var(--chart-2))",
        },
        zip34567: {
          label: "ZIP 34567",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 5,
          }}
        >
          <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="zip12345"
            strokeWidth={2}
            activeDot={{ r: 6 }}
            stroke="var(--color-zip12345)"
          />
          <Line
            type="monotone"
            dataKey="zip23456"
            strokeWidth={2}
            activeDot={{ r: 6 }}
            stroke="var(--color-zip23456)"
          />
          <Line
            type="monotone"
            dataKey="zip34567"
            strokeWidth={2}
            activeDot={{ r: 6 }}
            stroke="var(--color-zip34567)"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
