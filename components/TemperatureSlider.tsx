interface TemperatureSliderProps {
  value: number
  onChange: (value: number) => void
}

export default function TemperatureSlider({ value, onChange }: TemperatureSliderProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label htmlFor="temperature" className="text-sm font-medium text-gray-700">
          Temperature: {value}
        </label>
        <span className="text-xs text-gray-500">
          {value === 0 ? 'Deterministic' : value === 1 ? 'Very Creative' : 'Balanced'}
        </span>
      </div>
      
      <input
        id="temperature"
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
      />
      
      <div className="flex justify-between text-xs text-gray-500">
        <span>0 (Focused)</span>
        <span>0.5 (Balanced)</span>
        <span>1 (Creative)</span>
      </div>
    </div>
  )
} 