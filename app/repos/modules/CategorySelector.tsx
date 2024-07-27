"use client"

import { Suspense, cache, useEffect, useState } from "react"
import { SearchIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import Fuse from "fuse.js"

import { SideMenu } from "@/components/SideMenu"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { ListItem } from "@/components/ListItem"
import { XInput } from "@/components/ui/XInput"
import { useRepoStore } from "@/store/repo"
import { useDebounceCallback } from "usehooks-ts"
import { isEmpty } from "lodash-es"
import { formatSlug } from "@/lib/utils"

const fuseOptions = {
  threshold: 0.2,
  keys: ["title", "link", "description"],
}

const CategorySelector = () => {
  const router = useRouter()

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

  const fuse = cache(() => {
    const fuseIndex = Fuse.createIndex(fuseOptions.keys, repoList)
    return new Fuse(repoList, fuseOptions, fuseIndex)
  })

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
      // repoStore.setCollectionList(cloneCollectionList)
      // repoStore.setRepoList(cloneRepoList)
    }
  }, 222)

  return (
    <SideMenu
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
                // trigger filter action
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
    </SideMenu>
  )
}

export default CategorySelector
