/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { Suspense, useCallback, useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { Star, Globe } from "lucide-react"
import Image from 'next/image'

import { LoadingSpinner } from "@/components/LoadingSpinner"
import { XScrollArea } from "@/components/ui/XScrollArea"
import { FloatingHeader } from "@/components/FloadingHeader"
import { Repo, Collection } from "@/lib/types"
import { useRepoStore } from "@/store/repo"
import {
  XDrawer,
  XDrawerContent,
  XDrawerHeader,
  XDrawerOverlay,
  XDrawerPortal,
} from "@/components/ui/XDrawer"
import { UpdateBookmarkForm } from "../modules/UpdateBookmarkForm"
import { cn } from "@/lib/utils"
import { buttonLinkVariants } from "@/components/ui/XButtonLink"

// export async function generateStaticParams() {
//   return collectionList.map((collection: Collection) => ({
//     slug: collection.slug,
//   }))
// }

export default function RepoPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params

  let mouseX = useMotionValue(0)
  let mouseY = useMotionValue(0)

  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [openUpdateDrawer, setOpenUpdateDrawer] = useState(false)
  const repoStore = useRepoStore()
  const repoList = useRepoStore((state) => state.repoList)
  const [currentRepo, setCurrentRepo] = useState<Repo>({} as Repo)
  const [selectedRepo, setSelectedRepo] = useState<Repo>({} as Repo)

  function onMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left - 80)
    mouseY.set(clientY - top - 80)
  }

  const motionStyle = useMotionTemplate`translate3d(${mouseX}px, ${mouseY}px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`

  const handleInitialData = useCallback(async () => {
    const repo = repoList.find((repo) => repo.slug === decodeURIComponent(slug))
    setCurrentRepo(repo || {} as Repo)
  }, [
    slug,
    repoStore.isSearching,
  ])

  const handleOpenDrawer = (repo: Repo) => {
    setSelectedRepo(repo)
    setOpenUpdateDrawer(true)
  }

  useEffect(() => {
    handleInitialData()
  }, [
    slug,
    repoStore.repoList,
    repoStore.isSearching,
  ])
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
            {/* <FloatingHeader
              scrollTitle={currentCollection?.title}
              goBackLink="/repos"
              bookmarks={collectionList}
              currentBookmark={currentCollection}
            /> */}
            <motion.div
              style={{
                transform: motionStyle,
              }}
              className="spotlight opacity-0 group-hover/spotlight:opacity-100 will-change-transform bg-white/20 absolute top-0 left-0 right-auto w-40 h-40 inset-0 transform-gpu blur-3xl"
            />
            <div className="content-wrapper">
              <div className="content @container max-w-screen-md">
                <Suspense fallback={<LoadingSpinner />}>
                  <div
                    className={cn(
                      "relative aspect-[2/1] w-full rounded-t-2xl bg-gradient-to-tr"
                    )}
                  >
                    <Image
                      src={currentRepo.image || currentRepo.original_image!}
                      alt={currentRepo.title}
                      width={1200}
                      height={600}
                    />
                  </div>
                  <div className="relative -mt-8 flex items-center justify-between px-4 sm:-mt-12 sm:items-end md:pr-0">
                    <Image
                      src={currentRepo.owner_avatar || currentRepo.image}
                      alt={currentRepo.title}
                      width={100}
                      height={100}
                      className="h-16 w-16 rounded-full bg-white p-2 sm:h-24 sm:w-24"
                    />
                    <div className="flex items-center space-x-2 py-2">
                      {/* <Suspense>
                        <EditProjectButton project={project} />
                      </Suspense> */}
                      <a
                        href={currentRepo.link}
                        target="_blank"
                        className={buttonLinkVariants({ variant: "secondary" })}
                      >
                        <Star className="h-4 w-4" />
                        <span className="text-sm">{currentRepo.stars}</span>
                      </a>
                      {currentRepo.homepage && (
                        <a
                          href={currentRepo.homepage}
                          target="_blank"
                          className={buttonLinkVariants()}
                        >
                          <Globe className="h-4 w-4" />
                          <span className="text-sm">Website</span>
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="max-w-lg p-4 pb-0">
                    <div className="flex items-center space-x-2">
                      <h1 className="font-display text-3xl font-bold">
                        {currentRepo.title}
                      </h1>
                      {/* {currentRepo.verified && (
                        <BadgeCheck
                          className="h-8 w-8 text-white"
                          fill="#1c9bef"
                        />
                      )} */}
                    </div>
                    <p className="mt-2 text-gray-500">
                      {currentRepo.description}
                    </p>
                  </div>

                  {/* <Image
                    src={
                      "https://api.star-history.com/svg?repos=vercel/next.js"
                    }
                    alt={currentRepo.title}
                    width={864}
                    height={576}
                  /> */}
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
