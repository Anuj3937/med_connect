import { ArrowDown, ArrowUp, Clock, Users, AlertTriangle, Activity } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function HealthcareMetricsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Predicted ER Visits</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+18.2%</div>
          <p className="text-xs text-muted-foreground">Expected increase in next 30 days</p>
          <div className="mt-4 flex items-center gap-2 text-xs">
            <div className="flex items-center rounded-full bg-red-100 px-2 py-1 text-red-600 dark:bg-red-900 dark:text-red-200">
              <ArrowUp className="mr-1 h-3 w-3" />
              <span>High Risk</span>
            </div>
            <span className="text-muted-foreground">vs. 12.5% last month</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Hospital Admissions</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+7.4%</div>
          <p className="text-xs text-muted-foreground">Expected increase in next 30 days</p>
          <div className="mt-4 flex items-center gap-2 text-xs">
            <div className="flex items-center rounded-full bg-yellow-100 px-2 py-1 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-200">
              <AlertTriangle className="mr-1 h-3 w-3" />
              <span>Medium Risk</span>
            </div>
            <span className="text-muted-foreground">vs. 5.2% last month</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Chronic Care Needs</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+12.8%</div>
          <p className="text-xs text-muted-foreground">Expected increase in next 30 days</p>
          <div className="mt-4 flex items-center gap-2 text-xs">
            <div className="flex items-center rounded-full bg-yellow-100 px-2 py-1 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-200">
              <AlertTriangle className="mr-1 h-3 w-3" />
              <span>Medium Risk</span>
            </div>
            <span className="text-muted-foreground">vs. 10.1% last month</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Preventive Care</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">-3.1%</div>
          <p className="text-xs text-muted-foreground">Expected decrease in next 30 days</p>
          <div className="mt-4 flex items-center gap-2 text-xs">
            <div className="flex items-center rounded-full bg-green-100 px-2 py-1 text-green-600 dark:bg-green-900 dark:text-green-200">
              <ArrowDown className="mr-1 h-3 w-3" />
              <span>Low Risk</span>
            </div>
            <span className="text-muted-foreground">vs. -2.5% last month</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
