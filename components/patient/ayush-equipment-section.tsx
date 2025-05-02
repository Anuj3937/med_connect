"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock AYUSH equipment data
const ayushEquipment = [
  {
    id: "ayush1",
    name: "Yoga Mat",
    category: "Yoga",
    description: "Premium non-slip yoga mat for comfortable practice",
    price: 1299,
    rating: 4.7,
    features: ["Eco-friendly", "Non-slip", "Extra thick"],
    benefits: ["Improves posture", "Supports joints", "Enhances stability"],
  },
  {
    id: "ayush2",
    name: "Acupressure Mat",
    category: "Acupressure",
    description: "Therapeutic mat with pressure points for pain relief",
    price: 1899,
    rating: 4.5,
    features: ["5000+ pressure points", "Portable", "Washable"],
    benefits: ["Relieves back pain", "Improves circulation", "Reduces stress"],
  },
  {
    id: "ayush3",
    name: "Copper Tongue Cleaner",
    category: "Ayurveda",
    description: "Traditional copper tongue scraper for oral hygiene",
    price: 299,
    rating: 4.8,
    features: ["Pure copper", "Ergonomic design", "Antibacterial"],
    benefits: ["Removes toxins", "Improves taste", "Freshens breath"],
  },
  {
    id: "ayush4",
    name: "Neti Pot",
    category: "Ayurveda",
    description: "Ceramic nasal irrigation system for sinus health",
    price: 599,
    rating: 4.6,
    features: ["Lead-free ceramic", "Ergonomic design", "Easy to clean"],
    benefits: ["Clears sinuses", "Relieves allergies", "Prevents colds"],
  },
]

export function AyushEquipmentSection() {
  const [activeTab, setActiveTab] = useState("yoga")

  const filteredEquipment = ayushEquipment.filter(
    (item) => activeTab === "all" || item.category.toLowerCase() === activeTab,
  )

  return (
    <Card className="mt-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">AYUSH Equipment</CardTitle>
            <CardDescription>Traditional wellness equipment from Ayurveda, Yoga & Naturopathy</CardDescription>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  AYUSH stands for Ayurveda, Yoga & Naturopathy, Unani, Siddha and Homeopathy - traditional Indian
                  systems of medicine
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="yoga" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="yoga">Yoga</TabsTrigger>
            <TabsTrigger value="ayurveda">Ayurveda</TabsTrigger>
            <TabsTrigger value="acupressure">Acupressure</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              {filteredEquipment.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">{item.name}</CardTitle>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-xs font-medium">{item.rating}</span>
                      </div>
                    </div>
                    <CardDescription className="text-xs">{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {item.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-2 space-y-1">
                      <p className="text-xs font-medium">Benefits:</p>
                      <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-0.5">
                        {item.benefits.map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="font-medium mt-3">₹{item.price.toFixed(2)}</div>
                  </CardContent>
                  <div className="px-6 pb-4">
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
