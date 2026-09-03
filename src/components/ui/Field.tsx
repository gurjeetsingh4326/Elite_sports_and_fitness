import type { InputHTMLAttributes } from 'react'

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export function Field({ label, id, ...props }: FieldProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-xs font-semibold text-navy">
        {label}
      </label>
      <input
        id={inputId}
        className="rounded-xl border border-[oklch(90%_0.005_90)] bg-white px-3.5 py-2.5 text-sm text-navy outline-none transition-colors duration-150 focus:border-brand-blue"
        {...props}
      />
    </div>
  )
}
