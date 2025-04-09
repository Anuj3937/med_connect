"use client"

import { useState, useEffect } from "react"

type EvictionHotspot = {
  city: string
  state: string
  lat: number
  lng: number
  evictionRate: number
  monthlyFilings: number
}

type StateData = {
  name: string
  evictionRate: number
  filings: number
}

type EvictionData = {
  geojson: any
  states: StateData[]
  hotspots: EvictionHotspot[]
  lastUpdated: string
}

type UseEvictionDataReturn = {
  data: EvictionData | null
  isLoading: boolean
  isError: boolean
  refetch: () => void
}

export function useEvictionData(): UseEvictionDataReturn {
  const [data, setData] = useState<EvictionData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [refetchCounter, setRefetchCounter] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setIsError(false)

      try {
        // Simulate API call with a delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // In a real app, we would fetch GeoJSON data from an API
        // For this example, we'll use a simplified mock
        const mockGeoJson = {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: { name: "California" },
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [-125, 32],
                    [-125, 42],
                    [-114, 42],
                    [-114, 32],
                    [-125, 32],
                  ],
                ],
              },
            },
            {
              type: "Feature",
              properties: { name: "Texas" },
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [-106, 26],
                    [-106, 36],
                    [-93, 36],
                    [-93, 26],
                    [-106, 26],
                  ],
                ],
              },
            },
            {
              type: "Feature",
              properties: { name: "New York" },
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [-79, 40],
                    [-79, 45],
                    [-71, 45],
                    [-71, 40],
                    [-79, 40],
                  ],
                ],
              },
            },
            {
              type: "Feature",
              properties: { name: "Florida" },
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [-87, 25],
                    [-87, 31],
                    [-80, 31],
                    [-80, 25],
                    [-87, 25],
                  ],
                ],
              },
            },
          ],
        }

        const mockStates: StateData[] = [
          { name: "California", evictionRate: 4.2, filings: 42500 },
          { name: "Texas", evictionRate: 5.8, filings: 38700 },
          { name: "New York", evictionRate: 3.7, filings: 29800 },
          { name: "Florida", evictionRate: 7.2, filings: 31200 },
        ]

        const mockHotspots: EvictionHotspot[] = [
          { city: "Los Angeles", state: "CA", lat: 34.0522, lng: -118.2437, evictionRate: 5.1, monthlyFilings: 3200 },
          { city: "Houston", state: "TX", lat: 29.7604, lng: -95.3698, evictionRate: 6.3, monthlyFilings: 2800 },
          { city: "New York", state: "NY", lat: 40.7128, lng: -74.006, evictionRate: 4.2, monthlyFilings: 4100 },
          { city: "Miami", state: "FL", lat: 25.7617, lng: -80.1918, evictionRate: 8.5, monthlyFilings: 2300 },
          { city: "Atlanta", state: "GA", lat: 33.749, lng: -84.388, evictionRate: 7.8, monthlyFilings: 1900 },
          { city: "Chicago", state: "IL", lat: 41.8781, lng: -87.6298, evictionRate: 4.9, monthlyFilings: 2700 },
        ]

        setData({
          geojson: mockGeoJson,
          states: mockStates,
          hotspots: mockHotspots,
          lastUpdated: new Date().toISOString(),
        })

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching eviction data:", error)
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
