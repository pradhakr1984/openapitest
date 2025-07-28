'use client'

import { useState, useEffect } from 'react'
import TextInputBox from '@/components/TextInputBox'
import TemperatureSlider from '@/components/TemperatureSlider'
import CostEstimator from '@/components/CostEstimator'
import OutputBox from '@/components/OutputBox'
import FileUpload from '@/components/FileUpload'

export default function Home() {
  const [article, setArticle] = useState('')
  const [temperature, setTemperature] = useState(0.7)
  const [summary, setSummary] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [tokenCount, setTokenCount] = useState(0)
  const [estimatedCost, setEstimatedCost] = useState(0)
  const [uploadedFileName, setUploadedFileName] = useState('')

  const handleSummarize = async () => {
    if (!article.trim()) {
      setError('Please enter some text to summarize')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          article,
          temperature,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to summarize text')
      }

      setSummary(data.summary)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = (text: string, fileName?: string) => {
    setArticle(text)
    setUploadedFileName(fileName || 'Uploaded file')
    setError('')
  }

  const handleFileError = (message: string) => {
    setError(message)
  }

  const clearText = () => {
    setArticle('')
    setUploadedFileName('')
    setSummary('')
    setError('')
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          OpenAI API Summarizer Demo
        </h1>
        <p className="text-gray-600">
          Paste an article, upload a file, adjust temperature, and see how AI summarizes it
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Input</h2>
            
            {/* File Upload */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Upload File</h3>
              <FileUpload 
                onTextExtracted={handleFileUpload}
                onError={handleFileError}
              />
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* Text Input */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Paste Text</h3>
              <TextInputBox
                value={article}
                onChange={setArticle}
                placeholder="Paste your article here..."
              />
            </div>

            {/* File Info */}
            {uploadedFileName && (
              <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  📎 File loaded: {uploadedFileName}
                </p>
              </div>
            )}

            {/* Clear Button */}
            {article && (
              <button
                onClick={clearText}
                className="mt-2 text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Clear text
              </button>
            )}
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Settings</h2>
            <TemperatureSlider
              value={temperature}
              onChange={setTemperature}
            />
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Cost Estimate</h2>
            <CostEstimator
              text={article}
              temperature={temperature}
              onTokenCountChange={setTokenCount}
              onCostChange={setEstimatedCost}
            />
          </div>

          <button
            onClick={handleSummarize}
            disabled={isLoading || !article.trim()}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Summarizing...' : 'Summarize'}
          </button>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
        </div>

        {/* Output Section */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Summary</h2>
          <OutputBox
            summary={summary}
            isLoading={isLoading}
            tokenCount={tokenCount}
            estimatedCost={estimatedCost}
          />
        </div>
      </div>
    </div>
  )
} 