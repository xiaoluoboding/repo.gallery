import { createClient } from "@supabase/supabase-js"

import { Repo } from "./types"

export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_ANON_KEY || ""
)

export const createRepo = async (repo: Repo) => {
  const { error } = await supabaseAdmin.from("repos").insert([repo]).select()
  if (error) {
    console.log(error.message)
  }
}

export const fetchRepoList = async (): Promise<Repo[]> => {
  const { data: bookmarkList, error } = await supabaseAdmin
    .from("repos")
    .select("*")
    .order("stars", { ascending: false })

  if (error) {
    console.log(error.message)
  }

  return (bookmarkList as Repo[]) || []
}

export const updateRepoById = async (id: string, repo: Repo) => {
  const { error } = await supabaseAdmin.from("repos").update(repo).eq("id", id)
  if (error) {
    console.log(error.message)
  }
}

export const deleteRepoById = async (id: string) => {
  const { error } = await supabaseAdmin.from("repos").delete().eq("id", id)
  if (error) {
    console.log(error.message)
  }
}
