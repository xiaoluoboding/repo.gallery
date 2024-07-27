"use client"

import { useEffect, useState } from "react"
import { cloneDeep } from "lodash-es"
import { createCollectionList } from "@/lib/utils"
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
  // console.log(collectionList)

  return {
    repoList,
    collectionList,
  }
}

export default function ReposLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isClient, setIsClient] = useState(false)
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

  const handleInitialData = async () => {
    const res = await fetchData()
    repoStore.setCollectionList(res.collectionList)
    repoStore.setRepoList(res.repoList)
    setCloneCollectionList(cloneDeep(res.collectionList))
    setCloneRepoList(cloneDeep(res.repoList))
  }

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
