"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mic, MicOff, Monitor, Phone, Video, VideoOff } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface VideoConsultationProps {
  consultationId: string
  doctorName: string
  doctorImage?: string
  patientName: string
  patientImage?: string
  onEndCall?: () => void
}

export function VideoConsultation({
  consultationId,
  doctorName,
  doctorImage,
  patientName,
  patientImage,
  onEndCall,
}: VideoConsultationProps) {
  // Mock video call state
  const [isMicMuted, setIsMicMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "disconnected">("connecting")
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")

  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)

  // Simulate connection after component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setConnectionStatus("connected")
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const toggleMic = () => setIsMicMuted(!isMicMuted)
  const toggleVideo = () => setIsVideoOff(!isVideoOff)
  const shareScreen = () => alert("Screen sharing functionality would be implemented here")

  const endCall = () => {
    setConnectionStatus("disconnected")
    if (onEndCall) onEndCall()
  }

  return (
    <div className={cn("grid gap-4", isFullScreen ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-3")}>
      <div className={cn("relative", isFullScreen ? "col-span-1" : "lg:col-span-2")}>
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
          {connectionStatus === "connected" ? (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              {/* This would be the remote video stream in a real implementation */}
              <Avatar className="h-24 w-24">
                <AvatarImage src={doctorImage || "/placeholder.svg"} alt={doctorName} />
                <AvatarFallback>
                  {doctorName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={doctorImage || "/placeholder.svg"} alt={doctorName} />
                  <AvatarFallback>
                    {doctorName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-medium text-white">{doctorName}</h3>
                <p className="text-gray-300 mt-2">
                  {connectionStatus === "connecting" ? "Connecting..." : "Waiting for doctor to join..."}
                </p>
              </div>
            </div>
          )}

          {/* Local video (picture-in-picture) */}
          <div className="absolute bottom-4 right-4 w-1/4 aspect-video rounded overflow-hidden border-2 border-background shadow-lg">
            <div className="w-full h-full bg-gray-600">
              {/* This would be the local video stream in a real implementation */}
              {isVideoOff && (
                <div className="absolute inset-0 bg-muted flex items-center justify-center">
                  <Avatar>
                    <AvatarImage src={patientImage || "/placeholder.svg"} alt={patientName} />
                    <AvatarFallback>
                      {patientName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
              )}
            </div>
          </div>

          {/* Call duration */}
          <div className="absolute top-4 left-4 bg-background/80 text-foreground px-3 py-1 rounded-full text-sm font-medium">
            {connectionStatus === "connected" ? "00:12:34" : "Not connected"}
          </div>

          {/* Call controls */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            <Card className="bg-background/80 backdrop-blur-sm flex items-center p-2 rounded-full">
              <Button
                size="icon"
                variant={isMicMuted ? "destructive" : "ghost"}
                onClick={toggleMic}
                className="rounded-full"
              >
                {isMicMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>
              <Button
                size="icon"
                variant={isVideoOff ? "destructive" : "ghost"}
                onClick={toggleVideo}
                className="rounded-full"
              >
                {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
              </Button>
              <Button size="icon" variant="ghost" onClick={shareScreen} className="rounded-full">
                <Monitor className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="destructive" onClick={endCall} className="rounded-full">
                <Phone className="h-5 w-5 rotate-[135deg]" />
              </Button>
            </Card>
          </div>
        </div>

        {/* Toggle fullscreen button */}
        <Button variant="outline" size="sm" className="mt-2" onClick={() => setIsFullScreen(!isFullScreen)}>
          {isFullScreen ? "Exit Full Screen" : "Full Screen"}
        </Button>
      </div>

      {!isFullScreen && (
        <div className="lg:col-span-1">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>
            <TabsContent value="chat" className="m-0">
              <div className="border rounded-md p-4 h-[400px] overflow-y-auto">
                <p className="text-center text-muted-foreground">Chat functionality would be implemented here</p>
              </div>
            </TabsContent>
            <TabsContent value="documents" className="m-0">
              <div className="border rounded-md p-4 h-[400px] overflow-y-auto">
                <p className="text-center text-muted-foreground">Document sharing would be implemented here</p>
              </div>
            </TabsContent>
            <TabsContent value="notes" className="m-0">
              <div className="border rounded-md p-4 h-[400px] overflow-y-auto">
                <p className="text-center text-muted-foreground">Notes functionality would be implemented here</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
