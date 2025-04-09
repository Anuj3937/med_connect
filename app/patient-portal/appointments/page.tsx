"use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon, Clock, Filter, MapPin, Plus, Search } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { PatientAppointmentsList } from "@/components/patient/patient-appointments-list"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

export default function AppointmentsPage() {
  const { toast } = useToast()
  const [date, setDate] = useState<Date>()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterSpecialty, setFilterSpecialty] = useState<string | null>(null)
  const [showScheduleDialog, setShowScheduleDialog] = useState(false)

  const handleScheduleAppointment = (event: React.FormEvent) => {
    event.preventDefault()
    setShowScheduleDialog(false)
    toast({
      title: "Appointment scheduled",
      description: "Your appointment has been scheduled successfully.",
    })
  }

  return (
    <div className="container py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
        <p className="text-muted-foreground">Manage your upcoming appointments and schedule new ones.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Your Appointments</CardTitle>
                  <CardDescription>View and manage your upcoming appointments</CardDescription>
                </div>
                <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Schedule Appointment
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <form onSubmit={handleScheduleAppointment}>
                      <DialogHeader>
                        <DialogTitle>Schedule New Appointment</DialogTitle>
                        <DialogDescription>
                          Fill in the details to schedule your appointment with a healthcare provider.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="specialty">Specialty</Label>
                          <Select required>
                            <SelectTrigger id="specialty">
                              <SelectValue placeholder="Select specialty" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cardiology">Cardiology</SelectItem>
                              <SelectItem value="dermatology">Dermatology</SelectItem>
                              <SelectItem value="endocrinology">Endocrinology</SelectItem>
                              <SelectItem value="neurology">Neurology</SelectItem>
                              <SelectItem value="orthopedics">Orthopedics</SelectItem>
                              <SelectItem value="pediatrics">Pediatrics</SelectItem>
                              <SelectItem value="primary">Primary Care</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="doctor">Doctor</Label>
                          <Select required>
                            <SelectTrigger id="doctor">
                              <SelectValue placeholder="Select doctor" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="dr-chen">Dr. Sarah Chen</SelectItem>
                              <SelectItem value="dr-rodriguez">Dr. Michael Rodriguez</SelectItem>
                              <SelectItem value="dr-johnson">Dr. Emily Johnson</SelectItem>
                              <SelectItem value="dr-patel">Dr. Raj Patel</SelectItem>
                              <SelectItem value="dr-williams">Dr. David Williams</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label>Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !date && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : "Select date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                                disabled={(date) => date < new Date()}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="time">Time</Label>
                          <Select required>
                            <SelectTrigger id="time">
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="9:00">9:00 AM</SelectItem>
                              <SelectItem value="9:30">9:30 AM</SelectItem>
                              <SelectItem value="10:00">10:00 AM</SelectItem>
                              <SelectItem value="10:30">10:30 AM</SelectItem>
                              <SelectItem value="11:00">11:00 AM</SelectItem>
                              <SelectItem value="11:30">11:30 AM</SelectItem>
                              <SelectItem value="1:00">1:00 PM</SelectItem>
                              <SelectItem value="1:30">1:30 PM</SelectItem>
                              <SelectItem value="2:00">2:00 PM</SelectItem>
                              <SelectItem value="2:30">2:30 PM</SelectItem>
                              <SelectItem value="3:00">3:00 PM</SelectItem>
                              <SelectItem value="3:30">3:30 PM</SelectItem>
                              <SelectItem value="4:00">4:00 PM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="reason">Reason for Visit</Label>
                          <Input id="reason" placeholder="Brief description of your visit" required />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setShowScheduleDialog(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">Schedule Appointment</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search appointments..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                      {filterSpecialty && (
                        <Badge variant="secondary" className="ml-2">
                          1
                        </Badge>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Filter Appointments</h4>
                        <p className="text-sm text-muted-foreground">Filter appointments by specialty or status</p>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="specialty-filter">Specialty</Label>
                        <Select
                          value={filterSpecialty || ""}
                          onValueChange={(value) => setFilterSpecialty(value || null)}
                        >
                          <SelectTrigger id="specialty-filter">
                            <SelectValue placeholder="All specialties" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All specialties</SelectItem>
                            <SelectItem value="cardiology">Cardiology</SelectItem>
                            <SelectItem value="dermatology">Dermatology</SelectItem>
                            <SelectItem value="endocrinology">Endocrinology</SelectItem>
                            <SelectItem value="neurology">Neurology</SelectItem>
                            <SelectItem value="orthopedics">Orthopedics</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="status-filter">Status</Label>
                        <Select>
                          <SelectTrigger id="status-filter">
                            <SelectValue placeholder="All statuses" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All statuses</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button variant="outline" onClick={() => setFilterSpecialty(null)}>
                        Reset Filters
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <PatientAppointmentsList />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Previous</Button>
              <Button variant="outline">Next</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointment</CardTitle>
              <CardDescription>Your next scheduled appointment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="font-semibold">Dr. Sarah Chen</h3>
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Cardiology</Badge>
                  <div className="flex items-center text-sm text-muted-foreground mt-2">
                    <CalendarIcon className="mr-1 h-4 w-4" />
                    <span>Tomorrow, July 15, 2024</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>9:30 AM</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-4 w-4" />
                    <span>Memorial General Hospital</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Appointment Notes</h4>
                  <p className="text-sm text-muted-foreground">
                    Follow-up appointment for blood pressure monitoring and medication review.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Preparation</h4>
                  <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                    <li>Bring current medications</li>
                    <li>Bring blood pressure log</li>
                    <li>Fast for 8 hours before appointment</li>
                    <li>Arrive 15 minutes early</li>
                  </ul>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">Check In Online</Button>
                  <Button variant="outline" className="flex-1">
                    Reschedule
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Find a Doctor</CardTitle>
              <CardDescription>Search for healthcare providers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search by name or specialty..." className="pl-8" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="justify-start">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                    Cardiology
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                    Primary Care
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
                    Pediatrics
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <span className="w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
                    Dermatology
                  </Button>
                </div>
                <Button className="w-full">Find Available Doctors</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
