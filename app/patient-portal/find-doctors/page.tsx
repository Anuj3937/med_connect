"use client"

import { useEffect, useState } from "react"
import Papa from "papaparse"
import { DoctorSearch } from "@/components/patient/doctor-search"
import { DoctorCard } from "@/components/patient/doctor-card"

const CSV_URL = "/doctors_multi_city_specialization.csv"

export default function FindDoctorsPage() {
  const [allDoctors, setAllDoctors] = useState<any[]>([])
  const [filteredDoctors, setFilteredDoctors] = useState<any[]>([])

  useEffect(() => {
    fetch(CSV_URL)
      .then(res => res.text())
      .then(text => {
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const doctors = (results.data as any[]).map((row, idx) => ({
              id: `${row.Name || "Unknown"}-${idx}`,
              name: row.Name || "Unknown",
              specialization: row.Specialization || "",
              experience: row.Experience || "",
              fees: row.Fees || "",
              location: row.City || "",
              address: row.Location || "",
              phone: row["Phone Number"] || "",
            }))
            setAllDoctors(doctors)
            setFilteredDoctors(doctors)
          }
        })
      })
  }, [])

  function handleSearch(results: any[]) {
    setFilteredDoctors(results)
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-2">
      <h1 className="text-3xl font-bold mb-2">Find Doctors</h1>
      <p className="mb-6 text-gray-600">Search for doctors based on specialization, experience, and location</p>
      <DoctorSearch allDoctors={allDoctors} onSearchResults={handleSearch} />
      <div className="mt-8">
        {filteredDoctors.length > 0 ? (
          <div>
            <div className="mb-4 text-gray-700 font-semibold">{filteredDoctors.length} doctors found</div>
            <div className="grid gap-4">
              {filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-gray-500">No doctors found. Try adjusting your search.</div>
        )}
      </div>
    </div>
  )
}
