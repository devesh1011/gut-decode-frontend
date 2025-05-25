"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircleIcon,
  CheckCircleIcon,
  FileTextIcon,
  InfoIcon,
  LeafIcon,
  ExternalLinkIcon,
} from "lucide-react";
import QueryInput from "@/components/query-input";
import ResultsLoader from "@/components/results-loader";
import { analyzeQuery, type ApiResponse } from "@/lib/api-service";

interface ApiError {
  detail: Array<{
    type: string;
    loc: string[];
    msg: string;
    input: string;
    ctx?: Record<string, any>;
  }>;
}

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const followup = searchParams.get("followup");

  const [results, setResults] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<ApiError | null>(null);

  useEffect(() => {
    async function fetchResults() {
      if (!query) return;

      setIsLoading(true);
      setError(null);
      setApiError(null);

      try {
        console.log(
          `Fetching results for query: "${query}"${
            followup ? ` with followup: "${followup}"` : ""
          }`
        );

        const data = await analyzeQuery(query, followup || undefined);
        setResults(data);
      } catch (err: any) {
        console.error("Error fetching results:", err);

        // Check if it's a structured API error
        if (err.detail && Array.isArray(err.detail)) {
          setApiError(err as ApiError);
        } else {
          setError(err.message || "Failed to analyze query. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchResults();
  }, [query, followup]);

  const handleSubmit = async (newQuery: string, isFollowUp: boolean) => {
    setIsLoading(true);
    setError(null);
    setApiError(null);

    try {
      const data = await analyzeQuery(
        isFollowUp ? query : newQuery,
        isFollowUp ? newQuery : undefined
      );
      setResults(data);

      // Update URL without causing a full page reload
      const url = new URL(window.location.href);
      if (isFollowUp) {
        url.searchParams.set("followup", newQuery);
      } else {
        url.searchParams.set("query", newQuery);
        url.searchParams.delete("followup");
      }
      window.history.pushState({}, "", url.toString());
    } catch (err: any) {
      console.error("Error submitting query:", err);

      if (err.detail && Array.isArray(err.detail)) {
        setApiError(err as ApiError);
      } else {
        setError(err.message || "Failed to analyze query. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    const url = new URL(window.location.href);  
    window.location.reload();
  };

  return (
    <div className="container px-4 md:px-6 md:pt-12">
      <div className="mx-auto max-w-[900px]"> 
        {/* Results Content */}
        <div className="mb-8">
          {isLoading ? (
            <ResultsLoader />
          ) : error || apiError ? (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-800 mb-2">
                  Error analyzing: <span className="text-red-600">{query}</span>
                </h1>
                {followup && (
                  <p className="text-sm text-muted-foreground">
                    Follow-up: {followup}
                  </p>
                )}
              </div>

              <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
                {apiError ? (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-red-800">
                      Validation Error
                    </h3>
                    {apiError.detail.map((err, index) => (
                      <div key={index} className="text-red-700">
                        <p className="font-medium">{err.msg}</p>
                        {err.ctx?.min_length && (
                          <p className="text-sm text-red-600">
                            Minimum length required: {err.ctx.min_length}{" "}
                            characters
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <p className="text-red-700 mb-2">{error}</p>
                    <p className="text-sm text-red-600">
                      Please check your query and try again.
                    </p>
                  </div>
                )}

                <button
                  onClick={handleRetry}
                  className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : results ? (
            <ResultsContent
              query={query}
              followup={followup || undefined}
              results={results}
            />
          ) : null}
        </div>

        {/* Query Input at Bottom */}
        <div className="sticky bottom-4">
          <QueryInput
            onSubmit={handleSubmit}
            isLoading={isLoading}
            type="results"
            initialQuery=""
          />
        </div>
      </div>
    </div>
  );
}

function ResultsContent({
  query,
  followup,
  results,
}: {
  query: string;
  followup?: string;
  results: ApiResponse;
}) {
  // Parse the JSON string in the first element of the results array, or use as object if already parsed
  let analysisData;
  if (typeof results[0] === "string") {
    try {
      analysisData = JSON.parse(results[0]);
    } catch (error) {
      console.error("Error parsing results data:", error);
      analysisData = {
        summary: "Unable to parse research data. Please try again later.",
        impacts: {
          positive_impacts: [],
          potential_concerns: [],
        },
        mechanisms: "Data unavailable",
      };
    }
  } else {
    analysisData = results[0];
  }

  const citations = results[1] || [];

  // Format citations to be more readable
  const formattedCitations = citations.map((url: string, index: number) => {
    try {
      const urlObj = new URL(url);
      const domain = urlObj.hostname.replace("www.", "");
      const title = `${
        domain.charAt(0).toUpperCase() + domain.slice(1)
      } - Research Article`;
      return { title, url, domain };
    } catch (e) {
      return { title: `Source ${index + 1}`, url, domain: "Unknown" };
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          Showing results for:{" "}
          <span className="text-teal-700 font-semibold">
            {query ? query[0].toUpperCase() + query.slice(1).toLowerCase() : ""}
          </span>
        </h1>
        {followup && (
          <p className="text-sm text-muted-foreground bg-blue-50 px-3 py-1 rounded-full inline-block">
            Follow-up: {followup}
          </p>
        )}
      </div>

      {/* Perplexity-style Tabs */}
      <Tabs defaultValue="answer" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="answer">Answer</TabsTrigger>
          <TabsTrigger value="sources">Sources</TabsTrigger>
        </TabsList>

        <TabsContent value="answer" className="space-y-6 mt-6">
          {/* Overall Summary */}
          <div className="prose max-w-none">
            <div className="bg-gradient-to-r from-teal-50 to-blue-50 border-l-4 border-teal-500 p-6 rounded-r-lg">
              <h2 className="text-lg font-semibold text-slate-800 mb-3 mt-0">
                Summary
              </h2>
              <p className="text-slate-700 mb-0">{analysisData.summary}</p>
            </div>
          </div>

          {/* Positive Impacts */}
          {analysisData.impacts?.positive_impacts &&
            analysisData.impacts.positive_impacts.length > 0 && (
              <div className="space-y-4">
                <h3 className="flex items-center text-lg font-semibold text-slate-800">
                  <LeafIcon className="mr-2 h-5 w-5 text-emerald-600" />
                  Potential Benefits
                </h3>
                <div className="">
                  <ul className="space-y-3">
                    {analysisData.impacts.positive_impacts.map(
                      (impact: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <CheckCircleIcon className="mr-3 h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700">{impact}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            )}

          {/* Concerns */}
          {analysisData.impacts?.potential_concerns &&
            analysisData.impacts.potential_concerns.length > 0 && (
              <div className="space-y-4">
                <h3 className="flex items-center text-lg font-semibold text-slate-800">
                  <AlertCircleIcon className="mr-2 h-5 w-5 text-amber-600" />
                  Potential Concerns
                </h3>
                <div className="">
                  <ul className="space-y-3">
                    {analysisData.impacts.potential_concerns.map(
                      (concern: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <AlertCircleIcon className="mr-3 h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700">{concern}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            )}

          {/* Mechanisms */}
          {analysisData.mechanisms && (
            <div className="space-y-4">
              <h3 className="flex items-center text-lg font-semibold text-slate-800">
                <InfoIcon className="mr-2 h-5 w-5 text-blue-600" />
                Mechanism
              </h3>
              <div className="border rounded-lg p-4">
                <p className="text-slate-700">{analysisData.mechanisms}</p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="sources" className="space-y-4 mt-6">
          <div className="space-y-4">
            <h3 className="flex items-center text-lg font-semibold text-slate-800">
              <FileTextIcon className="mr-2 h-5 w-5 text-slate-600" />
              Research Sources ({formattedCitations.length})
            </h3>

            {formattedCitations.length > 0 ? (
              <div className="grid gap-4">
                {formattedCitations.map((citation, index) => (
                  <Card
                    key={index}
                    className="p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-teal-100 text-teal-800 text-xs font-medium px-2 py-1 rounded">
                            [{index + 1}]
                          </span>
                          <span className="text-sm text-gray-500">
                            {citation.domain}
                          </span>
                        </div>
                        <h4 className="font-medium text-slate-800 mb-1">
                          {citation.title}
                        </h4>
                        <p className="text-sm text-gray-600 break-all">
                          {citation.url}
                        </p>
                      </div>
                      <a
                        href={citation.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Open source in new tab"
                      >
                        <ExternalLinkIcon className="h-4 w-4" />
                      </a>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileTextIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No sources available for this query.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
