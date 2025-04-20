"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VideoConsultation } from "@/components/telemedicine/video-consultation"
import { ConsultationChat } from "@/components/telemedicine/consultation-chat"
import { DocumentSharing } from "@/components/telemedicine/document-sharing"
import { ConsultationNotes } from "@/components/telemedicine/consultation-notes"
import { TechnicalCheck } from "@/components/telemedicine/technical-check"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useConsultationData } from "@/lib/hooks/use-consultation-data"
import { ArrowLeft, Clock } from "lucide-react"
import Link from "next/link"

export default function ConsultationPage() {
  const params = useParams()
  const consultationId = params.id as string
  const { toast } = useToast()
  const { consultation, isLoading, error } = useConsultationData(consultationId)
  const [activeTab, setActiveTab] = useState("video")
  const [isConsultationActive, setIsConsultationActive] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(1800) // 30 minutes in seconds

  useEffect(() => {
    // Simulate consultation starting after a delay
    const timer = setTimeout(() => {
      setIsConsultationActive(true)
      toast({
        title: "Consultation started",
        description: "Dr. Sarah Johnson has joined the consultation",
      })
    }, 5000)

    return () => clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    if (!isConsultationActive) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          toast({
            title: "Consultation ended",
            description: "Your consultation time has ended",
            variant: "destructive",
          })
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isConsultationActive, toast])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  if (isLoading) {
    return <div>Loading consultation...</div>
  }

  if (error) {
    return <div>Error loading consultation: {error.message}</div>
  }

  const doctorName = consultation?.doctorName || "Sarah Johnson"
  const doctorSpecialty = consultation?.doctorSpecialty || "Cardiologist"
  const doctorAvatar = consultation?.doctorAvatar || "/placeholder.svg?height=100&width=100"
  const patientName = consultation?.patientName || "John Doe"
  const patientAvatar = consultation?.patientAvatar || "/placeholder.svg?height=100&width=100"

  return (
    <div className="container py-6 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/patient-portal/telemedicine">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Consultation with Dr. {doctorName}</h1>
            <p className="text-muted-foreground">
              {doctorSpecialty} • Appointment ID: {consultationId}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <span className={`font-mono ${timeRemaining < 300 ? "text-red-500" : ""}`}>{formatTime(timeRemaining)}</span>
        </div>
      </div>

      {!isConsultationActive ? (
        <div className="grid md:grid-cols-2 gap-6">
          <TechnicalCheck />
          <div className="space-y-6">
            <div className="bg-muted/30 p-6 rounded-lg">
              <h2 className="text-lg font-medium mb-2">Appointment Details</h2>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Doctor:</dt>
                  <dd>Dr. {doctorName}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Specialty:</dt>
                  <dd>{doctorSpecialty}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Date:</dt>
                  <dd>{new Date().toLocaleDateString()}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Time:</dt>
                  <dd>{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</dd>
                </div>
              </dl>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
              <h2 className="text-lg font-medium mb-2 text-blue-700 dark:text-blue-300">Waiting for doctor</h2>
              <p className="text-blue-600 dark:text-blue-400">
                Dr. {doctorName} will join shortly. Please complete the technical check while you wait.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-4 md:w-[600px]">
            <TabsTrigger value="video">Video</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>
          <div className="grid md:grid-cols-3 gap-6">
            <div className={`md:col-span-${activeTab === "video" ? "2" : "1"}`}>
              <TabsContent value="video" className="m-0">
                <VideoConsultation
                  consultationId={consultationId}
                  doctorName={doctorName}
                  doctorAvatar={doctorAvatar}
                />
              </TabsContent>
              <TabsContent value="chat" className="m-0 h-[600px]">
                <ConsultationChat
                  consultationId={consultationId}
                  doctorName={doctorName}
                  doctorAvatar={doctorAvatar}
                  patientName={patientName}
                  patientAvatar={patientAvatar}
                />
              </TabsContent>
              <TabsContent value="documents" className="m-0">
                <DocumentSharing consultationId={consultationId} />
              </TabsContent>
              <TabsContent value="notes" className="m-0">
                <ConsultationNotes consultationId={consultationId} />
              </TabsContent>
            </div>
            <div className="space-y-6">
              {activeTab !== "video" && (
                <div className="aspect-video bg-muted rounded-lg overflow-hidden border">
                  <VideoConsultation
                    consultationId={consultationId}
                    doctorName={doctorName}
                    doctorAvatar={doctorAvatar}
                    minimized
                  />
                </div>
              )}
              <ConsultationNotes
                consultationId={consultationId}
                initialNotes="Patient reports chest pain and shortness of breath for the past 3 days. No fever or cough. Previous history of hypertension."
                readOnly
              />
            </div>
          </div>
        </Tabs>
      )}
    </div>
  )
}
