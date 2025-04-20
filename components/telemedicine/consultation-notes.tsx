"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Save, Edit } from "lucide-react"

interface ConsultationNotesProps {
  consultationId: string
  initialNotes?: string
  readOnly?: boolean
}

export function ConsultationNotes({ consultationId, initialNotes = "", readOnly = false }: ConsultationNotesProps) {
  const [notes, setNotes] = useState(initialNotes)
  const [isEditing, setIsEditing] = useState(!readOnly && !initialNotes)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsEditing(false)
    setIsSaving(false)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Consultation Notes</CardTitle>
            <CardDescription>
              {readOnly ? "Doctor's notes from your consultation" : "Take notes during your consultation"}
            </CardDescription>
          </div>
          {!readOnly && !isEditing && (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Type your notes here..."
            className="min-h-[200px]"
          />
        ) : (
          <div className="bg-muted/30 p-3 rounded-md min-h-[200px] whitespace-pre-wrap">
            {notes || (
              <span className="text-muted-foreground italic">
                {readOnly
                  ? "No notes available from this consultation."
                  : "No notes taken yet. Click Edit to add notes."}
              </span>
            )}
          </div>
        )}
      </CardContent>
      {isEditing && !readOnly && (
        <CardFooter>
          <Button onClick={handleSave} disabled={isSaving} className="ml-auto">
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Saving..." : "Save Notes"}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
