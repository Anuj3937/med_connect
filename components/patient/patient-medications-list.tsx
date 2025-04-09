"use client"

import { useState } from "react"
import { Clock, MoreHorizontal, Pill } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"

export function PatientMedicationsList() {
  const { toast } = useToast()
  const [medications, setMedications] = useState([
    {
      id: "med-1",
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      nextDose: "Today, 8:00 PM",
      refillsLeft: 2,
      supply: 12,
      instructions: "Take with food",
      status: "active",
    },
    {
      id: "med-2",
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      nextDose: "Today, 6:00 PM",
      refillsLeft: 0,
      supply: 3,
      instructions: "Take with meals",
      status: "refill-needed",
    },
    {
      id: "med-3",
      name: "Atorvastatin",
      dosage: "20mg",
      frequency: "Once daily",
      nextDose: "Today, 9:00 PM",
      refillsLeft: 1,
      supply: 15,
      instructions: "Take at bedtime",
      status: "active",
    },
    {
      id: "med-4",
      name: "Levothyroxine",
      dosage: "75mcg",
      frequency: "Once daily",
      nextDose: "Tomorrow, 7:00 AM",
      refillsLeft: 3,
      supply: 25,
      instructions: "Take on empty stomach",
      status: "active",
    },
  ])

  const handleRequestRefill = (id: string) => {
    toast({
      title: "Refill requested",
      description: "Your medication refill request has been sent to your doctor.",
    })
  }

  const handleMarkAsTaken = (id: string) => {
    toast({
      title: "Medication marked as taken",
      description: "Your medication has been marked as taken.",
    })
  }

  const getStatusBadge = (status: string, supply: number) => {
    if (status === "refill-needed") {
      return (
        <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
          Refill Needed
        </Badge>
      )
    } else if (supply <= 5) {
      return (
        <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
          Low Supply
        </Badge>
      )
    } else {
      return (
        <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
          Active
        </Badge>
      )
    }
  }

  return (
    <div className="space-y-4">
      {medications.map((medication) => (
        <div key={medication.id} className="rounded-lg border p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                {getStatusBadge(medication.status, medication.supply)}
                <span className="text-sm font-medium">
                  {medication.name} {medication.dosage}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {medication.frequency} - {medication.instructions}
              </p>

              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Supply remaining:</span>
                  <span>{medication.supply} days</span>
                </div>
                <Progress value={(medication.supply / 30) * 100} className="h-2" />
              </div>

              <div className="flex items-center gap-4 mt-3 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span>Next dose: {medication.nextDose}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Pill className="h-3 w-3 text-muted-foreground" />
                  <span>Refills left: {medication.refillsLeft}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {medication.status === "refill-needed" || medication.refillsLeft === 0 ? (
                <Button size="sm" onClick={() => handleRequestRefill(medication.id)}>
                  Request Refill
                </Button>
              ) : (
                <Button size="sm" variant="outline" onClick={() => handleMarkAsTaken(medication.id)}>
                  Mark as Taken
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
                  <DropdownMenuItem>Set Reminder</DropdownMenuItem>
                  <DropdownMenuItem>View Side Effects</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
