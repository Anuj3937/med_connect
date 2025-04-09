"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function HospitalInventoryAnalytics() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Simulated usage data
  const usageData = [
    { day: "Mon", usage: 65 },
    { day: "Tue", usage: 59 },
    { day: "Wed", usage: 80 },
    { day: "Thu", usage: 81 },
    { day: "Fri", usage: 56 },
    { day: "Sat", usage: 55 },
    { day: "Sun", usage: 40 },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Select defaultValue="week">
          <SelectTrigger className="w-[120px] h-8 text-xs">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="h-[120px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={usageData}>
            <Line type="monotone" dataKey="usage" stroke="#2563eb" strokeWidth={2} dot={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#1f2937" : "#ffffff",
                borderColor: isDark ? "#374151" : "#e5e7eb",
              }}
              formatter={(value: number) => [`${value} items`, "Usage"]}
              labelFormatter={(label: string) => label}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Average Daily Usage</span>
          <span className="font-medium">62 items</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Most Used Category</span>
          <span className="font-medium">IV Fluids</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Least Used Category</span>
          <span className="font-medium">Equipment</span>
        </div>
      </div>

      <Button variant="outline" size="sm" className="w-full">
        View Detailed Analytics
      </Button>
    </div>
  )
}
