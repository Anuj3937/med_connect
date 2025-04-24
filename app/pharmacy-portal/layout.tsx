"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Hospital, ShieldAlert } from "lucide-react"

export default function PharmacyPortalLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, logout, hospitals, selectedHospital, setSelectedHospital, hasPermission } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    if (!isLoading && (!user.type || user.type !== "pharmacy")) {
      router.push("/login")
    }

    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good morning")
    else if (hour < 18) setGreeting("Good afternoon")
    else setGreeting("Good evening")
  }, [isLoading, user.type, router])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  const handleHospitalChange = (hospitalId: string) => {
    const hospital = hospitals.find((h) => h.id === hospitalId)
    if (hospital) {
      setSelectedHospital(hospital)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-8">
            <Link href="/pharmacy-portal" className="font-bold text-xl flex items-center">
              <span className="text-primary">Medi</span>Connect
              <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-md">Pharmacy</span>
            </Link>
            <MainNav />
          </div>
          <div className="flex items-center gap-4">
            {selectedHospital && (
              <div className="hidden md:flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-md">
                <Hospital className="h-4 w-4 text-muted-foreground" />
                <Select value={selectedHospital.id} onValueChange={handleHospitalChange}>
                  <SelectTrigger className="border-0 p-0 h-auto bg-transparent shadow-none focus:ring-0">
                    <SelectValue placeholder="Select hospital" />
                  </SelectTrigger>
                  <SelectContent>
                    {hospitals.map((hospital) => (
                      <SelectItem key={hospital.id} value={hospital.id}>
                        {hospital.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {user.role && (
              <span className="hidden md:inline-flex text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {user.role}
              </span>
            )}
            <ModeToggle />
            <UserNav />
          </div>
        </div>
        <div className="container py-2 border-t">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-muted-foreground">
                {greeting}, {user.name || user.email}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {!hasPermission("manage_inventory") && (
                <div className="flex items-center text-xs text-amber-600">
                  <ShieldAlert className="h-3 w-3 mr-1" />
                  Limited permissions
                </div>
              )}
              <Button variant="outline" size="sm" asChild>
                <Link href="/queue-management">View Queue Management</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}
