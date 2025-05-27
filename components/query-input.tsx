"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowUpIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface QueryInputProps {
  initialQuery?: string
  onSubmit?: (query: string, isFollowUp: boolean) => void
  isLoading?: boolean
  type?: string
}

export default function QueryInput({
  initialQuery = "",
  onSubmit,
  isLoading: externalLoading,
  type = "",
}: QueryInputProps) {
  const [query, setQuery] = useState(initialQuery)
  const [isInternalLoading, setIsInternalLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Use external loading state if provided, otherwise use internal
  const isLoading = externalLoading !== undefined ? externalLoading : isInternalLoading

  // Update query when initialQuery prop changes
  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery)
    }
  }, [initialQuery])

  // Reset loading state when search params change
  useEffect(() => {
    setIsInternalLoading(false)
  }, [searchParams])

  const handleSubmit = (e: React.FormEvent, isFollowUp = false) => {
    e.preventDefault()
    if (!query.trim() || isLoading || query.trim().length < 10) return

    if (onSubmit) {
      onSubmit(query.trim(), isFollowUp)
      return
    }

    setIsInternalLoading(true)

    // Get the current query from search params for follow-up questions
    const currentQuery = searchParams.get("query") || ""

    if (isFollowUp && currentQuery) {
      router.push(`/results?query=${encodeURIComponent(currentQuery)}&followup=${encodeURIComponent(query.trim())}`)
    } else {
      router.push(`/results?query=${encodeURIComponent(query.trim())}`)
    }
    setQuery("") // Clear the input after submission
  }

  const isQueryValid = query.trim().length >= 10

  return (
    <form onSubmit={(e) => handleSubmit(e, false)} className="w-full max-w-4xl mx-auto">
      {type === "results" ? (
        <div className="flex items-center bg-zinc-800 rounded-full px-4 py-2 shadow-lg">
          {/* Input Field */}
          <div className="relative flex-grow">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-white py-2 px-2 outline-none placeholder-zinc-400"
              placeholder="Enter food, ingredient, or gut health question..."
              disabled={isLoading}
            />
          </div>
          {/* Send Button */}
          <button
            type="submit"
            disabled={isLoading || !isQueryValid}
            className={cn(
              "ml-2 flex items-center justify-center rounded-full p-2 transition-colors",
              isQueryValid && !isLoading
                ? "bg-teal-600 text-white hover:bg-teal-700"
                : "bg-zinc-700 text-zinc-400 cursor-not-allowed",
            )}
          >
            {isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <ArrowUpIcon className="h-4 w-4" />
            )}
          </button>
        </div>
      ) : (
        <div className="relative bg-zinc-800 rounded-xl px-4 py-4 shadow-lg">
          {/* Flex container for Input and Button */}
          <div className="flex items-center mb-2">
            <div className="relative flex-grow">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-white py-3 px-2 outline-none placeholder-zinc-400 text-lg"
                placeholder="Enter food, ingredient, or gut health question..."
                disabled={isLoading}
                aria-label="Search query"
              />
            </div>
            {/* Send Button */}
            <button
              type="submit"
              disabled={isLoading || !isQueryValid}
              className={cn(
                "ml-2 flex items-center justify-center rounded-full p-2 transition-colors border",
                isQueryValid && !isLoading
                  ? "bg-teal-600 text-white hover:bg-teal-700 border-teal-600"
                  : "bg-zinc-700 text-zinc-400 border-zinc-600 cursor-not-allowed",
              )}
              aria-label={isLoading ? "Loading" : "Submit"}
            >
              {isLoading ? (
                <div
                  className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                  aria-hidden="true"
                />
              ) : (
                <ArrowUpIcon className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Validation Message */}
          {!isQueryValid && query.length > 0 && (
            <p className="text-xs text-zinc-400 mt-1">Query must be at least 10 characters long</p>
          )}
        </div>
      )}
    </form>
  )
}

// Custom Perplexity-style swirl icon
function PerplexityIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M12 2C14.5 7 19 9.5 22 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M2 12C5 14.5 9.5 17 12 22"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M2 12C4.5 9.5 7 7 12 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M22 12C19.5 14.5 17 17 12 22"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}
