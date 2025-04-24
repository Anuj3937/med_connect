"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Activity, Users, Database, Server, Clock, AlertTriangle } from "lucide-react"

export function SystemOverview() {
  // Mock data for system overview
  const systemData = {
    activeUsers: {
      total: 248,
      breakdown: {
        hospital: 125,
        pharmacy: 42,
        patient: 81,
      },
      change: "+12%",
    },
    serverStatus: {
      status: "operational",
      uptime: "99.98%",
      responseTime: "120ms",
      lastIncident: "45 days ago",
    },
    databaseStatus: {
      status: "operational",
      size: "1.2 TB",
      queries: "2.5k/min",
      backupStatus: "Last backup: 6 hours ago",
    },
    resourceUtilization: {
      cpu: 42,
      memory: 68,
      storage: 75,
      network: 35,
    },
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "operational":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
            Operational
          </Badge>
        )
      case "degraded":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
            Degraded
          </Badge>
        )
      case "outage":
        return (
          <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
            Outage
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <Users className="h-8 w-8 text-muted-foreground mb-2" />
              <div className="text-sm text-muted-foreground">Active Users</div>
              <div className="text-3xl font-bold">{systemData.activeUsers.total}</div>
              <div className="text-xs text-green-600 mt-1">{systemData.activeUsers.change} from last week</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <Server className="h-8 w-8 text-muted-foreground mb-2" />
              <div className="text-sm text-muted-foreground">Server Status</div>
              <div className="flex items-center gap-2 mt-1">{getStatusBadge(systemData.serverStatus.status)}</div>
              <div className="text-xs text-muted-foreground mt-2">Uptime: {systemData.serverStatus.uptime}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <Database className="h-8 w-8 text-muted-foreground mb-2" />
              <div className="text-sm text-muted-foreground">Database Status</div>
              <div className="flex items-center gap-2 mt-1">{getStatusBadge(systemData.databaseStatus.status)}</div>
              <div className="text-xs text-muted-foreground mt-2">
                Size: {systemData.databaseStatus.size} | Queries: {systemData.databaseStatus.queries}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <Activity className="h-8 w-8 text-muted-foreground mb-2" />
              <div className="text-sm text-muted-foreground">System Activity</div>
              <div className="text-3xl font-bold">High</div>
              <div className="text-xs text-muted-foreground mt-1">
                Response Time: {systemData.serverStatus.responseTime}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Resource Utilization</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">CPU Usage</span>
                <span className="text-sm">{systemData.resourceUtilization.cpu}%</span>
              </div>
              <Progress
                value={systemData.resourceUtilization.cpu}
                className="h-2"
                indicatorClassName={
                  systemData.resourceUtilization.cpu > 80
                    ? "bg-red-500"
                    : systemData.resourceUtilization.cpu > 60
                      ? "bg-amber-500"
                      : "bg-green-500"
                }
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Memory Usage</span>
                <span className="text-sm">{systemData.resourceUtilization.memory}%</span>
              </div>
              <Progress
                value={systemData.resourceUtilization.memory}
                className="h-2"
                indicatorClassName={
                  systemData.resourceUtilization.memory > 80
                    ? "bg-red-500"
                    : systemData.resourceUtilization.memory > 60
                      ? "bg-amber-500"
                      : "bg-green-500"
                }
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Storage Usage</span>
                <span className="text-sm">{systemData.resourceUtilization.storage}%</span>
              </div>
              <Progress
                value={systemData.resourceUtilization.storage}
                className="h-2"
                indicatorClassName={
                  systemData.resourceUtilization.storage > 80
                    ? "bg-red-500"
                    : systemData.resourceUtilization.storage > 60
                      ? "bg-amber-500"
                      : "bg-green-500"
                }
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Network Usage</span>
                <span className="text-sm">{systemData.resourceUtilization.network}%</span>
              </div>
              <Progress
                value={systemData.resourceUtilization.network}
                className="h-2"
                indicatorClassName={
                  systemData.resourceUtilization.network > 80
                    ? "bg-red-500"
                    : systemData.resourceUtilization.network > 60
                      ? "bg-amber-500"
                      : "bg-green-500"
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">User Distribution</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Hospital Staff</span>
                  <span className="text-sm">
                    {systemData.activeUsers.breakdown.hospital} (
                    {Math.round((systemData.activeUsers.breakdown.hospital / systemData.activeUsers.total) * 100)}%)
                  </span>
                </div>
                <Progress
                  value={(systemData.activeUsers.breakdown.hospital / systemData.activeUsers.total) * 100}
                  className="h-2"
                  indicatorClassName="bg-blue-500"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Pharmacy Staff</span>
                  <span className="text-sm">
                    {systemData.activeUsers.breakdown.pharmacy} (
                    {Math.round((systemData.activeUsers.breakdown.pharmacy / systemData.activeUsers.total) * 100)}%)
                  </span>
                </div>
                <Progress
                  value={(systemData.activeUsers.breakdown.pharmacy / systemData.activeUsers.total) * 100}
                  className="h-2"
                  indicatorClassName="bg-green-500"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Patients</span>
                  <span className="text-sm">
                    {systemData.activeUsers.breakdown.patient} (
                    {Math.round((systemData.activeUsers.breakdown.patient / systemData.activeUsers.total) * 100)}%)
                  </span>
                </div>
                <Progress
                  value={(systemData.activeUsers.breakdown.patient / systemData.activeUsers.total) * 100}
                  className="h-2"
                  indicatorClassName="bg-purple-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">System Health</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Server className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">Server Status</span>
                </div>
                {getStatusBadge(systemData.serverStatus.status)}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">Database Status</span>
                </div>
                {getStatusBadge(systemData.databaseStatus.status)}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">Last Incident</span>
                </div>
                <span className="text-sm">{systemData.serverStatus.lastIncident}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">Backup Status</span>
                </div>
                <span className="text-sm">{systemData.databaseStatus.backupStatus}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
