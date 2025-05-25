export interface AnalysisData {
  summary: string
  impacts: {
    positive_impacts: string[]
    potential_concerns: string[]
  }
  mechanisms: string
}

export type ApiResponse = [AnalysisData, string[]]

// Get the API URL from environment variables, fallback to localhost for development
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"

export async function analyzeQuery(query: string, followup?: string): Promise<ApiResponse> {
  try {
    console.log("Making API request with query:", query, followup ? `and followup: ${followup}` : "")

    const url = `https://gut-decode-api.onrender.com/api/v1/analyze`

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: followup ? `${query} ${followup}` : query,
        model: "sonar-deep-research",
      }),
    })

    console.log("API response status:", response.status)

    if (!response.ok) {
      let errorData
      try {
        errorData = await response.json()
        console.error("API error response:", errorData)
        // Throw the structured error for proper handling
        throw errorData
      } catch (parseError) {
        // If we can't parse the error as JSON, throw a generic error
        if (parseError !== errorData) {
          const errorText = await response.text()
          throw new Error(`API request failed with status ${response.status}: ${errorText}`)
        }
        throw parseError
      }
    }

    const data = await response.json()
    console.log("API response data:", data)
    return data as ApiResponse
  } catch (error) {
    console.error("Error analyzing query:", error)
    // Re-throw the error instead of falling back to mock data
    throw error
  }
}
