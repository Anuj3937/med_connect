"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/components/auth-provider"

export function MainNav() {
  const pathname = usePathname()
  const { user } = useAuth()

  // Determine which portal we're in
  const isPatientPortal = pathname.includes("/patient-portal")
  const isHospitalPortal = pathname.includes("/hospital-portal")

  // Patient portal navigation items
  const patientNavItems = [
    {
      title: "Dashboard",
      href: "/patient-portal",
      active: pathname === "/patient-portal",
    },
    {
      title: "Appointments",
      href: "/patient-portal/appointments",
      active: pathname === "/patient-portal/appointments",
    },
    {
      title: "Hospitals",
      href: "/patient-portal/hospitals",
      active: pathname === "/patient-portal/hospitals",
    },
    {
      title: "Medications",
      href: "/patient-portal/medications",
      active: pathname === "/patient-portal/medications",
    },
    {
      title: "Health Records",
      href: "/patient-portal/records",
      active: pathname === "/patient-portal/records",
    },
  ]

  // Hospital portal navigation items
  const hospitalNavItems = [
    {
      title: "Dashboard",
      href: "/hospital-portal",
      active: pathname === "/hospital-portal",
    },
    {
      title: "Inventory",
      href: "/hospital-portal/inventory",
      active: pathname === "/hospital-portal/inventory",
    },
    {
      title: "Supply Chain",
      href: "/hospital-portal/supply-chain",
      active: pathname === "/hospital-portal/supply-chain",
    },
    {
      title: "Resource Allocation",
      href: "/hospital-portal/resource-allocation",
      active: pathname === "/hospital-portal/resource-allocation",
    },
    {
      title: "Demand Forecast",
      href: "/hospital-portal/demand-forecast",
      active: pathname === "/hospital-portal/demand-forecast",
    },
    {
      title: "Patients",
      href: "/hospital-portal/patients",
      active: pathname === "/hospital-portal/patients",
    },
  ]

  // Determine which nav items to show
  const navItems = isPatientPortal
    ? patientNavItems
    : isHospitalPortal
      ? hospitalNavItems
      : [
          {
            title: "Home",
            href: "/",
            active: pathname === "/",
          },
          {
            title: "Patient Portal",
            href: "/patient-portal",
            active: pathname === "/patient-portal",
          },
          {
            title: "Hospital Portal",
            href: "/hospital-portal",
            active: pathname === "/hospital-portal",
          },
        ]

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6 overflow-x-auto">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary whitespace-nowrap",
            item.active ? "text-primary" : "text-muted-foreground",
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
