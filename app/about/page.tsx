import { AlertTriangleIcon, InfoIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function AboutPage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto max-w-[800px] space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter text-teal-800">
            About Microbiome Mentor & Important Disclaimer
          </h1>
          <p className="text-muted-foreground">Understanding our tool and its limitations</p>
        </div>

        <div className="space-y-6">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-800">
              <InfoIcon className="inline-block mr-2 h-5 w-5 text-teal-600" />
              What is Microbiome Mentor?
            </h2>
            <p>
              Microbiome Mentor is a tool designed to provide AI-synthesized summaries of scientific information
              regarding food, ingredients, and gut health. Our goal is to make complex scientific research more
              accessible and help you understand how different foods might affect your gut microbiome.
            </p>
          </section>

          <Separator />

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-800">
              <InfoIcon className="inline-block mr-2 h-5 w-5 text-teal-600" />
              How It Works
            </h2>
            <p>
              Microbiome Mentor uses the Perplexity Sonar API to search and synthesize data from scientific literature
              and reputable sources. When you enter a query about a food or ingredient, our system:
            </p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>Searches through scientific databases and reputable health resources</li>
              <li>Analyzes and synthesizes the available information</li>
              <li>
                Organizes findings into positive impacts, potential concerns, mechanisms of action, and evidence levels
              </li>
              <li>Provides citations to the original sources for transparency</li>
            </ol>
            <p>
              We prioritize providing citations so you can verify information and explore topics in greater depth if
              desired.
            </p>
          </section>

          <Separator />

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-800">
              <InfoIcon className="inline-block mr-2 h-5 w-5 text-teal-600" />
              Limitations
            </h2>
            <p>While we strive for accuracy, it's important to understand the limitations of our tool:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                AI synthesis isn't perfect and may occasionally misinterpret or oversimplify complex scientific concepts
              </li>
              <li>
                The science of gut health and the microbiome is rapidly evolving, with new research emerging constantly
              </li>
              <li>Results depend on the quality and availability of online data</li>
              <li>
                Individual responses to foods and ingredients vary significantly based on genetics, existing microbiome
                composition, and other health factors
              </li>
            </ul>
          </section>

          <Card className="p-6 bg-amber-50 border-amber-200">
            <h2 className="flex items-center text-xl font-semibold text-amber-800 mb-4">
              <AlertTriangleIcon className="mr-2 h-6 w-6 text-amber-600" />
              Important Disclaimer
            </h2>
            <div className="space-y-3 text-amber-900">
              <p>
                <strong>This tool provides informational summaries only.</strong>
              </p>
              <p>
                Microbiome Mentor is <strong>NOT</strong> a substitute for professional medical advice, diagnosis, or
                treatment. The information provided should be considered educational in nature.
              </p>
              <p>
                Always consult with a qualified healthcare provider or registered dietitian regarding any health
                concerns or before making any dietary changes, especially if you have existing health conditions.
              </p>
              <p>
                Do not disregard professional medical advice or delay seeking it because of information obtained from
                this tool.
              </p>
            </div>
          </Card>

          <Separator />

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-800">
              <InfoIcon className="inline-block mr-2 h-5 w-5 text-teal-600" />
              Data Sources
            </h2>
            <p>
              Microbiome Mentor queries information from various scientific and medical sources, including but not
              limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>PubMed and other scientific publication databases</li>
              <li>Peer-reviewed journals focused on nutrition, gastroenterology, and microbiology</li>
              <li>Health organizations and government health resources</li>
              <li>Academic institutions and research centers</li>
            </ul>
            <p>
              We prioritize recent, peer-reviewed research whenever possible, but also include established knowledge
              from reputable sources.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
