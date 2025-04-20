"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, CheckCircle, XCircle } from "lucide-react"

interface EquipmentCardProps {
  equipment: {
    id: string
    name: string
    manufacturer: string
    category: string
    features: string[]
    price: number
    rating: number
    availability: boolean
    image?: string
  }
  onSelect: () => void
  isSelected: boolean
}

export function EquipmentCard({ equipment, onSelect, isSelected }: EquipmentCardProps) {
  const { name, manufacturer, category, features, price, rating, availability, image } = equipment

  return (
    <Card className={`overflow-hidden transition-all ${isSelected ? "ring-2 ring-primary" : ""}`}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{name}</CardTitle>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
        <CardDescription>{manufacturer}</CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex items-center mb-2">
          <Badge variant="outline" className="mr-2">
            {category}
          </Badge>
          {availability ? (
            <span className="text-xs flex items-center text-green-600">
              <CheckCircle className="h-3 w-3 mr-1" /> In Stock
            </span>
          ) : (
            <span className="text-xs flex items-center text-red-600">
              <XCircle className="h-3 w-3 mr-1" /> Out of Stock
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {features.map((feature, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {feature}
            </Badge>
          ))}
        </div>
        <div className="font-medium">${price.toFixed(2)}</div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button
          variant={isSelected ? "default" : "outline"}
          onClick={onSelect}
          className="w-full"
          disabled={!availability}
        >
          {isSelected ? "Selected" : "Compare Prices"}
        </Button>
      </CardFooter>
    </Card>
  )
}
