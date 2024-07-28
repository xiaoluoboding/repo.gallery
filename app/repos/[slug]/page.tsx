/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { Suspense, useCallback, useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import {
  Star,
  Globe,
  HashIcon,
  GitForkIcon,
  Link2Icon,
  SparklesIcon,
  StarIcon,
  UsersIcon,
  SquarePenIcon,
  XIcon,
} from "lucide-react"
import Image from "next/image"

import { LoadingSpinner } from "@/components/LoadingSpinner"
import { XScrollArea } from "@/components/ui/XScrollArea"
import { Repo, Collection } from "@/lib/types"
import { useRepoStore } from "@/store/repo"

import { cn, isProd } from "@/lib/utils"
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
import LibHuntIcon from "@/assets/images/libhunt.png"
import OpenSauced from "@/components/icons/OpenSauced"
import SourceGraph from "@/components/icons/SourceGraph"
import SiteFooter from "@/components/SiteFooter"
import { XSkeleton, XSkeletonWithLoading } from "@/components/ui/XSkeleton"
import { MarkdownRenderer } from "@/components/MarkdownRenderer"
import {
  XDrawer,
  XDrawerContent,
  XDrawerHeader,
  XDrawerOverlay,
  XDrawerPortal,
} from "@/components/ui/XDrawer"
import { UpdateBookmarkForm } from "../modules/UpdateBookmarkForm"

// export async function generateStaticParams() {
//   return collectionList.map((collection: Collection) => ({
//     slug: collection.slug,
//   }))
// }

export default function RepoPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const { theme } = useTheme()

  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [openUpdateDrawer, setOpenUpdateDrawer] = useState(false)
  const [selectedRepo, setSelectedRepo] = useState<Repo>({} as Repo)
  const [isScraping, setIsScraping] = useState(false)
  const [currentTab, setCurrentTab] = useState("overview")
  const repoStore = useRepoStore()
  const repoList = useRepoStore((state) => state.repoList)
  const [currentRepo, setCurrentRepo] = useState<Repo>({} as Repo)

  const handleInitialData = useCallback(async () => {
    const repo = repoList.find((repo) => repo.slug === decodeURIComponent(slug))
    setCurrentRepo(repo || ({} as Repo))
  }, [slug, repoStore.isSearching])

  const handleDeleteCard = async (id: string) => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/sdb/repos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (res) {
        toast.success("Bookmark deleted successfully")
        setIsLoading(false)
        handleInitialData()
      }
    } catch (error) {
      setIsLoading(false)
    } finally {
      repoStore.setRepoState({
        isReRender: true,
      })
    }
  }

  const handleOpenDrawer = (repo: Repo) => {
    setSelectedRepo(repo)
    setOpenUpdateDrawer(true)
  }

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
          <XScrollArea className="bg-grid scrollable-area group/spotlight">
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
                <div className="col-span-12 sm:col-span-8 bg-neutral-50 dark:bg-neutral-900 p-8 border border-border rounded-lg">
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
                      {!isProd && (
                        <div className="absolute top-4 right-0 flex items-center gap-2">
                          <XButton
                            disabled={isLoading}
                            variant={"outline"}
                            size="icon"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              handleOpenDrawer(currentRepo)
                            }}
                          >
                            <SquarePenIcon className="w-4 h-4" />
                          </XButton>
                          <XButton
                            disabled={isLoading}
                            variant={"outline"}
                            size="icon"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              handleDeleteCard(currentRepo.id)
                            }}
                          >
                            <XIcon className="w-4 h-4" />
                          </XButton>
                        </div>
                      )}
                    </div>

                    <XTabs
                      defaultValue="overview"
                      className="w-full"
                      value={currentTab}
                      onValueChange={setCurrentTab}
                    >
                      <XTabsList>
                        <XTabsTrigger value="overview">
                          <div className="flex gap-2 items-center">
                            <SparklesIcon className="w-4 h-4" />
                            <span>Overview</span>
                          </div>
                        </XTabsTrigger>
                        <XTabsTrigger value="star-history">
                          <div className="flex gap-2 items-center">
                            <StarIcon className="w-4 h-4" />
                            <span>Star History</span>
                          </div>
                        </XTabsTrigger>
                        <XTabsTrigger value="contributors">
                          <div className="flex gap-2 items-center">
                            <UsersIcon className="w-4 h-4" />
                            <span>Contributors</span>
                          </div>
                        </XTabsTrigger>
                      </XTabsList>
                      <XTabsContent value="overview">
                        <XSkeletonWithLoading
                          loading={isScraping}
                          fallback={
                            <div className="space-y-4">
                              <XSkeleton className="w-full h-6"></XSkeleton>
                              <XSkeleton className="w-2/3 h-4"></XSkeleton>
                              <XSkeleton className="w-2/3 h-4"></XSkeleton>
                              <XSkeleton className="w-1/3 h-4"></XSkeleton>
                            </div>
                          }
                        >
                          <MarkdownRenderer>
                            {
                              (currentRepo.overview ||
                                currentRepo.description) as string
                            }
                          </MarkdownRenderer>
                        </XSkeletonWithLoading>
                      </XTabsContent>
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
                <aside className="col-span-12 sm:col-span-4 space-y-4">
                  <fieldset className="bg-neutral-50 dark:bg-neutral-900 border border-border rounded-lg p-4">
                    <figcaption className="text-foreground font-semibold">
                      Repository Details
                    </figcaption>
                    <figure className="flex flex-col gap-2 items-center mt-4">
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
                        <span className="text-sm">{currentRepo.language}</span>
                      </div>
                    </figure>
                  </fieldset>
                  <fieldset className="bg-neutral-50 dark:bg-neutral-900 border border-border rounded-lg p-4">
                    <figcaption className="text-foreground font-semibold">
                      Related topics
                    </figcaption>
                    <figure className="flex gap-x-4 gap-y-3 flex-col items-start w-full mt-4">
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
                    </figure>
                  </fieldset>
                  <fieldset className="bg-neutral-50 dark:bg-neutral-900 border border-border rounded-lg p-4">
                    <figcaption className="text-foreground font-semibold">
                      Repository Transformer
                    </figcaption>
                    <figure className="flex flex-col gap-2 items-center mt-4">
                      {currentRepo.homepage && (
                        <a
                          href={currentRepo.homepage}
                          target="_blank"
                          className={buttonVariants({
                            className: "gap-2 w-full flex !justify-between",
                            size: "sm",
                          })}
                        >
                          <span className="text-sm">Visit Website</span>
                          <Link2Icon className="h-4 w-4" />
                        </a>
                      )}
                      <a
                        href={currentRepo.link}
                        target="_blank"
                        className={buttonVariants({
                          variant: "secondary",
                          className: "gap-2 w-full flex !justify-between",
                          size: "sm",
                        })}
                      >
                        <span className="text-sm">View on GitHub</span>
                        <GitHubLogoIcon className="h-4 w-4" />
                      </a>
                      <a
                        href={`https://github.dev/${currentRepo.slug}`}
                        target="_blank"
                        className={buttonVariants({
                          variant: "secondary",
                          className: "gap-2 w-full flex !justify-between",
                          size: "sm",
                        })}
                      >
                        <span className="text-sm">View on github.dev</span>
                        <GitHubLogoIcon className="h-4 w-4" />
                      </a>
                      <a
                        href={`https://app.opensauced.pizza/s/${currentRepo.slug}?hideBots=false`}
                        target="_blank"
                        className={buttonVariants({
                          variant: "secondary",
                          className: "gap-2 w-full flex !justify-between",
                          size: "sm",
                        })}
                      >
                        <span className="text-sm">View on OpenSauced</span>
                        <OpenSauced className="h-4 w-4" />
                      </a>
                      <a
                        href={`https://sourcegraph.com/github.com/${currentRepo.slug}`}
                        target="_blank"
                        className={buttonVariants({
                          variant: "secondary",
                          className: "gap-2 w-full flex !justify-between",
                          size: "sm",
                        })}
                      >
                        <span className="text-sm">View on Sourcegraph</span>
                        <SourceGraph className="h-4 w-4" />
                      </a>
                      <a
                        href={`https://star-history.com/#${currentRepo.slug}&Date`}
                        target="_blank"
                        className={buttonVariants({
                          variant: "secondary",
                          className: "gap-2 w-full flex !justify-between",
                          size: "sm",
                        })}
                      >
                        <span className="text-sm">View on Star History</span>
                        <img
                          src={`https://star-history.com/assets/icon.png`}
                          className="w-4 h-4 border-none bg-transparent"
                          alt="Star History Icon"
                        />
                      </a>
                      <a
                        href={`https://www.bookmark.style/?url=${encodeURIComponent(
                          currentRepo.link
                        )}`}
                        target="_blank"
                        className={buttonVariants({
                          variant: "secondary",
                          className: "gap-2 w-full flex !justify-between",
                          size: "sm",
                        })}
                      >
                        <span className="text-sm">View on Bookmark Style</span>
                        <img
                          src={`https://www.bookmark.style/favicon.png`}
                          className="w-4 h-4 border-none bg-transparent"
                          alt="Bookmark Style Icon"
                        />
                      </a>
                      <a
                        href={`https://www.libhunt.com/r/${currentRepo.title}`}
                        target="_blank"
                        className={buttonVariants({
                          variant: "secondary",
                          className: "gap-2 w-full flex !justify-between",
                          size: "sm",
                        })}
                      >
                        <span className="text-sm">View on LibHunt</span>
                        <img
                          src={LibHuntIcon.src}
                          className="w-4 h-4 border-none rounded-none bg-transparent"
                          alt="Star History Icon"
                        />
                      </a>
                    </figure>
                  </fieldset>
                </aside>
              </div>
            </div>

            {/* <!-- Footer --> */}
            <SiteFooter />

            <XDrawer
              shouldScaleBackground={false}
              open={openUpdateDrawer}
              onOpenChange={setOpenUpdateDrawer}
              direction="right"
            >
              <XDrawerPortal>
                <XDrawerOverlay className="fixed inset-0 bg-black/40" />
                <XDrawerContent className="fixed bottom-0 right-0 flex h-full w-2/5 flex-col rounded-l-lg bg-background border-border">
                  <div className="flex-1 overflow-y-auto rounded-l-lg bg-background">
                    <XDrawerHeader className="font-semibold text-xl text-accent-foreground">
                      Update Repo
                    </XDrawerHeader>

                    <div className="p-4 gap-4">
                      <UpdateBookmarkForm
                        setDialogOpen={setOpenUpdateDrawer}
                        repo={selectedRepo}
                      />
                    </div>
                  </div>
                </XDrawerContent>
              </XDrawerPortal>
            </XDrawer>
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
