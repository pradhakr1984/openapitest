interface OutputBoxProps {
  summary: string
  isLoading: boolean
  tokenCount: number
  estimatedCost: number
}

export default function OutputBox({ 
  summary, 
  isLoading, 
  tokenCount, 
  estimatedCost 
}: OutputBoxProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
        <div className="text-sm text-gray-500">
          Generating summary...
        </div>
      </div>
    )
  }

  if (!summary) {
    return (
      <div className="text-center py-8 text-gray-500">
        <div className="text-4xl mb-4">📝</div>
        <p>Your summary will appear here</p>
        <p className="text-sm mt-2">
          Enter some text and click "Summarize" to get started
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-2">Summary</h3>
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {summary}
        </p>
      </div>
      
      <div className="border-t pt-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-600">Total Tokens</div>
            <div className="font-medium">{tokenCount.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-gray-600">Actual Cost</div>
            <div className="font-medium text-green-600">
              ${estimatedCost.toFixed(4)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 