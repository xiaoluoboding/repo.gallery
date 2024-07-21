"use client"

import { Suspense, cache, useEffect, useState } from "react"
import { cloneDeep, isEmpty } from "lodash-es"
import Fuse from "fuse.js"
import { useDebounceCallback } from "usehooks-ts"
import { useRouter } from "next/navigation"
import { SearchIcon } from "lucide-react"

import { SideMenu } from "@/components/SideMenu"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { ListItem } from "@/components/ListItem"
import { XInput } from "@/components/ui/XInput"

import { createCollectionList, formatSlug } from "@/lib/utils"
import { Repo } from "@/lib/types"
import { useRepoStore } from "@/store/repo"

async function fetchData() {
  const res = await fetch("/api/sdb/repos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const repoList = (await res.json()) as Repo[]
  const collectionList = createCollectionList(repoList)
  console.log(collectionList)

  return {
    repoList,
    collectionList,
  }
}

const fuseOptions = {
  threshold: 0.2,
  keys: ["title", "link", "description"],
}

export default function ReposLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const [searchText, setSearchText] = useState("")
  const repoStore = useRepoStore()
  const repoList = useRepoStore((state) => state.repoList)
  const collectionList = useRepoStore((state) => {
    return state.collectionList
      .filter((item) => item.count > 5)
      .sort((a, b) => {
        return b.count - a.count
      })
  })
  const [cloneCollectionList, setCloneCollectionList] = useState(
    cloneDeep(collectionList)
  )
  const [cloneRepoList, setCloneRepoList] = useState(cloneDeep(repoList))

  const fuse = cache(() => {
    const fuseIndex = Fuse.createIndex(fuseOptions.keys, repoList)
    return new Fuse(repoList, fuseOptions, fuseIndex)
  })

  const handleInitialData = async () => {
    const res = await fetchData()
    repoStore.setCollectionList(res.collectionList)
    repoStore.setRepoList(res.repoList)
    setCloneCollectionList(cloneDeep(res.collectionList))
    setCloneRepoList(cloneDeep(res.repoList))
  }

  const handleFilterList = useDebounceCallback((text: string) => {
    if (!isEmpty(text)) {
      repoStore.setRepoState({
        isSearching: true,
      })
      const repoList = fuse()
        .search(text)
        .sort((a, b) => a.refIndex - b.refIndex)
        .map((b) => b.item)
      const collectionList = [
        {
          id: text.toUpperCase(),
          title: text,
          slug: formatSlug(text),
          count: repoList.length,
        },
      ]
      router.push(`/repos/${encodeURIComponent(formatSlug(text))}`)
      repoStore.setCollectionList(collectionList)
      repoStore.setRepoList(repoList)
    } else {
      repoStore.setRepoState({
        isSearching: false,
      })
      router.push(`/repos/ai`)
      repoStore.setCollectionList(cloneCollectionList)
      repoStore.setRepoList(cloneRepoList)
    }
  }, 222)

  useEffect(() => {
    if (repoStore.isReRender) {
      repoStore.setRepoState({
        isReRender: false,
      })
      handleInitialData()
    }
  }, [repoStore.isReRender])

  useEffect(() => {
    setIsClient(true)
    handleInitialData()
  }, [])
  return (
    <>
      {isClient && (
        <div className="flex w-full">
          {/* <SideMenu
            title={`Repos (${repoList.length})`}
            bookmarks={collectionList}
            isInner
          >
            <Suspense fallback={<LoadingSpinner />}>
              <div className="flex flex-col gap-1 text-sm">
                <div className="w-full py-2 pb-3">
                  <XInput
                    size={"sm"}
                    placeholder="Search by title, description, link..."
                    prefix={<SearchIcon className="w-4 h-4" />}
                    value={searchText}
                    onChange={(e) => {
                      e.preventDefault()
                      const text = e.target.value
                      setSearchText(text)
                      handleFilterList(text)
                    }}
                  />
                </div>
                {collectionList?.map((collection) => {
                  return (
                    <ListItem
                      key={collection.id}
                      path={`/topics/${collection.slug}`}
                      title={collection.title}
                      description={`${collection.count} repos`}
                    />
                  )
                })}
              </div>
            </Suspense>
          </SideMenu> */}
          <div className="lg:bg-grid flex-1 relative">{children}</div>
        </div>
      )}
    </>
  )
}

export const viewport = {
  //  To fix the zoom issue on mobile for the repo submit form
  maximumScale: 1,
}
