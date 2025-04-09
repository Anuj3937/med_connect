"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/components/auth-provider"
import {
  BarChart3,
  Calendar,
  ClipboardList,
  LayoutDashboard,
  Map,
  Package,
  Pill,
  ShoppingCart,
  Truck,
  Users,
  Bell,
  Activity,
} from "lucide-react"

interface MainNavProps {
  className?: string
}

export function MainNav({ className }: MainNavProps) {
  const pathname = usePathname()
  const { user } = useAuth()

  // Define navigation items based on user type
  const patientNavItems = [
    {
      title: "Dashboard",
      href: "/patient-portal",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
    },
    {
      title: "Appointments",
      href: "/patient-portal/appointments",
      icon: <Calendar className="mr-2 h-4 w-4" />,
    },
    {
      title: "Medications",
      href: "/patient-portal/medications",
      icon: <Pill className="mr-2 h-4 w-4" />,
    },
    {
      title: "Health Records",
      href: "/patient-portal/records",
      icon: <ClipboardList className="mr-2 h-4 w-4" />,
    },
    {
      title: "Find Hospitals",
      href: "/patient-portal/hospitals",
      icon: <Map className="mr-2 h-4 w-4" />,
    },
    {
      title: "Health Tracking",
      href: "/patient-portal/tracking",
      icon: <Activity className="mr-2 h-4 w-4" />,
    },
    {
      title: "Notifications",
      href: "/patient-portal/notifications",
      icon: <Bell className="mr-2 h-4 w-4" />,
    },
  ]

  const hospitalNavItems = [
    {
      title: "Dashboard",
      href: "/hospital-portal",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
    },
    {
      title: "Inventory",
      href: "/hospital-portal/inventory",
      icon: <Package className="mr-2 h-4 w-4" />,
    },
    {
      title: "Supply Chain",
      href: "/hospital-portal/supply-chain",
      icon: <Truck className="mr-2 h-4 w-4" />,
    },
    {
      title: "Resource Allocation",
      href: "/hospital-portal/resources",
      icon: <BarChart3 className="mr-2 h-4 w-4" />,
    },
    {
      title: "Demand Forecast",
      href: "/hospital-portal/forecast",
      icon: <BarChart3 className="mr-2 h-4 w-4" />,
    },
    {
      title: "Patients",
      href: "/hospital-portal/patients",
      icon: <Users className="mr-2 h-4 w-4" />,
    },
    {
      title: "Orders",
      href: "/hospital-portal/orders",
      icon: <ShoppingCart className="mr-2 h-4 w-4" />,
    },
    {
      title: "Staff Management",
      href: "/hospital-portal/staff",
      icon: <Users className="mr-2 h-4 w-4" />,
    },
    {
      title: "Analytics",
      href: "/hospital-portal/analytics",
      icon: <Activity className="mr-2 h-4 w-4" />,
    },
  ]

  // Select the appropriate navigation items based on user type
  const navItems = user.type === "patient" ? patientNavItems : hospitalNavItems

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {navItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-primary relative group",
              isActive ? "text-primary" : "text-muted-foreground",
            )}
          >
            <span className={cn("flex items-center", isActive && "font-semibold")}>
              {item.icon}
              {item.title}
            </span>
            {isActive && <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary rounded-full" />}
            <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform rounded-full" />
          </Link>
        )
      })}
    </nav>
  )
}
