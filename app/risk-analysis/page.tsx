import { ArrowRight, Download, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RiskFactorsChart } from "@/components/risk-factors-chart"
import { RiskPredictionTimeline } from "@/components/risk-prediction-timeline"
import { RiskScoreDistribution } from "@/components/risk-score-distribution"
import { ZipCodeRiskAnalysis } from "@/components/zip-code-risk-analysis"

export default function RiskAnalysisPage() {
  return (
    <div className="container py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Risk Analysis</h1>
          <p className="text-muted-foreground">Detailed analysis of healthcare demand risk factors and predictions</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            Generate Report
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="by-region">By Region</TabsTrigger>
          <TabsTrigger value="by-factor">By Risk Factor</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Risk Score Distribution</CardTitle>
                <CardDescription>Distribution of risk scores across all communities</CardDescription>
              </CardHeader>
              <CardContent>
                <RiskScoreDistribution />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Key Risk Factors</CardTitle>
                <CardDescription>Impact of different SDoH factors on risk scores</CardDescription>
              </CardHeader>
              <CardContent>
                <RiskFactorsChart />
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Risk Prediction Timeline</CardTitle>
              <CardDescription>How risk scores are expected to change over time</CardDescription>
            </CardHeader>
            <CardContent>
              <RiskPredictionTimeline />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="by-region" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ZIP Code Risk Analysis</CardTitle>
              <CardDescription>Detailed risk analysis by ZIP code</CardDescription>
            </CardHeader>
            <CardContent>
              <ZipCodeRiskAnalysis />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="by-factor" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Risk Factor Analysis</CardTitle>
              <CardDescription>Detailed analysis by risk factor</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">
                Select the By Risk Factor tab to view detailed content
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Timeline Analysis</CardTitle>
              <CardDescription>Risk progression over time</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">Select the Timeline tab to view detailed content</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
