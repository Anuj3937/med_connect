"use client"

import { useState } from "react"
import { Search, Filter, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"

export function SearchFilters() {
  const [date, setDate] = useState<Date>()

  return (
    <div className="flex flex-col md:flex-row gap-4 mt-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search by location, keyword, or topic..." className="pl-10" />
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Select>
          <SelectTrigger className="w-full sm:w-[180px]">
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="Select region" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            <SelectItem value="northeast">Northeast</SelectItem>
            <SelectItem value="midwest">Midwest</SelectItem>
            <SelectItem value="south">South</SelectItem>
            <SelectItem value="west">West</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full sm:w-[180px] justify-start">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              {date ? format(date, "PPP") : "Select date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>

        <Button variant="outline" className="w-full sm:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          More Filters
        </Button>

        <Button className="w-full sm:w-auto">Search</Button>
      </div>
    </div>
  )
}
