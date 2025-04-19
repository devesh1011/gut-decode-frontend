"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SendIcon } from "lucide-react"

export default function FollowUpForm({ query }: { query: string }) {
  const [followup, setFollowup] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!followup.trim()) return

    setIsLoading(true)
    router.push(`/results?query=${encodeURIComponent(query)}&followup=${encodeURIComponent(followup.trim())}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Input
          type="text"
          placeholder="Ask a follow-up question..."
          className="flex-1"
          value={followup}
          onChange={(e) => setFollowup(e.target.value)}
        />
        <Button
          type="submit"
          className="bg-teal-600 hover:bg-teal-700 text-white"
          disabled={isLoading || !followup.trim()}
        >
          {isLoading ? (
            <>
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
              Asking...
            </>
          ) : (
            <>
              <SendIcon className="mr-2 h-4 w-4" />
              Ask
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
