import { NextRequest } from "next/server"

import { createRepo, fetchRepoList } from "@/lib/supabase"
import { Repo } from "@/lib/types"
import { tryCatchNextResponse } from "@/lib/utils"

export const runtime = "edge"

export async function GET(req: NextRequest) {
  return tryCatchNextResponse<Repo[]>(async () => {
    const res = await fetchRepoList()
    return res
  })
}

export async function POST(req: NextRequest) {
  const repo = (await req.json()) as Repo
  return tryCatchNextResponse(async () => {
    await createRepo(repo)
  })
}
