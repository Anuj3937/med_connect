"use client"

import { useState, useEffect } from "react"

type DemandForecastDataPoint = {
  date: string
  actual: number | null
  predicted: number
}

type UseDemandForecastDataReturn = {
  data: DemandForecastDataPoint[]
  isLoading: boolean
  isError: boolean
  refetch: () => void
}

export function useDemandForecastData(): UseDemandForecastDataReturn {
  const [data, setData] = useState<DemandForecastDataPoint[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [refetchCounter, setRefetchCounter] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setIsError(false)

      try {
        // Simulate API call with a delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        const mockData: DemandForecastDataPoint[] = [
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

        setData(mockData)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching demand forecast data:", error)
        setIsError(true)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [refetchCounter])

  const refetch = () => {
    setRefetchCounter((prev) => prev + 1)
  }

  return { data, isLoading, isError, refetch }
}
