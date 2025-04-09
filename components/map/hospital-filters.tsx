"use client"

import { useState } from "react"
import { Search, Filter, MapPin, Stethoscope, Bed, Ambulance } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"

export function HospitalFilters() {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([])
  const [maxDistance, setMaxDistance] = useState(50)
  const [bedCapacityRange, setBedCapacityRange] = useState([0, 100])

  const handleSpecialtyChange = (specialty: string) => {
    if (selectedSpecialties.includes(specialty)) {
      setSelectedSpecialties(selectedSpecialties.filter((s) => s !== specialty))
    } else {
      setSelectedSpecialties([...selectedSpecialties, specialty])
    }
  }

  const clearFilters = () => {
    setSelectedSpecialties([])
    setMaxDistance(50)
    setBedCapacityRange([0, 100])
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search hospitals by name, location, or specialty..." className="pl-10" />
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Hospital Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="trauma">Trauma Centers</SelectItem>
              <SelectItem value="general">General Hospitals</SelectItem>
              <SelectItem value="specialty">Specialty Hospitals</SelectItem>
              <SelectItem value="community">Community Hospitals</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Capacity Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="normal">Normal Capacity</SelectItem>
              <SelectItem value="high">High Capacity</SelectItem>
              <SelectItem value="critical">Critical Capacity</SelectItem>
              <SelectItem value="diverting">Diverting</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="w-full sm:w-auto" onClick={() => setShowAdvanced(!showAdvanced)}>
            <Filter className="mr-2 h-4 w-4" />
            {showAdvanced ? "Hide Filters" : "More Filters"}
          </Button>
        </div>
      </div>

      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-4 border rounded-md">
          <div className="md:col-span-4 space-y-2">
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <Stethoscope className="h-4 w-4 mr-2" />
              Specialties
            </h3>
            <div className="space-y-2">
              {["Trauma", "Cardiac", "Neurology", "Pediatric", "Orthopedic", "Oncology", "Burn Unit", "Maternity"].map(
                (specialty) => (
                  <div key={specialty} className="flex items-center space-x-2">
                    <Checkbox
                      id={`specialty-${specialty.toLowerCase()}`}
                      checked={selectedSpecialties.includes(specialty)}
                      onCheckedChange={() => handleSpecialtyChange(specialty)}
                    />
                    <Label htmlFor={`specialty-${specialty.toLowerCase()}`}>{specialty}</Label>
                  </div>
                ),
              )}
            </div>

            {selectedSpecialties.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedSpecialties.map((specialty) => (
                  <Badge
                    key={specialty}
                    variant="outline"
                    className="flex items-center gap-1"
                    onClick={() => handleSpecialtyChange(specialty)}
                  >
                    {specialty}
                    <span className="ml-1 cursor-pointer">×</span>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="md:col-span-4 space-y-2">
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <Bed className="h-4 w-4 mr-2" />
              Available Resources
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="icu" />
                <Label htmlFor="icu">ICU Beds Available</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="ventilators" />
                <Label htmlFor="ventilators">Ventilators Available</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="isolation" />
                <Label htmlFor="isolation">Isolation Rooms</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="surgery" />
                <Label htmlFor="surgery">Surgical Suites</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="er-accepting" />
                <Label htmlFor="er-accepting">ER Accepting Patients</Label>
              </div>
            </div>

            <div className="pt-2">
              <h4 className="text-sm font-medium mb-2">Bed Capacity Range</h4>
              <Slider
                defaultValue={[0, 100]}
                max={100}
                step={5}
                value={bedCapacityRange}
                onValueChange={setBedCapacityRange}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{bedCapacityRange[0]}%</span>
                <span>{bedCapacityRange[1]}%</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 space-y-2">
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              Location & Distance
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location">Reference Location</Label>
                <div className="flex gap-2">
                  <Input id="location" placeholder="City, ZIP, or address" />
                  <Button variant="outline" size="sm">
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="max-distance">Maximum Distance</Label>
                  <span className="text-sm">{maxDistance} miles</span>
                </div>
                <Slider
                  id="max-distance"
                  defaultValue={[50]}
                  max={100}
                  step={5}
                  value={[maxDistance]}
                  onValueChange={(value) => setMaxDistance(value[0])}
                />
              </div>

              <div className="space-y-2">
                <Label>Transport Options</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox id="ambulance-available" />
                  <Label htmlFor="ambulance-available" className="flex items-center">
                    <Ambulance className="h-4 w-4 mr-2" />
                    Ambulance Available
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="helicopter" />
                  <Label htmlFor="helicopter">Helicopter Transport</Label>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-12 flex justify-end gap-2 pt-2 border-t">
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
            <Button>Apply Filters</Button>
          </div>
        </div>
      )}
    </div>
  )
}
