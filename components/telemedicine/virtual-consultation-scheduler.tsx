"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const FormSchema = z.object({
  specialty: z.string({
    required_error: "Please select a specialty.",
  }),
  doctor: z.string({
    required_error: "Please select a doctor.",
  }),
  date: z.date({
    required_error: "Please select a date.",
  }),
  time: z.string({
    required_error: "Please select a time.",
  }),
  reason: z.string().min(5, {
    message: "Reason must be at least 5 characters.",
  }),
  consultationType: z.string().default("video"),
})

export function VirtualConsultationScheduler() {
  const { toast } = useToast()
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      specialty: "",
      doctor: "",
      reason: "",
      consultationType: "video",
    },
  })

  const doctors = [
    {
      id: "dr-chen",
      name: "Dr. Sarah Chen",
      specialty: "Cardiology",
      image: "/placeholder.svg?height=40&width=40",
      availability: "High",
      nextAvailable: "Today",
    },
    {
      id: "dr-rodriguez",
      name: "Dr. Michael Rodriguez",
      specialty: "Endocrinology",
      image: "/placeholder.svg?height=40&width=40",
      availability: "Medium",
      nextAvailable: "Tomorrow",
    },
    {
      id: "dr-johnson",
      name: "Dr. Emily Johnson",
      specialty: "Dermatology",
      image: "/placeholder.svg?height=40&width=40",
      availability: "Low",
      nextAvailable: "July 18",
    },
    {
      id: "dr-patel",
      name: "Dr. Raj Patel",
      specialty: "Neurology",
      image: "/placeholder.svg?height=40&width=40",
      availability: "Medium",
      nextAvailable: "July 20",
    },
  ]

  const availableTimes = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
  ]

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "Consultation scheduled",
      description: `Your ${data.consultationType} consultation with ${data.doctor} has been scheduled for ${format(data.date, "PPP")} at ${data.time}.`,
    })
    form.reset()
    setSelectedDoctor(null)
  }

  const watchSpecialty = form.watch("specialty")
  const filteredDoctors = doctors.filter((doctor) => !watchSpecialty || doctor.specialty === watchSpecialty)

  const handleDoctorSelect = (doctorId: string) => {
    form.setValue("doctor", doctorId)
    setSelectedDoctor(doctorId)
  }

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case "High":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
            High Availability
          </Badge>
        )
      case "Medium":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
            Medium Availability
          </Badge>
        )
      case "Low":
        return (
          <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
            Limited Availability
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <FormField
                control={form.control}
                name="specialty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specialty</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select specialty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Cardiology">Cardiology</SelectItem>
                        <SelectItem value="Dermatology">Dermatology</SelectItem>
                        <SelectItem value="Endocrinology">Endocrinology</SelectItem>
                        <SelectItem value="Neurology">Neurology</SelectItem>
                        <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                        <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                        <SelectItem value="Primary Care">Primary Care</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-6">
                <FormLabel>Select Doctor</FormLabel>
                <div className="grid gap-4 mt-2">
                  {filteredDoctors.map((doctor) => (
                    <Card
                      key={doctor.id}
                      className={cn(
                        "cursor-pointer transition-colors",
                        selectedDoctor === doctor.id ? "border-primary bg-primary/5" : "hover:border-primary/50",
                      )}
                      onClick={() => handleDoctorSelect(doctor.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={doctor.image || "/placeholder.svg"} alt={doctor.name} />
                            <AvatarFallback>{doctor.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{doctor.name}</h4>
                            <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                            <div className="flex items-center gap-2 mt-2">
                              {getAvailabilityBadge(doctor.availability)}
                              <span className="text-xs">Next: {doctor.nextAvailable}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {filteredDoctors.length === 0 && (
                    <p className="text-center py-4 text-muted-foreground">
                      {watchSpecialty
                        ? `No doctors available for ${watchSpecialty}`
                        : "Please select a specialty to see available doctors"}
                    </p>
                  )}
                </div>
                {form.formState.errors.doctor && (
                  <p className="text-sm font-medium text-destructive mt-2">{form.formState.errors.doctor.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <FormField
                control={form.control}
                name="consultationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Consultation Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select consultation type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="video">Video Consultation</SelectItem>
                        <SelectItem value="chat">Chat Consultation</SelectItem>
                        <SelectItem value="phone">Phone Consultation</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose how you would like to connect with your healthcare provider.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time">
                            {field.value ? (
                              <div className="flex items-center">
                                <Clock className="mr-2 h-4 w-4" />
                                {field.value}
                              </div>
                            ) : (
                              "Select time"
                            )}
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableTimes.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason for Consultation</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Briefly describe your symptoms or reason for the consultation"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>This helps the healthcare provider prepare for your consultation.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Schedule Consultation
          </Button>
        </form>
      </Form>
    </div>
  )
}
