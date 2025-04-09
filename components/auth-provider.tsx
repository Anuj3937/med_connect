"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

type UserType = "patient" | "hospital" | null

interface User {
  id: string
  email: string
  name?: string
  type: UserType
  hospitalName?: string
  zipCode?: string
  role?: string
  specialties?: string[]
  profileImage?: string
}

interface AuthContextType {
  user: User
  login: (email: string, password: string, rememberMe: boolean) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: { id: "", email: "", type: null },
  login: async () => false,
  logout: () => {},
  isAuthenticated: false,
  isLoading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>({ id: "", email: "", type: null })
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

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
      hospitalName: "Memorial General Hospital",
      zipCode: "12345",
      role: "Administrator",
      profileImage: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "h2",
      email: "hospital2@med.com",
      password: "staffaccess",
      type: "hospital" as UserType,
      hospitalName: "University Medical Center",
      zipCode: "12345",
      role: "Supply Manager",
      profileImage: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "h3",
      email: "hospital3@med.com",
      password: "12345678",
      type: "hospital" as UserType,
      hospitalName: "Riverside Community Hospital",
      zipCode: "23456",
      role: "Resource Coordinator",
      profileImage: "/placeholder.svg?height=40&width=40",
    },
  ]

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("mediconnect-user")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)

        // Redirect based on user type if on login page
        if (pathname === "/login") {
          if (parsedUser.type === "patient") {
            router.push("/patient-portal")
          } else if (parsedUser.type === "hospital") {
            router.push("/hospital-portal")
          }
        }
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("mediconnect-user")
      }
    }

    setIsLoading(false)
  }, [pathname, router])

  // Redirect to appropriate portal based on user type
  useEffect(() => {
    if (!isLoading && user.type) {
      // If user is logged in but accessing wrong portal or login page
      if (user.type === "patient" && pathname.startsWith("/hospital-portal")) {
        router.push("/patient-portal")
      } else if (user.type === "hospital" && pathname.startsWith("/patient-portal")) {
        router.push("/hospital-portal")
      } else if (pathname === "/login") {
        if (user.type === "patient") {
          router.push("/patient-portal")
        } else if (user.type === "hospital") {
          router.push("/hospital-portal")
        }
      }
    } else if (!isLoading && !user.type && pathname !== "/login" && !pathname.startsWith("/public")) {
      // If user is not logged in and trying to access protected routes
      router.push("/login")
    }
  }, [user.type, pathname, router, isLoading])

  const login = async (email: string, password: string, rememberMe: boolean): Promise<boolean> => {
    // Find user in patient list
    const patientUser = patientUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
    )

    // Find user in hospital list
    const hospitalUser = hospitalUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
    )

    // Set user if found
    if (patientUser) {
      const { password, ...userWithoutPassword } = patientUser
      setUser(userWithoutPassword)
      if (rememberMe) {
        localStorage.setItem("mediconnect-user", JSON.stringify(userWithoutPassword))
      }
      router.push("/patient-portal")
      return true
    } else if (hospitalUser) {
      const { password, ...userWithoutPassword } = hospitalUser
      setUser(userWithoutPassword)
      if (rememberMe) {
        localStorage.setItem("mediconnect-user", JSON.stringify(userWithoutPassword))
      }
      router.push("/hospital-portal")
      return true
    }

    return false
  }

  const logout = () => {
    setUser({ id: "", email: "", type: null })
    localStorage.removeItem("mediconnect-user")
    router.push("/login")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user.type,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
