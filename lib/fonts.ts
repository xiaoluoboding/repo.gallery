import { cache } from "react"
import "server-only"

/**
 * Retrieves the RobotoCondensed-Medium font file asynchronously.
 * It returns a Promise that resolves to the font file's array buffer.
 * @returns A Promise resolving to the RobotoCondensed-Medium font file as an array buffer.
 */
export const getMediumFont = cache(async () => {
  const response = await fetch(
    new URL("@/assets/fonts/RobotoCondensed-Medium.ttf", import.meta.url)
  )
  const font = await response.arrayBuffer()
  return font
})

/**
 * Retrieves the RobotoCondensed-SemiBold font file asynchronously.
 * It returns a Promise that resolves to the font file's array buffer.
 * @returns A Promise resolving to the RobotoCondensed-SemiBold font file as an array buffer.
 */
export const getBoldFont = cache(async () => {
  const response = await fetch(
    new URL("@/assets/fonts/RobotoCondensed-SemiBold.ttf", import.meta.url)
  )
  const font = await response.arrayBuffer()
  return font
})
