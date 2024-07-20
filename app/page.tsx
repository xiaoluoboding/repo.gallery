"use client"

import { Suspense, useCallback, useEffect, useMemo, useState } from "react"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import FlipTilt from "react-flip-tilt"
import { PlusIcon, Star } from "lucide-react"

import { LoadingSpinner } from "@/components/LoadingSpinner"
import { XScrollArea } from "@/components/ui/XScrollArea"
import { FloatingHeader } from "@/components/FloadingHeader"
import { useRepoStore } from "@/store/repo"
import { PROFILES } from "@/lib/useConstants"
import { cn, createCollectionList } from "@/lib/utils"
import { Logo } from "@/components/Logo"
import { XButton } from "@/components/ui/XButton"
import { DarkmodeToggle } from "@/components/DarkmodeToggle"
import { Repo } from "@/lib/types"
import { BookmarkCard } from "@/components/BookmarkCard/BookmarkCard"
import GridPattern from "@/components/GridPattern"
import { XSkeleton, XSkeletonWithLoading } from "@/components/ui/XSkeleton"

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
  const [currentRepoList, setCurrentRepoList] = useState<Repo[]>([])

  const handleInitialData = useCallback(async () => {
    setIsLoading(true)
    const res = await fetchData()
    repoStore.setCollectionList(res.collectionList)
    repoStore.setRepoList(res.repoList)
    res.repoList && setCurrentRepoList(res.repoList)
    setIsLoading(false)
  }, [])

  const handleOpenRepo = (repo: Repo) => {
    router.push(`/repos/${encodeURIComponent(repo.slug)}`)
  }

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

            <header className="flex h-16 items-center mx-auto bg-background/60 backdrop-blur fixed w-full top-0 z-50 border-b dark:border-neutral-800">
              <div className="container max-w-screen-lg flex justify-between px-4 sm:px-8">
                <div className="mr-4">
                  <a
                    className="flex items-center justify-center space-x-3 text-lg font-semibold py-6 text-center text-neutral-600 dark:text-neutral-100 selection:bg-emerald-500 mr-10"
                    href="/"
                  >
                    <div className="relative h-8 w-8 md:h-6 md:w-6 bg-background text-white flex items-center justify-center rounded-md text-sm antialiased">
                      <div className="text-sm text-emerald-500 relative z-20">
                        <Logo className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-primary text-xl">Repo Gallery</h1>
                    </div>
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <nav className="items-center space-x-2 text-sm font-medium hidden xl:flex">
                    <XButton variant="link">
                      <Link
                        href={"https://github.com/dashboard-feed"}
                        target="_blank"
                      >
                        Dashboard Feed
                      </Link>
                    </XButton>
                    <XButton variant="link" onClick={() => {}}>
                      <Link href="/repos">Repos</Link>
                    </XButton>
                    <XButton variant="link" onClick={() => {}}>
                      <Link href="/topics">Topics</Link>
                    </XButton>
                  </nav>
                  <div className="flex flex-1 items-center justify-end gap-2 sm:gap-2 md:justify-end">
                    <DarkmodeToggle />
                    <XButton size="sm" variant="outline">
                      <Star className="h-4 w-4 mr-1" />
                      Star
                    </XButton>
                    <XButton size="sm" variant="default">
                      <PlusIcon className="h-4 w-4 mr-1" />
                      Submit
                    </XButton>
                  </div>
                </div>
              </div>
            </header>

            <section className="container py-24 sm:pt-64 text-primary max-w-screen-md">
              <div className="flex justify-center flex-col text-center">
                <h1 className="text-3xl lg:text-5xl text-neon-neutral">
                  Discover the Original Information of Open Source Repositories
                </h1>
                <br />
                <p className="my-0">
                  A curated selection of handpicked repositories, showcasing
                  their original OG images.
                </p>
              </div>
            </section>
            <section className="container max-w-screen-lg mt-12 sm:mt-24 flex items-center justify-between">
              <XSkeletonWithLoading
                loading={isLoading}
                fallback={<RepoCardLayoutSkeleton />}
              >
                {/* <!-- Masnory Layout for Bookmark Card --> */}
                <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4">
                  {currentRepoList.map((repo, index) => {
                    return (
                      <div
                        key={repo.link + repo.id}
                        className="relative cursor-pointer h-full"
                        onClick={() => handleOpenRepo(repo)}
                      >
                        {/* <BookmarkCard tidy bookmark={repo} order={index} /> */}
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
            <footer className="container max-w-screen-lg w-full h-16 mt-24 sm:mt-32 flex items-center justify-between  px-4 sm:px-8">
              <div className="flex items-center justify-center lg:justify-start lg:flex-1 gap-x-1.5 lg:mt-0 ">
                <a
                  className="flex items-center justify-center space-x-3 text-lg font-semibold text-center text-neutral-600 dark:text-neutral-100 selection:bg-emerald-500 mr-10"
                  href="/"
                >
                  <div className="relative h-8 w-8 md:h-6 md:w-6 bg-background text-white flex items-center justify-center rounded-md text-sm antialiased">
                    <div className="text-sm text-emerald-500 relative z-20">
                      <Logo className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-primary text-xl">Repo Gallery</h1>
                  </div>
                </a>
                <div className="mr-4 hidden md:flex items-center">
                  <div className="text-neutral-500 dark:text-neutral-400 text-sm">
                    Copyright © {new Date().getFullYear()}. All rights reserved.
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {Object.values(PROFILES).map((link, linkIndex) => {
                  return (
                    <Link
                      key={link.url}
                      href={link.url}
                      className={cn(
                        "group flex items-center justify-between rounded-lg p-2 text-accent-foreground hover:underline"
                      )}
                    >
                      <span className="flex items-center gap-2 w-5 h-5">
                        {link.icon}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </footer>
          </XScrollArea>
        </>
      )}
    </>
  )
}
