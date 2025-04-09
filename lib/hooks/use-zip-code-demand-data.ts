"use client"

import { useState, useEffect } from "react"

type ZipCodeDemand = {
  zipCode: string
  location: string
  demandChange: number
  primaryFactors: string[]
  riskLevel: "high" | "medium" | "low"
  timeframe: string
  affectedCategories: string[]
}

type UseZipCodeDemandDataReturn = {
  data: ZipCodeDemand[] | null
  isLoading: boolean
  isError: boolean
  refetch: () => void
}

export function useZipCodeDemandData(): UseZipCodeDemandDataReturn {
  const [data, setData] = useState<ZipCodeDemand[] | null>(null)
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
        const mockData: ZipCodeDemand[] = [
          {
            zipCode: "12345",
            location: "Los Angeles, CA",
            demandChange: 25,
            primaryFactors: ["Eviction Rate", "Unemployment"],
            riskLevel: "high",
            timeframe: "14 days",
            affectedCategories: ["Respiratory", "Antibiotics"],
          },
          {
            zipCode: "23456",
            location: "Chicago, IL",
            demandChange: 18,
            primaryFactors: ["Food Insecurity", "School Attendance"],
            riskLevel: "medium",
            timeframe: "21 days",
            affectedCategories: ["Cardiac", "Endocrine"],
          },
          {
            zipCode: "34567",
            location: "Houston, TX",
            demandChange: 32,
            primaryFactors: ["Unemployment", "Eviction Rate"],
            riskLevel: "high",
            timeframe: "7 days",
            affectedCategories: ["Antibiotics", "Analgesics"],
          },
          {
            zipCode: "45678",
            location: "Miami, FL",
            demandChange: 15,
            primaryFactors: ["School Attendance", "Public Transport"],
            riskLevel: "medium",
            timeframe: "30 days",
            affectedCategories: ["Pediatric", "Vaccines"],
          },
          {
            zipCode: "56789",
            location: "New York, NY",
            demandChange: 22,
            primaryFactors: ["Housing Instability", "Food Insecurity"],
            riskLevel: "high",
            timeframe: "14 days",
            affectedCategories: ["Respiratory", "Mental Health"],
          },
          {
            zipCode: "67890",
            location: "Phoenix, AZ",
            demandChange: -8,
            primaryFactors: ["Improved Employment", "Housing Stability"],
            riskLevel: "low",
            timeframe: "30 days",
            affectedCategories: ["Analgesics", "Antibiotics"],
          },
          {
            zipCode: "78901",
            location: "Seattle, WA",
            demandChange: -5,
            primaryFactors: ["Improved Food Access", "Healthcare Access"],
            riskLevel: "low",
            timeframe: "21 days",
            affectedCategories: ["Cardiac", "Endocrine"],
          },
        ]

        setData(mockData)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching ZIP code demand data:", error)
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
