"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { UserNav } from "@/components/user-nav"
import { useAuth } from "@/components/auth-provider"
import { LogOut, LayoutDashboard, Package, TrendingUp, Boxes, Menu, X, FileText } from "lucide-react"
import { useState } from "react"

export default function HospitalPortalLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const { logout, selectedHospital } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const navigation = [
    {
      name: "Dashboard",
      href: "/hospital-portal",
      icon: LayoutDashboard,
      current: pathname === "/hospital-portal",
    },
    {
      name: "Inventory",
      href: "/hospital-portal/inventory",
      icon: Boxes,
      current: pathname === "/hospital-portal/inventory",
    },
    {
      name: "Supply Chain",
      href: "/hospital-portal/supply-chain",
      icon: Package,
      current: pathname === "/hospital-portal/supply-chain",
    },
    {
      name: "Demand Forecast",
      href: "/hospital-portal/demand-forecast",
      icon: TrendingUp,
      current: pathname === "/hospital-portal/demand-forecast",
    },
    {
      name: "Insurance",
      href: "/hospital-portal/insurance",
      icon: FileText,
      current: pathname === "/hospital-portal/insurance",
    },
  ]

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <Link href="/hospital-portal" className="flex items-center gap-2">
            <span className="text-xl font-bold">Hospital Portal</span>
          </Link>
          {selectedHospital && <span className="text-sm text-muted-foreground">| {selectedHospital.name}</span>}
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline" onClick={toggleSidebar} className="hidden md:flex">
            {sidebarOpen ? <X className="h-4 w-4 mr-2" /> : <Menu className="h-4 w-4 mr-2" />}
            {sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
          </Button>
          <Button variant="outline" onClick={logout} className="hidden md:flex">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
          <UserNav />
        </div>
      </header>
      <div className="flex-1 flex">
        <div
          className={cn(
            "border-r transition-all duration-300 ease-in-out",
            sidebarOpen ? "md:w-64 md:flex md:flex-col" : "w-0 md:w-16 md:flex md:flex-col",
            "hidden md:flex md:flex-col",
          )}
        >
          <div className="flex flex-col flex-grow pt-5 overflow-y-auto">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                    item.current ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted",
                  )}
                >
                  <item.icon
                    className={cn("mr-3 h-5 w-5", item.current ? "text-primary" : "text-muted-foreground")}
                    aria-hidden="true"
                  />
                  {sidebarOpen && <span>{item.name}</span>}
                </Link>
              ))}
            </nav>
            <div className="p-4">
              <Button variant="outline" onClick={logout} className="w-full md:hidden">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
        <main className={cn("flex-1 p-6 overflow-y-auto", sidebarOpen ? "" : "md:ml-0")}>{children}</main>
      </div>
    </div>
  )
}
