"use client"

import { useState } from "react"
import { EquipmentSearch } from "@/components/patient/equipment-search"
import { EquipmentCard } from "@/components/patient/equipment-card"
import { PriceComparisonTable } from "@/components/patient/price-comparison-table"
import { AyushEquipmentSection } from "@/components/patient/ayush-equipment-section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, XCircle } from "lucide-react"

export default function FindEquipmentPage() {
  const [filteredEquipment, setFilteredEquipment] = useState<any[]>([])
  const [selectedEquipment, setSelectedEquipment] = useState<any | null>(null)
  const [activeTab, setActiveTab] = useState("equipment")

  return (
    <div className="container py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Find Medical Equipment</h1>
        <p className="text-muted-foreground">
          Search for medical equipment based on type, features, and compare prices across India
        </p>
      </div>

      <EquipmentSearch onSearchResults={setFilteredEquipment} />

      <Tabs defaultValue="equipment" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
          <TabsTrigger value="suppliers" disabled={!selectedEquipment}>
            Supplier Prices
          </TabsTrigger>
        </TabsList>

        <TabsContent value="equipment" className="mt-4">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">
              {filteredEquipment.length > 0
                ? `${filteredEquipment.length} equipment items found`
                : "Start searching to find medical equipment"}
            </h2>
            {filteredEquipment.length > 0 && (
              <p className="text-sm text-muted-foreground">Select an item to compare prices from different suppliers</p>
            )}
          </div>

          {filteredEquipment.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredEquipment.map((equipment) => (
                <EquipmentCard
                  key={equipment.id}
                  equipment={equipment}
                  onSelect={() => {
                    setSelectedEquipment(equipment)
                    setActiveTab("suppliers")
                  }}
                  isSelected={selectedEquipment?.id === equipment.id}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center p-6 text-center">
                <div>
                  <AlertCircle className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <p>No equipment found. Try adjusting your search criteria.</p>
                </div>
              </CardContent>
            </Card>
          )}

          <AyushEquipmentSection />
        </TabsContent>

        <TabsContent value="suppliers" className="mt-4">
          {selectedEquipment ? (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{selectedEquipment.name}</h2>
                  <p className="text-muted-foreground">{selectedEquipment.manufacturer}</p>
                </div>
                {selectedEquipment.availability ? (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 self-start">
                    <CheckCircle className="h-3 w-3 mr-1" /> In Stock
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 self-start">
                    <XCircle className="h-3 w-3 mr-1" /> Out of Stock
                  </Badge>
                )}
              </div>

              <Card className="bg-muted/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Equipment Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Category</dt>
                      <dd>{selectedEquipment.category}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Rating</dt>
                      <dd className="flex items-center">
                        {selectedEquipment.rating}
                        <span className="text-yellow-500 ml-1">★</span>
                      </dd>
                    </div>
                    <div className="md:col-span-2">
                      <dt className="text-sm font-medium text-muted-foreground">Features</dt>
                      <dd>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedEquipment.features.map((feature: string, index: number) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </dd>
                    </div>
                    <div className="md:col-span-2 mt-2">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        GST: 12% included in price
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        *Prices include GST. Additional charges may apply for delivery outside city limits.
                      </p>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <PriceComparisonTable equipmentId={selectedEquipment.id} type="equipment" />
            </div>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center p-6 text-center">
                <div>
                  <AlertCircle className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <p>Please select an equipment item to view supplier prices.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
