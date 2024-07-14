import { deleteRepoById, updateRepoById } from "@/lib/supabase"
import { Repo } from "@/lib/types"
import { tryCatchNextResponse } from "@/lib/utils"
import { NextRequest } from "next/server"

export const runtime = "edge"

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params
  const repo = (await req.json()) as Repo
  return tryCatchNextResponse(async () => {
    await updateRepoById(id, repo)
  })
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params
  return tryCatchNextResponse(async () => {
    await deleteRepoById(id)
  })
}
