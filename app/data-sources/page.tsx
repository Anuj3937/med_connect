import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataSourcesTable } from "@/components/data-sources-table"

export default function DataSourcesPage() {
  return (
    <div className="container py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Data Sources</h1>
          <p className="text-muted-foreground">
            Configure and manage Social Determinants of Health (SDoH) data sources
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Data Source
        </Button>
      </div>

      <Tabs defaultValue="active">
        <TabsList className="mb-4">
          <TabsTrigger value="active">Active Sources</TabsTrigger>
          <TabsTrigger value="available">Available Sources</TabsTrigger>
          <TabsTrigger value="settings">Integration Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-6">
          <DataSourcesTable />
        </TabsContent>
        <TabsContent value="available" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Census Bureau API</CardTitle>
                <CardDescription>Demographic and economic data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Data Type:</span>
                    <span className="text-sm text-muted-foreground">Demographics, Economics</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Update Frequency:</span>
                    <span className="text-sm text-muted-foreground">Monthly</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Format:</span>
                    <span className="text-sm text-muted-foreground">JSON, CSV</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Connect</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>HUD Housing Data</CardTitle>
                <CardDescription>Housing and eviction statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Data Type:</span>
                    <span className="text-sm text-muted-foreground">Housing, Evictions</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Update Frequency:</span>
                    <span className="text-sm text-muted-foreground">Weekly</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Format:</span>
                    <span className="text-sm text-muted-foreground">JSON, XML</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Connect</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Department of Labor</CardTitle>
                <CardDescription>Employment and workforce data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Data Type:</span>
                    <span className="text-sm text-muted-foreground">Employment, Wages</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Update Frequency:</span>
                    <span className="text-sm text-muted-foreground">Bi-weekly</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Format:</span>
                    <span className="text-sm text-muted-foreground">JSON, CSV</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Connect</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Integration Settings</CardTitle>
              <CardDescription>Configure how data is collected and processed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input id="api-key" type="password" value="●●●●●●●●●●●●●●●●" />
                <p className="text-xs text-muted-foreground">Used for accessing external data sources</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="refresh-interval">Data Refresh Interval</Label>
                <Select defaultValue="daily">
                  <SelectTrigger id="refresh-interval">
                    <SelectValue placeholder="Select interval" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">How often to fetch new data from sources</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-sync">Automatic Synchronization</Label>
                  <Switch id="auto-sync" defaultChecked />
                </div>
                <p className="text-xs text-muted-foreground">Automatically sync data based on the refresh interval</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="data-anonymization">Data Anonymization</Label>
                  <Switch id="data-anonymization" defaultChecked />
                </div>
                <p className="text-xs text-muted-foreground">
                  Ensure all personal identifiable information is anonymized
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
