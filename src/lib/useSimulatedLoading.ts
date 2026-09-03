import { useEffect, useState } from 'react'

/**
 * Simulates a brief network/data-fetch delay so list/detail pages can show a skeleton
 * before content appears, instead of popping in instantly. Re-fires whenever `deps` change
 * (e.g. switching org or navigating to a different record), matching what a real fetch would do.
 */
export function useSimulatedLoading(delay = 420, deps: unknown[] = []) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), delay)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return loading
}
