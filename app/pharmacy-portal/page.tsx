"use client"

import { Suspense, useEffect, useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PharmacyInventorySummary } from "@/components/pharmacy/pharmacy-inventory-summary"
import { PharmacyOrdersList } from "@/components/pharmacy/pharmacy-orders-list"
import { PharmacyAlertsList } from "@/components/pharmacy/pharmacy-alerts-list"
import { PharmacyInventoryAnalytics } from "@/components/pharmacy/pharmacy-inventory-analytics"

export default function PharmacyPortalPage() {
  const { user } = useAuth()
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good morning")
    else if (hour < 18) setGreeting("Good afternoon")
    else setGreeting("Good evening")
  }, [])

  const pharmacyName = user.pharmacyName || "Pharmacy"

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Pharmacy Dashboard</h1>
        <p className="text-muted-foreground">Manage inventory, track orders, and monitor medication usage</p>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <div className="grid gap-6 md:grid-cols-7">
          <div className="md:col-span-5 space-y-6">
            <PharmacyInventoryAnalytics />

            <Card>
              <CardHeader>
                <CardTitle>Inventory Summary</CardTitle>
                <CardDescription>Current inventory status and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <PharmacyInventorySummary />
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Alerts</CardTitle>
                <CardDescription>Critical inventory and supply chain alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <PharmacyAlertsList />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Track your recent medication orders</CardDescription>
              </CardHeader>
              <CardContent>
                <PharmacyOrdersList />
              </CardContent>
            </Card>
          </div>
        </div>
      </Suspense>
    </div>
  )
}
