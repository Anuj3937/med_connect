"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "Current", doctors: 45, nurses: 120, support: 80 },
  { month: "Month 1", doctors: 48, nurses: 130, support: 85 },
  { month: "Month 2", doctors: 52, nurses: 145, support: 90 },
  { month: "Month 3", doctors: 50, nurses: 140, support: 88 },
]

export function StaffingForecastChart() {
  return (
    <ChartContainer
      config={{
        doctors: {
          label: "Doctors",
          color: "hsl(var(--chart-1))",
        },
        nurses: {
          label: "Nurses",
          color: "hsl(var(--chart-2))",
        },
        support: {
          label: "Support Staff",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="doctors" stackId="a" fill="var(--color-doctors)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="nurses" stackId="a" fill="var(--color-nurses)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="support" stackId="a" fill="var(--color-support)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
