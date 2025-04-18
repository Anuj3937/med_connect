"use client"

import type React from "react"

import { useState } from "react"
import { Clock, Calendar, AlertCircle, MoreHorizontal, Pill } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function PatientMedicationsList() {
  const { toast } = useToast()
  const [medications, setMedications] = useState([
    {
      id: "med-1",
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      startDate: "2023-10-15",
      endDate: "2024-12-31",
      refillsRemaining: 2,
      lastRefill: "2024-06-01",
      nextRefill: "2024-07-01",
      instructions: "Take in the morning with food",
      prescribedBy: "Dr. Sarah Chen",
      status: "active",
      supplyRemaining: 80,
    },
    {
      id: "med-2",
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      startDate: "2023-11-20",
      endDate: "2024-11-20",
      refillsRemaining: 1,
      lastRefill: "2024-05-20",
      nextRefill: "2024-06-20",
      instructions: "Take with meals",
      prescribedBy: "Dr. Michael Rodriguez",
      status: "active",
      supplyRemaining: 30,
    },
    {
      id: "med-3",
      name: "Atorvastatin",
      dosage: "20mg",
      frequency: "Once daily",
      startDate: "2024-01-10",
      endDate: "2025-01-10",
      refillsRemaining: 3,
      lastRefill: "2024-05-10",
      nextRefill: "2024-07-10",
      instructions: "Take in the evening",
      prescribedBy: "Dr. Sarah Chen",
      status: "active",
      supplyRemaining: 60,
    },
  ])
  const [showRefillDialog, setShowRefillDialog] = useState(false)
  const [selectedMedication, setSelectedMedication] = useState<string | null>(null)
  const [showReminderDialog, setShowReminderDialog] = useState(false)

  const handleRefillRequest = (id: string) => {
    setSelectedMedication(id)
    setShowRefillDialog(true)
  }

  const submitRefillRequest = (event: React.FormEvent) => {
    event.preventDefault()

    // In a real app, we would submit the refill request
    // For now, let's just update the state and show a toast
    setMedications(
      medications.map((med) =>
        med.id === selectedMedication
          ? { ...med, refillsRemaining: med.refillsRemaining - 1, supplyRemaining: 100 }
          : med,
      ),
    )

    toast({
      title: "Refill requested",
      description: "Your medication refill request has been submitted.",
    })

    setShowRefillDialog(false)
    setSelectedMedication(null)
  }

  const setupReminder = (event: React.FormEvent) => {
    event.preventDefault()

    toast({
      title: "Reminder set",
      description: "Medication reminder has been set up successfully.",
    })

    setShowReminderDialog(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
            Active
          </Badge>
        )
      case "expired":
        return (
          <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
            Expired
          </Badge>
        )
      case "discontinued":
        return (
          <Badge variant="outline" className="text-gray-500 border-gray-200 bg-gray-50">
            Discontinued
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-4">
      {medications.map((medication) => (
        <div key={medication.id} className="rounded-lg border p-4 hover:shadow-sm transition-shadow">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                {getStatusBadge(medication.status)}
                <span className="text-sm font-medium">{medication.dosage}</span>
              </div>
              <h4 className="font-medium flex items-center">
                <Pill className="h-4 w-4 mr-1 text-blue-600" />
                {medication.name}
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                {medication.frequency} - {medication.instructions}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>Prescribed: {new Date(medication.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>Next refill: {new Date(medication.nextRefill).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span>Supply Remaining</span>
                  <span>{medication.supplyRemaining}%</span>
                </div>
                <Progress
                  value={medication.supplyRemaining}
                  className="h-2"
                  indicatorClassName={
                    medication.supplyRemaining < 30
                      ? "bg-red-500"
                      : medication.supplyRemaining < 60
                        ? "bg-amber-500"
                        : "bg-green-500"
                  }
                />
              </div>

              {medication.supplyRemaining < 30 && (
                <div className="flex items-center gap-1 mt-2 text-xs text-red-600">
                  <AlertCircle className="h-3 w-3" />
                  <span>Low supply - consider requesting a refill</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {medication.refillsRemaining > 0 && (
                <Button size="sm" variant="outline" onClick={() => handleRefillRequest(medication.id)}>
                  Request Refill ({medication.refillsRemaining})
                </Button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowReminderDialog(true)}>Set Reminder</DropdownMenuItem>
                  <DropdownMenuItem>View Side Effects</DropdownMenuItem>
                  <DropdownMenuItem>Contact Doctor</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      ))}

      {medications.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">You have no active medications.</p>
        </div>
      )}

      {/* Refill Request Dialog */}
      <Dialog open={showRefillDialog} onOpenChange={setShowRefillDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={submitRefillRequest}>
            <DialogHeader>
              <DialogTitle>Request Medication Refill</DialogTitle>
              <DialogDescription>
                Submit a request for a refill of your medication. Your pharmacy will be notified.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Medication</Label>
                <div className="p-2 border rounded-md bg-muted/50">
                  {selectedMedication && medications.find((med) => med.id === selectedMedication)?.name} -
                  {selectedMedication && medications.find((med) => med.id === selectedMedication)?.dosage}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pharmacy">Pharmacy</Label>
                <Input id="pharmacy" defaultValue="Walgreens - 123 Main St" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Input id="notes" placeholder="Any special instructions for this refill" />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowRefillDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">Submit Refill Request</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Reminder Dialog */}
      <Dialog open={showReminderDialog} onOpenChange={setShowReminderDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={setupReminder}>
            <DialogHeader>
              <DialogTitle>Set Medication Reminder</DialogTitle>
              <DialogDescription>Set up reminders to help you remember to take your medication.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="reminder-time">Reminder Time</Label>
                <Input id="reminder-time" type="time" defaultValue="08:00" required />
              </div>
              <div className="grid gap-2">
                <Label>Repeat</Label>
                <div className="flex flex-wrap gap-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <Button
                      key={day}
                      type="button"
                      variant="outline"
                      className="h-8 w-8 p-0 data-[selected=true]:bg-blue-100 data-[selected=true]:text-blue-700 data-[selected=true]:border-blue-300"
                      data-selected={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].includes(day)}
                    >
                      {day[0]}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="reminder-method">Reminder Method</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 data-[selected=true]:bg-blue-100 data-[selected=true]:text-blue-700 data-[selected=true]:border-blue-300"
                    data-selected={true}
                  >
                    App
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 data-[selected=true]:bg-blue-100 data-[selected=true]:text-blue-700 data-[selected=true]:border-blue-300"
                    data-selected={true}
                  >
                    Email
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 data-[selected=true]:bg-blue-100 data-[selected=true]:text-blue-700 data-[selected=true]:border-blue-300"
                    data-selected={false}
                  >
                    SMS
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowReminderDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Reminder</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
