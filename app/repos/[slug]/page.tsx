/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { Suspense, useCallback, useEffect, useState } from "react"
import { toast } from "sonner"
import {
  SparklesIcon,
  StarIcon,
  UsersIcon,
  SquarePenIcon,
  XIcon,
  LightbulbIcon,
} from "lucide-react"
import Image from "next/image"

import { LoadingSpinner } from "@/components/LoadingSpinner"
import { XScrollArea } from "@/components/ui/XScrollArea"
import { Repo } from "@/lib/types"
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
import { XButton } from "@/components/ui/XButton"
import SiteHeader from "@/components/SiteHeader"
import SiteFooter from "@/components/SiteFooter"
import { XSkeleton, XSkeletonWithLoading } from "@/components/ui/XSkeleton"
import { MarkdownRenderer } from "@/components/MarkdownRenderer"
import { XAlert, XAlertDescription, XAlertTitle } from "@/components/ui/XAlert"
import {
  XDrawer,
  XDrawerContent,
  XDrawerHeader,
  XDrawerOverlay,
  XDrawerPortal,
} from "@/components/ui/XDrawer"
import { UpdateBookmarkForm } from "../modules/UpdateBookmarkForm"
import AsidePanel from "./modules/AsidePanel"

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
  const currentRepo = useRepoStore((state) => state.currentRepo)

  const handleInitialData = useCallback(async () => {
    const repo = repoList.find((repo) => repo.slug === decodeURIComponent(slug))
    repoStore.setCurrentRepo(repo || ({} as Repo))
  }, [slug])

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
    handleInitialData().then(() => {
      repoStore.setRepoState({
        isReRender: false,
      })
    })
  }, [slug])

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
                <main className="col-span-12 sm:col-span-8 bg-neutral-50 dark:bg-neutral-900 p-8 border border-border rounded-lg">
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
                        <p className="mt-2 line-clamp-2 text-gray-500">
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
                          <XAlert>
                            <LightbulbIcon className="h-4 w-4" />
                            <XAlertTitle>Tips!</XAlertTitle>
                            <XAlertDescription>
                              This is an AI-generated overview for reference
                              only.
                            </XAlertDescription>
                          </XAlert>
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
                </main>
                <AsidePanel repo={currentRepo} />
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
