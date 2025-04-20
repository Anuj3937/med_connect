"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Search, Filter, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"

// Mock data for doctors
const mockDoctors = [
  {
    id: "doc1",
    name: "Dr. Sarah Johnson",
    specialization: "Cardiology",
    experience: 15,
    location: "Medical Center Hospital",
    address: "123 Health St, Medical District",
    rating: 4.8,
    acceptingNewPatients: true,
    insurance: ["Aetna", "Blue Cross", "Cigna"],
    education: "Harvard Medical School",
    languages: ["English", "Spanish"],
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "doc2",
    name: "Dr. Michael Chen",
    specialization: "Neurology",
    experience: 12,
    location: "City General Hospital",
    address: "456 Wellness Ave, Care Center",
    rating: 4.7,
    acceptingNewPatients: true,
    insurance: ["Blue Cross", "United Health", "Medicare"],
    education: "Johns Hopkins University",
    languages: ["English", "Mandarin"],
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "doc3",
    name: "Dr. Emily Rodriguez",
    specialization: "Pediatrics",
    experience: 8,
    location: "Children's Medical Center",
    address: "789 Community Blvd, Healthville",
    rating: 4.9,
    acceptingNewPatients: false,
    insurance: ["Aetna", "Medicare", "Medicaid"],
    education: "Stanford University",
    languages: ["English", "Spanish"],
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "doc4",
    name: "Dr. James Wilson",
    specialization: "Orthopedics",
    experience: 20,
    location: "Sports Medicine Clinic",
    address: "101 Main St, Downtown",
    rating: 4.6,
    acceptingNewPatients: true,
    insurance: ["Cigna", "United Health", "Kaiser"],
    education: "Yale University",
    languages: ["English"],
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "doc5",
    name: "Dr. Priya Patel",
    specialization: "Dermatology",
    experience: 10,
    location: "Skin Health Center",
    address: "202 Sunshine Ave, Eastside",
    rating: 4.8,
    acceptingNewPatients: true,
    insurance: ["Aetna", "Blue Cross", "Kaiser"],
    education: "University of California",
    languages: ["English", "Hindi", "Gujarati"],
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "doc6",
    name: "Dr. Robert Thompson",
    specialization: "Family Medicine",
    experience: 18,
    location: "Community Health Clinic",
    address: "303 Park Road, Westside",
    rating: 4.5,
    acceptingNewPatients: true,
    insurance: ["Medicare", "Medicaid", "United Health"],
    education: "University of Michigan",
    languages: ["English", "French"],
    image: "/placeholder.svg?height=100&width=100",
  },
]

const FormSchema = z.object({
  search: z.string().optional(),
  specialization: z.string().optional(),
  experienceRange: z.array(z.number()).optional(),
  location: z.string().optional(),
  acceptingNewPatients: z.boolean().optional(),
})

interface DoctorSearchProps {
  onSearchResults: (results: any[]) => void
}

export function DoctorSearch({ onSearchResults }: DoctorSearchProps) {
  const [showFilters, setShowFilters] = useState(false)
  const [experienceRange, setExperienceRange] = useState([0, 30])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search: "",
      specialization: "",
      experienceRange: [0, 30],
      location: "",
      acceptingNewPatients: false,
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // Filter doctors based on search criteria
    const results = mockDoctors.filter((doctor) => {
      // Search term filter
      if (
        data.search &&
        !doctor.name.toLowerCase().includes(data.search.toLowerCase()) &&
        !doctor.specialization.toLowerCase().includes(data.search.toLowerCase())
      ) {
        return false
      }

      // Specialization filter
      if (data.specialization && doctor.specialization !== data.specialization) {
        return false
      }

      // Experience range filter
      if (
        data.experienceRange &&
        (doctor.experience < data.experienceRange[0] || doctor.experience > data.experienceRange[1])
      ) {
        return false
      }

      // Location filter
      if (data.location && !doctor.location.toLowerCase().includes(data.location.toLowerCase())) {
        return false
      }

      // Accepting new patients filter
      if (data.acceptingNewPatients && !doctor.acceptingNewPatients) {
        return false
      }

      return true
    })

    onSearchResults(results)
  }

  const resetFilters = () => {
    form.reset({
      search: "",
      specialization: "",
      experienceRange: [0, 30],
      location: "",
      acceptingNewPatients: false,
    })
    setExperienceRange([0, 30])
    onSearchResults(mockDoctors)
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <FormField
                control={form.control}
                name="search"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input placeholder="Search doctors by name or specialization..." className="pl-8" {...field} />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="md:w-auto w-full"
              >
                <Filter className="mr-2 h-4 w-4" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
              <Button type="submit">Search</Button>
            </div>

            {showFilters && (
              <div className="bg-muted/40 p-4 rounded-md space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Filters</h3>
                  <Button type="button" variant="ghost" size="sm" onClick={resetFilters} className="h-8 text-xs">
                    <X className="mr-1 h-3 w-3" />
                    Reset
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="specialization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Specialization</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select specialization" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="all">All Specializations</SelectItem>
                            <SelectItem value="Cardiology">Cardiology</SelectItem>
                            <SelectItem value="Neurology">Neurology</SelectItem>
                            <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                            <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                            <SelectItem value="Dermatology">Dermatology</SelectItem>
                            <SelectItem value="Family Medicine">Family Medicine</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter hospital or clinic name" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="experienceRange"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Years of Experience: {experienceRange[0]} - {experienceRange[1]}
                      </FormLabel>
                      <FormControl>
                        <Slider
                          min={0}
                          max={30}
                          step={1}
                          value={experienceRange}
                          onValueChange={(value) => {
                            setExperienceRange(value)
                            field.onChange(value)
                          }}
                          className="py-4"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="acceptingNewPatients"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Accepting New Patients</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
