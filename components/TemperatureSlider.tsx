interface TemperatureSliderProps {
  value: number
  onChange: (value: number) => void
}

export default function TemperatureSlider({ value, onChange }: TemperatureSliderProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <label htmlFor="temperature" className="text-lg font-semibold text-gray-700">
          Temperature: <span className="text-blue-600 font-bold">{value}</span>
        </label>
        <span className="text-sm font-medium px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-gray-700">
          {value === 0 ? '🎯 Deterministic' : value === 1 ? '🎨 Very Creative' : '⚖️ Balanced'}
        </span>
      </div>
      
      <div className="relative">
        <input
          id="temperature"
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-3 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #8b5cf6 ${value * 100}%, #e5e7eb ${value * 100}%, #e5e7eb 100%)`
          }}
        />
        
        {/* Custom slider thumb */}
        <div 
          className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg border-2 border-white"
          style={{ left: `${value * 100}%`, marginLeft: '-12px' }}
        ></div>
      </div>
      
      <div className="flex justify-between text-sm text-gray-600 font-medium">
        <div className="text-center">
          <div className="text-lg mb-1">🎯</div>
          <span>Focused</span>
        </div>
        <div className="text-center">
          <div className="text-lg mb-1">⚖️</div>
          <span>Balanced</span>
        </div>
        <div className="text-center">
          <div className="text-lg mb-1">🎨</div>
          <span>Creative</span>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl">
        <p className="text-sm text-gray-700 leading-relaxed">
          <span className="font-semibold">Temperature controls creativity:</span> Lower values (0-0.3) produce focused, consistent summaries. Higher values (0.7-1.0) create more varied and creative outputs.
        </p>
      </div>
    </div>
  )
} 