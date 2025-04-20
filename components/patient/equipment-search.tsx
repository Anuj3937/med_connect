"use client"

import { useState, useEffect } from "react"
import { Search, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

// Mock data for equipment
const mockEquipment = [
  {
    id: "eq1",
    name: "Blood Pressure Monitor",
    manufacturer: "Omron",
    category: "Monitoring",
    features: ["Bluetooth", "Memory Storage", "Portable"],
    price: 49.99,
    rating: 4.5,
    availability: true,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "eq2",
    name: "Wheelchair",
    manufacturer: "Drive Medical",
    category: "Mobility",
    features: ["Foldable", "Adjustable", "Lightweight"],
    price: 199.99,
    rating: 4.2,
    availability: true,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "eq3",
    name: "Oxygen Concentrator",
    manufacturer: "Philips Respironics",
    category: "Respiratory",
    features: ["Portable", "Battery Operated", "Quiet Operation"],
    price: 699.99,
    rating: 4.8,
    availability: true,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "eq4",
    name: "Hospital Bed",
    manufacturer: "Invacare",
    category: "Furniture",
    features: ["Electric", "Adjustable Height", "Side Rails"],
    price: 899.99,
    rating: 4.3,
    availability: false,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "eq5",
    name: "CPAP Machine",
    manufacturer: "ResMed",
    category: "Respiratory",
    features: ["Auto-adjusting", "Humidifier", "Quiet"],
    price: 849.99,
    rating: 4.7,
    availability: true,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "eq6",
    name: "Nebulizer",
    manufacturer: "DeVilbiss",
    category: "Respiratory",
    features: ["Portable", "Battery Option", "Quiet Operation"],
    price: 59.99,
    rating: 4.4,
    availability: true,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "eq7",
    name: "Oxygen Cylinder",
    manufacturer: "Invacare",
    category: "Respiratory",
    features: ["Portable", "Lightweight", "Durable"],
    price: 129.99,
    rating: 4.6,
    availability: true,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "eq8",
    name: "Walker",
    manufacturer: "Drive Medical",
    category: "Mobility",
    features: ["Foldable", "Adjustable Height", "Lightweight"],
    price: 69.99,
    rating: 4.5,
    availability: true,
    image: "/placeholder.svg?height=100&width=100",
  },
]

interface EquipmentSearchProps {
  onSearchResults: (results: any[]) => void
}

export function EquipmentSearch({ onSearchResults }: EquipmentSearchProps) {
  const [showFilters, setShowFilters] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [inStockOnly, setInStockOnly] = useState(false)

  // Get all unique features from equipment
  const allFeatures = Array.from(new Set(mockEquipment.flatMap((equipment) => equipment.features)))

  // Get all unique categories
  const categories = ["all", ...Array.from(new Set(mockEquipment.map((item) => item.category)))]

  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) => (prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]))
  }

  useEffect(() => {
    // Filter equipment based on search criteria
    let results = [...mockEquipment]

    // Search term filter
    if (searchTerm) {
      results = results.filter(
        (equipment) =>
          equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          equipment.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          equipment.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Category filter
    if (category !== "all") {
      results = results.filter((equipment) => equipment.category === category)
    }

    // Price range filter
    results = results.filter((equipment) => equipment.price >= priceRange[0] && equipment.price <= priceRange[1])

    // Features filter
    if (selectedFeatures.length > 0) {
      results = results.filter((equipment) => selectedFeatures.some((feature) => equipment.features.includes(feature)))
    }

    // Availability filter
    if (inStockOnly) {
      results = results.filter((equipment) => equipment.availability)
    }

    // Sort by exact match first, then by rating
    if (searchTerm) {
      results.sort((a, b) => {
        const aExactMatch = a.name.toLowerCase() === searchTerm.toLowerCase()
        const bExactMatch = b.name.toLowerCase() === searchTerm.toLowerCase()

        if (aExactMatch && !bExactMatch) return -1
        if (!aExactMatch && bExactMatch) return 1

        return b.rating - a.rating
      })
    } else {
      // If no search term, sort by rating
      results.sort((a, b) => b.rating - a.rating)
    }

    onSearchResults(results)
  }, [searchTerm, category, priceRange, selectedFeatures, inStockOnly, onSearchResults])

  const resetFilters = () => {
    setSearchTerm("")
    setCategory("all")
    setPriceRange([0, 1000])
    setSelectedFeatures([])
    setInStockOnly(false)
  }

  return (
    <Card className="shadow-md">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search equipment by name or manufacturer..."
                className="pl-8"
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
            <Button type="button" onClick={() => onSearchResults(mockEquipment)}>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat === "all" ? "All Categories" : cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="inStock"
                    checked={inStockOnly}
                    onCheckedChange={(checked) => setInStockOnly(checked === true)}
                  />
                  <Label htmlFor="inStock" className="font-normal">
                    In Stock Only
                  </Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priceRange">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </Label>
                <Slider
                  id="priceRange"
                  min={0}
                  max={1000}
                  step={10}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="py-4"
                />
              </div>

              <div>
                <Label>Features</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {allFeatures.map((feature) => (
                    <Badge
                      key={feature}
                      variant={selectedFeatures.includes(feature) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleFeature(feature)}
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
