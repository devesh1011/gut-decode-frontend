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

// Mock data for fallback when API fails
const MOCK_RESPONSE: ApiResponse = [
  {
    summary:
      "Recent studies demonstrate that consistent junk food consumption disrupts gut microbiome diversity, promotes pathogenic bacteria growth, and compromises gut barrier function. These changes correlate with chronic inflammation and increased disease risks.",
    impacts: {
      positive_impacts: [],
      potential_concerns: [
        "Reduced microbial diversity[1][3]",
        "Increased pro-inflammatory bacteria[1][4]",
        "Gut barrier dysfunction leading to 'leaky gut'[2][4]",
        "Systemic inflammation associated with metabolic disorders[1][3]",
      ],
    },
    mechanisms:
      "Ultra-processed foods (UPFs) disrupt gut ecology through low fiber content, synthetic additives, and emulsifiers. These factors reduce beneficial bacteria, increase gut permeability, and activate inflammatory pathways, creating a cycle of dysbiosis and metabolic dysfunction.",
  },
  [
    "https://pubmed.ncbi.nlm.nih.gov/40077728/",
    "https://www.mdpi.com/2072-6643/17/5/859",
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC10734656/",
    "https://www.news-medical.net/news/20240603/Do-ultra-processed-foods-alter-the-gut-microbiome.aspx",
    "https://www.optibacprobiotics.com/uk/learning-lab/in-depth/gut-health/could-junk-food-alter-gut-bacteria-intelligence",
  ],
]

export async function analyzeQuery(query: string, followup?: string, useMockData = false): Promise<ApiResponse> {
  // For development/testing - return mock data if requested
  if (useMockData) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return MOCK_RESPONSE
  }

  try {
    console.log("Making API request with query:", query, followup ? `and followup: ${followup}` : "")

    const url = "http://127.0.0.1:8000/api/v1/analyze";

    const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add CORS headers if needed
            Accept: "application/json",
          },
          body: JSON.stringify({
            query: followup ? `${query} ${followup}` : query,
          }),
          // Add credentials if needed
          // credentials: 'include',
        })

    
    if (!response.ok) {
      const errorText = await response.text()
      console.error(`API error (${response.status}):`, errorText)
      throw new Error(`API request failed with status ${response.status}: ${errorText}`)
    }

    const data = await response.json()
    console.log("API response data:", data)

    return data;
  } catch (error) {
    console.error("Error analyzing query:", error)
    // Fall back to mock data
    return MOCK_RESPONSE
  }
}
