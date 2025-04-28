"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

type UserType = "patient" | "hospital" | "pharmacy" | "admin" | null

interface Hospital {
  id: string
  name: string
  location: string
}

interface User {
  id: string
  email: string
  name?: string
  type: UserType
  hospitalId?: string
  hospitalName?: string
  zipCode?: string
  role?: string
  specialties?: string[]
  profileImage?: string
  permissions?: string[]
}

interface AuthContextType {
  user: User
  login: (email: string, password: string, rememberMe: boolean, hospitalId?: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
  hospitals: Hospital[]
  selectedHospital: Hospital | null
  setSelectedHospital: (hospital: Hospital | null) => void
  hasPermission: (permission: string) => boolean
}

const AuthContext = createContext<AuthContextType>({
  user: { id: "", email: "", type: null },
  login: async () => false,
  logout: () => {},
  isAuthenticated: false,
  isLoading: true,
  hospitals: [],
  selectedHospital: null,
  setSelectedHospital: () => {},
  hasPermission: () => false,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>({ id: "", email: "", type: null })
  const [isLoading, setIsLoading] = useState(true)
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  // Hospital data
  const hospitals = [
    {
      id: "hosp-1",
      name: "Memorial General Hospital",
      location: "Chicago, IL",
    },
    {
      id: "hosp-2",
      name: "University Medical Center",
      location: "New York, NY",
    },
    {
      id: "hosp-3",
      name: "Riverside Community Hospital",
      location: "Los Angeles, CA",
    },
    {
      id: "hosp-4",
      name: "Central City Medical",
      location: "Houston, TX",
    },
  ]

  // Patient user data
  const patientUsers = [
    {
      id: "p1",
      email: "patient1@email.com",
      password: "password123",
      name: "John Smith",
      type: "patient" as UserType,
      zipCode: "12345",
      profileImage: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "p2",
      email: "patient2@email.com",
      password: "patient2024",
      name: "Sarah Johnson",
      type: "patient" as UserType,
      zipCode: "12345",
      profileImage: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "p3",
      email: "patient3@email.com",
      password: "secure789",
      name: "Michael Brown",
      type: "patient" as UserType,
      zipCode: "23456",
      profileImage: "/placeholder.svg?height=40&width=40",
    },
  ]

  // Hospital user data
  const hospitalUsers = [
    {
      id: "h1",
      email: "hospital1@med.com",
      password: "hospital2024",
      type: "hospital" as UserType,
      hospitalId: "hosp-1",
      hospitalName: "Memorial General Hospital",
      zipCode: "12345",
      role: "Administrator",
      profileImage: "/placeholder.svg?height=40&width=40",
      permissions: ["manage_inventory", "manage_staff", "view_analytics", "manage_beds"],
    },
    {
      id: "h2",
      email: "hospital2@med.com",
      password: "staffaccess",
      type: "hospital" as UserType,
      hospitalId: "hosp-2",
      hospitalName: "University Medical Center",
      zipCode: "12345",
      role: "Supply Manager",
      profileImage: "/placeholder.svg?height=40&width=40",
      permissions: ["manage_inventory", "view_analytics"],
    },
    {
      id: "h3",
      email: "hospital3@med.com",
      password: "12345678",
      type: "hospital" as UserType,
      hospitalId: "hosp-3",
      hospitalName: "Riverside Community Hospital",
      zipCode: "23456",
      role: "Resource Coordinator",
      profileImage: "/placeholder.svg?height=40&width=40",
      permissions: ["manage_beds", "view_analytics"],
    },
  ]

  // Pharmacy user data
  const pharmacyUsers = [
    {
      id: "ph1",
      email: "pharmacy1@med.com",
      password: "pharmacy2024",
      name: "Robert Chen",
      type: "pharmacy" as UserType,
      hospitalId: "hosp-1",
      hospitalName: "Memorial General Hospital",
      role: "Chief Pharmacist",
      profileImage: "/placeholder.svg?height=40&width=40",
      permissions: ["manage_inventory", "manage_orders", "view_analytics", "approve_orders"],
    },
    {
      id: "ph2",
      email: "pharmacy2@med.com",
      password: "rxaccess",
      name: "Lisa Wong",
      type: "pharmacy" as UserType,
      hospitalId: "hosp-2",
      hospitalName: "University Medical Center",
      role: "Staff Pharmacist",
      profileImage: "/placeholder.svg?height=40&width=40",
      permissions: ["manage_inventory", "view_analytics"],
    },
    {
      id: "ph3",
      email: "pharmacy3@med.com",
      password: "pharma123",
      name: "David Miller",
      type: "pharmacy" as UserType,
      hospitalId: "hosp-3",
      hospitalName: "Riverside Community Hospital",
      role: "Pharmacy Technician",
      profileImage: "/placeholder.svg?height=40&width=40",
      permissions: ["view_inventory", "process_orders"],
    },
    {
      id: "ph4",
      email: "pharmacy4@med.com",
      password: "rx2024",
      name: "Maria Garcia",
      type: "pharmacy" as UserType,
      hospitalId: "hosp-4",
      hospitalName: "Central City Medical",
      role: "Pharmacy Manager",
      profileImage: "/placeholder.svg?height=40&width=40",
      permissions: ["manage_inventory", "manage_orders", "view_analytics"],
    },
  ]

  // Admin user data
  const adminUsers = [
    {
      id: "a1",
      email: "admin@mediconnect.com",
      password: "admin2024",
      name: "System Administrator",
      type: "admin" as UserType,
      role: "System Administrator",
      profileImage: "/placeholder.svg?height=40&width=40",
      permissions: ["manage_all", "system_config", "user_management", "view_all_analytics"],
    },
  ]

  // All users combined
  const allUsers = [...patientUsers, ...hospitalUsers, ...pharmacyUsers, ...adminUsers]

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("mediconnect-user")
    const storedHospital = localStorage.getItem("mediconnect-selected-hospital")

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)

        // Set selected hospital if available
        if (storedHospital) {
          setSelectedHospital(JSON.parse(storedHospital))
        } else if (parsedUser.hospitalId) {
          // Set hospital based on user's associated hospital
          const userHospital = hospitals.find((h) => h.id === parsedUser.hospitalId)
          if (userHospital) {
            setSelectedHospital(userHospital)
            localStorage.setItem("mediconnect-selected-hospital", JSON.stringify(userHospital))
          }
        }

        // Redirect based on user type if on login page
        if (pathname === "/login") {
          redirectUserBasedOnType(parsedUser.type)
        }
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("mediconnect-user")
        localStorage.removeItem("mediconnect-selected-hospital")
      }
    }

    setIsLoading(false)
  }, [pathname])

  // Redirect to appropriate portal based on user type
  useEffect(() => {
    if (!isLoading && user.type) {
      // If user is logged in but accessing wrong portal or login page
      if (user.type === "patient" && pathname.startsWith("/patient-portal")) {
        router.push("/patient-portal")
      } else if (user.type === "hospital" && pathname.startsWith("/hospital-portal")) {
        router.push("/hospital-portal")
      } else if (user.type === "pharmacy" && !pathname.startsWith("/pharmacy-portal")) {
        router.push("/pharmacy-portal")
      } else if (user.type === "admin" && !pathname.startsWith("/admin-dashboard")) {
        router.push("/admin-dashboard")
      } else if (pathname === "/login") {
        redirectUserBasedOnType(user.type)
      }
    } else if (!isLoading && !user.type && pathname !== "/login" && !pathname.startsWith("/public")) {
      // If user is not logged in and trying to access protected routes
      router.push("/login")
    }
  }, [user.type, pathname, router, isLoading])

  const redirectUserBasedOnType = (userType: UserType) => {
    switch (userType) {
      case "patient":
        router.push("/patient-portal")
        break
      case "hospital":
        router.push("/hospital-portal")
        break
      case "pharmacy":
        router.push("/pharmacy-portal")
        break
      case "admin":
        router.push("/admin-dashboard")
        break
    }
  }

  const login = async (email: string, password: string, rememberMe: boolean, hospitalId?: string): Promise<boolean> => {
    // Find user in all users list
    const foundUser = allUsers.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

    // Set user if found
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser

      // For pharmacy users, check if a hospital was selected (if they can work at multiple hospitals)
      if (foundUser.type === "pharmacy" && hospitalId && !foundUser.hospitalId) {
        const selectedHospital = hospitals.find((h) => h.id === hospitalId)
        if (selectedHospital) {
          userWithoutPassword.hospitalId = hospitalId
          userWithoutPassword.hospitalName = selectedHospital.name
          setSelectedHospital(selectedHospital)
          localStorage.setItem("mediconnect-selected-hospital", JSON.stringify(selectedHospital))
        }
      } else if (foundUser.hospitalId) {
        // Set hospital based on user's associated hospital
        const userHospital = hospitals.find((h) => h.id === foundUser.hospitalId)
        if (userHospital) {
          setSelectedHospital(userHospital)
          localStorage.setItem("mediconnect-selected-hospital", JSON.stringify(userHospital))
        }
      }

      setUser(userWithoutPassword)

      if (rememberMe) {
        localStorage.setItem("mediconnect-user", JSON.stringify(userWithoutPassword))
      }

      redirectUserBasedOnType(foundUser.type)
      return true
    }

    return false
  }

  const logout = () => {
    setUser({ id: "", email: "", type: null })
    setSelectedHospital(null)
    localStorage.removeItem("mediconnect-user")
    localStorage.removeItem("mediconnect-selected-hospital")
    router.push("/login")
  }

  const hasPermission = (permission: string): boolean => {
    if (!user.permissions) return false

    // Admin with manage_all permission has access to everything
    if (user.permissions.includes("manage_all")) return true

    return user.permissions.includes(permission)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user.type,
        isLoading,
        hospitals,
        selectedHospital,
        setSelectedHospital: (hospital) => {
          setSelectedHospital(hospital)
          if (hospital) {
            localStorage.setItem("mediconnect-selected-hospital", JSON.stringify(hospital))
          } else {
            localStorage.removeItem("mediconnect-selected-hospital")
          }
        },
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
