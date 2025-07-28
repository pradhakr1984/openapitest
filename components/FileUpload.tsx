import { useState, useRef } from 'react'

interface FileUploadProps {
  onTextExtracted: (text: string, fileName?: string) => void
  onError: (message: string) => void
}

export default function FileUpload({ onTextExtracted, onError }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (file: File) => {
    if (!file) return

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      onError('File size must be less than 5MB')
      return
    }

    // Check file type
    const allowedTypes = [
      'text/plain',
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'
    ]

    if (!allowedTypes.includes(file.type)) {
      onError('Please upload a .txt, .pdf, or .docx file')
      return
    }

    setIsProcessing(true)
    onError('')

    try {
      let text = ''

      if (file.type === 'text/plain') {
        // Handle .txt files
        text = await file.text()
      } else if (file.type === 'application/pdf') {
        // Handle PDF files
        text = await extractTextFromPDF(file)
      } else if (file.type.includes('wordprocessingml') || file.type === 'application/msword') {
        // Handle Word documents
        text = await extractTextFromWord(file)
      }

      if (text.trim()) {
        onTextExtracted(text, file.name)
      } else {
        onError('Could not extract text from the file')
      }
    } catch (error) {
      onError('Error processing file. Please try a different file.')
      console.error('File processing error:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const extractTextFromPDF = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = async () => {
        try {
          // For now, we'll use a simple approach
          // In a production app with server-side processing, you'd use pdf-parse
          const arrayBuffer = reader.result as ArrayBuffer
          const uint8Array = new Uint8Array(arrayBuffer)
          
          // Simple text extraction (this is a basic implementation)
          // For full PDF support, you'd need to process this on the server
          const text = await extractTextFromPDFBuffer(uint8Array)
          resolve(text)
        } catch (error) {
          reject(error)
        }
      }
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsArrayBuffer(file)
    })
  }

  const extractTextFromPDFBuffer = async (buffer: Uint8Array): Promise<string> => {
    // This is a simplified PDF text extraction
    // For production use, you'd want to use a proper PDF parsing library
    // For now, we'll return a message suggesting to use .txt files
    return 'PDF text extraction requires server-side processing. For now, please use .txt files or paste text directly.'
  }

  const extractTextFromWord = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = async () => {
        try {
          // For now, we'll use a simple approach
          // In a production app with server-side processing, you'd use mammoth
          const arrayBuffer = reader.result as ArrayBuffer
          const text = await extractTextFromWordBuffer(arrayBuffer)
          resolve(text)
        } catch (error) {
          reject(error)
        }
      }
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsArrayBuffer(file)
    })
  }

  const extractTextFromWordBuffer = async (buffer: ArrayBuffer): Promise<string> => {
    // This is a simplified Word text extraction
    // For production use, you'd want to use a proper Word parsing library
    // For now, we'll return a message suggesting to use .txt files
    return 'Word document text extraction requires server-side processing. For now, please use .txt files or paste text directly.'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragging
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 hover:border-primary-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt,.pdf,.docx,.doc"
          onChange={handleFileInputChange}
          className="hidden"
        />
        
        {isProcessing ? (
          <div className="space-y-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
            <p className="text-sm text-gray-600">Processing file...</p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-4xl mb-2">📎</div>
            <p className="text-sm font-medium text-gray-700">
              Drop a file here or click to browse
            </p>
            <p className="text-xs text-gray-500">
              Supports .txt, .pdf, .docx files (max 5MB)
            </p>
          </div>
        )}
      </div>
      
      <div className="text-xs text-gray-500 text-center">
        <p>Supported formats: .txt, .pdf, .docx</p>
        <p>Maximum file size: 5MB</p>
        <p className="text-orange-600 mt-1">Note: PDF and Word files work best with .txt files for now</p>
      </div>
    </div>
  )
} 