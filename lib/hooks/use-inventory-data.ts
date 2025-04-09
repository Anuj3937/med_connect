"use client"

import { useState, useEffect } from "react"

type InventoryItem = {
  id: string
  name: string
  category: string
  stock: number
  unit: string
  reorderPoint: number
  optimalStock: number
  expiryDate: string
  status: "critical" | "low" | "warning" | "normal"
  location: string
  onOrder: number
}

type UseInventoryDataReturn = {
  data: InventoryItem[] | null
  isLoading: boolean
  isError: boolean
  refetch: () => void
}

export function useInventoryData(): UseInventoryDataReturn {
  const [data, setData] = useState<InventoryItem[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [refetchCounter, setRefetchCounter] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setIsError(false)

      try {
        // Simulate API call with a delay
        await new Promise((resolve) => setTimeout(resolve, 1200))

        // Mock data
        const mockData: InventoryItem[] = [
          {
            id: "med-001",
            name: "Amoxicillin",
            category: "Antibiotics",
            stock: 125,
            unit: "bottles",
            reorderPoint: 200,
            optimalStock: 500,
            expiryDate: "2024-12-15",
            status: "low",
            location: "Memorial General Hospital",
            onOrder: 200,
          },
          {
            id: "med-002",
            name: "Lisinopril",
            category: "Cardiac",
            stock: 350,
            unit: "boxes",
            reorderPoint: 200,
            optimalStock: 600,
            expiryDate: "2025-03-22",
            status: "normal",
            location: "Memorial General Hospital",
            onOrder: 0,
          },
          {
            id: "med-003",
            name: "Albuterol",
            category: "Respiratory",
            stock: 45,
            unit: "inhalers",
            reorderPoint: 100,
            optimalStock: 300,
            expiryDate: "2024-09-10",
            status: "critical",
            location: "Riverside Community Hospital",
            onOrder: 150,
          },
          {
            id: "med-004",
            name: "Insulin",
            category: "Endocrine",
            stock: 80,
            unit: "vials",
            reorderPoint: 75,
            optimalStock: 250,
            expiryDate: "2024-08-05",
            status: "warning",
            location: "University Medical Center",
            onOrder: 100,
          },
          {
            id: "med-005",
            name: "Ibuprofen",
            category: "Analgesics",
            stock: 520,
            unit: "bottles",
            reorderPoint: 300,
            optimalStock: 800,
            expiryDate: "2025-06-18",
            status: "normal",
            location: "Central Warehouse",
            onOrder: 0,
          },
          {
            id: "med-006",
            name: "Azithromycin",
            category: "Antibiotics",
            stock: 210,
            unit: "boxes",
            reorderPoint: 150,
            optimalStock: 400,
            expiryDate: "2025-01-30",
            status: "normal",
            location: "Central Warehouse",
            onOrder: 0,
          },
          {
            id: "med-007",
            name: "Ventolin",
            category: "Respiratory",
            stock: 65,
            unit: "inhalers",
            reorderPoint: 80,
            optimalStock: 200,
            expiryDate: "2024-11-12",
            status: "warning",
            location: "Children's Hospital",
            onOrder: 50,
          },
          {
            id: "med-008",
            name: "Metformin",
            category: "Endocrine",
            stock: 180,
            unit: "bottles",
            reorderPoint: 150,
            optimalStock: 450,
            expiryDate: "2025-04-25",
            status: "normal",
            location: "University Medical Center",
            onOrder: 0,
          },
        ]

        setData(mockData)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching inventory data:", error)
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
