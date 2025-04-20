"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pill, PillIcon as Capsule, Stethoscope } from "lucide-react"

interface MedicineCardProps {
  medicine: {
    id: string
    name: string
    genericName?: string
    manufacturer: string
    category: string
    usage: string
    requiresPrescription?: boolean
    averagePrice?: number
    imageUrl?: string
  }
  onSelect: () => void
  isSelected: boolean
}

export function MedicineCard({ medicine, onSelect, isSelected }: MedicineCardProps) {
  const { name, genericName, manufacturer, category, usage, requiresPrescription = false, averagePrice = 0 } = medicine

  return (
    <Card className={`overflow-hidden transition-all ${isSelected ? "ring-2 ring-primary" : ""}`}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg line-clamp-2">{name}</CardTitle>
            {genericName && genericName !== name && (
              <CardDescription className="text-sm italic">{genericName}</CardDescription>
            )}
          </div>
          {requiresPrescription ? (
            <Badge variant="destructive" className="ml-2 whitespace-nowrap">
              Prescription
            </Badge>
          ) : (
            <Badge variant="outline" className="ml-2 whitespace-nowrap">
              OTC
            </Badge>
          )}
        </div>
        <CardDescription>{manufacturer}</CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex items-center mb-2">
          {category.toLowerCase().includes("tablet") || category.toLowerCase().includes("pill") ? (
            <Pill className="mr-2 h-4 w-4" />
          ) : category.toLowerCase().includes("capsule") ? (
            <Capsule className="mr-2 h-4 w-4" />
          ) : (
            <Stethoscope className="mr-2 h-4 w-4" />
          )}
          <span className="text-sm text-muted-foreground">{category}</span>
        </div>
        <p className="text-sm mb-3 line-clamp-2">{usage}</p>
        <div className="font-medium">
          {averagePrice > 0 ? `Starting from $${averagePrice.toFixed(2)}` : "Price varies"}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant={isSelected ? "default" : "outline"} onClick={onSelect} className="w-full">
          {isSelected ? "Selected" : "Compare Prices"}
        </Button>
      </CardFooter>
    </Card>
  )
}
