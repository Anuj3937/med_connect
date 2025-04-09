import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function RiskScoreTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ZIP Code</TableHead>
            <TableHead>
              <Button variant="ghost" className="p-0 font-medium">
                Risk Score
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Timeframe</TableHead>
            <TableHead className="text-right">Change</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="bg-red-50 dark:bg-red-950/20">
            <TableCell className="font-medium">12345</TableCell>
            <TableCell>
              <div className="flex items-center">
                <div className="h-2 w-full rounded-full bg-red-100 dark:bg-red-950/50">
                  <div className="h-2 w-[85%] rounded-full bg-red-500" />
                </div>
                <span className="ml-2 text-xs font-medium">85%</span>
              </div>
            </TableCell>
            <TableCell>6 weeks</TableCell>
            <TableCell className="text-right text-red-600 dark:text-red-400">+20%</TableCell>
          </TableRow>
          <TableRow className="bg-yellow-50 dark:bg-yellow-950/20">
            <TableCell className="font-medium">23456</TableCell>
            <TableCell>
              <div className="flex items-center">
                <div className="h-2 w-full rounded-full bg-yellow-100 dark:bg-yellow-950/50">
                  <div className="h-2 w-[68%] rounded-full bg-yellow-500" />
                </div>
                <span className="ml-2 text-xs font-medium">68%</span>
              </div>
            </TableCell>
            <TableCell>8 weeks</TableCell>
            <TableCell className="text-right text-yellow-600 dark:text-yellow-400">+15%</TableCell>
          </TableRow>
          <TableRow className="bg-yellow-50 dark:bg-yellow-950/20">
            <TableCell className="font-medium">34567</TableCell>
            <TableCell>
              <div className="flex items-center">
                <div className="h-2 w-full rounded-full bg-yellow-100 dark:bg-yellow-950/50">
                  <div className="h-2 w-[62%] rounded-full bg-yellow-500" />
                </div>
                <span className="ml-2 text-xs font-medium">62%</span>
              </div>
            </TableCell>
            <TableCell>4 weeks</TableCell>
            <TableCell className="text-right text-yellow-600 dark:text-yellow-400">+12%</TableCell>
          </TableRow>
          <TableRow className="bg-green-50 dark:bg-green-950/20">
            <TableCell className="font-medium">45678</TableCell>
            <TableCell>
              <div className="flex items-center">
                <div className="h-2 w-full rounded-full bg-green-100 dark:bg-green-950/50">
                  <div className="h-2 w-[35%] rounded-full bg-green-500" />
                </div>
                <span className="ml-2 text-xs font-medium">35%</span>
              </div>
            </TableCell>
            <TableCell>12 weeks</TableCell>
            <TableCell className="text-right text-green-600 dark:text-green-400">+5%</TableCell>
          </TableRow>
          <TableRow className="bg-green-50 dark:bg-green-950/20">
            <TableCell className="font-medium">56789</TableCell>
            <TableCell>
              <div className="flex items-center">
                <div className="h-2 w-full rounded-full bg-green-100 dark:bg-green-950/50">
                  <div className="h-2 w-[28%] rounded-full bg-green-500" />
                </div>
                <span className="ml-2 text-xs font-medium">28%</span>
              </div>
            </TableCell>
            <TableCell>10 weeks</TableCell>
            <TableCell className="text-right text-green-600 dark:text-green-400">+3%</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
