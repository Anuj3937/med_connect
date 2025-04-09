"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

type User = {
  type: "patient" | "hospital" | null
  email: string | null
  zipCode: string | null
  hospitalName?: string | null
}

type AuthContextType = {
  user: User
  isLoggedIn: boolean
  login: (userData: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: { type: null, email: null, zipCode: null },
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User>({ type: null, email: null, zipCode: null })
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const userType = localStorage.getItem("userType") as "patient" | "hospital" | null
    const userEmail = localStorage.getItem("userEmail")
    const userZipCode = localStorage.getItem("userZipCode")
    const hospitalName = localStorage.getItem("hospitalName")
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"

    if (loggedIn && userType && userEmail) {
      setUser({
        type: userType,
        email: userEmail,
        zipCode: userZipCode,
        hospitalName: hospitalName,
      })
      setIsLoggedIn(true)
    }

    setIsLoading(false)
  }, [])

  useEffect(() => {
    // Redirect logic based on auth state and current path
    if (!isLoading) {
      // Public routes that don't require authentication
      const publicRoutes = ["/login", "/"]

      // Routes that require patient authentication
      const patientRoutes = ["/patient-portal"]

      // Routes that require hospital authentication
      const hospitalRoutes = ["/hospital-portal"]

      if (!isLoggedIn && !publicRoutes.includes(pathname)) {
        router.push("/login")
      } else if (isLoggedIn) {
        if (user.type === "patient" && hospitalRoutes.includes(pathname)) {
          router.push("/patient-portal")
        } else if (user.type === "hospital" && patientRoutes.includes(pathname)) {
          router.push("/hospital-portal")
        } else if (pathname === "/login" || pathname === "/") {
          router.push(user.type === "patient" ? "/patient-portal" : "/hospital-portal")
        }
      }
    }
  }, [isLoggedIn, pathname, router, user.type, isLoading])

  const login = (userData: User) => {
    setUser(userData)
    setIsLoggedIn(true)

    // Store in localStorage
    localStorage.setItem("userType", userData.type || "")
    localStorage.setItem("userEmail", userData.email || "")
    if (userData.zipCode) localStorage.setItem("userZipCode", userData.zipCode)
    if (userData.hospitalName) localStorage.setItem("hospitalName", userData.hospitalName)
    localStorage.setItem("isLoggedIn", "true")
  }

  const logout = () => {
    setUser({ type: null, email: null, zipCode: null })
    setIsLoggedIn(false)

    // Clear localStorage
    localStorage.removeItem("userType")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userZipCode")
    localStorage.removeItem("hospitalName")
    localStorage.removeItem("isLoggedIn")

    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>{!isLoading && children}</AuthContext.Provider>
  )
}
