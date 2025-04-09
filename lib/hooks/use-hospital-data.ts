"use client"

import { useState, useEffect } from "react"

type Hospital = {
  id: string
  name: string
  type: string
  lat: number
  lng: number
  bedCapacity: number
  icuAvailable: number
  erStatus: "normal" | "high" | "diverting"
  status: "normal" | "high" | "critical"
  specialties?: string[]
  resources?: {
    ventilators: { total: number; available: number }
    ivPumps: { total: number; available: number }
    isolationRooms: { total: number; available: number }
    surgicalSuites: { total: number; available: number }
  }
}

type HospitalData = {
  hospitals: Hospital[]
  lastUpdated: string
}

type UseHospitalDataReturn = {
  data: HospitalData | null
  isLoading: boolean
  isError: boolean
  refetch: () => void
}

export function useHospitalData(): UseHospitalDataReturn {
  const [data, setData] = useState<HospitalData | null>(null)
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

        // Mock hospital data
        const mockHospitals: Hospital[] = [
          {
            id: "hosp-1",
            name: "Memorial General Hospital",
            type: "Level I Trauma Center",
            lat: 34.0522,
            lng: -118.2437,
            bedCapacity: 78,
            icuAvailable: 2,
            erStatus: "high",
            status: "high",
            specialties: ["Trauma", "Cardiac", "Neurology", "Orthopedics"],
            resources: {
              ventilators: { total: 25, available: 7 },
              ivPumps: { total: 180, available: 38 },
              isolationRooms: { total: 20, available: 4 },
              surgicalSuites: { total: 12, available: 3 },
            },
          },
          {
            id: "hosp-2",
            name: "University Medical Center",
            type: "Academic Medical Center",
            lat: 40.7128,
            lng: -74.006,
            bedCapacity: 65,
            icuAvailable: 8,
            erStatus: "normal",
            status: "normal",
            specialties: ["Cardiac", "Neurology", "Oncology", "Research"],
            resources: {
              ventilators: { total: 30, available: 12 },
              ivPumps: { total: 200, available: 65 },
              isolationRooms: { total: 25, available: 10 },
              surgicalSuites: { total: 15, available: 6 },
            },
          },
          {
            id: "hosp-3",
            name: "Riverside Community Hospital",
            type: "Community Hospital",
            lat: 33.9806,
            lng: -117.3755,
            bedCapacity: 92,
            icuAvailable: 0,
            erStatus: "diverting",
            status: "critical",
            specialties: ["General", "Maternity"],
            resources: {
              ventilators: { total: 15, available: 1 },
              ivPumps: { total: 120, available: 15 },
              isolationRooms: { total: 10, available: 0 },
              surgicalSuites: { total: 6, available: 1 },
            },
          },
          {
            id: "hosp-4",
            name: "Children's Hospital",
            type: "Pediatric Hospital",
            lat: 41.8781,
            lng: -87.6298,
            bedCapacity: 62,
            icuAvailable: 5,
            erStatus: "normal",
            status: "normal",
            specialties: ["Pediatric", "Neonatal", "Pediatric Surgery"],
            resources: {
              ventilators: { total: 20, available: 8 },
              ivPumps: { total: 150, available: 60 },
              isolationRooms: { total: 15, available: 6 },
              surgicalSuites: { total: 8, available: 3 },
            },
          },
          {
            id: "hosp-5",
            name: "Veterans Medical Center",
            type: "Veterans Hospital",
            lat: 38.9072,
            lng: -77.0369,
            bedCapacity: 70,
            icuAvailable: 3,
            erStatus: "high",
            status: "high",
            specialties: ["General", "Rehabilitation", "Mental Health"],
            resources: {
              ventilators: { total: 18, available: 5 },
              ivPumps: { total: 130, available: 40 },
              isolationRooms: { total: 12, available: 3 },
              surgicalSuites: { total: 7, available: 2 },
            },
          },
          {
            id: "hosp-6",
            name: "Metro Trauma Center",
            type: "Level II Trauma Center",
            lat: 37.7749,
            lng: -122.4194,
            bedCapacity: 85,
            icuAvailable: 1,
            erStatus: "high",
            status: "critical",
            specialties: ["Trauma", "Emergency Medicine", "Critical Care"],
            resources: {
              ventilators: { total: 22, available: 3 },
              ivPumps: { total: 160, available: 25 },
              isolationRooms: { total: 18, available: 2 },
              surgicalSuites: { total: 10, available: 1 },
            },
          },
          {
            id: "hosp-7",
            name: "Bayside Medical Center",
            type: "Community Hospital",
            lat: 32.7157,
            lng: -117.1611,
            bedCapacity: 55,
            icuAvailable: 7,
            erStatus: "normal",
            status: "normal",
            specialties: ["General", "Geriatric", "Orthopedics"],
            resources: {
              ventilators: { total: 12, available: 6 },
              ivPumps: { total: 100, available: 45 },
              isolationRooms: { total: 8, available: 4 },
              surgicalSuites: { total: 5, available: 2 },
            },
          },
          {
            id: "hosp-8",
            name: "Lakeside Regional Hospital",
            type: "Regional Medical Center",
            lat: 41.4993,
            lng: -81.6944,
            bedCapacity: 75,
            icuAvailable: 4,
            erStatus: "normal",
            status: "high",
            specialties: ["Cardiac", "Stroke", "Oncology"],
            resources: {
              ventilators: { total: 20, available: 6 },
              ivPumps: { total: 140, available: 42 },
              isolationRooms: { total: 14, available: 5 },
              surgicalSuites: { total: 9, available: 3 },
            },
          },
        ]

        setData({
          hospitals: mockHospitals,
          lastUpdated: new Date().toISOString(),
        })

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching hospital data:", error)
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
