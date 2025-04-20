import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Languages, GraduationCap, Calendar } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface DoctorCardProps {
  doctor: {
    id: string
    name: string
    specialization: string
    experience: number
    location: string
    address: string
    rating: number
    acceptingNewPatients: boolean
    insurance: string[]
    education: string
    languages: string[]
    image?: string
  }
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  const {
    name,
    specialization,
    experience,
    location,
    address,
    rating,
    acceptingNewPatients,
    insurance,
    education,
    languages,
    image,
  } = doctor

  // Get initials for avatar fallback
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={image || "/placeholder.svg"} alt={name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription>{specialization}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
          <Badge variant={acceptingNewPatients ? "default" : "secondary"}>
            {acceptingNewPatients ? "Accepting Patients" : "Not Accepting Patients"}
          </Badge>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-start">
            <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
            <div>
              <div>{location}</div>
              <div className="text-muted-foreground">{address}</div>
            </div>
          </div>

          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{experience} years experience</span>
          </div>

          <div className="flex items-center">
            <GraduationCap className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{education}</span>
          </div>

          <div className="flex items-start">
            <Languages className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
            <span>{languages.join(", ")}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button className="w-full">Book Appointment</Button>
      </CardFooter>
    </Card>
  )
}
