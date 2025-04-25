"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowUpIcon, LightbulbIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface QueryInputProps {
  initialQuery?: string
  showFollowUpButton?: boolean
  onSubmit?: (query: string, isFollowUp: boolean) => void
}

export default function QueryInput({ initialQuery = "", showFollowUpButton = false, onSubmit }: QueryInputProps) {
  const [query, setQuery] = useState(initialQuery)
  const [isFocused, setIsFocused] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    setIsLoading(false)
  }, [searchParams])

  const handleSubmit = (e: React.FormEvent, isFollowUp = false) => {
    e.preventDefault()
    if (!query.trim()) return

    if (onSubmit) {
      onSubmit(query.trim(), isFollowUp)
      return
    }

    setIsLoading(true)

    if (isFollowUp && searchParams.get("query")) {
      router.push(
        `/results?query=${encodeURIComponent(searchParams.get("query") || "")}&followup=${encodeURIComponent(query.trim())}`,
      )
    } else {
      router.push(`/results?query=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e, showFollowUpButton)} className="w-full max-w-4xl mx-auto">
      <div className="relative flex items-center bg-zinc-800 rounded-full px-4 py-1 shadow-lg">
        {/* Input Field with Floating Label */}
        <div className="relative flex-grow">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full bg-transparent text-white py-3 px-2 outline-none"
            placeholder={isFocused ? "" : "Enter food, ingredient, or gut health question..."}
          />
          {isFocused && query === "" && (
            <span className="absolute text-xs text-zinc-400 left-2 top-1">
              Enter food, ingredient, or gut health question...
            </span>
          )}
        </div>

        {/* Deep Dive Button */}
        <button
          type="button"
          onClick={(e) => handleSubmit(e, false)}
          disabled={isLoading || !query.trim()}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
            "bg-zinc-700 text-white hover:bg-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed",
            "border border-zinc-600",
          )}
        >
          <PerplexityIcon className="h-4 w-4" />
          <span>Deep Dive</span>
        </button>

        {/* Ask Follow-up Button (conditionally rendered) */}
        {showFollowUpButton && (
          <button
            type="button"
            onClick={(e) => handleSubmit(e, true)}
            disabled={isLoading || !query.trim()}
            className={cn(
              "ml-2 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
              "bg-zinc-700 text-white hover:bg-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed",
              "border border-zinc-600",
            )}
          >
            <LightbulbIcon className="h-4 w-4" />
            <span>Ask Follow-up</span>
          </button>
        )}

        {/* Send Button */}
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className={cn(
            "ml-2 flex items-center justify-center rounded-full p-2",
            "bg-zinc-700 text-white hover:bg-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed",
            "border border-zinc-600",
          )}
        >
          {isLoading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            <ArrowUpIcon className="h-4 w-4" />
          )}
        </button>
      </div>
    </form>
  )
}

// Custom Perplexity-style swirl icon
function PerplexityIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
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
