"use client"

import { useState } from "react"
import { MedicineSearch } from "@/components/patient/medicine-search"
import { MedicineCard } from "@/components/patient/medicine-card"
import { PriceComparisonTable } from "@/components/patient/price-comparison-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AlertCircle } from "lucide-react"

export default function FindMedicinesPage() {
  const [filteredMedicines, setFilteredMedicines] = useState<any[]>([])
  const [selectedMedicine, setSelectedMedicine] = useState<any | null>(null)
  const [activeTab, setActiveTab] = useState("medicines")

  return (
    <div className="container py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Find Medicines</h1>
        <p className="text-muted-foreground">
          Search for medicines based on usage and compare prices across pharmacies
        </p>
      </div>

      <MedicineSearch onSearchResults={setFilteredMedicines} />

      <Tabs defaultValue="medicines" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="medicines">Medicines</TabsTrigger>
          <TabsTrigger value="pharmacies" disabled={!selectedMedicine}>
            Pharmacy Prices
          </TabsTrigger>
        </TabsList>

        <TabsContent value="medicines" className="mt-4">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">
              {filteredMedicines.length > 0
                ? `${filteredMedicines.length} medicines found`
                : "Start searching to find medicines"}
            </h2>
            {filteredMedicines.length > 0 && (
              <p className="text-sm text-muted-foreground">
                Select a medicine to compare prices at different pharmacies
              </p>
            )}
          </div>

          {filteredMedicines.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredMedicines.map((medicine) => (
                <MedicineCard
                  key={medicine.id}
                  medicine={medicine}
                  onSelect={() => {
                    setSelectedMedicine(medicine)
                    setActiveTab("pharmacies")
                  }}
                  isSelected={selectedMedicine?.id === medicine.id}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center p-6 text-center">
                <div>
                  <AlertCircle className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <p>No medicines found. Try adjusting your search criteria.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="pharmacies" className="mt-4">
          {selectedMedicine ? (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{selectedMedicine.name}</h2>
                  <p className="text-muted-foreground">
                    {selectedMedicine.genericName !== selectedMedicine.name && selectedMedicine.genericName}
                  </p>
                </div>
                <Badge
                  variant={selectedMedicine.requiresPrescription ? "destructive" : "outline"}
                  className="self-start"
                >
                  {selectedMedicine.requiresPrescription ? "Prescription Required" : "Over-the-counter"}
                </Badge>
              </div>

              <Card className="bg-muted/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Medicine Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Manufacturer</dt>
                      <dd>{selectedMedicine.manufacturer}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Form</dt>
                      <dd>
                        {selectedMedicine.form} {selectedMedicine.strength}
                      </dd>
                    </div>
                    <div className="md:col-span-2">
                      <dt className="text-sm font-medium text-muted-foreground">Usage</dt>
                      <dd>{selectedMedicine.usage}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Side Effects</dt>
                      <dd>{selectedMedicine.sideEffects?.join(", ")}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Interactions</dt>
                      <dd>{selectedMedicine.interactions?.join(", ")}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <PriceComparisonTable medicineId={selectedMedicine.id} />
            </div>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center p-6 text-center">
                <div>
                  <AlertCircle className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <p>Please select a medicine to view pharmacy prices.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
