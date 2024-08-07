import { NextRequest } from "next/server"

import { FireCrawlLoader } from "@langchain/community/document_loaders/web/firecrawl"
import { loadSummarizationChain } from "langchain/chains"
import { TokenTextSplitter } from "@langchain/textsplitters"
import { PromptTemplate } from "@langchain/core/prompts"
import { ChatOpenAI } from "@langchain/openai"

import { tryCatchNextResponse } from "@/lib/utils"

export async function GET(
  req: NextRequest,
  { params }: { params: { url: string } }
) {
  return tryCatchNextResponse<any>(async () => {
    const { url } = params

    const loader = new FireCrawlLoader({
      url, // The URL to scrape
      apiKey: process.env.FIRECRAWL_API_KEY, // Optional, defaults to `FIRECRAWL_API_KEY` in your env.
      mode: "scrape", // The mode to run the crawler in. Can be "scrape" for single urls or "crawl" for all accessible subpages
      params: {
        // optional parameters based on Firecrawl API docs
        // For API documentation, visit https://docs.firecrawl.dev
      },
    })

    const docs = await loader.load()

    const splitter = new TokenTextSplitter({
      chunkSize: 10000,
      chunkOverlap: 250,
    })

    const docsSummary = await splitter.splitDocuments(docs)

    const llmSummary = new ChatOpenAI({
      model: "gpt-4o",
      temperature: 0.3,
    })

    const summaryTemplate = `
You are an expert in summarizing Website meta infomation.
Your goal is to create a summary of a website.
Below you find the metadata of a website:
--------
{text}
--------

Total output will be a summary of the website.
`

    const SUMMARY_PROMPT = PromptTemplate.fromTemplate(summaryTemplate)

    const summaryRefineTemplate = `
You are an expert in summarizing Website meta infomation.
Your goal is to create a summary of a website.
We have provided an existing summary up to a certain point: {existing_answer}

Below you find the metadata of a website:
--------
{text}
--------

Given the new context, refine the summary.
`

    const SUMMARY_REFINE_PROMPT = PromptTemplate.fromTemplate(
      summaryRefineTemplate
    )

    const summarizeChain = loadSummarizationChain(llmSummary, {
      type: "refine",
      verbose: true,
      questionPrompt: SUMMARY_PROMPT,
      refinePrompt: SUMMARY_REFINE_PROMPT,
    })
    // const summarizeChain = loadSummarizationChain(llmSummary, {
    //   type: "stuff",
    //   prompt: SUMMARY_PROMPT,
    // })

    // console.log(summarizeChain)

    const summary = await summarizeChain.run(docsSummary)
    // console.log(summary)
    return summary
  })
}

export const dynamic = "force-dynamic"
