import type { SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
}

export function Select({ label, id, children, ...props }: SelectProps) {
  const selectId = id ?? label.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={selectId} className="text-xs font-semibold text-navy">
        {label}
      </label>
      <select
        id={selectId}
        className="rounded-xl border border-[oklch(90%_0.005_90)] bg-white px-3.5 py-2.5 text-sm text-navy outline-none focus:border-brand-blue"
        {...props}
      >
        {children}
      </select>
    </div>
  )
}
