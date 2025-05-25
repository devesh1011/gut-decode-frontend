"use client"

import Link from "next/link"
import QueryInput from "@/components/query-input"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  const handleSubmit = (query: string) => {
    router.push(`/results?query=${encodeURIComponent(query)}`)
  }

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
      <section className="py-12 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-[800px]">
            <QueryInput onSubmit={handleSubmit} />

            {/* Example Queries */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <p className="w-full text-center text-sm text-muted-foreground mb-2">Try these examples:</p>
              {/* <Link
                href="/results?query=kimchi"
                className="inline-flex items-center rounded-md bg-teal-50 px-3 py-1 text-sm text-teal-700 hover:bg-teal-100 transition-colors"
              >
                kimchi
              </Link> */}
              <Link
                href="/results?query=aspartame+related+info"
                className="inline-flex items-center rounded-md bg-teal-50 px-3 py-1 text-sm text-teal-700 hover:bg-teal-100 transition-colors"
              >
                Aspartame related info
              </Link>
              <Link
                href="/results?query=fiber+and+gut+bacteria"
                className="inline-flex items-center rounded-md bg-teal-50 px-3 py-1 text-sm text-teal-700 hover:bg-teal-100 transition-colors"
              >
                Fiber and gut bacteria
              </Link>
              <Link
                href="/results?query=gut%20related%20problems"
                className="inline-flex items-center rounded-md bg-teal-50 px-3 py-1 text-sm text-teal-700 hover:bg-teal-100 transition-colors"
              >
                Gut related problems
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
