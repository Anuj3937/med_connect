"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Upload, Download, Trash2, Eye, File } from "lucide-react"
import { cn } from "@/lib/utils"

interface Document {
  id: string
  name: string
  type: string
  size: string
  uploadedBy: "patient" | "doctor"
  uploadedAt: Date
}

interface DocumentSharingProps {
  consultationId: string
}

export function DocumentSharing({ consultationId }: DocumentSharingProps) {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Previous Lab Results.pdf",
      type: "pdf",
      size: "2.4 MB",
      uploadedBy: "patient",
      uploadedAt: new Date(Date.now() - 3600000),
    },
    {
      id: "2",
      name: "Treatment Plan.docx",
      type: "docx",
      size: "1.8 MB",
      uploadedBy: "doctor",
      uploadedAt: new Date(Date.now() - 1800000),
    },
  ])

  const handleDeleteDocument = (id: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id))
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-5 w-5 text-red-500" />
      case "docx":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "jpg":
      case "png":
        return <FileText className="h-5 w-5 text-green-500" />
      default:
        return <File className="h-5 w-5" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Shared Documents</CardTitle>
        <CardDescription>Share and view documents related to your consultation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {documents.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No documents shared yet</div>
          ) : (
            <div className="space-y-2">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg",
                    doc.uploadedBy === "doctor" ? "bg-blue-50 dark:bg-blue-950/20" : "bg-muted/50",
                  )}
                >
                  <div className="flex items-center gap-3">
                    {getFileIcon(doc.type)}
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {doc.size} • {formatDate(doc.uploadedAt)} • Uploaded by{" "}
                        {doc.uploadedBy === "doctor" ? "Doctor" : "You"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                    {doc.uploadedBy === "patient" && (
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-destructive"
                        onClick={() => handleDeleteDocument(doc.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </CardFooter>
    </Card>
  )
}
