"use client"

import { useState } from "react"
import { Calendar, Clock, Video, FileText, Download, Search, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"

export function ConsultationHistory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterSpecialty, setFilterSpecialty] = useState<string | null>(null)

  const consultations = [
    {
      id: "cons-past-1",
      doctor: "Dr. Sarah Chen",
      specialty: "Cardiology",
      date: "June 15, 2024",
      time: "2:30 PM",
      duration: "25 minutes",
      notes: "Discussed blood pressure management and medication adjustments.",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "cons-past-2",
      doctor: "Dr. Michael Rodriguez",
      specialty: "Endocrinology",
      date: "May 28, 2024",
      time: "10:00 AM",
      duration: "30 minutes",
      notes: "Reviewed diabetes management plan and recent lab results.",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "cons-past-3",
      doctor: "Dr. Emily Johnson",
      specialty: "Dermatology",
      date: "May 10, 2024",
      time: "3:15 PM",
      duration: "15 minutes",
      notes: "Examined skin condition and prescribed topical treatment.",
      image: "/placeholder.svg?height=40&width=40",
    },
  ]

  // Filter consultations based on search query and specialty filter
  const filteredConsultations = consultations.filter((consultation) => {
    if (
      searchQuery &&
      !consultation.doctor.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !consultation.specialty.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !consultation.notes.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    if (filterSpecialty && consultation.specialty !== filterSpecialty) {
      return false
    }

    return true
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search consultations..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filterSpecialty || ""} onValueChange={(value) => setFilterSpecialty(value || null)}>
          <SelectTrigger className="w-[180px]">
            <div className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              <span>{filterSpecialty || "Filter Specialty"}</span>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Specialties</SelectItem>
            <SelectItem value="Cardiology">Cardiology</SelectItem>
            <SelectItem value="Dermatology">Dermatology</SelectItem>
            <SelectItem value="Endocrinology">Endocrinology</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredConsultations.map((consultation) => (
        <Card key={consultation.id}>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={consultation.image || "/placeholder.svg"} alt={consultation.doctor} />
                  <AvatarFallback>{consultation.doctor.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-gray-500 border-gray-200 bg-gray-50">
                      Completed
                    </Badge>
                    <span className="text-sm font-medium">{consultation.specialty} Consultation</span>
                  </div>
                  <h4 className="font-medium">{consultation.doctor}</h4>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{consultation.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{consultation.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Video className="h-3 w-3" />
                      <span>{consultation.duration}</span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm">{consultation.notes}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  View Summary
                </Button>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {filteredConsultations.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No consultation history found.</p>
          <Button
            className="mt-4"
            variant="outline"
            onClick={() => {
              setSearchQuery("")
              setFilterSpecialty(null)
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
