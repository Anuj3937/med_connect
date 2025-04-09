import type React from "react"
import type { Metadata } from "next"
import { UserNav } from "@/components/user-nav"
import { MainNav } from "@/components/main-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "Patient Portal | MediConnect",
  description: "MediConnect patient portal for managing healthcare needs",
}

export default function PatientPortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-2">
              <span className="font-bold text-xl">MediConnect</span>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Patient</span>
            </a>
            <MainNav />
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1 bg-muted/20">{children}</main>
      <Toaster />
    </div>
  )
}
