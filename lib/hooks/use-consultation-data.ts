"use client"

import { useState, useEffect } from "react"

interface Consultation {
  id: string
  doctorId: string
  doctorName: string
  doctorSpecialty: string
  doctorAvatar?: string
  patientId: string
  patientName: string
  patientAvatar?: string
  scheduledTime: Date
  status: "scheduled" | "in-progress" | "completed" | "cancelled"
  duration: number // in minutes
  reason: string
  notes?: string
}

export function useConsultationData(consultationId: string) {
  const [consultation, setConsultation] = useState<Consultation | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchConsultation = async () => {
      try {
        setIsLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        const mockConsultation: Consultation = {
          id: consultationId,
          doctorId: "d-123",
          doctorName: "Sarah Johnson",
          doctorSpecialty: "Cardiologist",
          doctorAvatar: "/placeholder.svg?height=100&width=100",
          patientId: "p-456",
          patientName: "John Doe",
          patientAvatar: "/placeholder.svg?height=100&width=100",
          scheduledTime: new Date(),
        }

        setConsultation(mockConsultation)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An unexpected error occurred"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchConsultation()
  }, [consultationId])

  return { consultation, isLoading, error }
}
