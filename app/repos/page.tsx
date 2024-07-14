/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { Suspense, useCallback, useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { SquarePenIcon, XIcon } from "lucide-react"

import { LoadingSpinner } from "@/components/LoadingSpinner"
import { XScrollArea } from "@/components/ui/XScrollArea"
import { PageTitle } from "@/components/PageTitle"
import { FloatingHeader } from "@/components/FloadingHeader"
import { BookmarkCard } from "@/components/BookmarkCard/BookmarkCard"
import { Repo, Collection } from "@/lib/types"
import { XButton } from "@/components/ui/XButton"
import { useRepoStore } from "@/store/repo"
import {
  XDrawer,
  XDrawerContent,
  XDrawerHeader,
  XDrawerOverlay,
  XDrawerPortal,
} from "@/components/ui/XDrawer"
import { UpdateBookmarkForm } from "./modules/UpdateBookmarkForm"
import { formatSlug, isProd } from "@/lib/utils"
import { useRouter } from "next/navigation"

// export async function generateStaticParams() {
//   return collectionList.map((collection: Collection) => ({
//     slug: collection.slug,
//   }))
// }

export default function ReposPage({
  params,
}: {
  params: { slug: string }
}) {
  const router = useRouter()
  const { slug } = params

  let mouseX = useMotionValue(0)
  let mouseY = useMotionValue(0)

  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [openUpdateDrawer, setOpenUpdateDrawer] = useState(false)
  const repoStore = useRepoStore()
  const repoList = useRepoStore((state) => state.repoList)
  const collectionList = useRepoStore((state) => state.collectionList)
  const [currentCollection, setCurrentCollection] = useState<Collection | null>(
    null
  )
  const [currentRepoList, setCurrentRepoList] = useState<Repo[]>([])
  const [selectedRepo, setSelectedRepo] = useState<Repo>({} as Repo)

  function onMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left - 80)
    mouseY.set(clientY - top - 80)
  }

  const motionStyle = useMotionTemplate`translate3d(${mouseX}px, ${mouseY}px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`

  const handleInitialData = useCallback(async () => {
    const currentCollection = collectionList.find(
      (collection) => collection.slug === slug
    )
    currentCollection && setCurrentCollection(currentCollection)
    const list = repoStore.isSearching
      ? repoList
      : repoList
    list && setCurrentRepoList(list)
  }, [slug, repoStore.repoList, repoStore.isSearching, collectionList])

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

  const handleOpenRepo = (repo: Repo) => {
    router.push(`/repos/${encodeURIComponent(repo.slug)}`)
  }

  const handleOpenDrawer = (repo: Repo) => {
    setSelectedRepo(repo)
    setOpenUpdateDrawer(true)
  }

  useEffect(() => {
    handleInitialData()
  }, [slug, repoStore.repoList, repoStore.isSearching, collectionList])
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
              scrollTitle={currentCollection?.title}
              goBackLink="/repos"
              bookmarks={collectionList}
              currentBookmark={currentCollection}
            />
            <motion.div
              style={{
                transform: motionStyle,
              }}
              className="spotlight opacity-0 group-hover/spotlight:opacity-100 will-change-transform bg-white/20 absolute top-0 left-0 right-auto w-40 h-40 inset-0 transform-gpu blur-3xl"
            />
            <div className="content-wrapper">
              <div className="content @container">
                <PageTitle title={currentCollection?.title || ""} />
                <Suspense fallback={<LoadingSpinner />}>
                  {/* <!-- Masnory Layout for Bookmark Card --> */}
                  <div className="columns-1 lg:columns-2 2xl:columns-2 lg:gap-6 [&>div:not(:first-child)]:mt-6">
                    {currentRepoList.map((repo, index) => {
                      return (
                        <div
                          key={repo.link + repo.id}
                          className="relative cursor-pointer"
                          onClick={() => handleOpenRepo(repo)}
                        >
                          <BookmarkCard bookmark={repo} order={index} />
                          {!isProd && (
                            <div className="absolute top-6 right-6 flex items-center gap-2">
                              <XButton
                                disabled={isLoading}
                                variant={"outline"}
                                size="icon"
                                onClick={() => handleOpenDrawer(repo)}
                              >
                                <SquarePenIcon className="w-4 h-4" />
                              </XButton>
                              <XButton
                                disabled={isLoading}
                                variant={"outline"}
                                size="icon"
                                onClick={() => handleDeleteCard(repo.id)}
                              >
                                <XIcon className="w-4 h-4" />
                              </XButton>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </Suspense>
              </div>
            </div>
          </XScrollArea>
          <XDrawer
            shouldScaleBackground={false}
            open={openUpdateDrawer}
            onOpenChange={setOpenUpdateDrawer}
            direction="right"
          >
            <XDrawerPortal>
              <XDrawerOverlay className="fixed inset-0 bg-black/40" />
              <XDrawerContent className="fixed bottom-0 right-0 flex h-full w-2/5 flex-col rounded-l-lg bg-gray-100">
                <div className="flex-1 overflow-y-auto rounded-l-lg bg-background">
                  <XDrawerHeader className="font-semibold text-xl text-accent-foreground">
                    Update Bookmark
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
