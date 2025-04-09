"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { date: "Jan 1", actual: 100, predicted: 105 },
  { date: "Jan 15", actual: 110, predicted: 108 },
  { date: "Feb 1", actual: 105, predicted: 112 },
  { date: "Feb 15", actual: 115, predicted: 118 },
  { date: "Mar 1", actual: 120, predicted: 125 },
  { date: "Mar 15", actual: 125, predicted: 130 },
  { date: "Apr 1", actual: 130, predicted: 140 },
  { date: "Apr 15", actual: null, predicted: 150 },
  { date: "May 1", actual: null, predicted: 155 },
  { date: "May 15", actual: null, predicted: 165 },
  { date: "Jun 1", actual: null, predicted: 170 },
  { date: "Jun 15", actual: null, predicted: 160 },
]

export function DemandForecastChart() {
  return (
    <ChartContainer
      config={{
        actual: {
          label: "Actual Demand",
          color: "hsl(var(--chart-1))",
        },
        predicted: {
          label: "Predicted Demand",
          color: "hsl(var(--chart-2))",
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
            bottom: 0,
          }}
        >
          <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line type="monotone" dataKey="actual" strokeWidth={2} activeDot={{ r: 6 }} stroke="var(--color-actual)" />
          <Line
            type="monotone"
            dataKey="predicted"
            strokeWidth={2}
            strokeDasharray="5 5"
            stroke="var(--color-predicted)"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
