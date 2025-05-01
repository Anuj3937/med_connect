import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface DoctorCardProps {
  doctor: {
    id: string
    name: string
    specialization: string
    experience?: string
    fees?: string
    location: string
    address: string
    phone?: string
  }
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  const {
    name,
    specialization,
    experience,
    fees,
    location,
    address,
    phone,
  } = doctor

  // Get initials for avatar fallback
  const initials =
    typeof name === "string" && name.trim()
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .substring(0, 2)
      : "?"

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{specialization}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <div>
            <div className="font-semibold">{location}</div>
            <div className="text-sm text-gray-500">{address}</div>
          </div>
          <div className="ml-auto text-right">
            <div>{experience}</div>
            {fees && <div>Fees: {fees}</div>}
            {phone && phone !== "N/A" && <div>Phone: {phone}</div>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
