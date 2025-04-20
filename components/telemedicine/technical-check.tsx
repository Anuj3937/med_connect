"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Check, X, Mic, Video, Volume2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface TechnicalCheckProps {
  onClose: () => void
}

export function TechnicalCheck({ onClose }: TechnicalCheckProps) {
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(0)
  const [cameraStatus, setCameraStatus] = useState<"checking" | "success" | "error">("checking")
  const [micStatus, setMicStatus] = useState<"checking" | "success" | "error">("checking")
  const [speakerStatus, setSpeakerStatus] = useState<"checking" | "success" | "error">("checking")
  const [connectionStatus, setConnectionStatus] = useState<"checking" | "success" | "error">("checking")

  // Simulate technical checks
  useEffect(() => {
    // Camera check
    const cameraTimer = setTimeout(() => {
      setCameraStatus(Math.random() > 0.2 ? "success" : "error")
      setProgress(25)
    }, 1500)

    // Microphone check
    const micTimer = setTimeout(() => {
      setMicStatus(Math.random() > 0.2 ? "success" : "error")
      setProgress(50)
    }, 3000)

    // Speaker check
    const speakerTimer = setTimeout(() => {
      setSpeakerStatus(Math.random() > 0.2 ? "success" : "error")
      setProgress(75)
    }, 4500)

    // Connection check
    const connectionTimer = setTimeout(() => {
      setConnectionStatus(Math.random() > 0.2 ? "success" : "error")
      setProgress(100)
    }, 6000)

    return () => {
      clearTimeout(cameraTimer)
      clearTimeout(micTimer)
      clearTimeout(speakerTimer)
      clearTimeout(connectionTimer)
    }
  }, [])

  const getStatusIcon = (status: "checking" | "success" | "error") => {
    if (status === "checking") return null
    if (status === "success") return <Check className="h-4 w-4 text-green-500" />
    return <X className="h-4 w-4 text-red-500" />
  }

  const allChecksComplete =
    cameraStatus !== "checking" &&
    micStatus !== "checking" &&
    speakerStatus !== "checking" &&
    connectionStatus !== "checking"
  const allChecksPassed =
    cameraStatus === "success" &&
    micStatus === "success" &&
    speakerStatus === "success" &&
    connectionStatus === "success"

  return (
    <div className="space-y-6">
      <Progress value={progress} className="h-2" />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Video className="h-5 w-5 text-primary" />
            <span>Camera</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">
              {cameraStatus === "checking"
                ? "Checking..."
                : cameraStatus === "success"
                  ? "Working properly"
                  : "Not working"}
            </span>
            {getStatusIcon(cameraStatus)}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mic className="h-5 w-5 text-primary" />
            <span>Microphone</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">
              {micStatus === "checking" ? "Checking..." : micStatus === "success" ? "Working properly" : "Not working"}
            </span>
            {getStatusIcon(micStatus)}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Volume2 className="h-5 w-5 text-primary" />
            <span>Speakers</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">
              {speakerStatus === "checking"
                ? "Checking..."
                : speakerStatus === "success"
                  ? "Working properly"
                  : "Not working"}
            </span>
            {getStatusIcon(speakerStatus)}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.081a1.125 1.125 0 00-1.591 1.591m0 0a1.125 1.125 0 011.591 1.591m0 0a1.125 1.125 0 001.724 1.172m0 0a1.125 1.125 0 011.724 1.172"
              />
            </svg>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">
              {connectionStatus === "checking"
                ? "Checking..."
                : connectionStatus === "success"
                  ? "Working properly"
                  : "Not working"}
            </span>
            {getStatusIcon(connectionStatus)}
          </div>
        </div>
      </div>

      {allChecksComplete && !allChecksPassed && (
        <Alert variant="destructive">
          <AlertDescription>
            Some technical checks failed. Please ensure your camera, microphone, and speakers are working properly.
          </AlertDescription>
        </Alert>
      )}

      {allChecksComplete && allChecksPassed && (
        <Alert>
          <AlertDescription>All technical checks passed. You are ready to start the consultation.</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-end">
        <Button onClick={onClose} disabled={!allChecksComplete}>
          {allChecksPassed ? "Start Consultation" : "Close"}
        </Button>
      </div>
    </div>
  )
}
