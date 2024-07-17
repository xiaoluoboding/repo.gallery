import { NextRequest } from "next/server"
import yaml from "js-yaml"
import axios from "axios"

import { tryCatchNextResponse } from "@/lib/utils"

export async function GET(
  req: NextRequest,
  { params }: { params: { language: string } }
) {
  const { language } = params

  async function getLinguistData() {
    const linguistUrl =
      "https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml"
    const res = await axios.get(linguistUrl)
    return yaml.load(res.data) as Record<string, Record<string, any>>
  }

  async function getLanguageColors(lang: string) {
    const linguistData = await getLinguistData()
    return linguistData[lang].color as string
  }

  return tryCatchNextResponse<{
    status: number
    language: string
    color: string
  }>(async () => {
    const color = await getLanguageColors(language)
    return {
      status: 200,
      language,
      color,
    }
  })
}

export const dynamic = "force-dynamic"
