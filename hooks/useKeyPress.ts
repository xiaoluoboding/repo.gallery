import { useEffect } from "react"

export function useKeyPress(callback: Function, keyCodes: string[]) {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (
        keyCodes.includes(event.code) &&
        !event.shiftKey &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey
      ) {
        callback(event)
      }
    }

    window.addEventListener("keydown", handler, { passive: true })
    return () => {
      window.removeEventListener("keydown", handler)
    }
  }, [callback, keyCodes])
}
