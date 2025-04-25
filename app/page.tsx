import { BrainCircuitIcon, DatabaseIcon, SearchIcon } from "lucide-react"
import Link from "next/link"
import QueryInput from "@/components/query-input"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-teal-50 to-white py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-teal-800">
                Understand Your Food's Gut Impact
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Get science-backed summaries on how foods and ingredients affect your gut microbiome.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Input Area */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-[800px]">
            <QueryInput showFollowUpButton={false} />

            {/* Example Queries */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <p className="w-full text-center text-sm text-muted-foreground mb-2">Try these examples:</p>
              <Link
                href="/results?query=kimchi"
                className="inline-flex items-center rounded-full bg-teal-50 px-3 py-1 text-sm text-teal-700 hover:bg-teal-100 transition-colors"
              >
                kimchi
              </Link>
              <Link
                href="/results?query=aspartame"
                className="inline-flex items-center rounded-full bg-teal-50 px-3 py-1 text-sm text-teal-700 hover:bg-teal-100 transition-colors"
              >
                aspartame
              </Link>
              <Link
                href="/results?query=fiber+and+gut+bacteria"
                className="inline-flex items-center rounded-full bg-teal-50 px-3 py-1 text-sm text-teal-700 hover:bg-teal-100 transition-colors"
              >
                fiber and gut bacteria
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="bg-slate-50 py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <h2 className="mb-8 text-center text-2xl font-semibold text-slate-800">How It Works</h2>
          <div className="mx-auto grid max-w-[900px] grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-teal-100 p-3">
                <SearchIcon className="h-6 w-6 text-teal-700" />
              </div>
              <h3 className="mb-2 text-lg font-medium">Enter Food or Query</h3>
              <p className="text-sm text-muted-foreground">
                Type in any food, ingredient, or gut health question you're curious about.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-blue-100 p-3">
                <BrainCircuitIcon className="h-6 w-6 text-blue-700" />
              </div>
              <h3 className="mb-2 text-lg font-medium">AI Analyzes Research</h3>
              <p className="text-sm text-muted-foreground">
                Our AI scans scientific literature to find relevant gut health information.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-emerald-100 p-3">
                <DatabaseIcon className="h-6 w-6 text-emerald-700" />
              </div>
              <h3 className="mb-2 text-lg font-medium">Get Cited Summary</h3>
              <p className="text-sm text-muted-foreground">
                Review a clear summary with citations from scientific sources.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
