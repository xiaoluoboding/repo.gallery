"use client"

import { Suspense, useEffect, useMemo, useState } from "react"

import Image from "next/image"
import Link from "next/link"

import { LoadingSpinner } from "@/components/LoadingSpinner"
import { XScrollArea } from "@/components/ui/XScrollArea"
import { PageTitle } from "@/components/PageTitle"
import { FloatingHeader } from "@/components/FloadingHeader"
import { BookmarkCard } from "@/components/BookmarkCard/BookmarkCard"
import { useRepoStore } from "@/store/repo"
import { PROFILES } from "@/lib/useConstants"
import { cn } from "@/lib/utils"

export default function Home() {
  const [isClient, setIsClient] = useState(false)
  const repoList = useRepoStore((state) => state.repoList)
  const productList = [
    {
      title: "Side Space",
      description: "AI-Powered browser tab group manager",
      image: "/assets/side-space.svg",
      url: "https://sidespace.app?ref=robertshaw.id",
    },
    {
      title: "One Tab Group",
      description: "Your all-in-one browser tab manager",
      image: "/assets/one-tab-group.svg",
      url: "https://onetab.group?ref=robertshaw.id",
    },
    {
      title: "Bookmark Style",
      description: "Turn any link into a stylish visual web bookmark",
      image: "/assets/bookmark-style.svg",
      url: "https://bookmark.style?ref=robertshaw.id",
    },
  ]

  const ossList = useMemo(() => {
    const ossLinkList = [
      "https://github.com/xiaoluoboding/vue-color-wheel",
      "https://github.com/xiaoluoboding/vue-sonner",
      "https://github.com/xiaoluoboding/vue-command-palette",
      "https://github.com/nuxtbase/auth-ui-vue",
      "https://img2txt2audio.vercel.app/",
      "https://coolshapes-vue.vercel.app/",
    ]
    return repoList
      .filter((repo) => ossLinkList.includes(repo.link))
      .map((item) => {
        const { origin } = new URL(item.link)
        return {
          ...item,
          domain: origin,
        }
      })
      .sort((a, b) => b.created_at!!.localeCompare(a.created_at!!))
  }, [repoList])

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      {isClient && (
        <XScrollArea className="relative flex flex-col w-full scrollable-area">
          <FloatingHeader scrollTitle="Repo Gallery" />
          <div className="content-wrapper">
            <div className="content text-primary max-w-screen-lg">
              <PageTitle title="Home" className="lg:hidden" />
              <h1>Hey there, 👋 I&apos;m Robert Shaw</h1>
              <br />
              <section className="flex flex-col">
                <p className="my-0">
                  A web dev enthusiast with a passion for Vue.js.
                </p>
                <p className="my-0">
                  🖖 Vue.js fan / 🍎 SwiftUI Learner / ☕️ Coffee lover / 🌵
                  Agave guardian
                </p>
                <p className="my-0">
                  Passionate about bringing ideas to life. Explore all of my
                  projects.
                </p>
              </section>
              <Suspense fallback={<LoadingSpinner />}>
                <main className="mt-24 space-y-16">
                  <section>
                    <h2>Currently working on</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
                      {productList.map((product) => (
                        <a
                          key={product.title}
                          href={product.url}
                          target="_blank"
                          className="flex flex-col items-start justify-between bg-neutral-100 dark:bg-neutral-800 rounded-2xl p-4 aspect-square transform-cpu transition-all hover:scale-105"
                        >
                          <Image
                            src={product.image}
                            alt={product.title}
                            width={80}
                            height={80}
                            className="bg-transparent border-none"
                          />
                          <div>
                            <h1 className="text-2xl font-semibold bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-300 text-transparent bg-clip-text">
                              {product.title}
                            </h1>
                            <div className="text-lg text-accent-foreground">
                              {product.description}
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </section>
                
                  <section>
                    <h2>Find me on</h2>
                    <p className="flex flex-wrap gap-2 mt-4">
                      {Object.values(PROFILES).map((link, linkIndex) => {
                        return (
                          <Link
                            key={link.url}
                            href={link.url}
                            className={cn(
                              "group flex items-center justify-between rounded-lg p-2 text-accent-foreground hover:underline"
                            )}
                          >
                            <span className="flex items-center gap-2">
                              {link.icon}
                              <span className={cn("font-medium")}>
                                {link.title}
                              </span>
                            </span>
                          </Link>
                        )
                      })}
                    </p>
                  </section>
                </main>
              </Suspense>
            </div>
          </div>
        </XScrollArea>
      )}
    </>
  )
}
