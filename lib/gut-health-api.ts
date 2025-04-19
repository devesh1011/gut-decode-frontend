// This is a mock API service that would be replaced with actual Perplexity Sonar API integration
// in a production environment

type GutHealthInfo = {
  summary: string
  positiveImpacts: string[]
  concerns: string[]
  mechanisms: string[]
  evidenceLevels: {
    level: "Strong" | "Moderate" | "Limited"
    description: string
  }[]
  citations: string[]
}

const mockData: Record<string, GutHealthInfo> = {
  kimchi: {
    summary:
      "Kimchi is generally beneficial for gut health due to its probiotic content from fermentation. It can enhance gut microbiome diversity and support digestive health, though its high sodium content may be a consideration for some individuals.",
    positiveImpacts: [
      "Contains beneficial probiotic bacteria that can enhance gut microbiome diversity",
      "May improve digestive function and reduce constipation",
      "Contains antioxidants and anti-inflammatory compounds that may benefit gut health",
    ],
    concerns: [
      "High sodium content may be problematic for individuals with hypertension or salt sensitivity",
      "Spicy varieties might trigger digestive discomfort in some individuals with sensitive digestive systems",
    ],
    mechanisms: [
      "During fermentation, lactic acid bacteria like Lactobacillus and Bifidobacterium multiply, creating a probiotic-rich food",
      "These probiotics help maintain a balanced gut microbiome by competing with harmful bacteria and supporting the gut barrier function",
      "Fermentation also produces short-chain fatty acids that nourish colon cells and reduce inflammation",
    ],
    evidenceLevels: [
      {
        level: "Strong",
        description: "Multiple human clinical studies support kimchi's probiotic benefits",
      },
      {
        level: "Moderate",
        description: "Evidence for specific health outcomes like improved digestion",
      },
      {
        level: "Limited",
        description: "Long-term effects on chronic disease prevention",
      },
    ],
    citations: [
      "Park KY, et al. (2014). Health benefits of kimchi (Korean fermented vegetables) as a probiotic food. Journal of Medicinal Food, 17(1), 6-20.",
      "Kim HY, et al. (2018). Fermented foods, microbiota, and mental health: ancient practice meets nutritional psychiatry. Frontiers in Psychiatry, 9, 1-12.",
      "Patra JK, et al. (2016). Kimchi and other widely consumed traditional fermented foods of Korea: A review. Frontiers in Microbiology, 7, 1493.",
      "Bell V, et al. (2018). One health, fermented foods, and gut microbiota. Foods, 7(12), 195.",
    ],
  },
  aspartame: {
    summary:
      "Current research on aspartame's effects on gut health is mixed. While some studies suggest potential negative impacts on gut microbiome composition, the evidence is not conclusive. Regulatory bodies generally consider aspartame safe in moderate amounts, but ongoing research continues to investigate its long-term effects.",
    positiveImpacts: [
      "Provides sweetness without contributing to caloric intake or blood sugar spikes",
      "May help individuals reduce sugar consumption when used as a substitute",
    ],
    concerns: [
      "Some studies suggest it may alter gut microbiome composition in ways that could be unfavorable",
      "May potentially increase intestinal permeability ('leaky gut') according to some animal studies",
      "Some research indicates it might affect metabolic pathways related to glucose tolerance",
    ],
    mechanisms: [
      "Aspartame breaks down into phenylalanine, aspartic acid, and methanol in the digestive system",
      "These breakdown products may interact with gut bacteria and potentially influence their composition and function",
      "Some research suggests aspartame might affect the expression of genes related to inflammation in intestinal cells",
    ],
    evidenceLevels: [
      {
        level: "Limited",
        description: "Human studies specifically examining aspartame's effects on gut microbiome",
      },
      {
        level: "Moderate",
        description: "Animal studies showing potential alterations to gut bacteria",
      },
      {
        level: "Limited",
        description: "Evidence for direct causation of specific gut health issues",
      },
    ],
    citations: [
      "Suez J, et al. (2014). Artificial sweeteners induce glucose intolerance by altering the gut microbiota. Nature, 514(7521), 181-186.",
      "Palmnäs MS, et al. (2014). Low-dose aspartame consumption differentially affects gut microbiota-host metabolic interactions in the diet-induced obese rat. PLOS ONE, 9(10), e109841.",
      "European Food Safety Authority (EFSA). (2013). Scientific Opinion on the re-evaluation of aspartame (E 951) as a food additive. EFSA Journal, 11(12), 3496.",
      "Bian X, et al. (2017). Saccharin induced liver inflammation in mice by altering the gut microbiota and its metabolic functions. Food and Chemical Toxicology, 107, 530-539.",
    ],
  },
  "fiber and gut bacteria": {
    summary:
      "Dietary fiber plays a crucial role in supporting gut health by serving as food for beneficial gut bacteria. Different types of fiber promote diverse bacterial populations, leading to increased production of beneficial compounds like short-chain fatty acids that support gut barrier function and reduce inflammation.",
    positiveImpacts: [
      "Serves as prebiotic fuel for beneficial gut bacteria, promoting their growth",
      "Increases production of short-chain fatty acids that nourish colon cells",
      "Supports regular bowel movements and prevents constipation",
      "May help reduce inflammation in the digestive tract",
    ],
    concerns: [
      "Rapid increases in fiber intake may cause temporary gas, bloating, or discomfort",
      "Some individuals with specific digestive conditions (like IBS) may be sensitive to certain fiber types",
    ],
    mechanisms: [
      "Soluble fiber is fermented by gut bacteria, producing short-chain fatty acids (SCFAs) like butyrate, propionate, and acetate",
      "SCFAs lower colon pH, creating an environment that favors beneficial bacteria over harmful ones",
      "Fiber promotes bacterial diversity, which is associated with better overall health outcomes",
      "Insoluble fiber adds bulk to stool and helps maintain regular bowel movements",
    ],
    evidenceLevels: [
      {
        level: "Strong",
        description: "Extensive human and laboratory studies confirm fiber's role as a prebiotic",
      },
      {
        level: "Strong",
        description: "Evidence for fiber's impact on SCFA production and gut microbiome composition",
      },
      {
        level: "Moderate",
        description: "Specific health outcomes beyond digestive function",
      },
    ],
    citations: [
      "Makki K, et al. (2018). The Impact of Dietary Fiber on Gut Microbiota in Host Health and Disease. Cell Host & Microbe, 23(6), 705-715.",
      "Holscher HD. (2017). Dietary fiber and prebiotics and the gastrointestinal microbiota. Gut Microbes, 8(2), 172-184.",
      "Sonnenburg ED, et al. (2016). Diet-induced extinctions in the gut microbiota compound over generations. Nature, 529(7585), 212-215.",
      "Deehan EC, et al. (2017). Modulation of the Gastrointestinal Microbiome with Nondigestible Fermentable Carbohydrates To Improve Human Health. Microbiology Spectrum, 5(5).",
      "Desai MS, et al. (2016). A Dietary Fiber-Deprived Gut Microbiota Degrades the Colonic Mucus Barrier and Enhances Pathogen Susceptibility. Cell, 167(5), 1339-1353.",
    ],
  },
}

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getGutHealthInfo(query: string, followup?: string): Promise<GutHealthInfo> {
  await delay(1500) // Simulate API call delay

  // Normalize the query to match our mock data keys
  const normalizedQuery = query.toLowerCase().trim()

  // Check if we have exact match in our mock data
  if (normalizedQuery in mockData) {
    return mockData[normalizedQuery]
  }

  // Check for partial matches
  for (const key of Object.keys(mockData)) {
    if (normalizedQuery.includes(key) || key.includes(normalizedQuery)) {
      return mockData[key]
    }
  }

  // Default to fiber data if no match found (in a real app, this would be a proper API call)
  return mockData["fiber and gut bacteria"]
}
