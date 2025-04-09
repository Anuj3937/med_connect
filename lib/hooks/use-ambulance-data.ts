"use client"

import { useState, useEffect } from "react"

type Ambulance = {
  id: string
  lat: number
  lng: number
  status: "responding" | "transporting" | "available"
  speed: number
  eta: number
  destination?: {
    name: string
    lat: number
    lng: number
  }
}

type UseAmbulanceDataReturn = {
  ambulances: Ambulance[] | null
  isLoading: boolean
  isError: boolean
  refetch: () => void
}

export function useAmbulanceData(): UseAmbulanceDataReturn {
  const [ambulances, setAmbulances] = useState<Ambulance[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [refetchCounter, setRefetchCounter] = useState(0)

  // Set up real-time updates
  useEffect(() => {
    let intervalId: NodeJS.Timeout

    const fetchData = async () => {
      setIsLoading(true)
      setIsError(false)

      try {
        // Simulate API call with a delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock ambulance data
        const mockAmbulances: Ambulance[] = [
          {
            id: "AMB-1234",
            lat: 34.0522,
            lng: -118.2437,
            status: "responding",
            speed: 45,
            eta: 8,
          },
          {
            id: "AMB-5678",
            lat: 34.0622,
            lng: -118.2537,
            status: "transporting",
            speed: 60,
            eta: 12,
            destination: {
              name: "Memorial General Hospital",
              lat: 34.0522,
              lng: -118.2437,
            },
          },
          {
            id: "AMB-9012",
            lat: 34.0722,
            lng: -118.2637,
            status: "available",
            speed: 0,
            eta: 0,
          },
          {
            id: "AMB-3456",
            lat: 40.7128,
            lng: -74.006,
            status: "responding",
            speed: 35,
            eta: 15,
          },
          {
            id: "AMB-7890",
            lat: 41.8781,
            lng: -87.6298,
            status: "transporting",
            speed: 50,
            eta: 7,
            destination: {
              name: "University Medical Center",
              lat: 41.8781,
              lng: -87.6298,
            },
          },
        ]

        setAmbulances(mockAmbulances)
        setIsLoading(false)

        // Set up interval to simulate ambulance movement
        intervalId = setInterval(() => {
          setAmbulances((prevAmbulances) => {
            if (!prevAmbulances) return prevAmbulances

            return prevAmbulances.map((ambulance) => {
              // Skip stationary ambulances
              if (ambulance.status === "available" || ambulance.speed === 0) {
                return ambulance
              }

              // Calculate new position (simple simulation)
              const latChange = (Math.random() - 0.5) * 0.001 * (ambulance.speed / 30)
              const lngChange = (Math.random() - 0.5) * 0.001 * (ambulance.speed / 30)

              // If ambulance has a destination, move towards it
              if (ambulance.destination) {
                const latDiff = ambulance.destination.lat - ambulance.lat
                const lngDiff = ambulance.destination.lng - ambulance.lng
                const direction = Math.atan2(latDiff, lngDiff)

                const newLat = ambulance.lat + Math.sin(direction) * 0.001 * (ambulance.speed / 30)
                const newLng = ambulance.lng + Math.cos(direction) * 0.001 * (ambulance.speed / 30)

                // Decrease ETA
                const newEta = Math.max(0, ambulance.eta - 0.2)

                return {
                  ...ambulance,
                  lat: newLat,
                  lng: newLng,
                  eta: newEta,
                }
              }

              return {
                ...ambulance,
                lat: ambulance.lat + latChange,
                lng: ambulance.lng + lngChange,
                eta: Math.max(0, ambulance.eta - 0.2),
              }
            })
          })
        }, 2000)
      } catch (error) {
        console.error("Error fetching ambulance data:", error)
        setIsError(true)
        setIsLoading(false)
      }
    }

    fetchData()

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [refetchCounter])

  const refetch = () => {
    setRefetchCounter((prev) => prev + 1)
  }

  return { ambulances, isLoading, isError, refetch }
}
