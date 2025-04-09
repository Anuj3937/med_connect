"use client"

import { FileText, Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function PatientHealthRecords() {
  const records = [
    {
      id: "rec-1",
      title: "Annual Physical Examination",
      date: "June 15, 2024",
      doctor: "Dr. Sarah Chen",
      type: "Examination",
    },
    {
      id: "rec-2",
      title: "Blood Test Results",
      date: "June 15, 2024",
      doctor: "Lab Services",
      type: "Lab Results",
    },
    {
      id: "rec-3",
      title: "Cardiology Consultation",
      date: "May 22, 2024",
      doctor: "Dr. Michael Rodriguez",
      type: "Consultation",
    },
    {
      id: "rec-4",
      title: "Chest X-Ray",
      date: "May 22, 2024",
      doctor: "Radiology Dept.",
      type: "Imaging",
    },
  ]

  return (
    <div className="space-y-4">
      {records.map((record) => (
        <div key={record.id} className="flex items-center justify-between p-3 border rounded-md">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-blue-100 p-2">
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h4 className="text-sm font-medium">{record.title}</h4>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-1">
                <span className="text-xs text-muted-foreground">{record.date}</span>
                <span className="text-xs text-muted-foreground">{record.doctor}</span>
                <Badge variant="outline" className="text-xs">
                  {record.type}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
