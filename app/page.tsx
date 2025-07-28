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
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header with enhanced design */}
        <header className="text-center mb-12">
          <div className="animate-float mb-6">
            <div className="text-6xl mb-4">🤖</div>
          </div>
          <h1 className="text-5xl font-bold gradient-text mb-4">
            OpenAI API Summarizer
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Transform your articles and documents into concise summaries with AI-powered intelligence
          </p>
          <div className="flex justify-center items-center gap-4 mt-6 text-white/70">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">Live Cost Estimation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-sm">File Upload Support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span className="text-sm">AI-Powered</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="card">
              <div className="flex items-center gap-3 mb-6">
                <div className="text-2xl">📝</div>
                <h2 className="text-2xl font-bold gradient-text">Input</h2>
              </div>
              
              {/* File Upload */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <span className="text-blue-600">📎</span>
                  Upload File
                </h3>
                <FileUpload 
                  onTextExtracted={handleFileUpload}
                  onError={handleFileError}
                />
              </div>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">or</span>
                </div>
              </div>

              {/* Text Input */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <span className="text-purple-600">✏️</span>
                  Paste Text
                </h3>
                <TextInputBox
                  value={article}
                  onChange={setArticle}
                  placeholder="Paste your article here..."
                />
              </div>

              {/* File Info */}
              {uploadedFileName && (
                <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl">
                  <p className="text-sm text-blue-700 font-medium flex items-center gap-2">
                    <span>📎</span>
                    File loaded: {uploadedFileName}
                  </p>
                </div>
              )}

              {/* Clear Button */}
              {article && (
                <button
                  onClick={clearText}
                  className="mt-4 text-sm text-gray-500 hover:text-gray-700 underline transition-colors duration-200"
                >
                  Clear text
                </button>
              )}
            </div>

            <div className="card">
              <div className="flex items-center gap-3 mb-6">
                <div className="text-2xl">⚙️</div>
                <h2 className="text-2xl font-bold gradient-text">Settings</h2>
              </div>
              <TemperatureSlider
                value={temperature}
                onChange={setTemperature}
              />
            </div>

            <div className="card">
              <div className="flex items-center gap-3 mb-6">
                <div className="text-2xl">💰</div>
                <h2 className="text-2xl font-bold gradient-text">Cost Estimate</h2>
              </div>
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
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Summarizing...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <span>🚀</span>
                  <span>Generate Summary</span>
                </div>
              )}
            </button>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
                <div className="flex items-center gap-2">
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              </div>
            )}
          </div>

          {/* Output Section */}
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-2xl">📊</div>
              <h2 className="text-2xl font-bold gradient-text">Summary</h2>
            </div>
            <OutputBox
              summary={summary}
              isLoading={isLoading}
              tokenCount={tokenCount}
              estimatedCost={estimatedCost}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 text-white/60">
          <p className="text-sm">
            Powered by OpenAI GPT-4o-mini • Built with Next.js & Tailwind CSS
          </p>
        </footer>
      </div>
    </div>
  )
} 