"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon, MessageCircleIcon } from "lucide-react"

interface SearchFormProps {
  initialQuery?: string
  showFollowUpButton?: boolean
}

export default function SearchForm({ initialQuery = "", showFollowUpButton = false }: SearchFormProps) {
  const [query, setQuery] = useState(initialQuery)
  const [isLoading, setIsLoading] = useState(false)
  const [isFollowUpLoading, setIsFollowUpLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Reset loading state when navigating between pages
  useEffect(() => {
    setIsLoading(false)
    setIsFollowUpLoading(false)
  }, [searchParams])

  const handleDeepDive = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    router.push(`/results?query=${encodeURIComponent(query.trim())}`)
  }

  const handleFollowUp = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    const currentQuery = searchParams.get("query")
    if (!currentQuery) return

    setIsFollowUpLoading(true)
    router.push(`/results?query=${encodeURIComponent(currentQuery)}&followup=${encodeURIComponent(query.trim())}`)
  }

  return (
    <form onSubmit={handleDeepDive} className="w-full">
      <div className="space-y-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Enter food, ingredient, or question..."
            className="pl-10 h-12"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            type="submit"
            className="h-11 bg-teal-600 hover:bg-teal-700 text-white flex-grow sm:flex-grow-0"
            disabled={isLoading || !query.trim()}
          >
            {isLoading ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                Processing...
              </>
            ) : (
              <>
                <SearchIcon className="mr-2 h-4 w-4" />
                Deep Dive
              </>
            )}
          </Button>

          {showFollowUpButton && (
            <Button
              type="button"
              onClick={handleFollowUp}
              className={`h-11 flex-grow sm:flex-grow-0 ${
                query.trim()
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-200 text-blue-700 cursor-not-allowed"
              }`}
              disabled={isFollowUpLoading || !query.trim()}
            >
              {isFollowUpLoading ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                  Processing...
                </>
              ) : (
                <>
                  <MessageCircleIcon className="mr-2 h-4 w-4" />
                  Ask Follow-up
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </form>
  )
}
