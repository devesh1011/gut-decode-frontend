"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"

export default function SearchForm({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    router.push(`/results?query=${encodeURIComponent(query.trim())}`)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Enter a food, ingredient, or question (e.g., 'kimchi', 'aspartame', 'fiber and gut bacteria')..."
            className="pl-10 h-12"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          className="h-12 bg-teal-600 hover:bg-teal-700 text-white"
          disabled={isLoading || !query.trim()}
        >
          {isLoading ? (
            <>
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
              Analyzing...
            </>
          ) : (
            "Analyze Gut Impact"
          )}
        </Button>
      </div>
    </form>
  )
}
