import { cache } from "react"

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { NextResponse } from "next/server"
import { Bookmark, Repo } from "./types"
import { groupBy, uniq } from "lodash-es"

export const isProd = process.env.NODE_ENV === "production"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isExternalLink = (href: string) => {
  if (!href) return false
  return !href.startsWith("/") && !href.startsWith("#")
}

export const formatSlug = (str: string) => {
  return str.indexOf("&") !== -1
    ? str.toLowerCase().replace(/ /g, "").replace(/&/g, "-")
    : str.toLowerCase().replace(/ /g, "-").replace(/&/g, "-")
}

export const sortByProperty = cache((arr: any[], prop: any) => {
  return arr?.sort((a, b) => {
    const itemA = a[prop].toUpperCase()
    const itemB = b[prop].toUpperCase()

    if (itemA < itemB) {
      return -1
    } else if (itemA > itemB) {
      return 1
    }

    return 0
  })
})

export const tryCatchNextResponse = async <T>(
  fn: () => Promise<T>
): Promise<NextResponse<T> | Response> => {
  try {
    const res = await fn()
    if (res) {
      return NextResponse.json(res)
    } else {
      return new Response(null, {
        status: 204,
      })
    }
  } catch (error: any) {
    const FrontEndResponseErrorData: any = {
      error: error.data,
      xRequestId: error.headers?.["x-request-id"],
    }
    return NextResponse.json(FrontEndResponseErrorData, {
      status: error.status,
    })
  }
}

export const createCollectionList = (RepoList: Repo[]) => {
  const groupedBookmarkList = groupBy(RepoList, (item) => {
    return item.tags.map((tag) => tag.name)
  })

  const tagList = RepoList.map((item) => {
    return item.tags.map((tag) => tag.name)
  })
  const uniqTagList = uniq(tagList.flat(1))

  const collectionList = uniqTagList.map((tag) => {
    let counter = 0

    for (const group in groupedBookmarkList) {
      if (group.includes(tag)) {
        counter += groupedBookmarkList[group].length
      }
    }

    return {
      id: tag.toUpperCase(),
      title: tag,
      slug: formatSlug(tag),
      count: counter,
    }
  })

  const sortedCollection = sortByProperty(collectionList, "title")
  return sortedCollection
}

export const formatNumber = (num: number) => {
  return num.toLocaleString("en-US")
}
