import { tryCatchNextResponse } from "@/lib/utils"
import { NextRequest } from "next/server"

export async function GET(
  req: NextRequest,
  { params }: { params: { url: string } }
) {
  const { url } = params

  return tryCatchNextResponse<any>(async () => {
    // const res = await fetch(`https://metafy.vercel.app/api?url=${url}`)
    const res = await fetch(
      `https://metafy.indiehacker.workers.dev/?url=${url}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.METAFY_API_KEY}`,
        },
      }
    )
    const json = await res.json()
    return json.data
  })
}

export const dynamic = "force-dynamic"
