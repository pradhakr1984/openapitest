import { useEffect } from 'react'

interface CostEstimatorProps {
  text: string
  temperature: number
  onTokenCountChange: (count: number) => void
  onCostChange: (cost: number) => void
}

// Rough estimation: 1 token ≈ 4 characters for English text
const estimateTokens = (text: string): number => {
  return Math.ceil(text.length / 4)
}

// GPT-4o-mini pricing (approximate)
const INPUT_COST_PER_1K_TOKENS = 0.00015
const OUTPUT_COST_PER_1K_TOKENS = 0.0006

export default function CostEstimator({ 
  text, 
  temperature, 
  onTokenCountChange, 
  onCostChange 
}: CostEstimatorProps) {
  useEffect(() => {
    const inputTokens = estimateTokens(text)
    const promptTokens = inputTokens + 20 // Add some tokens for the prompt template
    const estimatedOutputTokens = Math.min(500, Math.ceil(inputTokens * 0.3)) // Estimate 30% of input length
    
    const inputCost = (promptTokens / 1000) * INPUT_COST_PER_1K_TOKENS
    const outputCost = (estimatedOutputTokens / 1000) * OUTPUT_COST_PER_1K_TOKENS
    const totalCost = inputCost + outputCost
    
    onTokenCountChange(promptTokens + estimatedOutputTokens)
    onCostChange(totalCost)
  }, [text, temperature, onTokenCountChange, onCostChange])

  const inputTokens = estimateTokens(text)
  const promptTokens = inputTokens + 20
  const estimatedOutputTokens = Math.min(500, Math.ceil(inputTokens * 0.3))
  const inputCost = (promptTokens / 1000) * INPUT_COST_PER_1K_TOKENS
  const outputCost = (estimatedOutputTokens / 1000) * OUTPUT_COST_PER_1K_TOKENS
  const totalCost = inputCost + outputCost

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
          <div className="text-blue-600 text-sm font-medium mb-1">📥 Input Tokens</div>
          <div className="text-2xl font-bold text-blue-700">{promptTokens.toLocaleString()}</div>
          <div className="text-xs text-blue-600 mt-1">Article + prompt template</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
          <div className="text-purple-600 text-sm font-medium mb-1">📤 Output Tokens</div>
          <div className="text-2xl font-bold text-purple-700">~{estimatedOutputTokens.toLocaleString()}</div>
          <div className="text-xs text-purple-600 mt-1">Estimated summary length</div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-green-700 font-semibold text-lg">💰 Estimated Cost</span>
          <span className="text-2xl font-bold text-green-600">
            ${totalCost.toFixed(4)}
          </span>
        </div>
        <div className="text-sm text-green-600">
          Based on GPT-4o-mini pricing • Very cost-effective
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-yellow-600">💡</span>
          <span className="text-sm font-semibold text-yellow-700">Cost Breakdown</span>
        </div>
        <div className="text-xs text-yellow-700 space-y-1">
          <div>• Input: ${inputCost.toFixed(4)} (${INPUT_COST_PER_1K_TOKENS}/1K tokens)</div>
          <div>• Output: ${outputCost.toFixed(4)} (${OUTPUT_COST_PER_1K_TOKENS}/1K tokens)</div>
          <div>• Total: ${totalCost.toFixed(4)}</div>
        </div>
      </div>
    </div>
  )
} 