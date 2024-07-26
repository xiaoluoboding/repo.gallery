import { useRef } from "react"

function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const handlerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  return (...args: Parameters<T>) => {
    if (handlerRef.current) {
      clearTimeout(handlerRef.current)
    }

    handlerRef.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }
}

export { useDebounce }
