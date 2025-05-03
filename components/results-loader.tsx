import LoadingSpinner from "./loading-spinner"

export default function ResultsLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-4">
      <LoadingSpinner size="lg" className="border-teal-500" />
      <p className="text-lg font-medium text-slate-700">Analyzing your query...</p>
      <p className="text-sm text-slate-500">Searching scientific literature and synthesizing results</p>
    </div>
  )
}
