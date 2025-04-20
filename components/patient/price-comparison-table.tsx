"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, ExternalLink, Clock, Truck } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

// Mock pharmacy data
const mockPharmacies = [
  {
    id: "ph1",
    name: "MediCare Pharmacy",
    distance: 0.8,
    address: "123 Health St, Medical District",
    hours: "8:00 AM - 9:00 PM",
    delivery: true,
    insurance: ["Aetna", "Blue Cross", "Cigna"],
  },
  {
    id: "ph2",
    name: "QuickMeds",
    distance: 1.2,
    address: "456 Wellness Ave, Care Center",
    hours: "24 hours",
    delivery: true,
    insurance: ["Blue Cross", "United Health", "Medicare"],
  },
  {
    id: "ph3",
    name: "Family Pharmacy",
    distance: 2.5,
    address: "789 Community Blvd, Healthville",
    hours: "9:00 AM - 7:00 PM",
    delivery: false,
    insurance: ["Aetna", "Medicare", "Medicaid"],
  },
  {
    id: "ph4",
    name: "City Drug Store",
    distance: 3.1,
    address: "101 Main St, Downtown",
    hours: "8:00 AM - 8:00 PM",
    delivery: true,
    insurance: ["Cigna", "United Health", "Kaiser"],
  },
]

// Mock price data
const mockMedicinePrices = {
  med1: [
    { pharmacyId: "ph1", price: 12.99, inStock: true, discount: null },
    { pharmacyId: "ph2", price: 14.5, inStock: true, discount: null },
    { pharmacyId: "ph3", price: 11.75, inStock: true, discount: "10% off with coupon" },
    { pharmacyId: "ph4", price: 13.25, inStock: false, discount: null },
  ],
  med2: [
    { pharmacyId: "ph1", price: 45.99, inStock: true, discount: "5% off with membership" },
    { pharmacyId: "ph2", price: 42.5, inStock: true, discount: null },
    { pharmacyId: "ph3", price: 48.75, inStock: false, discount: null },
    { pharmacyId: "ph4", price: 43.25, inStock: true, discount: null },
  ],
  med3: [
    { pharmacyId: "ph1", price: 8.99, inStock: true, discount: null },
    { pharmacyId: "ph2", price: 9.5, inStock: true, discount: "Buy one get one 50% off" },
    { pharmacyId: "ph3", price: 7.75, inStock: true, discount: null },
    { pharmacyId: "ph4", price: 8.25, inStock: true, discount: null },
  ],
}

const mockEquipmentPrices = {
  eq1: [
    { pharmacyId: "ph1", price: 49.99, inStock: true, discount: null },
    { pharmacyId: "ph2", price: 54.5, inStock: true, discount: null },
    { pharmacyId: "ph3", price: 47.75, inStock: false, discount: null },
    { pharmacyId: "ph4", price: 52.25, inStock: true, discount: "Free batteries" },
  ],
  eq2: [
    { pharmacyId: "ph1", price: 199.99, inStock: true, discount: "Free delivery" },
    { pharmacyId: "ph2", price: 189.5, inStock: true, discount: null },
    { pharmacyId: "ph3", price: 209.75, inStock: true, discount: null },
    { pharmacyId: "ph4", price: 194.25, inStock: false, discount: null },
  ],
}

interface PriceComparisonTableProps {
  medicineId?: string
  equipmentId?: string
  type?: "medicine" | "equipment"
}

export function PriceComparisonTable({ medicineId, equipmentId, type = "medicine" }: PriceComparisonTableProps) {
  const [loading, setLoading] = useState(true)
  const [priceData, setPriceData] = useState<any[]>([])

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      let prices: any[] = []

      if (type === "medicine" && medicineId) {
        prices = mockMedicinePrices[medicineId as keyof typeof mockMedicinePrices] || []
      } else if (type === "equipment" && equipmentId) {
        prices = mockEquipmentPrices[equipmentId as keyof typeof mockEquipmentPrices] || []
      }

      // Sort by price
      const sortedPrices = prices.filter((price) => price.inStock).sort((a, b) => a.price - b.price)

      setPriceData(sortedPrices)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [medicineId, equipmentId, type])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading price comparison...</CardTitle>
          <CardDescription>Please wait while we fetch the latest prices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (priceData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No price data available</CardTitle>
          <CardDescription>We couldn't find any pricing information for this item</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Price Comparison</CardTitle>
        <CardDescription>Compare prices across {priceData.length} pharmacies</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pharmacy</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Distance</TableHead>
              <TableHead>Details</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {priceData.map((item) => {
              const pharmacy = mockPharmacies.find((p) => p.id === item.pharmacyId)
              if (!pharmacy) return null

              return (
                <TableRow key={item.pharmacyId}>
                  <TableCell className="font-medium">{pharmacy.name}</TableCell>
                  <TableCell>
                    <div className="font-bold">${item.price.toFixed(2)}</div>
                    {item.discount && (
                      <Badge variant="outline" className="text-green-600 border-green-600 text-xs mt-1">
                        {item.discount}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span>{pharmacy.distance} miles</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs space-y-1">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span>{pharmacy.hours}</span>
                      </div>
                      {pharmacy.delivery && (
                        <div className="flex items-center text-green-600">
                          <Truck className="h-3 w-3 mr-1" />
                          <span>Delivery available</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" className="w-full">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
