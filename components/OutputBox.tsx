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
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3"></div>
        </div>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
          <p className="text-sm text-gray-600 font-medium">🤖 AI is generating your summary...</p>
        </div>
      </div>
    )
  }

  if (!summary) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-6 animate-float">📝</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Ready for Summary</h3>
        <p className="text-gray-500 mb-4">
          Enter some text or upload a file to get started
        </p>
        <div className="flex justify-center items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <span>📄</span>
            <span>Upload</span>
          </div>
          <div className="flex items-center gap-1">
            <span>✏️</span>
            <span>Paste</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🚀</span>
            <span>Summarize</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-2xl">📊</div>
          <h3 className="text-lg font-bold text-gray-800">AI Summary</h3>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50">
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {summary}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
          <div className="text-green-600 text-sm font-medium mb-1">📊 Total Tokens</div>
          <div className="text-xl font-bold text-green-700">{tokenCount.toLocaleString()}</div>
          <div className="text-xs text-green-600 mt-1">Used in this request</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
          <div className="text-purple-600 text-sm font-medium mb-1">💰 Actual Cost</div>
          <div className="text-xl font-bold text-purple-700">${estimatedCost.toFixed(4)}</div>
          <div className="text-xs text-purple-600 mt-1">Very affordable!</div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-blue-600">✨</span>
          <span className="text-sm font-semibold text-blue-700">Summary Complete!</span>
        </div>
        <p className="text-xs text-blue-600">
          Your AI-generated summary is ready. You can adjust the temperature and try again for different results.
        </p>
      </div>
    </div>
  )
} 