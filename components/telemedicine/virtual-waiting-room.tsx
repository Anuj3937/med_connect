"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, Info, Video } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"

interface VirtualWaitingRoomProps {
  consultationId: string
  doctorName: string
  doctorSpecialty: string
  doctorImage?: string
  appointmentTime: string
  estimatedWaitTime?: number
}

export function VirtualWaitingRoom({
  consultationId,
  doctorName,
  doctorSpecialty,
  doctorImage,
  appointmentTime,
  estimatedWaitTime = 5,
}: VirtualWaitingRoomProps) {
  const router = useRouter()
  const [waitTime, setWaitTime] = useState(estimatedWaitTime)
  const [progress, setProgress] = useState(0)

  // Simulate countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setWaitTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          // Redirect to consultation room when wait time is over
          setTimeout(() => {
            router.push(`/patient-portal/telemedicine/consultation/${consultationId}`)
          }, 1000)
          return 0
        }
        return prev - 1
      })
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [consultationId, router])

  // Update progress bar
  useEffect(() => {
    setProgress(((estimatedWaitTime - waitTime) / estimatedWaitTime) * 100)
  }, [waitTime, estimatedWaitTime])

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-2 border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Virtual Waiting Room</CardTitle>
          <CardDescription>Your doctor will be with you shortly</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-6 p-4 bg-muted/50 rounded-lg">
            <Avatar className="h-20 w-20">
              <AvatarImage src={doctorImage || "/placeholder.svg"} alt={doctorName} />
              <AvatarFallback>
                {doctorName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-medium">{doctorName}</h3>
              <p className="text-muted-foreground">{doctorSpecialty}</p>
              <p className="mt-1">Appointment: {appointmentTime}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Estimated wait time</span>
              </div>
              <span className="font-medium">{waitTime} min</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Preparing for your consultation</AlertTitle>
            <AlertDescription>
              Please ensure your camera and microphone are working properly. Stay on this page and the doctor will
              connect with you automatically.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">During Your Visit</h4>
              <ul className="text-sm space-y-1">
                <li>• Discuss your symptoms clearly</li>
                <li>• Have your medication list ready</li>
                <li>• Take notes of recommendations</li>
                <li>• Ask questions if anything is unclear</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Technical Tips</h4>
              <ul className="text-sm space-y-1">
                <li>• Use a stable internet connection</li>
                <li>• Find a quiet, well-lit space</li>
                <li>• Headphones improve audio quality</li>
                <li>• Close other applications</li>
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            Leave Queue
          </Button>
          <Button
            className="gap-2"
            onClick={() => router.push(`/patient-portal/telemedicine/consultation/${consultationId}`)}
          >
            <Video className="h-4 w-4" />
            Join Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
