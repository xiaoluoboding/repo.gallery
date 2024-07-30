"use client"

import { useCallback, useEffect, useState } from "react"

import { useRouter } from "next/navigation"
import FlipTilt from "react-flip-tilt"

import { useRepoStore } from "@/store/repo"
import { cn, createCollectionList } from "@/lib/utils"
import { Repo } from "@/lib/types"

// component
import { BookmarkCard } from "@/components/BookmarkCard/BookmarkCard"
import GridPattern from "@/components/GridPattern"
import { XSkeleton, XSkeletonWithLoading } from "@/components/ui/XSkeleton"
import SiteHeader from "@/components/SiteHeader"
import SiteFooter from "@/components/SiteFooter"
import { XScrollArea } from "@/components/ui/XScrollArea"
import { FloatingHeader } from "@/components/FloadingHeader"
import FilterBar from "@/components/FilterBar"

async function fetchData() {
  const res = await fetch("/api/sdb/repos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const repoList = (await res.json()) as Repo[]
  const collectionList = createCollectionList(repoList)

  return {
    repoList,
    collectionList,
  }
}

const RepoCardSkeleton = () => {
  return (
    <div
      className="thumbnail-shadow flex h-full aspect-auto min-w-0 cursor-pointer flex-col gap-4 overflow-hidden rounded-xl bg-white dark:bg-accent p-4 transition-colors duration-300 hover:bg-neutral-50/80"
      rel="noopener noreferrer"
    >
      <span className="aspect-[1200/630] overflow-hidden rounded-lg">
        <XSkeleton className="aspect-[1200/630] animate-reveal rounded-lg border dark:border-neutral-700/80 bg-cover bg-center bg-no-repeat object-cover shadow-black/40" />
      </span>
      <div className="flex flex-col justify-between gap-1.5">
        <div className="flex items-center gap-2">
          <XSkeleton className="inline-block align-text-bottom w-10 h-10 rounded-lg border-background/50" />
          <div className="flex flex-col gap-1 w-2/3">
            <XSkeleton
              className={cn(
                "text-base leading-snug font-semibold text-muted-foreground line-clamp-1 w-2/3 h-4"
              )}
            />
            <XSkeleton
              className={cn(
                "text-base leading-snug font-semibold text-accent-foreground line-clamp-1 w-2/3 h-4"
              )}
            />
          </div>
        </div>
        <XSkeleton
          className={cn(
            "flex-1 text-sm text-accent-foreground line-clamp-2 min-h-4"
          )}
        />
        <XSkeleton
          className={cn(
            "flex-1 text-sm text-accent-foreground line-clamp-2 min-h-4 w-2/3"
          )}
        />
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <XSkeleton className={cn("h-3 w-3 p-[2px] rounded-full")} />
            <XSkeleton className="text-sm w-12 h-3"></XSkeleton>
          </div>
          <div className="flex items-center gap-1">
            <XSkeleton className={cn("h-3 w-3 p-[2px] rounded-full")} />
            <XSkeleton className="text-sm w-12 h-3"></XSkeleton>
          </div>
        </div>
      </div>
    </div>
  )
}

const RepoCardLayoutSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4 w-full">
      <RepoCardSkeleton />
      <RepoCardSkeleton />
      <RepoCardSkeleton />
      <RepoCardSkeleton />
      <RepoCardSkeleton />
      <RepoCardSkeleton />
    </div>
  )
}

export default function Home() {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const repoStore = useRepoStore()
  const repoList = useRepoStore((state) => state.repoList)
  const [currentRepoList, setCurrentRepoList] = useState<Repo[]>([])
  const [originalRepoList, setOriginalRepoList] = useState<Repo[]>([])

  const handleInitialData = useCallback(async () => {
    setIsLoading(true)
    const res = await fetchData()
    repoStore.setCollectionList(res.collectionList)
    repoStore.setRepoList(res.repoList)
    if (res.repoList) {
      setCurrentRepoList(res.repoList)
      setOriginalRepoList(res.repoList)
    }
    setIsLoading(false)
  }, [])

  const handleOpenRepo = (repo: Repo) => {
    router.push(`/repos/${encodeURIComponent(repo.slug)}`)
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
        <>
          <div className="absolute inset-0 -z-1">
            <div className="relative w-full mx-auto h-[80vh]">
              <GridPattern
                width={60}
                height={60}
                x={-1}
                y={-1}
                className={cn(
                  "[mask-image:linear-gradient(to_bottom,white,transparent,transparent)] "
                )}
              />
            </div>
          </div>
          <XScrollArea className="relative flex flex-col w-full scrollable-area">
            <FloatingHeader scrollTitle="Repo Gallery" />

            <SiteHeader />

            {/* <!-- Hero Section --> */}
            <section className="container py-24 sm:pt-64 text-primary max-w-screen-md">
              <div className="flex justify-center flex-col sm:text-center">
                <h1 className="text-3xl lg:text-5xl text-neon-neutral">
                  Explore the Variety of Information in Open Source Repositories
                </h1>
                <br />
                <p className="my-0">
                  A curated selection of handpicked repositories, showcasing
                  their original OG images.
                </p>
              </div>
            </section>

            <section className="container max-w-screen-lg mt-12 sm:mt-24 mb-8 flex items-center justify-between">
              <FilterBar
                list={currentRepoList}
                originalList={originalRepoList}
                setList={setCurrentRepoList}
              />
            </section>

            {/* <!-- Repo List --> */}
            <section className="container max-w-screen-lg flex items-center justify-between">
              <XSkeletonWithLoading
                loading={isLoading}
                fallback={<RepoCardLayoutSkeleton />}
              >
                {/* <!-- Masnory Layout for Bookmark Card --> */}
                <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4">
                  {currentRepoList.map((repo, index) => {
                    return (
                      <div
                        key={repo.id}
                        className="relative cursor-pointer h-full"
                        onClick={() => handleOpenRepo(repo)}
                      >
                        <FlipTilt
                          front={
                            <BookmarkCard tidy bookmark={repo} order={index} />
                          }
                          back={
                            <BookmarkCard
                              tidy
                              flip
                              bookmark={repo}
                              order={index}
                            />
                          }
                          borderColor="rgba(255, 255, 255, 0)"
                          borderWidth="0px"
                          className="border-none h-full flip-tilt-card"
                          stiffness={48}
                        />
                      </div>
                    )
                  })}
                </div>
              </XSkeletonWithLoading>
            </section>

            {/* <!-- Footer --> */}
            <SiteFooter />
          </XScrollArea>
        </>
      )}
    </>
  )
}
