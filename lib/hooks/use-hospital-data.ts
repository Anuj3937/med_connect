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

        // Update the hospital data to be Mumbai-centric
        const mockHospitals = [
          {
            id: "1",
            name: "Lilavati Hospital",
            type: "Multi-Specialty Hospital",
            lat: 19.0509,
            lng: 72.827,
            bedCapacity: 92,
            icuAvailable: 4,
            erStatus: "high",
            specialties: ["Cardiology", "Neurology", "Oncology"],
            status: "critical",
          },
          {
            id: "2",
            name: "Kokilaben Dhirubhai Ambani Hospital",
            type: "Super-Specialty Hospital",
            lat: 19.1307,
            lng: 72.8296,
            bedCapacity: 85,
            icuAvailable: 7,
            erStatus: "normal",
            specialties: ["Cardiology", "Neurosurgery", "Transplants"],
            status: "high",
          },
          {
            id: "3",
            name: "Hinduja Hospital",
            type: "Multi-Specialty Hospital",
            lat: 19.0472,
            lng: 72.8305,
            bedCapacity: 78,
            icuAvailable: 5,
            erStatus: "normal",
            specialties: ["Orthopedics", "Gastroenterology", "Nephrology"],
            status: "high",
          },
          {
            id: "4",
            name: "Jaslok Hospital",
            type: "Multi-Specialty Hospital",
            lat: 18.9709,
            lng: 72.807,
            bedCapacity: 80,
            icuAvailable: 6,
            erStatus: "normal",
            specialties: ["Cardiology", "Oncology", "Neurology"],
            status: "normal",
          },
          {
            id: "5",
            name: "Tata Memorial Hospital",
            type: "Cancer Specialty Hospital",
            lat: 19.0048,
            lng: 72.8435,
            bedCapacity: 95,
            icuAvailable: 2,
            erStatus: "diverting",
            specialties: ["Oncology", "Radiation Therapy", "Surgical Oncology"],
            status: "critical",
          },
          {
            id: "6",
            name: "Nanavati Hospital",
            type: "Multi-Specialty Hospital",
            lat: 19.0996,
            lng: 72.8447,
            bedCapacity: 70,
            icuAvailable: 8,
            erStatus: "normal",
            specialties: ["Orthopedics", "Cardiology", "Pediatrics"],
            status: "normal",
          },
          {
            id: "7",
            name: "Breach Candy Hospital",
            type: "Multi-Specialty Hospital",
            lat: 18.9683,
            lng: 72.8021,
            bedCapacity: 75,
            icuAvailable: 6,
            erStatus: "high",
            specialties: ["Cardiology", "Gastroenterology", "Orthopedics"],
            status: "high",
          },
          {
            id: "8",
            name: "Bombay Hospital",
            type: "Multi-Specialty Hospital",
            lat: 18.9432,
            lng: 72.8305,
            bedCapacity: 82,
            icuAvailable: 5,
            erStatus: "normal",
            specialties: ["Neurology", "Cardiology", "Nephrology"],
            status: "normal",
          },
          {
            id: "9",
            name: "Wockhardt Hospital",
            type: "Multi-Specialty Hospital",
            lat: 19.0178,
            lng: 72.8478,
            bedCapacity: 68,
            icuAvailable: 9,
            erStatus: "normal",
            specialties: ["Cardiology", "Orthopedics", "Bariatric Surgery"],
            status: "normal",
          },
          {
            id: "10",
            name: "Saifee Hospital",
            type: "Multi-Specialty Hospital",
            lat: 18.9602,
            lng: 72.8112,
            bedCapacity: 73,
            icuAvailable: 7,
            erStatus: "normal",
            specialties: ["Cardiology", "Gastroenterology", "Urology"],
            status: "normal",
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
