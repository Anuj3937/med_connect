"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, ExternalLink, Clock, Truck } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

// Update the mockPharmacies array with Indian pharmacy names and locations
const mockPharmacies = [
  {
    id: "ph1",
    name: "Apollo Pharmacy",
    distance: 1.2,
    address: "123 MG Road, Bangalore",
    hours: "8:00 AM - 10:00 PM",
    delivery: true,
    insurance: ["Star Health", "HDFC ERGO", "Bajaj Allianz"],
  },
  {
    id: "ph2",
    name: "MedPlus",
    distance: 2.5,
    address: "456 Koramangala Main Road, Bangalore",
    hours: "24 hours",
    delivery: true,
    insurance: ["ICICI Lombard", "Aditya Birla Health", "Max Bupa"],
  },
  {
    id: "ph3",
    name: "Wellness Forever",
    distance: 3.8,
    address: "789 HSR Layout, Bangalore",
    hours: "9:00 AM - 11:00 PM",
    delivery: false,
    insurance: ["Star Health", "Religare Health", "HDFC ERGO"],
  },
  {
    id: "ph4",
    name: "Netmeds Store",
    distance: 4.7,
    address: "101 Indiranagar, Bangalore",
    hours: "8:00 AM - 9:00 PM",
    delivery: true,
    insurance: ["ICICI Lombard", "Max Bupa", "Aditya Birla Health"],
  },
]

// Update the mockMedicinePrices with Indian prices
const mockMedicinePrices = {
  med1: [
    { pharmacyId: "ph1", price: 649, inStock: true, discount: null },
    { pharmacyId: "ph2", price: 725, inStock: true, discount: null },
    { pharmacyId: "ph3", price: 599, inStock: true, discount: "10% off with coupon" },
    { pharmacyId: "ph4", price: 675, inStock: false, discount: null },
  ],
  med2: [
    { pharmacyId: "ph1", price: 2299, inStock: true, discount: "5% off with membership" },
    { pharmacyId: "ph2", price: 2125, inStock: true, discount: null },
    { pharmacyId: "ph3", price: 2450, inStock: false, discount: null },
    { pharmacyId: "ph4", price: 2199, inStock: true, discount: null },
  ],
  med3: [
    { pharmacyId: "ph1", price: 449, inStock: true, discount: null },
    { pharmacyId: "ph2", price: 475, inStock: true, discount: "Buy one get one 50% off" },
    { pharmacyId: "ph3", price: 399, inStock: true, discount: null },
    { pharmacyId: "ph4", price: 425, inStock: true, discount: null },
  ],
}

// Update the mockEquipmentPrices with Indian prices
const mockEquipmentPrices = {
  eq1: [
    { pharmacyId: "ph1", price: 2499, inStock: true, discount: null },
    { pharmacyId: "ph2", price: 2699, inStock: true, discount: null },
    { pharmacyId: "ph3", price: 2399, inStock: false, discount: null },
    { pharmacyId: "ph4", price: 2599, inStock: true, discount: "Free batteries" },
  ],
  eq2: [
    { pharmacyId: "ph1", price: 8999, inStock: true, discount: "Free delivery" },
    { pharmacyId: "ph2", price: 8499, inStock: true, discount: null },
    { pharmacyId: "ph3", price: 9299, inStock: true, discount: null },
    { pharmacyId: "ph4", price: 8799, inStock: false, discount: null },
  ],
  eq3: [
    { pharmacyId: "ph1", price: 35999, inStock: true, discount: "EMI available" },
    { pharmacyId: "ph2", price: 36499, inStock: true, discount: null },
    { pharmacyId: "ph3", price: 34999, inStock: false, discount: null },
    { pharmacyId: "ph4", price: 35499, inStock: true, discount: "Free service for 1 year" },
  ],
  eq4: [
    { pharmacyId: "ph1", price: 45999, inStock: false, discount: null },
    { pharmacyId: "ph2", price: 44999, inStock: true, discount: "Free installation" },
    { pharmacyId: "ph3", price: 46999, inStock: false, discount: null },
    { pharmacyId: "ph4", price: 45499, inStock: true, discount: null },
  ],
  eq5: [
    { pharmacyId: "ph1", price: 42999, inStock: true, discount: "10% cashback" },
    { pharmacyId: "ph2", price: 43999, inStock: true, discount: null },
    { pharmacyId: "ph3", price: 41999, inStock: true, discount: null },
    { pharmacyId: "ph4", price: 42499, inStock: false, discount: null },
  ],
  eq6: [
    { pharmacyId: "ph1", price: 2999, inStock: true, discount: null },
    { pharmacyId: "ph2", price: 3199, inStock: true, discount: "Extra medication kit free" },
    { pharmacyId: "ph3", price: 2899, inStock: true, discount: null },
    { pharmacyId: "ph4", price: 3099, inStock: true, discount: null },
  ],
  eq7: [
    { pharmacyId: "ph1", price: 6499, inStock: true, discount: "Free regulator" },
    { pharmacyId: "ph2", price: 6799, inStock: true, discount: null },
    { pharmacyId: "ph3", price: 6299, inStock: true, discount: null },
    { pharmacyId: "ph4", price: 6599, inStock: false, discount: null },
  ],
  eq8: [
    { pharmacyId: "ph1", price: 3499, inStock: true, discount: null },
    { pharmacyId: "ph2", price: 3699, inStock: true, discount: null },
    { pharmacyId: "ph3", price: 3299, inStock: true, discount: "5% senior citizen discount" },
    { pharmacyId: "ph4", price: 3599, inStock: true, discount: null },
  ],
  eq9: [
    { pharmacyId: "ph1", price: 1299, inStock: true, discount: "Free 25 strips" },
    { pharmacyId: "ph2", price: 1399, inStock: true, discount: null },
    { pharmacyId: "ph3", price: 1199, inStock: true, discount: null },
    { pharmacyId: "ph4", price: 1349, inStock: true, discount: null },
  ],
  eq10: [
    { pharmacyId: "ph1", price: 1499, inStock: true, discount: null },
    { pharmacyId: "ph2", price: 1599, inStock: true, discount: null },
    { pharmacyId: "ph3", price: 1399, inStock: true, discount: "10% off" },
    { pharmacyId: "ph4", price: 1549, inStock: false, discount: null },
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
                    <div className="font-bold">₹{item.price.toFixed(2)}</div>
                    {item.discount && (
                      <Badge variant="outline" className="text-green-600 border-green-600 text-xs mt-1">
                        {item.discount}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span>{pharmacy.distance} km</span>
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
