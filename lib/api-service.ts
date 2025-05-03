// API service for making requests to the backend

export interface AnalysisData {
  summary: string
  impacts: {
    positive_impacts: string[]
    potential_concerns: string[]
  }
  mechanisms: string
}

export type ApiResponse = [AnalysisData, string[]]

export async function analyzeQuery(query: string, followup?: string): Promise<ApiResponse> {
  try {
    const response = await fetch("http://0.0.0.0:8000/api/v1/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: followup ? `${query} ${followup}` : query,
      }),
    })

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error analyzing query:", error)
    throw error
  }
}
