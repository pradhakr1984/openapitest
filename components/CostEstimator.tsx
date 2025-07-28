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
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-gray-600">Input Tokens</div>
          <div className="font-medium">{promptTokens.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-gray-600">Output Tokens</div>
          <div className="font-medium">~{estimatedOutputTokens.toLocaleString()}</div>
        </div>
      </div>
      
      <div className="border-t pt-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Estimated Cost</span>
          <span className="font-semibold text-green-600">
            ${totalCost.toFixed(4)}
          </span>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Based on GPT-4o-mini pricing
        </div>
      </div>
    </div>
  )
} 