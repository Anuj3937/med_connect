"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { PlusCircle, TrendingUp, Activity, Calendar, AlertTriangle, CheckCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for health entries
const mockHealthEntries = [
  {
    id: "1",
    date: "2023-11-05",
    bloodPressure: "120/80",
    bloodSugar: "98",
    weight: "74",
    heartRate: "72",
    steps: "8500",
    sleep: "7.5",
    notes: "Feeling good today",
  },
  {
    id: "2",
    date: "2023-11-04",
    bloodPressure: "122/82",
    bloodSugar: "102",
    weight: "74.2",
    heartRate: "75",
    steps: "7200",
    sleep: "6.5",
    notes: "Slight headache in the evening",
  },
  {
    id: "3",
    date: "2023-11-03",
    bloodPressure: "118/78",
    bloodSugar: "95",
    weight: "74.5",
    heartRate: "70",
    steps: "9100",
    sleep: "8",
    notes: "Exercised in the morning",
  },
]

// Mock insights based on health data
const generateInsights = (entries: any[]) => {
  if (entries.length < 3) return []

  const insights = []

  // Blood pressure insight
  const avgSystolic =
    entries.slice(0, 3).reduce((sum, entry) => sum + Number.parseInt(entry.bloodPressure.split("/")[0]), 0) / 3
  if (avgSystolic > 120) {
    insights.push({
      type: "warning",
      metric: "Blood Pressure",
      message:
        "Your average systolic blood pressure is slightly elevated. Consider reducing salt intake and increasing physical activity.",
      icon: AlertTriangle,
    })
  } else {
    insights.push({
      type: "success",
      metric: "Blood Pressure",
      message: "Your blood pressure readings are within the normal range. Keep up the good work!",
      icon: CheckCircle,
    })
  }

  // Blood sugar insight
  const avgBloodSugar = entries.slice(0, 3).reduce((sum, entry) => sum + Number.parseInt(entry.bloodSugar), 0) / 3
  if (avgBloodSugar > 100) {
    insights.push({
      type: "warning",
      metric: "Blood Sugar",
      message:
        "Your average blood sugar is slightly elevated. Consider reducing sugar intake and monitoring your carbohydrate consumption.",
      icon: AlertTriangle,
    })
  } else {
    insights.push({
      type: "success",
      metric: "Blood Sugar",
      message: "Your blood sugar levels are within the normal range. Continue your healthy eating habits.",
      icon: CheckCircle,
    })
  }

  // Sleep insight
  const avgSleep = entries.slice(0, 3).reduce((sum, entry) => sum + Number.parseFloat(entry.sleep), 0) / 3
  if (avgSleep < 7) {
    insights.push({
      type: "warning",
      metric: "Sleep",
      message:
        "You're averaging less than 7 hours of sleep. Try to establish a regular sleep schedule for better health.",
      icon: AlertTriangle,
    })
  } else {
    insights.push({
      type: "success",
      metric: "Sleep",
      message: "You're getting adequate sleep. Good sleep habits contribute to overall health and wellbeing.",
      icon: CheckCircle,
    })
  }

  return insights
}

export function DailyHealthTracker() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("add")
  const [entries, setEntries] = useState(mockHealthEntries)
  const [newEntry, setNewEntry] = useState({
    bloodPressure: "",
    bloodSugar: "",
    weight: "",
    heartRate: "",
    steps: "",
    sleep: "",
    notes: "",
  })

  const insights = generateInsights(entries)

  const handleInputChange = (field: string, value: string) => {
    setNewEntry((prev) => ({ ...prev, [field]: value }))
  }

  const handleAddEntry = () => {
    // Validate required fields
    if (!newEntry.bloodPressure || !newEntry.bloodSugar || !newEntry.weight) {
      toast({
        title: "Missing information",
        description: "Please fill in at least blood pressure, blood sugar, and weight.",
        variant: "destructive",
      })
      return
    }

    // Add new entry
    const today = new Date().toISOString().split("T")[0]
    const newEntryWithDate = {
      id: Date.now().toString(),
      date: today,
      ...newEntry,
    }

    setEntries([newEntryWithDate, ...entries])

    // Reset form
    setNewEntry({
      bloodPressure: "",
      bloodSugar: "",
      weight: "",
      heartRate: "",
      steps: "",
      sleep: "",
      notes: "",
    })

    toast({
      title: "Entry added",
      description: "Your health metrics have been recorded successfully.",
    })

    // Switch to history tab
    setActiveTab("history")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Health Tracker</CardTitle>
        <CardDescription>Record and monitor your daily health metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="add">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Entry
            </TabsTrigger>
            <TabsTrigger value="history">
              <Calendar className="h-4 w-4 mr-2" />
              History
            </TabsTrigger>
            <TabsTrigger value="insights">
              <TrendingUp className="h-4 w-4 mr-2" />
              Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="add" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bloodPressure">Blood Pressure (mmHg)</Label>
                <Input
                  id="bloodPressure"
                  placeholder="e.g., 120/80"
                  value={newEntry.bloodPressure}
                  onChange={(e) => handleInputChange("bloodPressure", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodSugar">Blood Sugar (mg/dL)</Label>
                <Input
                  id="bloodSugar"
                  placeholder="e.g., 95"
                  value={newEntry.bloodSugar}
                  onChange={(e) => handleInputChange("bloodSugar", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  placeholder="e.g., 75"
                  value={newEntry.weight}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
                <Input
                  id="heartRate"
                  placeholder="e.g., 72"
                  value={newEntry.heartRate}
                  onChange={(e) => handleInputChange("heartRate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="steps">Steps</Label>
                <Input
                  id="steps"
                  placeholder="e.g., 8000"
                  value={newEntry.steps}
                  onChange={(e) => handleInputChange("steps", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sleep">Sleep (hours)</Label>
                <Input
                  id="sleep"
                  placeholder="e.g., 7.5"
                  value={newEntry.sleep}
                  onChange={(e) => handleInputChange("sleep", e.target.value)}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <Input
                  id="notes"
                  placeholder="Any additional notes about your health today"
                  value={newEntry.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                />
              </div>
            </div>
            <Button onClick={handleAddEntry} className="w-full">
              Save Today's Entry
            </Button>
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>BP (mmHg)</TableHead>
                    <TableHead>Sugar (mg/dL)</TableHead>
                    <TableHead>Weight (kg)</TableHead>
                    <TableHead>Heart Rate</TableHead>
                    <TableHead>Steps</TableHead>
                    <TableHead>Sleep (hrs)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
                      <TableCell>{entry.bloodPressure}</TableCell>
                      <TableCell>{entry.bloodSugar}</TableCell>
                      <TableCell>{entry.weight}</TableCell>
                      <TableCell>{entry.heartRate}</TableCell>
                      <TableCell>{entry.steps}</TableCell>
                      <TableCell>{entry.sleep}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="mt-4">
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <Card key={index} className={insight.type === "warning" ? "border-amber-200" : "border-green-200"}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center">
                      <insight.icon
                        className={`h-5 w-5 mr-2 ${insight.type === "warning" ? "text-amber-500" : "text-green-500"}`}
                      />
                      <CardTitle className="text-base">{insight.metric}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{insight.message}</p>
                  </CardContent>
                </Card>
              ))}

              {insights.length === 0 && (
                <div className="text-center py-8">
                  <Activity className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Not enough data</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Add at least 3 daily entries to see personalized health insights.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
