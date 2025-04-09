"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { useState, useEffect } from "react"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useDemandForecastData } from "@/lib/hooks/use-demand-forecast-data"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DemandForecastChart() {
  const { data, isLoading, isError, refetch } = useDemandForecastData()
  const [chartHeight, setChartHeight] = useState(300)

  // Responsive chart height
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setChartHeight(200)
      } else {
        setChartHeight(300)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (isError) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex items-center justify-between">
          <span>Failed to load forecast data.</span>
          <Button variant="outline" size="sm" onClick={() => refetch()} className="ml-2">
            <RefreshCw className="mr-2 h-3 w-3" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if (isLoading) {
    return <div className={`h-[${chartHeight}px] w-full animate-pulse bg-muted rounded-md`}></div>
  }

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
      className={`h-[${chartHeight}px]`}
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
          <Line
            type="monotone"
            dataKey="actual"
            strokeWidth={2}
            activeDot={{ r: 6 }}
            stroke="var(--color-actual)"
            isAnimationActive={true}
            animationDuration={1000}
          />
          <Line
            type="monotone"
            dataKey="predicted"
            strokeWidth={2}
            strokeDasharray="5 5"
            stroke="var(--color-predicted)"
            isAnimationActive={true}
            animationDuration={1000}
            animationBegin={300}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
