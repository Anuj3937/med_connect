"use client"

import type React from "react"

import { Users, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

type ActionItem = {
  id: string
  icon: React.ReactNode
  iconColor: string
  title: string
  description: string
  status: "pending" | "in-progress" | "completed"
}

export function RecommendedActions() {
  const { toast } = useToast()
  const [actions, setActions] = useState<ActionItem[]>([
    {
      id: "action-1",
      icon: <Users className="h-5 w-5" />,
      iconColor: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-200",
      title: "Increase Staffing in ZIP 12345",
      description: "20% predicted increase in ER visits within 6 weeks due to rising eviction rates",
      status: "pending",
    },
    {
      id: "action-2",
      icon: <MapPin className="h-5 w-5" />,
      iconColor: "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400",
      title: "Deploy Mobile Clinic to ZIP 23456",
      description: "15% increase in chronic condition management needs due to unemployment spike",
      status: "pending",
    },
    {
      id: "action-3",
      icon: <Calendar className="h-5 w-5" />,
      iconColor: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200",
      title: "Schedule Preventive Care Outreach in ZIP 34567",
      description: "School attendance dropping, indicating potential infectious disease spread",
      status: "pending",
    },
  ])

  const handleAction = (id: string) => {
    setActions((prevActions) =>
      prevActions.map((action) =>
        action.id === id ? { ...action, status: action.status === "pending" ? "in-progress" : "completed" } : action,
      ),
    )

    toast({
      title: "Action initiated",
      description: "The recommended action has been added to your task list.",
    })
  }

  return (
    <div className="space-y-4">
      {actions.map((action) => (
        <div key={action.id} className="rounded-lg border p-4">
          <div className="flex items-center gap-4">
            <div className={`rounded-full ${action.iconColor} p-2`}>{action.icon}</div>
            <div>
              <h3 className="font-medium">{action.title}</h3>
              <p className="text-sm text-muted-foreground">{action.description}</p>
            </div>
            <Button
              size="sm"
              className="ml-auto"
              variant={action.status === "completed" ? "outline" : "default"}
              disabled={action.status === "completed"}
              onClick={() => handleAction(action.id)}
            >
              {action.status === "pending"
                ? "Take Action"
                : action.status === "in-progress"
                  ? "Mark Complete"
                  : "Completed"}
            </Button>
          </div>
        </div>
      ))}

      {actions.length === 0 && (
        <div className="rounded-lg border p-4 text-center text-muted-foreground">
          No recommended actions at this time.
        </div>
      )}
    </div>
  )
}
