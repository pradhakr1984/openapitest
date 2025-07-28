interface TextInputBoxProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function TextInputBox({ value, onChange, placeholder }: TextInputBoxProps) {
  return (
    <div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-field min-h-[200px] resize-y"
        rows={8}
      />
      <div className="mt-2 text-sm text-gray-500">
        {value.length} characters
      </div>
    </div>
  )
} 