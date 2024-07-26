/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { Suspense, useCallback, useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { Star, Globe, HashIcon, GitForkIcon, Link2Icon } from "lucide-react"
import Image from "next/image"

import { LoadingSpinner } from "@/components/LoadingSpinner"
import { XScrollArea } from "@/components/ui/XScrollArea"
import { Repo, Collection } from "@/lib/types"
import { useRepoStore } from "@/store/repo"

import { cn } from "@/lib/utils"
import { buttonLinkVariants } from "@/components/ui/XButtonLink"
import {
  XTabs,
  XTabsContent,
  XTabsList,
  XTabsTrigger,
} from "@/components/ui/XTabs"
import { useTheme } from "next-themes"
import FlipCard from "@/components/BookmarkCard/FlipCard"
import { FloatingHeader } from "@/components/FloadingHeader"
import SiteHeader from "@/components/SiteHeader"
import { buttonVariants, XButton } from "@/components/ui/XButton"
import { GitHubLogoIcon } from "@radix-ui/react-icons"

// export async function generateStaticParams() {
//   return collectionList.map((collection: Collection) => ({
//     slug: collection.slug,
//   }))
// }

export default function RepoPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const { theme } = useTheme()

  let mouseX = useMotionValue(0)
  let mouseY = useMotionValue(0)

  const [isClient, setIsClient] = useState(false)
  const repoStore = useRepoStore()
  const repoList = useRepoStore((state) => state.repoList)
  const [currentRepo, setCurrentRepo] = useState<Repo>({} as Repo)

  function onMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left - 80)
    mouseY.set(clientY - top - 80)
  }

  const motionStyle = useMotionTemplate`translate3d(${mouseX}px, ${mouseY}px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`

  const handleInitialData = useCallback(async () => {
    const repo = repoList.find((repo) => repo.slug === decodeURIComponent(slug))
    setCurrentRepo(repo || ({} as Repo))
  }, [slug, repoStore.isSearching])

  useEffect(() => {
    handleInitialData()
  }, [slug, repoStore.repoList, repoStore.isSearching])
  useEffect(() => {
    setIsClient(true)
    handleInitialData()
  }, [])

  return (
    <>
      {isClient && (
        <>
          <XScrollArea
            className="bg-grid scrollable-area group/spotlight"
            onMouseMove={onMouseMove}
          >
            <FloatingHeader
              scrollTitle={currentRepo?.slug}
              goBackLink="/repos"
              bookmarks={repoList}
              currentRepo={currentRepo}
            />
            <SiteHeader />
            {/* <motion.div
              style={{
                transform: motionStyle,
              }}
              className="spotlight opacity-0 group-hover/spotlight:opacity-100 will-change-transform bg-white/20 absolute top-0 left-0 right-auto w-40 h-40 inset-0 transform-gpu blur-3xl"
            /> */}
            <div className="py-32 px-8 max-w-screen-lg flex w-full mx-auto justify-center">
              <div className="grid grid-cols-12 gap-8 items-start">
                <div className="col-span-8 bg-neutral-50 dark:bg-neutral-900 p-8 border border-border rounded-lg">
                  <Suspense fallback={<LoadingSpinner />}>
                    <div
                      className={cn(
                        "relative aspect-[1200/630] w-full rounded-t-2xl bg-gradient-to-tr"
                      )}
                    >
                      <FlipCard
                        front={currentRepo.image || "/assets/fallback.webp"}
                        back={
                          currentRepo.original_image || "/assets/fallback.webp"
                        }
                      />
                    </div>
                    <div className="relative flex items-center gap-2">
                      <Image
                        src={currentRepo.owner_avatar || currentRepo.image}
                        alt={currentRepo.title}
                        width={100}
                        height={100}
                        className="h-16 w-16 bg-background border-border sm:h-24 sm:w-24"
                      />
                      <div className="flex-1 p-4 pb-0">
                        <div className="flex items-center space-x-2">
                          <h1 className="font-display text-3xl font-bold">
                            {currentRepo.title}
                          </h1>
                        </div>
                        <p className="mt-2 text-gray-500">
                          {currentRepo.description}
                        </p>
                      </div>
                    </div>

                    <XTabs defaultValue="star-history" className="w-full">
                      <XTabsList>
                        <XTabsTrigger value="Overview">Overview</XTabsTrigger>
                        <XTabsTrigger value="star-history">
                          Star History
                        </XTabsTrigger>
                        <XTabsTrigger value="contributors">
                          Contributors
                        </XTabsTrigger>
                      </XTabsList>
                      <XTabsContent value="star-history">
                        <a href={currentRepo.link} target="_blank">
                          <img
                            src={`https://api.star-history.com/svg?repos=${
                              currentRepo.slug
                            }&theme=${theme === "dark" ? "dark" : "light"}`}
                            className="bg-background p-4 border-border"
                            alt={currentRepo.title}
                            width={864}
                            height={576}
                          />
                        </a>
                      </XTabsContent>
                      <XTabsContent value="contributors">
                        <a href={currentRepo.link} target="_blank">
                          <img
                            src={`https://contrib.rocks/image?repo=${currentRepo.slug}`}
                            className="bg-background p-4 border-border"
                            alt={currentRepo.title}
                            width={864}
                            height={576}
                          />
                        </a>
                      </XTabsContent>
                    </XTabs>
                  </Suspense>
                </div>
                <aside className="col-span-4 p-4 bg-neutral-50 dark:bg-neutral-900 border border-border rounded-lg">
                  <fieldset>
                    <figcaption className="text-foreground font-semibold">
                      Repository Details
                    </figcaption>
                    <figure>
                      <div className="flex flex-col gap-2 items-center py-4">
                        <div className="w-full flex gap-2 items-center justify-between text-foreground">
                          <span className="text-muted-foreground flex items-center gap-1 text-sm">
                            <Star className="h-4 w-4" />
                            <span className="">Stars</span>
                          </span>
                          <span className="text-sm">
                            {currentRepo.stars.toLocaleString("en-US")}
                          </span>
                        </div>
                        <div className="w-full flex gap-2 items-center justify-between text-foreground">
                          <span className="text-muted-foreground flex items-center gap-1 text-sm">
                            <GitForkIcon className="h-4 w-4" />
                            <span className="">Forks</span>
                          </span>
                          <span className="text-sm">
                            {currentRepo.forks.toLocaleString("en-US")}
                          </span>
                        </div>
                        <div className="w-full flex gap-2 items-center justify-between text-foreground">
                          <span className="text-muted-foreground flex items-center gap-1 text-sm">
                            <span
                              className={cn("h-4 w-4 p-[2px] rounded-full")}
                              style={{
                                backgroundColor: currentRepo.language_color,
                              }}
                            />
                            <span className="">Written in </span>
                          </span>
                          <span className="text-sm">
                            {currentRepo.language}
                          </span>
                        </div>
                      </div>
                    </figure>
                  </fieldset>
                  <fieldset>
                    <figcaption className="text-foreground font-semibold">
                      Related topics
                    </figcaption>
                    <figure>
                      <div className="flex gap-x-4 gap-y-3 flex-col items-start w-full mt-4">
                        <div className="flex gap-x-3 gap-y-2 flex-row flex-wrap items-center">
                          {currentRepo.topics?.map((topic) => (
                            <a
                              className="flex items-center gap-0.5 text-muted-foreground text-sm hover:text-foreground"
                              data-discover="true"
                              key={topic}
                              href={`/topics/${topic}`}
                            >
                              <HashIcon className="h-3 w-3" />
                              {topic}
                            </a>
                          ))}
                        </div>
                      </div>
                    </figure>
                  </fieldset>
                  <div className="flex items-center justify-between gap-2 mt-4">
                    <a
                      href={currentRepo.link}
                      target="_blank"
                      className={buttonVariants({
                        variant: "secondary",
                        className: "gap-2",
                        size: "sm",
                      })}
                    >
                      <GitHubLogoIcon className="h-4 w-4" />
                      <span className="text-sm">View on GitHub</span>
                    </a>
                    {currentRepo.homepage && (
                      <a
                        href={currentRepo.homepage}
                        target="_blank"
                        className={buttonVariants({
                          className: "gap-2",
                          size: "sm",
                        })}
                      >
                        <Link2Icon className="h-4 w-4" />
                        <span className="text-sm">Website</span>
                      </a>
                    )}
                  </div>
                </aside>
              </div>
            </div>
          </XScrollArea>
        </>
      )}
    </>
  )
}

// export function generateMetadata({ params }: { params: { slug: string } }) {
//   const { slug } = params

//   const siteUrl = `/repos/${slug}`
//   const seoTitle = `${slug.toLowerCase()} | Bookmarks`
//   const seoDescription = `A curated selection of various handpicked ${slug.toLowerCase()} repos by Robert Shaw`

//   return {
//     title: seoTitle,
//     description: seoDescription,
//     openGraph: {
//       title: seoTitle,
//       description: seoDescription,
//       url: siteUrl,
//     },
//     alternates: {
//       canonical: siteUrl,
//     },
//   }
// }
