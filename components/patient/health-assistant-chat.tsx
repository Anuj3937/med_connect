"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertCircle, Send, X, ImageIcon, FileText, Mic, Paperclip, Bot, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { GoogleGenerativeAI } from '@google/generative-ai'

interface Message {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
  attachments?: {
    type: "image" | "pdf" | "audio" | "text"
    name: string
    url: string
  }[]
}

interface HealthAssistantChatProps {
  onClose: () => void
}

export function HealthAssistantChat({ onClose }: HealthAssistantChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "Hello! I'm your Health Assistant. I can help interpret your lab results and answer health-related questions. How can I assist you today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [attachments, setAttachments] = useState<
    {
      type: "image" | "pdf" | "audio" | "text"
      name: string
      url: string
    }[]
  >([])
  const [chatHistory, setChatHistory] = useState<{role: string, parts: {text: string}[]}[]>([
    {
      role: "user",
      parts: [{ text: "Hello" }],
    },
    {
      role: "model",
      parts: [{ text: "Hello! I'm your Health Assistant. I can help interpret your lab results and answer health-related questions. How can I assist you today?" }],
    },
  ])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  
  // Initialize the Gemini API client
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "" && attachments.length === 0) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
      attachments: attachments.length > 0 ? [...attachments] : undefined,
    }

    setMessages((prev) => [...prev, newMessage])
    setInputMessage("")
    setIsLoading(true)

    // Update chat history with the new user message
    const updatedHistory = [
      ...chatHistory,
      {
        role: "user",
        parts: [{ text: inputMessage }],
      },
    ];
    setChatHistory(updatedHistory);

    try {
      // Create a chat session
      const chat = model.startChat({
        history: chatHistory,
        generationConfig: {
          maxOutputTokens: 1000,
        },
      });

      // Send the message to the Gemini API
      const result = await chat.sendMessage(inputMessage);
      const response = await result.response;
      const responseText = response.text();

      // Add the AI response to the messages
      const assistantResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: responseText,
        sender: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantResponse])
      
      // Update chat history with the AI response
      setChatHistory([
        ...updatedHistory,
        {
          role: "model",
          parts: [{ text: responseText }],
        },
      ]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      
      // Add an error message if the API call fails
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I encountered an error processing your request. Please try again later.",
        sender: "assistant",
        timestamp: new Date(),
      }
      
      setMessages((prev) => [...prev, errorResponse])
    } finally {
      setIsLoading(false)
      setAttachments([])
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    const newAttachments = Array.from(files).map((file) => {
      let type: "image" | "pdf" | "audio" | "text" = "text"

      if (file.type.startsWith("image/")) {
        type = "image"
      } else if (file.type === "application/pdf") {
        type = "pdf"
      } else if (file.type.startsWith("audio/")) {
        type = "audio"
      }

      return {
        type,
        name: file.name,
        url: URL.createObjectURL(file),
      }
    })

    setAttachments((prev) => [...prev, ...newAttachments])

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index))
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl h-[80vh] flex flex-col">
        <CardHeader className="border-b px-4 py-3 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            Health Assistant
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </CardHeader>

        <Alert
          variant="warning"
          className="mx-4 mt-4 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800"
        >
          <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <AlertDescription className="text-amber-700 dark:text-amber-300 text-sm">
            This AI assistant provides general information only. Always consult with healthcare professionals before
            making medical decisions.
          </AlertDescription>
        </Alert>

        <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn("flex gap-3 max-w-[85%]", message.sender === "user" ? "ml-auto flex-row-reverse" : "")}
              >
                <Avatar className="h-8 w-8">
                  {message.sender === "assistant" ? (
                    <>
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Health Assistant" />
                      <AvatarFallback className="bg-primary text-primary-foreground">HA</AvatarFallback>
                    </>
                  ) : (
                    <>
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="You" />
                      <AvatarFallback>You</AvatarFallback>
                    </>
                  )}
                </Avatar>
                <div>
                  <div
                    className={cn(
                      "rounded-lg p-3",
                      message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                    )}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>

                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {message.attachments.map((attachment, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 rounded bg-background/50">
                            {attachment.type === "image" && <ImageIcon className="h-4 w-4" />}
                            {attachment.type === "pdf" && <FileText className="h-4 w-4" />}
                            {attachment.type === "audio" && <Mic className="h-4 w-4" />}
                            {attachment.type === "text" && <FileText className="h-4 w-4" />}
                            <span className="text-xs truncate">{attachment.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{formatTime(message.timestamp)}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Health Assistant" />
                  <AvatarFallback className="bg-primary text-primary-foreground">HA</AvatarFallback>
                </Avatar>
                <div className="rounded-lg p-3 bg-muted flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <p className="text-sm">Analyzing your information...</p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {attachments.length > 0 && (
          <div className="px-4 py-2 border-t">
            <div className="flex flex-wrap gap-2">
              {attachments.map((attachment, index) => (
                <div key={index} className="flex items-center gap-1 bg-muted rounded-full pl-2 pr-1 py-1">
                  {attachment.type === "image" && <ImageIcon className="h-3 w-3" />}
                  {attachment.type === "pdf" && <FileText className="h-3 w-3" />}
                  {attachment.type === "audio" && <Mic className="h-3 w-3" />}
                  {attachment.type === "text" && <FileText className="h-3 w-3" />}
                  <span className="text-xs truncate max-w-[100px]">{attachment.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 rounded-full"
                    onClick={() => removeAttachment(index)}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <CardFooter className="border-t p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 w-full">
            <Textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your health question or describe your lab results..."
              className="flex-1 min-h-[60px] max-h-[120px]"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
            />
            <div className="flex flex-col gap-2">
              <Button type="button" size="icon" variant="outline" onClick={() => fileInputRef.current?.click()}>
                <Paperclip className="h-4 w-4" />
                <span className="sr-only">Attach file</span>
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileUpload}
                multiple
                accept="image/*,application/pdf,audio/*,text/*"
              />
              <Button type="button" size="icon" onClick={handleSendMessage} disabled={isLoading}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            You can upload lab reports, images, or audio recordings to get more accurate assistance.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
