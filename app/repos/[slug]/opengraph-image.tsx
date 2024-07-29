import { ImageResponse } from "next/og"

import { OpenGraphImage } from "@/components/OGImage"
import { getMediumFont, getBoldFont } from "@/lib/fonts"
import { sharedImage, sharedDescription } from "@/app/shared-metadata"

export const runtime = "edge"
export const alt = "Bookmarks"
export const size = {
  width: sharedImage.width,
  height: sharedImage.height,
}
export const contentType = sharedImage.type

export default async function OGImage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const [mediumFontData, boldFontData] = await Promise.all([
    getMediumFont(),
    getBoldFont(),
  ])

  const title = decodeURIComponent(slug).split("/").pop() ?? ""
  const description = sharedDescription

  return new ImageResponse(
    (
      <OpenGraphImage
        title={title}
        description={description}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
          </svg>
        }
        url={decodeURIComponent(slug)}
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
