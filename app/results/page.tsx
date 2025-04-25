import { Suspense } from "react"
import { notFound } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AlertCircleIcon, CheckCircleIcon, FileTextIcon, InfoIcon, LeafIcon } from "lucide-react"
import QueryInput from "@/components/query-input"
import ResultsSkeleton from "@/components/results-skeleton"
import { getGutHealthInfo } from "@/lib/gut-health-api"

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: { query?: string; followup?: string }
}) {
  const query = searchParams.query
  const followup = searchParams.followup

  if (!query) {
    notFound()
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto max-w-[900px]">
        <div className="mb-8">
          <QueryInput showFollowUpButton={true} />
        </div>

        <Suspense fallback={<ResultsSkeleton />}>
          <ResultsContent query={query} followup={followup} />
        </Suspense>
      </div>
    </div>
  )
}

async function ResultsContent({
  query,
  followup,
}: {
  query: string
  followup?: string
}) {
  const results = await getGutHealthInfo(query, followup)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          Showing results for: <span className="text-teal-700">{query}</span>
        </h1>
        {followup && <p className="text-sm text-muted-foreground">Follow-up: {followup}</p>}
      </div>

      {/* Overall Summary Card */}
      <Card className="p-6 bg-gradient-to-r from-teal-50 to-blue-50 border-teal-100">
        <h2 className="flex items-center text-lg font-medium text-slate-800 mb-3">
          <InfoIcon className="mr-2 h-5 w-5 text-teal-600" />
          Summary
        </h2>
        <p className="text-slate-700">{results.summary}</p>
      </Card>

      {/* Detailed Findings */}
      <Tabs defaultValue="impacts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="impacts">Impacts</TabsTrigger>
          <TabsTrigger value="mechanisms">Mechanisms</TabsTrigger>
          <TabsTrigger value="evidence">Evidence</TabsTrigger>
        </TabsList>

        <TabsContent value="impacts" className="space-y-6 mt-6">
          {/* Positive Impacts */}
          <div className="space-y-4">
            <h3 className="flex items-center text-lg font-medium text-slate-800">
              <LeafIcon className="mr-2 h-5 w-5 text-emerald-600" />
              Potential Positive Impacts
            </h3>
            <ul className="space-y-2">
              {results.positiveImpacts.map((impact, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircleIcon className="mr-2 h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>{impact}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Concerns */}
          <div className="space-y-4">
            <h3 className="flex items-center text-lg font-medium text-slate-800">
              <AlertCircleIcon className="mr-2 h-5 w-5 text-amber-600" />
              Potential Concerns
            </h3>
            <ul className="space-y-2">
              {results.concerns.map((concern, index) => (
                <li key={index} className="flex items-start">
                  <AlertCircleIcon className="mr-2 h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>{concern}</span>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="mechanisms" className="space-y-6 mt-6">
          <div className="space-y-4">
            <h3 className="flex items-center text-lg font-medium text-slate-800">
              <InfoIcon className="mr-2 h-5 w-5 text-blue-600" />
              How It Works
            </h3>
            <div className="space-y-4">
              {results.mechanisms.map((mechanism, index) => (
                <div key={index} className="rounded-lg border bg-card p-4">
                  <p>{mechanism}</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="evidence" className="space-y-6 mt-6">
          <div className="space-y-4">
            <h3 className="flex items-center text-lg font-medium text-slate-800">
              <FileTextIcon className="mr-2 h-5 w-5 text-slate-600" />
              Level of Evidence
            </h3>
            <div className="space-y-3">
              {results.evidenceLevels.map((evidence, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Badge
                    variant={
                      evidence.level === "Strong" ? "default" : evidence.level === "Moderate" ? "secondary" : "outline"
                    }
                  >
                    {evidence.level}
                  </Badge>
                  <span className="text-sm">{evidence.description}</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Citations */}
      <div className="space-y-4">
        <Separator />
        <h3 className="flex items-center text-lg font-medium text-slate-800">
          <FileTextIcon className="mr-2 h-5 w-5 text-slate-600" />
          Sources
        </h3>
        <div className="space-y-2">
          {results.citations.map((citation, index) => (
            <div key={index} className="text-sm">
              <span className="font-medium">[{index + 1}]</span> {citation}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
