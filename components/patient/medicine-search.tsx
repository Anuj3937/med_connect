"use client"

import { useState, useEffect } from "react"
import { Search, Filter, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

// Mock data for medicines
const mockMedicines = [
  {
    id: "med-1",
    name: "Lisinopril",
    genericName: "Lisinopril",
    category: "Prescription",
    usage: "Blood pressure management",
    form: "Tablet",
    strength: "10mg",
    manufacturer: "Pfizer",
    requiresPrescription: true,
    sideEffects: ["Dizziness", "Headache", "Dry cough"],
    interactions: ["NSAIDs", "Potassium supplements"],
    averagePrice: 15.99,
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "med-2",
    name: "Metformin",
    genericName: "Metformin Hydrochloride",
    category: "Prescription",
    usage: "Diabetes management",
    form: "Tablet",
    strength: "500mg",
    manufacturer: "Merck",
    requiresPrescription: true,
    sideEffects: ["Nausea", "Diarrhea", "Stomach pain"],
    interactions: ["Alcohol", "Contrast dyes"],
    averagePrice: 12.5,
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "med-3",
    name: "Advil",
    genericName: "Ibuprofen",
    category: "Over-the-counter",
    usage: "Pain relief, fever reduction",
    form: "Tablet",
    strength: "200mg",
    manufacturer: "Pfizer",
    requiresPrescription: false,
    sideEffects: ["Stomach upset", "Heartburn"],
    interactions: ["Blood thinners", "Aspirin"],
    averagePrice: 8.99,
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "med-4",
    name: "Zyrtec",
    genericName: "Cetirizine",
    category: "Over-the-counter",
    usage: "Allergy relief",
    form: "Tablet",
    strength: "10mg",
    manufacturer: "Johnson & Johnson",
    requiresPrescription: false,
    sideEffects: ["Drowsiness", "Dry mouth"],
    interactions: ["Alcohol", "CNS depressants"],
    averagePrice: 19.99,
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "med-5",
    name: "Lipitor",
    genericName: "Atorvastatin",
    category: "Prescription",
    usage: "Cholesterol management",
    form: "Tablet",
    strength: "20mg",
    manufacturer: "Pfizer",
    requiresPrescription: true,
    sideEffects: ["Muscle pain", "Liver problems"],
    interactions: ["Grapefruit juice", "Certain antibiotics"],
    averagePrice: 45.75,
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "med-6",
    name: "Tylenol",
    genericName: "Acetaminophen",
    category: "Over-the-counter",
    usage: "Pain relief, fever reduction",
    form: "Tablet",
    strength: "500mg",
    manufacturer: "Johnson & Johnson",
    requiresPrescription: false,
    sideEffects: ["Liver damage (at high doses)"],
    interactions: ["Alcohol", "Warfarin"],
    averagePrice: 7.49,
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "med-7",
    name: "Amoxicillin",
    genericName: "Amoxicillin",
    category: "Prescription",
    usage: "Bacterial infections",
    form: "Capsule",
    strength: "500mg",
    manufacturer: "Teva",
    requiresPrescription: true,
    sideEffects: ["Diarrhea", "Rash", "Nausea"],
    interactions: ["Birth control pills", "Certain antibiotics"],
    averagePrice: 9.99,
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "med-8",
    name: "Ventolin",
    genericName: "Albuterol",
    category: "Prescription",
    usage: "Asthma relief",
    form: "Inhaler",
    strength: "90mcg",
    manufacturer: "GlaxoSmithKline",
    requiresPrescription: true,
    sideEffects: ["Tremor", "Nervousness", "Headache"],
    interactions: ["Beta-blockers", "Diuretics"],
    averagePrice: 25.99,
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
]

const categories = ["All Categories", "Prescription", "Over-the-counter"]
const forms = ["All Forms", "Tablet", "Capsule", "Liquid", "Cream", "Injection", "Inhaler"]

interface MedicineSearchProps {
  onSearchResults: (medicines: any[]) => void
}

export function MedicineSearch({ onSearchResults }: MedicineSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [category, setCategory] = useState("All Categories")
  const [form, setForm] = useState("All Forms")
  const [priceRange, setPriceRange] = useState([0, 50])
  const [requiresPrescription, setRequiresPrescription] = useState<boolean | null>(null)

  // Get all unique usages
  const usages = [
    "All Uses",
    ...Array.from(
      new Set(
        mockMedicines.map((med) => {
          // Extract main usage purpose (before first comma or first "and")
          const mainUsage = med.usage.split(/,|\sand\s/)[0].trim()
          return mainUsage.charAt(0).toUpperCase() + mainUsage.slice(1)
        }),
      ),
    ),
  ]

  useEffect(() => {
    // Apply filters
    let filtered = [...mockMedicines]

    // Search term filter
    if (searchTerm) {
      filtered = filtered.filter(
        (medicine) =>
          medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          medicine.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          medicine.usage.toLowerCase().includes(searchTerm.toLowerCase()),
      )

      // Sort by exact match first, then by name
      filtered.sort((a, b) => {
        const aExactMatch = a.name.toLowerCase() === searchTerm.toLowerCase()
        const bExactMatch = b.name.toLowerCase() === searchTerm.toLowerCase()

        if (aExactMatch && !bExactMatch) return -1
        if (!aExactMatch && bExactMatch) return 1

        // If both are exact matches or both are not, sort alphabetically
        return a.name.localeCompare(b.name)
      })
    }

    // Category filter
    if (category !== "All Categories") {
      filtered = filtered.filter((medicine) => medicine.category === category)
    }

    // Form filter
    if (form !== "All Forms") {
      filtered = filtered.filter((medicine) => medicine.form === form)
    }

    // Price range filter
    filtered = filtered.filter(
      (medicine) => medicine.averagePrice >= priceRange[0] && medicine.averagePrice <= priceRange[1],
    )

    // Prescription requirement filter
    if (requiresPrescription !== null) {
      filtered = filtered.filter((medicine) => medicine.requiresPrescription === requiresPrescription)
    }

    onSearchResults(filtered)
  }, [searchTerm, category, form, priceRange, requiresPrescription, onSearchResults])

  const resetFilters = () => {
    setSearchTerm("")
    setCategory("All Categories")
    setForm("All Forms")
    setPriceRange([0, 50])
    setRequiresPrescription(null)
  }

  return (
    <Card className="shadow-md">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by medicine name, generic name, or usage..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="md:w-auto w-full"
            >
              <Filter className="mr-2 h-4 w-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
            <Button type="button" onClick={() => onSearchResults(mockMedicines)}>
              Search
            </Button>
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

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="form">Form</Label>
                  <Select value={form} onValueChange={setForm}>
                    <SelectTrigger id="form">
                      <SelectValue placeholder="Select form" />
                    </SelectTrigger>
                    <SelectContent>
                      {forms.map((f) => (
                        <SelectItem key={f} value={f}>
                          {f}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price Range ($)</Label>
                  <div className="pt-4 px-2">
                    <Slider id="price" min={0} max={50} step={1} value={priceRange} onValueChange={setPriceRange} />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="prescriptionRequired"
                    checked={requiresPrescription === true}
                    onCheckedChange={() => setRequiresPrescription(true)}
                  />
                  <Label htmlFor="prescriptionRequired">Prescription required</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="noPrescriptionRequired"
                    checked={requiresPrescription === false}
                    onCheckedChange={() => setRequiresPrescription(false)}
                  />
                  <Label htmlFor="noPrescriptionRequired">No prescription needed</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="anyPrescription"
                    checked={requiresPrescription === null}
                    onCheckedChange={() => setRequiresPrescription(null)}
                  />
                  <Label htmlFor="anyPrescription">Any</Label>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
