import { ImageResponse } from "next/og"

import { OpenGraphImage } from "@/components/OGImage"
import { getMediumFont, getBoldFont } from "@/lib/fonts"
import {
  sharedDescription,
  sharedImage,
  sharedTitle,
} from "@/app/shared-metadata"

export const runtime = "edge"
export const alt = sharedTitle
export const size = {
  width: sharedImage.width,
  height: sharedImage.height,
}
export const contentType = sharedImage.type

export default async function OGImage() {
  const [mediumFontData, boldFontData] = await Promise.all([
    getMediumFont(),
    getBoldFont(),
  ])

  return new ImageResponse(
    (
      <OpenGraphImage
        title={sharedTitle}
        description={sharedDescription}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.48907C3 9.18048 3.14247 8.88917 3.38606 8.69972L11.3861 2.47749C11.7472 2.19663 12.2528 2.19663 12.6139 2.47749L20.6139 8.69972C20.8575 8.88917 21 9.18048 21 9.48907V20ZM19 19V9.97815L12 4.53371L5 9.97815V19H19Z"></path>
          </svg>
        }
      />
    ),
    {
      ...size,
      fonts: [
        {
          name: "Roboto Condensed",
          data: mediumFontData,
          style: "normal",
          weight: 500,
        },
        {
          name: "Roboto Condensed",
          data: boldFontData,
          style: "normal",
          weight: 600,
        },
      ],
    }
  )
}
