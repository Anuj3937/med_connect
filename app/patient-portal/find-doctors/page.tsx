"use client"

import { useState } from "react"
import { DoctorSearch } from "@/components/patient/doctor-search"
import { DoctorCard } from "@/components/patient/doctor-card"

export default function FindDoctorsPage() {
  const [filteredDoctors, setFilteredDoctors] = useState<any[]>([])

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Find Doctors</h1>
      <p className="text-muted-foreground mb-6">Search for doctors based on specialization, experience, and location</p>

      <DoctorSearch onSearchResults={setFilteredDoctors} />

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          {filteredDoctors.length > 0 ? `${filteredDoctors.length} doctors found` : "Start searching to find doctors"}
        </h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>
    </div>
  )
}
