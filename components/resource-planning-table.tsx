import { Check, Clock, MapPin, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function ResourcePlanningTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Location</TableHead>
            <TableHead>Recommendation</TableHead>
            <TableHead>Resources Needed</TableHead>
            <TableHead>Timeline</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">ZIP 12345</span>
              </div>
            </TableCell>
            <TableCell>Increase ER staffing by 20%</TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>4 Doctors, 12 Nurses</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Within 2 weeks</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-yellow-500" />
                <span>Pending</span>
              </div>
            </TableCell>
            <TableCell className="text-right">
              <Button size="sm">Approve</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">ZIP 23456</span>
              </div>
            </TableCell>
            <TableCell>Deploy mobile clinic</TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>2 Doctors, 6 Nurses, 1 Vehicle</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Within 3 weeks</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span>Approved</span>
              </div>
            </TableCell>
            <TableCell className="text-right">
              <Button size="sm" variant="outline">
                <Check className="mr-2 h-4 w-4" />
                Implemented
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">ZIP 34567</span>
              </div>
            </TableCell>
            <TableCell>Preventive care outreach program</TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>3 Nurses, 5 Community Health Workers</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Within 4 weeks</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <span>Urgent</span>
              </div>
            </TableCell>
            <TableCell className="text-right">
              <Button size="sm">Approve</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">ZIP 45678</span>
              </div>
            </TableCell>
            <TableCell>Increase chronic care capacity</TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>2 Specialists, 4 Nurses</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Within 6 weeks</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-yellow-500" />
                <span>Pending</span>
              </div>
            </TableCell>
            <TableCell className="text-right">
              <Button size="sm">Approve</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">ZIP 56789</span>
              </div>
            </TableCell>
            <TableCell>Mental health services expansion</TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>3 Therapists, 1 Psychiatrist</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Within 8 weeks</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span>Approved</span>
              </div>
            </TableCell>
            <TableCell className="text-right">
              <Button size="sm" variant="outline">
                <Check className="mr-2 h-4 w-4" />
                Implemented
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
