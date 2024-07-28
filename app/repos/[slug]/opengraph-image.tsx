import { ImageResponse } from "next/og"

import { OpenGraphImage } from "@/components/OGImage"
import { getMediumFont, getBoldFont } from "@/lib/fonts"
import { sharedImage } from "@/app/shared-metadata"
import { useRepoStore } from "@/store/repo"

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

  const currentRepo = useRepoStore((state) => {
    const idx = state.repoList.findIndex((repo) => repo.slug === slug)
    return idx !== -1 ? state.repoList[idx] : null
  })

  const title = currentRepo?.title || "Repo Gallery"
  const description = currentRepo?.description || "Repo Gallery"

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
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
          </svg>
        }
        url={`${slug}`}
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
