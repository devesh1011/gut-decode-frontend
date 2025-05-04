"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { AlertCircleIcon, CheckCircleIcon, FileTextIcon, InfoIcon, LeafIcon } from "lucide-react"
import QueryInput from "@/components/query-input"
import ResultsLoader from "@/components/results-loader"
import { analyzeQuery, type ApiResponse } from "@/lib/api-service"

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("query") || ""
  const followup = searchParams.get("followup")

  const [results, setResults] = useState<ApiResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [useMockData, setUseMockData] = useState(false)

  useEffect(() => {
    async function fetchResults() {
      if (!query) return

      setIsLoading(true)
      setError(null)

      try {
        console.log(`Fetching results for query: "${query}"${followup ? ` with followup: "${followup}"` : ""}`)
        console.log(`Using mock data: ${useMockData}`)

        const data = await analyzeQuery(query, followup || undefined, useMockData)
        setResults(data)
      } catch (err) {
        console.error("Error fetching results:", err)
        setError("Failed to analyze query. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchResults()
  }, [query, followup, retryCount, useMockData])

  const handleSubmit = async (newQuery: string, isFollowUp: boolean) => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await analyzeQuery(isFollowUp ? query : newQuery, isFollowUp ? newQuery : undefined, useMockData)
      setResults(data)

      // Update URL without causing a full page reload
      const url = new URL(window.location.href)
      if (isFollowUp) {
        url.searchParams.set("followup", newQuery)
      } else {
        url.searchParams.set("query", newQuery)
        url.searchParams.delete("followup")
      }
      window.history.pushState({}, "", url.toString())
    } catch (err) {
      console.error("Error submitting query:", err)
      setError("Failed to analyze query. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1)
  }

  const toggleMockData = () => {
    setUseMockData((prev) => !prev)
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto max-w-[900px]">
        <div className="mb-8">
          <QueryInput showFollowUpButton={true} onSubmit={handleSubmit} isLoading={isLoading} />
        </div>

        {isLoading ? (
          <ResultsLoader />
        ) : error ? (
          <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-center">
            <p className="text-red-700 mb-2">{error}</p>
            <p className="text-sm text-red-600 mb-4">
              There might be an issue connecting to the API. Check the console for more details.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={handleRetry} className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200">
                Try Again
              </button>
              <button
                onClick={toggleMockData}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
              >
                {useMockData ? "Use Real API" : "Use Demo Data"}
              </button>
            </div>
          </div>
        ) : results ? (
          <ResultsContent query={query} followup={followup || undefined} results={results} />
        ) : null}
      </div>
    </div>
  )
}

function ResultsContent({
  query,
  followup,
  results,
}: {
  query: string
  followup?: string
  results: ApiResponse
}) {
  const analysisData = results[0]
  const citations = results[1]

  // Format citations to be more readable
  const formattedCitations = citations.map((url) => {
    try {
      const urlObj = new URL(url)
      const domain = urlObj.hostname.replace("www.", "")
      return `${domain} - ${url}`
    } catch (e) {
      return url
    }
  })

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
        <p className="text-slate-700">{analysisData.summary}</p>
      </Card>

      {/* Detailed Findings */}
      <Tabs defaultValue="impacts" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="impacts">Impacts</TabsTrigger>
          <TabsTrigger value="mechanisms">Mechanisms</TabsTrigger>
        </TabsList>

        <TabsContent value="impacts" className="space-y-6 mt-6">
          {/* Positive Impacts */}
          {analysisData.impacts.positive_impacts && analysisData.impacts.positive_impacts.length > 0 && (
            <div className="space-y-4">
              <h3 className="flex items-center text-lg font-medium text-slate-800">
                <LeafIcon className="mr-2 h-5 w-5 text-emerald-600" />
                Potential Positive Impacts
              </h3>
              <ul className="space-y-2">
                {analysisData.impacts.positive_impacts.map((impact, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircleIcon className="mr-2 h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>{impact}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Concerns */}
          {analysisData.impacts.potential_concerns && analysisData.impacts.potential_concerns.length > 0 && (
            <div className="space-y-4">
              <h3 className="flex items-center text-lg font-medium text-slate-800">
                <AlertCircleIcon className="mr-2 h-5 w-5 text-amber-600" />
                Potential Concerns
              </h3>
              <ul className="space-y-2">
                {analysisData.impacts.potential_concerns.map((concern, index) => (
                  <li key={index} className="flex items-start">
                    <AlertCircleIcon className="mr-2 h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span>{concern}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </TabsContent>

        <TabsContent value="mechanisms" className="space-y-6 mt-6">
          <div className="space-y-4">
            <h3 className="flex items-center text-lg font-medium text-slate-800">
              <InfoIcon className="mr-2 h-5 w-5 text-blue-600" />
              How It Works
            </h3>
            <div className="rounded-lg border bg-card p-4">
              <p>{analysisData.mechanisms}</p>
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
          {formattedCitations.map((citation, index) => (
            <div key={index} className="text-sm">
              <span className="font-medium">[{index + 1}]</span>{" "}
              <a
                href={citations[index]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                {citation}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
