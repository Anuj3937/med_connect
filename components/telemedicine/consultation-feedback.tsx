"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface ConsultationFeedbackProps {
  consultationId: string
  doctorName: string
}

export function ConsultationFeedback({ consultationId, doctorName }: ConsultationFeedbackProps) {
  const [rating, setRating] = useState<number | null>(null)
  const [feedback, setFeedback] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async () => {
    if (!rating) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  if (isSubmitted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Thank You!</CardTitle>
          <CardDescription>Your feedback has been submitted successfully.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6 space-y-2">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    "h-8 w-8",
                    star <= (rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground",
                  )}
                />
              ))}
            </div>
            <p className="text-center mt-4">
              Your rating: <strong>{rating}/5</strong>
            </p>
            {feedback && (
              <div className="mt-4 bg-muted/30 p-4 rounded-md w-full">
                <p className="font-medium">Your feedback:</p>
                <p className="mt-2">{feedback}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Rate Your Experience</CardTitle>
        <CardDescription>Please rate your consultation with Dr. {doctorName}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <Label className="text-base">How would you rate this consultation?</Label>
            <div className="flex items-center justify-center mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" onClick={() => setRating(star)} className="p-1">
                  <Star
                    className={cn(
                      "h-8 w-8 transition-all",
                      star <= (rating || 0)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground hover:text-yellow-400",
                    )}
                  />
                  <span className="sr-only">{star} stars</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="feedback" className="text-base">
              Additional feedback (optional)
            </Label>
            <Textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your thoughts about the consultation..."
              className="mt-2"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} disabled={!rating || isSubmitting} className="w-full">
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </Button>
      </CardFooter>
    </Card>
  )
}
