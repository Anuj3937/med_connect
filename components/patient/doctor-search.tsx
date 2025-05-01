"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface DoctorSearchProps {
  allDoctors: any[]
  onSearchResults: (results: any[]) => void
}

export function DoctorSearch({ allDoctors, onSearchResults }: DoctorSearchProps) {
  const [search, setSearch] = useState("")
  const [specialization, setSpecialization] = useState("")
  const [location, setLocation] = useState("")

  const specializations = Array.from(new Set(allDoctors.map(d => d.specialization).filter(Boolean)))
  const locations = Array.from(new Set(allDoctors.map(d => d.location).filter(Boolean)))

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    let results = allDoctors
    if (search) {
      const s = search.toLowerCase()
      results = results.filter(d =>
        (d.name && d.name.toLowerCase().includes(s)) ||
        (d.specialization && d.specialization.toLowerCase().includes(s)) ||
        (d.location && d.location.toLowerCase().includes(s)) ||
        (d.address && d.address.toLowerCase().includes(s))
      )
    }
    if (specialization) {
      results = results.filter(d => d.specialization === specialization)
    }
    if (location) {
      results = results.filter(d => d.location === location)
    }
    onSearchResults(results)
  }

  function handleReset() {
    setSearch("")
    setSpecialization("")
    setLocation("")
    onSearchResults(allDoctors)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2 items-end">
      <div className="flex-1">
        <Input
          placeholder="Search by name, specialization, or address"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div>
        <select
          className="border rounded px-2 py-1"
          value={specialization}
          onChange={e => setSpecialization(e.target.value)}
        >
          <option value="">All Specializations</option>
          {specializations.map(spec => (
            <option key={spec} value={spec}>{spec}</option>
          ))}
        </select>
      </div>
      <div>
        <select
          className="border rounded px-2 py-1"
          value={location}
          onChange={e => setLocation(e.target.value)}
        >
          <option value="">All Cities</option>
          {locations.map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>
      <Button type="submit">Search</Button>
      <Button type="button" variant="outline" onClick={handleReset}>Reset</Button>
    </form>
  )
}
