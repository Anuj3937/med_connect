import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import { Bell, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { ModeToggle } from "@/components/mode-toggle"

export const metadata: Metadata = {
  title: "Hospital Portal - MediConnect",
  description: "Hospital portal for healthcare supply chain and resource management",
}

export default function HospitalPortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold">MediConnect</h1>
            <MainNav />
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-full max-w-sm lg:max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full bg-background pl-8 md:w-[300px] lg:w-[200px]"
              />
            </div>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                5
              </span>
            </Button>
            <ModeToggle />
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Suspense fallback={<div className="container py-6">Loading...</div>}>{children}</Suspense>
      </main>
    </div>
  )
}
