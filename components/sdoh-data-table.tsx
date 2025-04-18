import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function SdohDataTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Indicator</TableHead>
            <TableHead>
              <Button variant="ghost" className="p-0 font-medium">
                Current Value
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Trend</TableHead>
            <TableHead className="text-right">Impact</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Eviction Rate</TableCell>
            <TableCell>8.2%</TableCell>
            <TableCell className="text-red-600 dark:text-red-400">↑ 3.1%</TableCell>
            <TableCell className="text-right">High</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Unemployment</TableCell>
            <TableCell>6.5%</TableCell>
            <TableCell className="text-red-600 dark:text-red-400">�� 1.2%</TableCell>
            <TableCell className="text-right">High</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">School Attendance</TableCell>
            <TableCell>87.3%</TableCell>
            <TableCell className="text-red-600 dark:text-red-400">↓ 4.5%</TableCell>
            <TableCell className="text-right">Medium</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Food Insecurity</TableCell>
            <TableCell>12.8%</TableCell>
            <TableCell className="text-red-600 dark:text-red-400">↑ 2.3%</TableCell>
            <TableCell className="text-right">Medium</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Public Transport Access</TableCell>
            <TableCell>65.2%</TableCell>
            <TableCell className="text-green-600 dark:text-green-400">↑ 1.5%</TableCell>
            <TableCell className="text-right">Low</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
