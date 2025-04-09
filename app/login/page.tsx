"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Hospital, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Patient login state
  const [patientEmail, setPatientEmail] = useState("")
  const [patientPassword, setPatientPassword] = useState("")
  const [patientRemember, setPatientRemember] = useState(false)
  const [patientError, setPatientError] = useState("")

  // Hospital login state
  const [hospitalEmail, setHospitalEmail] = useState("")
  const [hospitalPassword, setHospitalPassword] = useState("")
  const [hospitalRemember, setHospitalRemember] = useState(false)
  const [hospitalError, setHospitalError] = useState("")

  // Hardcoded credentials
  const patientCredentials = [
    { email: "patient1@email.com", password: "password123", zipCode: "12345" },
    { email: "patient2@email.com", password: "patient2024", zipCode: "12345" },
    { email: "patient3@email.com", password: "secure789", zipCode: "23456" },
  ]

  const hospitalCredentials = [
    { email: "hospital1@med.com", password: "hospital2024", name: "Memorial General Hospital", zipCode: "12345" },
    { email: "hospital2@med.com", password: "staffaccess", name: "University Medical Center", zipCode: "12345" },
    { email: "hospital3@med.com", password: "12345678", name: "Riverside Community Hospital", zipCode: "23456" },
  ]

  const handlePatientLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setPatientError("")

    // Email validation
    if (!patientEmail.includes("@") || !patientEmail.includes(".")) {
      setPatientError("Please enter a valid email address")
      setIsLoading(false)
      return
    }

    // Password validation
    if (patientPassword.length < 6) {
      setPatientError("Password must be at least 6 characters")
      setIsLoading(false)
      return
    }

    // Check credentials
    const user = patientCredentials.find((cred) => cred.email === patientEmail && cred.password === patientPassword)

    setTimeout(() => {
      if (user) {
        // Store user info in localStorage
        localStorage.setItem("userType", "patient")
        localStorage.setItem("userEmail", user.email)
        localStorage.setItem("userZipCode", user.zipCode)
        localStorage.setItem("isLoggedIn", "true")

        toast({
          title: "Login successful",
          description: "Welcome to MediConnect Patient Portal",
        })

        // Redirect to patient dashboard
        router.push("/patient-portal")
      } else {
        setPatientError("Invalid email or password")
      }
      setIsLoading(false)
    }, 1000)
  }

  const handleHospitalLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setHospitalError("")

    // Email validation
    if (!hospitalEmail.includes("@") || !hospitalEmail.includes(".")) {
      setHospitalError("Please enter a valid email address")
      setIsLoading(false)
      return
    }

    // Password validation
    if (hospitalPassword.length < 6) {
      setHospitalError("Password must be at least 6 characters")
      setIsLoading(false)
      return
    }

    // Check credentials
    const hospital = hospitalCredentials.find(
      (cred) => cred.email === hospitalEmail && cred.password === hospitalPassword,
    )

    setTimeout(() => {
      if (hospital) {
        // Store hospital info in localStorage
        localStorage.setItem("userType", "hospital")
        localStorage.setItem("userEmail", hospital.email)
        localStorage.setItem("hospitalName", hospital.name)
        localStorage.setItem("userZipCode", hospital.zipCode)
        localStorage.setItem("isLoggedIn", "true")

        toast({
          title: "Login successful",
          description: `Welcome to MediConnect Hospital Portal, ${hospital.name}`,
        })

        // Redirect to hospital dashboard
        router.push("/hospital-portal")
      } else {
        setHospitalError("Invalid email or password")
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center">
              <Hospital className="h-6 w-6 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">MediConnect</h1>
          <p className="text-gray-600 mt-1">Healthcare Supply Chain & Resource Management</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <Tabs defaultValue="patient" className="w-full">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="patient" className="py-3">
                <User className="mr-2 h-4 w-4" />
                Patient
              </TabsTrigger>
              <TabsTrigger value="hospital" className="py-3">
                <Hospital className="mr-2 h-4 w-4" />
                Hospital/Staff
              </TabsTrigger>
            </TabsList>

            <TabsContent value="patient" className="p-6">
              <form onSubmit={handlePatientLogin}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient-email">Email</Label>
                    <Input
                      id="patient-email"
                      type="email"
                      placeholder="patient@example.com"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="patient-password">Password</Label>
                      <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <Input
                        id="patient-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={patientPassword}
                        onChange={(e) => setPatientPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {patientError && <div className="text-red-500 text-sm">{patientError}</div>}

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="patient-remember"
                      checked={patientRemember}
                      onCheckedChange={(checked) => setPatientRemember(checked as boolean)}
                    />
                    <label
                      htmlFor="patient-remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login to Patient Portal"}
                  </Button>

                  <div className="text-center text-sm text-gray-500 mt-4">
                    <p>Demo credentials:</p>
                    <p className="font-mono text-xs mt-1">patient1@email.com / password123</p>
                  </div>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="hospital" className="p-6">
              <form onSubmit={handleHospitalLogin}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="hospital-email">Email</Label>
                    <Input
                      id="hospital-email"
                      type="email"
                      placeholder="hospital@med.com"
                      value={hospitalEmail}
                      onChange={(e) => setHospitalEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="hospital-password">Password</Label>
                      <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <Input
                        id="hospital-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={hospitalPassword}
                        onChange={(e) => setHospitalPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {hospitalError && <div className="text-red-500 text-sm">{hospitalError}</div>}

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hospital-remember"
                      checked={hospitalRemember}
                      onCheckedChange={(checked) => setHospitalRemember(checked as boolean)}
                    />
                    <label
                      htmlFor="hospital-remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login to Hospital Portal"}
                  </Button>

                  <div className="text-center text-sm text-gray-500 mt-4">
                    <p>Demo credentials:</p>
                    <p className="font-mono text-xs mt-1">hospital1@med.com / hospital2024</p>
                  </div>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </div>

        <div className="text-center mt-6 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} MediConnect. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
