"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Paperclip, Smile } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  sender: "patient" | "doctor"
  timestamp: Date
}

interface ConsultationChatProps {
  consultationId: string
  doctorName: string
  doctorAvatar?: string
  patientName: string
  patientAvatar?: string
}

export function ConsultationChat({
  consultationId,
  doctorName,
  doctorAvatar,
  patientName,
  patientAvatar,
}: ConsultationChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: `Hello ${patientName}, how can I help you today?`,
      sender: "doctor",
      timestamp: new Date(Date.now() - 120000),
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "patient",
      timestamp: new Date(),
    }

    setMessages([...messages, message])
    setNewMessage("")

    // Simulate doctor response after a delay
    setTimeout(() => {
      const doctorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm reviewing your information. Could you please provide more details about your symptoms?",
        sender: "doctor",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, doctorResponse])
    }, 3000)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden bg-background">
      <div className="p-4 border-b bg-muted/30">
        <h3 className="font-medium">Chat with Dr. {doctorName}</h3>
        <p className="text-sm text-muted-foreground">Consultation #{consultationId}</p>
      </div>

      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start gap-2 max-w-[80%]",
                message.sender === "patient" ? "ml-auto flex-row-reverse" : "",
              )}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={message.sender === "doctor" ? doctorAvatar : patientAvatar}
                  alt={message.sender === "doctor" ? doctorName : patientName}
                />
                <AvatarFallback>
                  {message.sender === "doctor" ? doctorName.charAt(0) : patientName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div
                  className={cn(
                    "rounded-lg p-3",
                    message.sender === "patient" ? "bg-primary text-primary-foreground" : "bg-muted",
                  )}
                >
                  {message.content}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{formatTime(message.timestamp)}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage()
          }}
          className="flex items-center gap-2"
        >
          <Button type="button" size="icon" variant="ghost" className="rounded-full">
            <Paperclip className="h-5 w-5" />
            <span className="sr-only">Attach file</span>
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="button" size="icon" variant="ghost" className="rounded-full">
            <Smile className="h-5 w-5" />
            <span className="sr-only">Add emoji</span>
          </Button>
          <Button type="submit" size="icon" className="rounded-full">
            <Send className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  )
}
