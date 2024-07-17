"use client"

import { Suspense, useCallback, useEffect, useMemo, useState } from "react"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { LoadingSpinner } from "@/components/LoadingSpinner"
import { XScrollArea } from "@/components/ui/XScrollArea"
import { FloatingHeader } from "@/components/FloadingHeader"
import { useRepoStore } from "@/store/repo"
import { PROFILES } from "@/lib/useConstants"
import { cn, isProd } from "@/lib/utils"
import { Logo } from "@/components/Logo"
import { XButton } from "@/components/ui/XButton"
import { PlusIcon, Star } from "lucide-react"
import { DarkmodeToggle } from "@/components/DarkmodeToggle"
import { Repo } from "@/lib/types"
import FlipTilt from "react-flip-tilt"
import { BookmarkCard } from "@/components/BookmarkCard/BookmarkCard"

export default function Home() {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const repoStore = useRepoStore()
  const repoList = useRepoStore((state) => state.repoList)
  const [currentRepoList, setCurrentRepoList] = useState<Repo[]>([])

  const handleInitialData = useCallback(async () => {
    const list = repoStore.isSearching ? repoList : repoList
    list && setCurrentRepoList(list)
  }, [repoStore.repoList, repoStore.isSearching])

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
        <XScrollArea className="relative flex flex-col w-full scrollable-area">
          <FloatingHeader scrollTitle="Repo Gallery" />

          <header className="flex h-16 items-center mx-auto bg-background/60 backdrop-blur fixed w-full top-0 z-50 border-b dark:border-neutral-800">
            <div className="container max-w-screen-xl flex justify-between px-4 sm:px-8">
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
                A curated selection of handpicked repositories, showcasing their
                original OG images.
              </p>
            </div>
          </section>
          <section className="container max-w-screen-lg mt-12 sm:mt-24 flex items-center justify-between">
            <Suspense fallback={<LoadingSpinner />}>
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
            </Suspense>
          </section>
          <footer className="container max-w-screen-xl w-full h-16 mt-24 sm:mt-32 flex items-center justify-between  px-4 sm:px-8">
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
      )}
    </>
  )
}
