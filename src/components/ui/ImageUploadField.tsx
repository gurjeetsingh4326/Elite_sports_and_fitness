import { useRef } from 'react'
import { ImagePlaceholderIcon, UploadIcon, XIcon } from '@/components/icons'

interface ImageUploadFieldProps {
  label: string
  value: string | null
  onChange: (dataUrl: string | null) => void
  shape?: 'square' | 'circle'
}

export function ImageUploadField({ label, value, onChange, shape = 'square' }: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFile(file: File | undefined) {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => onChange(reader.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-navy">{label}</span>
      <div className="flex items-center gap-3">
        <div
          className={`flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden bg-surface transition-transform duration-300 hover:scale-105 ${
            shape === 'circle' ? 'rounded-full' : 'rounded-xl'
          }`}
        >
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <ImagePlaceholderIcon size={22} className="text-muted" />
          )}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex items-center gap-1.5 rounded-full border border-[oklch(90%_0.005_90)] bg-white px-3.5 py-2 text-xs font-semibold text-navy transition-all duration-150 hover:-translate-y-0.5 hover:bg-hover"
          >
            <UploadIcon size={14} />
            {value ? 'Replace' : 'Upload'}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange(null)}
              aria-label="Remove image"
              className="flex animate-pop-in items-center justify-center rounded-full border border-[oklch(90%_0.005_90)] bg-white px-2.5 py-2 text-muted transition-all duration-150 hover:scale-110 hover:bg-hover hover:text-[oklch(55%_0.19_25)]"
            >
              <XIcon size={14} />
            </button>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleFile(e.target.files?.[0])}
          className="hidden"
        />
      </div>
    </div>
  )
}
